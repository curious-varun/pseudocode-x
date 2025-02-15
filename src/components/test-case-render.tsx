"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function TestCaseRenderer({ testCases }: { testCases: { input: string; output: string }[] }) {
  const [visibleCards, setVisibleCards] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCards((prev) => (prev < testCases.length ? prev + 1 : prev))
    }, 300)
    return () => clearInterval(timer)
  }, [testCases.length])

  return (
    <ScrollArea className="w-full">
      <div className="p-4">
        <div className="flex gap-4 min-w-max max-w-[calc(500px+1rem)]">
          {testCases.map((testCase, index) => (
            <Card key={index} className={`w-[250px] h-[120px] flex-shrink-0 flex flex-col justify-between transition-all duration-300 ease-in-out ${index < visibleCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}            >
              <CardContent className="text-xs space-y-1 py-2">
                <div className="space-y-0.5 mt-2">
                  <p className="font-medium text-gray-500">🔹 Input:</p>
                  <pre className="bg-gray-100 p-1 rounded-md pl-2 text-xs whitespace-pre-wrap overflow-auto max-h-[25px]">
                    {testCase.input}
                  </pre>
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium text-gray-500">🔸 Output:</p>
                  <pre className="bg-gray-100 p-1 rounded-md pl-2 text-xs whitespace-pre-wrap overflow-auto max-h-[25px]">
                    {testCase.output}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default TestCaseRenderer;
