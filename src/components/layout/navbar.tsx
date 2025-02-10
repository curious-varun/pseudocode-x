'use client';

import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User, Users } from "lucide-react"
import { ThemeToggleButton } from "../theme-toggle-button";


interface NavBarLinkType {
  title: string,
  url: string,
}
interface UserAvatarMenuProps {
  imageUrl: string;
  username: string;
}
export const navbarLinks: NavBarLinkType[] = [
  { title: "Problem Set", url: "/problemset" },
  { title: "Discussion", url: "/discussion" },
  { title: "Contest", url: "/contest" },
];


const session = true;



export function NavBar() {
  return (
    <div className=" shadow-sm border-border border-b">
      <div className="m-auto h-[50px] w-full items-center justify-between px-6 md:flex max-w-[1300px] ">
        <div className="flex items-center gap-20">
          <div className="flex font-semibold">
            <Image
              src="/cu-logo.png"
              alt="logo-image"
              width={24}
              height={25}
            />
            <p className="mt-"> Do-code </p>
          </div>
          <div className="flex items-center ">
            {navbarLinks.map((link) => { return (<Link href={link.url} key={link.url}><Button variant="ghost" className=" hover:font-bold "> {link.title}</Button> </Link>) })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {session ?
            <div>
              <UserAvatarMenu imageUrl="/varun" username="varun" />
            </div>
            :
            <div className=" flex  gap-2">
              <Link href='/login'>
                <Button className="text-xs " size="sm" variant="outline">login</Button>
              </Link>
              <Link href='/sign-up'>
                <Button className="text-xs " size="sm" variant="outline">sign-up</Button>
              </Link>
              <div className="ml-4">  <ThemeToggleButton /> </div>
            </div>
          }
        </div>
      </div>
    </div >)
}







export default function UserAvatarMenu({ imageUrl, username }: UserAvatarMenuProps) {
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
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

        <Link href="/settings" passHref>
          <DropdownMenuItem asChild>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </div>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


