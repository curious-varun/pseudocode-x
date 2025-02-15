"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { formatDistanceToNow } from "date-fns"

type Submission = {
  id: string
  userId: string
  problemId: string
  sourceCode: string
  verdict: string
  runtime?: string
  memory?: string
  submittedAt?: string // Will be DateTime from Prisma, else we generate
}

export function SubmissionTable({ submissions }: { submissions: Submission[] }) {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  const getRandomRuntime = () => `${(Math.random() * 100).toFixed(2)} ms`
  const getRandomMemory = () => `${(Math.random() * 100).toFixed(2)} MB`

  // Generate a random time between 1 hour and 2 days ago
  const getRandomTimeAgo = () => {
    const randomTime = new Date(Date.now() - Math.floor(Math.random() * (2 * 24 * 60 * 60 * 1000))) // Max 2 days ago
    return formatDistanceToNow(randomTime, { addSuffix: true }) // Example: "1 hour ago"
  }

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 h-8 font-medium">Submitted At</TableHead>
              <TableHead className="h-8 font-medium">Status</TableHead>
              <TableHead className="h-8 font-medium">Runtime</TableHead>
              <TableHead className="h-8 font-medium">Memory</TableHead>
              <TableHead className="h-8 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission, index) => (
              <TableRow key={submission.id} className={index % 2 === 1 ? "bg-accent/70" : ""}>
                <TableCell className="pl-6 py-2">
                  {submission.submittedAt ? formatDistanceToNow(new Date(submission.submittedAt), { addSuffix: true }) : getRandomTimeAgo()}
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-2">
                    <span className={submission.verdict.toLowerCase() === "accepted" ? "text-emerald-500" : "text-red-500"}>
                      {submission.verdict}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-2">{submission.runtime || getRandomRuntime()}</TableCell>
                <TableCell className="py-2">{submission.memory || getRandomMemory()}</TableCell>
                <TableCell className="py-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        View Code
                      </Button>
                    </DialogTrigger>
                    {selectedSubmission && (
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>Source Code</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[500px] overflow-auto bg-gray-100 p-4 rounded-md">
                          <pre className="text-sm font-mono whitespace-pre-wrap">{selectedSubmission.sourceCode}</pre>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

