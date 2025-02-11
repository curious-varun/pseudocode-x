import { Clock, CloudUpload, Component, LogInIcon, Logs, Play } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { ThemeToggleButton } from "../theme-toggle-button";

export function ProblemTopbar() {
  return (
    <div className="sticky top-0 z-50 h-12   bg-accent/50 border-border border-b  dark:bg-accent/30 shadow-sm  flex justify-between px-6">
      <div className="flex items-center ">
        <Image
          src="/cu-logo.png"
          alt="logo-image"
          width={20}
          height={20}
        />
        <Separator className="ml-6 h-6" orientation="vertical" />
        <Button variant="ghost"> <Logs /> Problem List </Button>
      </div>
      <div className="w-full flex justify-center items-center gap-2 pr-44">
        <Button className="text-xs " size="sm" variant="outline">
          <Play /> run
        </Button>
        <Button className="text-xs " size="sm" variant="outline">
          <CloudUpload /> submit
        </Button>
        <Button className="text-xs px-2 " size="sm" variant="outline">
          <Clock />
        </Button>
      </div>
      <div className="flex items-center">
        <ThemeToggleButton />
      </div>
    </div>
  )
}

