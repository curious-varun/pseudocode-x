
"use client";
import { cn } from "@/lib/utils";
import useCanvasCursor from "@/hooks/canvas-cursor";
import { Pacifico } from "next/font/google";
import { AuroraText } from "./ui/aura-text";
import { Button } from "@/components/ui/button";

import Link from "next/link"; Link

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

const data = [
  { name: "LeetCode", solved: 50 },
  { name: "Codeforces", solved: 30 },
  { name: "HackerRank", solved: 20 },
];

export function HeroSection() {
  useCanvasCursor();
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
        Master Coding with AI Assistance
        {" "}
        <AuroraText
          className={cn(
            "text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-pink-500",
            pacifico.className
          )}
        >
          AI POWER
        </AuroraText>
      </h1>
      <Link href="/problemset">
        <Button className="" variant="outline">
          Get Started
        </Button>
      </Link>
      <canvas
        className="pointer-events-none fixed inset-0"
        id="canvas"
      />
    </div >
  );
}

