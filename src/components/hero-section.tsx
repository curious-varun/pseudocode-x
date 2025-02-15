"use client"


import { cn } from "@/lib/utils";
import useCanvasCursor from "@/hooks/canvas-cursor";
import { Pacifico } from "next/font/google"
import { AuroraText } from "./ui/aura-text";
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})



export function HeroSection() {
  useCanvasCursor();
  return (
    <div className="h-screen w-full ">
      <canvas className="pointer-events-none fixed inset-0" id="canvas" />
      <div className="max-w-4xl mx-auto text-center  h-full w-full ">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold  mb-6 mt-[200px]">
          Master Coding with AI Assistance
          {" "}
          <AuroraText className={cn("text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-pink-500", pacifico.className)}>
            AI POWER
          </AuroraText>
        </h1>
      </div>
    </div >
  );
}


