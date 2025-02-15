"use client";
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, BookOpen, Users, CheckCircle, MessageSquare, Trophy, MessageCircle } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin } from "lucide-react"
import { MarqueeDemo } from "@/components/demo/marque-demo";

export default function Home() {
  return (

    <div className="min-h-screen  max-w[1300px] mx-auto">
      <div className="mx-auto mt-12">
        <HeroSection />
      </div>
      <main className="max-w-[1300px] -mt-10 mx-auto">
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose CU-do code ?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Code className="h-10 w-10 text-red-500" />}
                title="All-in-One Solution"
                description="A comprehensive platform for all your coding needs, from learning to practicing and beyond."
              />
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-red-500" />}
                title="Practice Coding"
                description="Sharpen your skills with our vast library of coding questions and real-world scenarios."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-red-500" />}
                title="Community Driven"
                description="Connect with fellow coders, share knowledge, and grow together in our vibrant community."
              />
            </div>
          </div>
        </section>

        <section id="ai-assistant" className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-red-50 via-red-50  to-red-100 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center">

            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Coding Assistant</h2>
              <p className="text-gray-600 mb-6">
                Get instant help with your coding queries. Our AI chatbot is available 24/7 to assist you with
                explanations, debugging, and best practices.
              </p>
              <Link href="#" className="flex">
                <Button className="ring-4 ring-red-400 bg-primary/80" >
                  Try Coding Assistant
                  <MessageSquare className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/chatbot.png"
                alt="AI Coding Assistant"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>
        <MarqueeDemo />
        <section id="contests" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Coding Contests</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
                <Trophy className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weekly Challenges</h3>
                <p className="text-gray-600 mb-4">
                  Participate in our weekly coding challenges to test your skills and compete with others.
                </p>
                <Link href="#" className="text-blue-500 hover:underline">
                  View Upcoming Contests
                </Link>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow-sm">
                <Users className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Leaderboards</h3>
                <p className="text-gray-600 mb-4">
                  Climb the ranks and showcase your coding prowess on our global leaderboards.
                </p>
                <Link href="#" className="text-blue-500 hover:underline">
                  Check Leaderboards
                </Link>
              </div>
            </div>
          </div>
        </section>




      </main>

      <footer className="bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 max-h-[400px] mt-20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Cu-do Code</h3>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">
                {/*   varun contact us */}
              </h4>
              <ul className="space-y-2">
                {/* varun  contact us */}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Contact</h4>
              <p className="text-sm">cudo-code@gmail.com</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Meet the Team</h4>
              <div className=" flex space-x-4">
                <Link href="https://x.com/varunbhardwajj" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="https://www.linkedin.com/in/-varunbhardwaj" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin size={20} />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} cudo-code. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div >
  )
}

//@ts-ignore
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

//@ts-ignore
function TestimonialCard({ quote, author, role }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
        <p className="text-sm font-medium text-gray-500">Verified User</p>
      </div>
      <p className="text-gray-800 mb-4">{quote}</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  )
}

