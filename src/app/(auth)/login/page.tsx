import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import Link from "next/link"

export default async function LoginPage() {
  const session = await auth() // Get user session

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link className="flex font-semibold gap-0.5" href="/">
            <Image src="/cu-logo.png" alt="logo-image" width={25} height={25} />
            <p className="mt-0.5"> Do-code </p>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {session?.user ? (
              <div className="text-center">
                <p className="text-lg font-medium">You are already logged in.</p>
                <Link
                  href="/"
                  className=""
                >
                  <Button variant="secondary" className="mt-4"> Go to Home </Button>
                </Link>
              </div>
            ) : (
              // If not logged in, show the login form
              <LoginForm />
            )}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

