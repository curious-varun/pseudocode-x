import { User, LogOut } from "lucide-react";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface UserAvatarMenuProps {
  imageUrl: string;
  username: string;
}

export function UserAvatarMenu({ imageUrl, username }: UserAvatarMenuProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-7 w-7 cursor-pointer">
          <AvatarImage src={imageUrl} alt="User" />
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href={`/profile/${username}`} className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{username}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => { await signOut({ callbackUrl: "/" }); }}
          className="cursor-pointer text-red-500"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  );
}

