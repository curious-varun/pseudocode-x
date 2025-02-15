import Image from "next/image"
import Link from "next/link"
import { Mail, Linkedin, Twitter, Globe, FileText, MapPin, Trophy, Book, Code } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { db as prisma } from "@/db"
import SkillsRadarChart from "@/components/SkillsRadarChart"
import ContestPerformanceChart from "@/components/ContestPerformanceChart"
import ContributionHeatmap from "@/components/ContributionHeatmap"

export default async function ProfilePage() {
  const user = await prisma.user.findFirst({
    where: { username: "HareKrishna" }, // Change this dynamically as needed
    select: {
      name: true,
      username: true,
      image: true,
      leetcodeUsername: true,
      codeforcesUsername: true,
      githubUsername: true,
    },
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      <div className="mx-auto bg--100 max-w-7xl space-y-6">
        <div className="flex gap-4 mx-auto bg--400 justify-center">

          <Card className="relative  overflow-visible">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src={user?.image || "/placeholder.svg?height=120&width=120"}
                  alt="Profile Picture"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white shadow-lg"
                />
                <div className="text-center">
                  <h1 className="text-3xl font-bold">{user?.name || "Varun"}</h1>
                  <p className="text-sm text-muted-foreground">@{user?.username || "HareKrishna"}</p>
                </div>
                <div className="flex space-x-4">
                  <Link href={`mailto:${user?.username || "#"}`} className="text-gray-600 hover:text-gray-900">
                    <Mail className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`https://linkedin.com/in/${user?.githubUsername || "#"}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`https://twitter.com/${user?.leetcodeUsername || "#"}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`https://codeforces.com/profile/${user?.codeforcesUsername || "#"}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Globe className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`https://github.com/${user?.githubUsername || "#"}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FileText className="h-5 w-5" />
                  </Link>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  India
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-3">
            <Card>
              <CardHeader>
                <CardTitle>Contribution Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ContributionHeatmap />
              </CardContent>
            </Card>
            {/* Problem Solving Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Problems Solved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Easy (342)</span>
                      <span className="text-sm text-muted-foreground">58%</span>
                    </div>
                    <Progress value={58} className="h-2 bg-green-100" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Medium (450)</span>
                      <span className="text-sm text-muted-foreground">35%</span>
                    </div>
                    <Progress value={35} className="h-2 bg-yellow-100" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Hard (104)</span>
                      <span className="text-sm text-muted-foreground">7%</span>
                    </div>
                    <Progress value={7} className="h-2 bg-red-100" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

        <div>
        </div>
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">896</CardTitle>
              <p className="text-center text-sm text-muted-foreground">Total Questions</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">245</CardTitle>
              <p className="text-center text-sm text-muted-foreground">Active Days</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">35</CardTitle>
              <p className="text-center text-sm text-muted-foreground">Contests</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">1842</CardTitle>
              <p className="text-center text-sm text-muted-foreground">Contributions</p>
            </CardHeader>
          </Card>
        </div>

        {/* Skills Radar Chart and Contest Performance */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Skills Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <SkillsRadarChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contest Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ContestPerformanceChart />
            </CardContent>
          </Card>
        </div>

        {/* Platform Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Contest Participation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image src="/placeholder.svg?height=24&width=24" alt="LeetCode" width={24} height={24} />
                <span>LeetCode</span>
              </div>
              <span className="font-mono">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image src="/placeholder.svg?height=24&width=24" alt="CodeChef" width={24} height={24} />
                <span>CodeChef</span>
              </div>
              <span className="font-mono">18</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image src="/placeholder.svg?height=24&width=24" alt="CodeForces" width={24} height={24} />
                <span>CodeForces</span>
              </div>
              <span className="font-mono">5</span>
            </div>
          </CardContent>
        </Card>

        {/* Contribution Heatmap */}


        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="font-medium">LeetCode Weekly Contest Winner</p>
                  <p className="text-sm text-muted-foreground">Ranked 1st in the recent contest</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Book className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">100 Days Coding Streak</p>
                  <p className="text-sm text-muted-foreground">Consistently solved problems for 100 days</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Code className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium">1000 Problems Solved</p>
                  <p className="text-sm text-muted-foreground">Milestone achievement across all platforms</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

