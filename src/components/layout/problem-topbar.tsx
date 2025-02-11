import { Clock, CloudUpload, Component, LogInIcon, Logs, Play } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

export function ProblemTopbar() {
  return (
    <div className="h-12 bg-accent shadow-sm border-border border-b flex justify-between px-6">
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
      <div className="w-full flex justify-center items-center gap-2 mr-10">
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
        end
      </div>
    </div>
  )
}

