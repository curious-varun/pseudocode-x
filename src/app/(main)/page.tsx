"use client";
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, BookOpen, Users, CheckCircle, MessageSquare, Trophy, MessageCircle } from "lucide-react"
import { HeroSection } from "@/components/hero-section"

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
                icon={<Code className="h-10 w-10 text-blue-500" />}
                title="All-in-One Solution"
                description="A comprehensive platform for all your coding needs, from learning to practicing and beyond."
              />
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-blue-500" />}
                title="Practice Coding"
                description="Sharpen your skills with our vast library of coding questions and real-world scenarios."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-blue-500" />}
                title="Community Driven"
                description="Connect with fellow coders, share knowledge, and grow together in our vibrant community."
              />
            </div>
          </div>
        </section>

        <section id="ai-assistant" className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Coding Assistant</h2>
              <p className="text-gray-600 mb-6">
                Get instant help with your coding queries. Our AI chatbot is available 24/7 to assist you with
                explanations, debugging, and best practices.
              </p>
              <Link
                href="#"
                className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Try AI Assistant
                <MessageSquare className="ml-2 h-5 w-5" />
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

        <section id="discussions" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Community Discussions</h2>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <MessageCircle className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Engage in Meaningful Conversations</h3>
                <p className="text-gray-600">
                  Share your knowledge, ask questions, and learn from peers in our active community forums.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2">Latest Discussions</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-500 hover:underline">
                      Best practices for React hooks
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-500 hover:underline">
                      Optimizing database queries in Django
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-500 hover:underline">
                      Getting started with machine learning
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">#javascript</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">#python</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">#webdev</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">#algorithms</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="#" className="inline-flex items-center text-blue-500 hover:underline">
                Explore All Discussions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard
                quote="CodeMaster has been a game-changer for my coding journey. The practice questions, AI assistant, and community support are unmatched!"
                author="Sarah L."
                role="Full Stack Developer"
              />
              <TestimonialCard
                quote="I've tried many coding platforms, but CodeMaster stands out with its comprehensive approach, exciting contests, and user-friendly interface."
                author="Michael R."
                role="Software Engineer"
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="bg-blue-600 text-white rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to elevate your coding skills?</h2>
            <p className="text-xl mb-8">
              Join thousands of developers who have transformed their careers with CodeMaster.
            </p>
            <Link
              href="#"
              className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Coding Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CodeMaster</h3>
              <p className="text-gray-400">Empowering developers to reach new heights in their coding journey.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    AI Assistant
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contests
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CodeMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
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

