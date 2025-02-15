"use client"

import { useState } from "react"

const generateFakeData = () => {
  const data = []
  const now = new Date()
  for (let i = 0; i < 365; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
    data.push({
      date,
      count: Math.floor(Math.random() * 5),
    })
  }
  return data
}

export default function ContributionHeatmap() {
  const [data] = useState(generateFakeData)

  const getColor = (count) => {
    if (count === 0) return "bg-gray-100"
    if (count < 2) return "bg-green-200"
    if (count < 3) return "bg-green-300"
    if (count < 4) return "bg-green-400"
    return "bg-green-500"
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-grid grid-cols-[repeat(53,1fr)] gap-1">
        {data.map((day, index) => (
          <div
            key={index}
            className={`w-3 h-3 ${getColor(day.count)}`}
            title={`${day.date.toDateString()}: ${day.count} contributions`}
          />
        ))}
      </div>
    </div>
  )
}

