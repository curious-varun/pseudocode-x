"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export function Landing() {
  const { data: session } = useSession();


  return (
    <div>
      {session ? (
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sign In
        </button>
      )}
    </div>
  )
}
