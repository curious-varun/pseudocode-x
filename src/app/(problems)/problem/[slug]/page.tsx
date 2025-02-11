"use client"
import { Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProblemPage() {
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40}>
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <h1 className="text-xl font-semibold">2. Add Two Numbers</h1>
              <p className="text-sm text-muted-foreground">Medium</p>
            </div>
            <Tabs defaultValue="description" className="flex-1">
              <TabsList className="w-full justify-start rounded-none border-b">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="solution">Solution</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4">
                <div className="prose prose-sm dark:prose-invert">
                  <p>
                    You are given two non-empty linked lists representing two non-negative integers. The digits are
                    stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and
                    return the sum as a linked list.
                  </p>
                  <p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b p-2">
              <Button size="sm">
                <Play className="mr-2 h-4 w-4" />
                Run
              </Button>
              <Button size="sm" variant="outline">
                Submit
              </Button>
            </div>
            <div className="flex-1 p-4">
              <pre className="h-full rounded-lg bg-muted p-4">
                <code className="text-sm">
                  {`/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
};`}
                </code>
              </pre>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}


