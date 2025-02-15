import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ExternalLink } from "lucide-react";

export default function ProfilePageData({ profileData }) {
  if (!profileData) return <div className="text-red-500">Error loading profile</div>;

  const { userData, externalData } = profileData;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={userData.image || "https://via.placeholder.com/150"} />
            <AvatarFallback>{userData.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{userData.name || userData.username}</CardTitle>
            <p className="text-gray-500">{userData.email}</p>
          </div>
        </CardHeader>
      </Card>

      {/* Coding Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Competitive Programming Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Problems Solved: {externalData?.problemsSolved || 0}</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Easy</span>
              <span>{externalData?.difficultyBreakdown.easy || 0}</span>
            </div>
            <Progress value={(externalData?.difficultyBreakdown.easy / externalData?.problemsSolved) * 100} />
            <div className="flex justify-between">
              <span>Medium</span>
              <span>{externalData?.difficultyBreakdown.medium || 0}</span>
            </div>
            <Progress value={(externalData?.difficultyBreakdown.medium / externalData?.problemsSolved) * 100} />
            <div className="flex justify-between">
              <span>Hard</span>
              <span>{externalData?.difficultyBreakdown.hard || 0}</span>
            </div>
            <Progress value={(externalData?.difficultyBreakdown.hard / externalData?.problemsSolved) * 100} />
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      {externalData?.badges?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {externalData.badges.map((badge, index) => (
              <Badge key={index} variant="secondary">
                {badge}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Solved Problems */}
      {externalData?.recentSolvedProblems?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Solved Problems</CardTitle>
          </CardHeader>
          <CardContent>
            {externalData.recentSolvedProblems.map((problem, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{problem.title}</p>
                <div className="flex space-x-4 text-blue-500 text-sm">
                  <a href={problem.solutionLink} target="_blank" className="flex items-center space-x-1">
                    <ExternalLink size={14} /> <span>Solution</span>
                  </a>
                  <a href={problem.discussionLink} target="_blank" className="flex items-center space-x-1">
                    <ExternalLink size={14} /> <span>Discussion</span>
                  </a>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

