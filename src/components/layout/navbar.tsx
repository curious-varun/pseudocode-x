"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Command } from "lucide-react";

export function NavBar() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav className="px-8 h-12 flex justify-between items-center  shadow-md bg-white">
      <div className="flex gap-[100px] ">
        {/* Logo */}
        <div className="flex gap-2 justify-center items-center ">
          <Command />
          <div className="text-xl font-bold">Command</div>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link href="/problems" className="hover:underline">Problems</Link>
          <Link href="/contests" className="hover:underline">Contests</Link>
          <Link href="/discussion" className="hover:underline">Discussion</Link>
        </div>
      </div>

      {/* Authentication Section */}
      <div>
        {isLoggedIn ? (
          <Avatar>
            <AvatarImage src="" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline">Login</Button>
            <Button>Sign Up</Button>
          </div>
        )}
      </div>
    </nav >
  );
}

