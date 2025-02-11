"use client"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ProblemInfoSection } from "@/features/problem/componenets/problem-info-section"


export default function ProblemPage() {
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
        <ResizableHandle className="w-2 bg-white dark:bg-black hover:bg-blue-500" withHandle />
        <ResizablePanel minSize={30} >
          <div className="mr-2  bg-accent/40 h-screen">
            <span className="font-semibold"> hi </span>
          </div>
        </ResizablePanel >
      </ResizablePanelGroup >    </div >

  )
}





