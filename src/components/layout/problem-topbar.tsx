"use client";

import { Clock, CloudUpload, Logs, Play } from "lucide-react";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { useSubmission } from "@/context/problem-context";
import { UserAvatarMenu } from "@/components/user-avatar-menu";
export function ProblemTopbar() {
  const { triggerSubmit } = useSubmission();
  const { data: session } = useSession(); // Fixed session retrieval

  return (
    <div className="sticky top-0 z-50 h-12 bg-accent/50 border-border border-b dark:bg-accent/30 shadow-sm flex justify-between px-6">
      {/* Left Section: Logo & Problem List Button */}
      <div className="flex items-center">
        <Image src="/cu-logo.png" alt="logo-image" width={20} height={20} />
        <Separator className="ml-6 bg-black/50 h-6" orientation="vertical" />
        <Button variant="ghost" className="flex items-center gap-2 text-xs ml-2">
          <Logs size={16} /> Problem List
        </Button>
      </div>

      {/* Center Section: Actions (Run, Submit, Timer) */}
      <div className="w-full flex justify-center items-center gap-3 pr-44">

        <Button onClick={triggerSubmit} size="sm" variant="outline" className="text-xs flex items-center gap-2">
          <CloudUpload size={16} /> Submit
        </Button>
        {/*TODO: implement the clock here  */}
        <Button size="sm" variant="outline" className="text-xs flex items-center gap-2">
          <Clock size={16} />
        </Button>
      </div>

      {/* Right Section: User Avatar or Sign-in Button */}
      <div className="flex items-center">
        {session ? (
          <UserAvatarMenu imageUrl={session.user?.image || ""} username={session.user?.name || "U"} />
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="text-xs flex items-center gap-2 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              signIn("google");
            }}
          >
            {/* Google Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
}

