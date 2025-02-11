"use client"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ProblemInfoSection } from "@/features/problem/componenets/problem-info-section"
import { useState } from "react";
import Editor from "@monaco-editor/react";




export default function ProblemPage() {
  const [code, setCode] = useState("// Write your code here...");
  return (
    <div className="bg-accent/10 mt-2">
      <ResizablePanelGroup
        direction="horizontal"
        className="  rounded-lg "
      >
        <ResizablePanel minSize={2} >
          <div className="ml-2  bg-accent/40 h-screen">
            <ProblemInfoSection />
          </div>
        </ResizablePanel>
        <ResizableHandle className="w-1 mx-0.5 hover:bg-blue-500 bg-white dark:bg-black dark:hover:bg-blue-600" withHandle />
        <ResizablePanel minSize={30} >
          <div className="mr-2  bg-accent/40 h-screen">
            <Editor
              height="400px"
              defaultLanguage="cpp"
              defaultValue={code}
              onChange={(value) => setCode(value || "")}
              theme="vs"
            />
          </div>
        </ResizablePanel >
      </ResizablePanelGroup >
    </div >

  )
}





