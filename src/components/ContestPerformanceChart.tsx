"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", LeetCode: 4, CodeForces: 3, CodeChef: 2 },
  { name: "Feb", LeetCode: 3, CodeForces: 1, CodeChef: 4 },
  { name: "Mar", LeetCode: 2, CodeForces: 4, CodeChef: 3 },
  { name: "Apr", LeetCode: 5, CodeForces: 2, CodeChef: 1 },
  { name: "May", LeetCode: 3, CodeForces: 3, CodeChef: 5 },
  { name: "Jun", LeetCode: 4, CodeForces: 5, CodeChef: 2 },
]

export default function ContestPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="LeetCode" fill="#8884d8" />
        <Bar dataKey="CodeForces" fill="#82ca9d" />
        <Bar dataKey="CodeChef" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}

