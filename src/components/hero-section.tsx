"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Link from "next/link"
import { RoboAnimation } from "@/components/robo-animation"
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})



export function HeroSection() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/*TODO: making the coding icons float*/}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="-mt-[200px]">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold  mb-6">
              Master Coding with AI Assistance
              <span className={cn("text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-pink-500", pacifico.className)}>
                {" "}
                AI POWER
              </span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>

    </div>
  )
}


