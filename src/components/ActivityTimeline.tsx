import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Code, Trophy } from "lucide-react"

const activities = [
  { date: "2023-06-15", title: "Solved 5 Hard Problems", icon: Code },
  { date: "2023-06-10", title: "Won CodeForces Round 835", icon: Trophy },
  { date: "2023-06-05", title: "Completed 30-Day Coding Challenge", icon: CheckCircle2 },
  // Add more activities as needed
]

export default function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {activities.map((activity, index) => (
            <li key={index} className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {activity.date}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <activity.icon className="mr-2 h-5 w-5" />
                {activity.title}
              </h3>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

