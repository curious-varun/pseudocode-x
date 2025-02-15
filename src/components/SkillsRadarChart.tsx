"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

const data = [
  { subject: "Data Structures", A: 120, fullMark: 150 },
  { subject: "Algorithms", A: 98, fullMark: 150 },
  { subject: "Dynamic Programming", A: 86, fullMark: 150 },
  { subject: "Graph Theory", A: 99, fullMark: 150 },
  { subject: "Math", A: 85, fullMark: 150 },
  { subject: "String Manipulation", A: 65, fullMark: 150 },
]

export default function SkillsRadarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name="Skills" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

