import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import ChatWidget from "@/components/chat-widget-gemini";
import { getProblemWithTestCaseById, GetProblemWithTestCaseByIdType } from "@/db/problem";
import { notFound } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import MarkdownRenderer from "@/components/markdown-renderer";
import { CodingEditor } from "@/components/coding-editor";

export default async function ProblemPage({ params }: { params: { slug: string } }) {
  const data = await getProblemWithTestCaseById(params.slug);

  if (!data) return notFound();


  const { title, description, difficulty, testCases } = data;

  return (
    <div className="px-6 h-[calc(100vh-3rem)] ">
      <ChatWidget />
      <ResizablePanelGroup direction="horizontal" className="pt-1">
        <ResizablePanel maxSize={50} minSize={20}>
          <Tabs defaultValue="description" className="flex-1">
            <TabsList className=" w-full justify-start gap-2">
              <TabsTrigger className="text-xs" value="description">Description</TabsTrigger>
              <TabsTrigger className="text-xs" value="solution">Solution</TabsTrigger>
              <TabsTrigger className="text-xs" value="discussion">discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <MarkdownRenderer content={description.replace(/\\n/g, "\n")} />
            </TabsContent>
            <TabsContent value="solution">
              solution
            </TabsContent>
            <TabsContent value="discussion">
              discussion
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle className="mx-3 hover:bg-blue-600  h-[calc(100vh-18rem)] my-auto" withHandle />
        <ResizablePanel minSize={60}>
          <Tabs defaultValue="code" className="flex-1">
            <TabsList className=" w-full justify-start gap-2">
              <TabsTrigger className="text-xs" value="code"> code </TabsTrigger>
              <TabsTrigger className="text-xs" value="submissinos">submissinos</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <CodingEditor />
            </TabsContent>
            <TabsContent value="submissinos">
              submissinos
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup >
    </div >
  );
}

