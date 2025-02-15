"use client";

import { cn } from "@/lib/utils";
import useCanvasCursor from "@/hooks/canvas-cursor";
import { Pacifico } from "next/font/google";
import { AuroraText } from "./ui/aura-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

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
    <div className="h-full mt-[100px]  w-full relative flex flex-col items-center justify-center">
      <canvas className="pointer-events-none fixed inset-0" id="canvas" />
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center h-full w-full p-4">
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
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-6">
          A simple yet powerful platform where AI helps you learn programming efficiently.
          Get insights, recommendations, and real-time support tailored to your learning style.
        </p>
        <p className="text-md md:text-lg text-gray-500 max-w-3xl">
          Connect all your coding profiles from platforms like LeetCode, Codeforces, and more into one centralized hub.
          Track your progress, analyze your strengths, and level up your coding skills with AI-powered insights.
        </p>
        <Button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Get Started
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-6xl">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
            <p className="text-gray-500">Get personalized coding recommendations.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold">Centralized Dashboard</h3>
            <p className="text-gray-500">Track your progress across multiple platforms.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold">Competitive Analysis</h3>
            <p className="text-gray-500">Compare your coding skills with peers.</p>
          </CardContent>
        </Card>
      </div>
      <div className="w-full max-w-4xl mt-12">
        <h2 className="text-2xl font-bold text-center mb-4">Problem Solving Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="solved" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

