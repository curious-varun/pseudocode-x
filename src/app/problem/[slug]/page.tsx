import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { getProblemWithTestCaseById, GetProblemWithTestCaseByIdType } from "@/db/problem";
import { TestCaseRenderer } from "@/components/test-case-render";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import MarkdownRenderer from "@/components/markdown-renderer";
import { CodingEditor } from "@/components/coding-editor";
import { RenderSolution } from "@/components/render-solution";
import { ScrollArea } from "@/components/ui/scroll-area"; // ✅ Correct import
import { auth } from "@/lib/auth";
import { getUserSubmissions } from "@/db/submission";
import { SubmissionTable } from "@/components/submission-render";
import { getSolution } from "@/db/solution";

export default async function ProblemPage({ params }: { params: { slug: string } }) {

  const session = await auth();
  const data = await getProblemWithTestCaseById(params.slug); // Fetch problem details
  if (!data) return notFound();
  if (!session?.user?.email) return <p>You need to log in to view submissions.</p>;
  const { title, description, difficulty, testCases } = data;
  const submissions = await getUserSubmissions(session.user.email, title);
  const solution = await getSolution(title)

  return (
    <div className="px-6 h-[calc(100vh-3rem)] ">
      <ResizablePanelGroup direction="horizontal" className="pt-1">
        <ResizablePanel maxSize={50} minSize={20}>
          <Tabs defaultValue="description" className="flex-1">
            <TabsList className="w-full justify-start gap-2">
              <TabsTrigger className="text-xs" value="description">Description</TabsTrigger>
              <TabsTrigger className="text-xs" value="solution">Solution</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <ScrollArea className="h-[calc(100vh-8rem)] w-full p-2">
                <MarkdownRenderer content={description.replace(/\\n/g, "\n")} />
                {/* @ts-ignore */}
                <div className="max-w-[500px] ">
                  <TestCaseRenderer testCases={testCases} />
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="solution">
              <ScrollArea className="h-[calc(100vh-6rem)] w-full p-2">
                <RenderSolution
                  userId={session.user.email}
                  solution={solution?.solution || "# do not have solution right now"}
                />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle className="mx-3 hover:bg-blue-600 h-[calc(100vh-18rem)] my-auto" withHandle />
        <ResizablePanel minSize={60}>
          <Tabs defaultValue="code" className="flex-1">
            <TabsList className="w-full justify-start gap-2">
              <TabsTrigger className="text-xs" value="code">Code</TabsTrigger>
              <TabsTrigger className="text-xs" value="submissions">Submissions</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <ScrollArea className="h-[calc(100vh-6rem)] w-full p-2">
                {/* @ts-ignore */}
                <CodingEditor description={description?.toString() || "No description available"} />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="submissions">
              <ScrollArea className="h-[calc(100vh-6rem)] w-full p-2">
                <SubmissionTable submissions={submissions} />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

