"use client"

import { Button } from "@/components/ui/button"
import { User, Settings, LogOut } from "lucide-react";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import { useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ThemeToggleButton } from "../theme-toggle-button";
import { signIn, signOut } from "next-auth/react";

interface UserAvatarMenuProps {
  imageUrl: string;
  username: string;
}

export function TopBar() {
  const { data: session } = useSession();
  return (
    <div className="">
      <div className="mx-auto max-w-[1300px] ">
        <div className="h-10  flex items-center justify-between px-6 py-3 backdrop-blur-sm">
          <Link className="flex font-semibold gap-0.5 " href='/'>
            <Image
              src="/cu-logo.png"
              alt="logo-image"
              width={25}
              height={25}
            />
            <p className="mt-0.5"> Do-code </p>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/problemset">Problems</NavLink>
            <NavLink href="/discussion">Discussion</NavLink>
            <NavLink href="/contest">Contest</NavLink>
          </div>


          <div className="flex items-center gap-1">
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
      </div>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full" />
    </Link>
  )
}


export function UserAvatarMenu({ imageUrl, username }: UserAvatarMenuProps) {



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-7 w-7  cursor-pointer">
          <AvatarImage src={imageUrl} alt="User" />
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <Link href={`/profile/${username}`} passHref>
          <DropdownMenuItem asChild>
            <div className="flex items-center space-x-2 cursor-pointer">
              <User className="w-4 h-4" />
              <span>{username}</span>
            </div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-500">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
