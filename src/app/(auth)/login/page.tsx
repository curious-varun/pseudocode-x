import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Link href='/'>
        <h1 className="text-5xl font-semibold m-10 bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 via-cyan-400 to-blue-500"> login  Page </h1>
      </Link>
    </div>
  )
}
