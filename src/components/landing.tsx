"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Landing() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <div className="flex items-center gap-4">

      {session ? (
        <>
          <Avatar>
            <AvatarImage src={session.user?.image || ""} alt="Profile Picture" />

            <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>

          </Avatar>
          <span className="text-lg font-medium">{session.user?.name || "User"}</span>
          <Button onClick={() => signOut()} variant="destructive">
            Sign Out
          </Button>
        </>
      ) : (
        <Button onClick={() => signIn()} variant="default">
          Sign In
        </Button>
      )}
    </div>
  );
}

