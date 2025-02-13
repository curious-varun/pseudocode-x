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
        {session ? (
          <UserAvatarMenu imageUrl={session.user?.image || ""} username={session.user?.name || "U"} />
        ) : (
          <div className="">
            <Button
              className="text-xs rounded-full "
              size="sm" variant="outline"
              onClick={async (e) => {
                e.preventDefault(); // Prevents any unwanted form submission
                await signIn("google"); // Ensure signIn is awaited
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

