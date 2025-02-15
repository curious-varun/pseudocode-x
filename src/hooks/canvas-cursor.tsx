import { useEffect } from "react";

type OscillatorConfig = {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
};

class Oscillator {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;

  constructor(config: OscillatorConfig = {}) {
    this.phase = config.phase || 0;
    this.offset = config.offset || 0;
    this.frequency = config.frequency || 0.001;
    this.amplitude = config.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

type NodeType = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

class Node implements NodeType {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

type LineConfig = {
  spring: number;
};

class Line {
  spring: number;
  friction: number;
  nodes: Node[] = [];

  constructor(config: LineConfig) {
    this.spring = config.spring + 0.1 * Math.random() - 0.02;
    this.friction = CanvasConfig.friction + 0.01 * Math.random() - 0.002;
    for (let i = 0; i < CanvasConfig.size; i++) {
      const node = new Node();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  }

  update(): void {
    let e = this.spring;
    const firstNode = this.nodes[0];
    firstNode.vx += (pos.x - firstNode.x) * e;
    firstNode.vy += (pos.y - firstNode.y) * e;

    for (let i = 0; i < this.nodes.length; i++) {
      const current = this.nodes[i];
      if (i > 0) {
        const prev = this.nodes[i - 1];
        current.vx += (prev.x - current.x) * e;
        current.vy += (prev.y - current.y) * e;
        current.vx += prev.vx * CanvasConfig.dampening;
        current.vy += prev.vy * CanvasConfig.dampening;
      }
      current.vx *= this.friction;
      current.vy *= this.friction;
      current.x += current.vx;
      current.y += current.vy;
      e *= CanvasConfig.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.nodes[0].x, this.nodes[0].y);
    for (let i = 1; i < this.nodes.length - 2; i++) {
      const e = this.nodes[i];
      const t = this.nodes[i + 1];
      const midX = 0.5 * (e.x + t.x);
      const midY = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, midX, midY);
    }
    ctx.stroke();
    ctx.closePath();
  }
}

type Position = { x: number; y: number };

type CanvasConfigType = {
  friction: number;
  trails: number;
  size: number;
  dampening: number;
  tension: number;
};

const CanvasConfig: CanvasConfigType = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

let ctx: CanvasRenderingContext2D;
let f: Oscillator;
let pos: Position = { x: 0, y: 0 };
let lines: Line[] = [];

const onMouseMove = (event: MouseEvent | TouchEvent) => {
  const setPosition = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    } else {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
  };
  setPosition(event);
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("touchstart", onMouseMove);
  document.addEventListener("mousemove", setPosition);
  document.addEventListener("touchmove", setPosition);
  lines = Array.from({ length: CanvasConfig.trails }, () => new Line({ spring: 0.4 }));
  render();
};

const render = () => {
  if (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = `hsla(${Math.round(f.update())}, 50%, 50%, 0.2)`;
    ctx.lineWidth = 1;
    lines.forEach((line) => {
      line.update();
      line.draw(ctx);
    });
    requestAnimationFrame(render);
  }
};

const resizeCanvas = () => {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
};

const useCanvasCursor = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;
    ctx = canvas.getContext("2d")!;
    f = new Oscillator({ phase: Math.random() * 2 * Math.PI, amplitude: 85, frequency: 0.0015, offset: 285 });
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchstart", onMouseMove);
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchstart", onMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
};

export default useCanvasCursor;

