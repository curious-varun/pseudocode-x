
import { BarChart3, BookOpen, LineChart, Github, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Cudo-code</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Question Tracker
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Event Tracker
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Profile Tracker
            </Link>
          </nav>
          <Button>Login</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 space-y-8 text-center">
          <h1 className="text-4xl font-bold sm:text-6xl">Track, analyze & share</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cudo-code helps you navigate and track your coding journey to success
          </p>
          <div className="flex justify-center gap-4">
            <Button>Question Tracker</Button>
            <Button variant="outline">Profile Tracker →</Button>
          </div>
          <div className="relative h-[400px] w-full">
            <Image src="/temp-image.jpg" alt="Platform Preview" fill className="object-contain" />
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-24 space-y-16 text-center">
          <h2 className="text-3xl font-bold">Simplify Your Prep</h2>
          <p className="text-xl text-muted-foreground">
            Say goodbye to last-minute stress. Track all your questions and notes in one place for easy review and revision.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BarChart3, title: "My Workspace", description: "Tag & filter questions for easy organization" },
              { icon: BookOpen, title: "Sheet Tracker", description: "Track all coding sheets in one place" },
              { icon: LineChart, title: "Enhanced Notes", description: "Add detailed notes to questions easily" },
            ].map((feature, index) => (
              <Card key={index} className="p-6 space-y-4">
                <feature.icon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

