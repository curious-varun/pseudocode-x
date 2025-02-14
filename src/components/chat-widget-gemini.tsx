"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Bot, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  // Update useChat to use our new Gemini API endpoint
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat-gemini',  // Point to our new API route
    initialMessages: []
  })

  const suggestions = [
    "What is the approach to solve this problem?",
    "What am I doing wrong in my code?"
  ]

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(true)}
              className="fixed bottom-4 right-12 h-12 w-12 rounded-full shadow-lg border-4 border-red-400"
            >
              <Bot className="h-8 w-8" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Assistance</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)]">
          <Card className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <CardHeader className="flex items-center space-y-3 pt-8">
              <Avatar className="h-12 w-12 bg-primary/10">
                <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">How can I help you today?</h2>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {messages.length === 0 ? (
                  <> np messages </>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                      >
                        <div
                          className={`rounded-lg px-3 py-2 max-w-[80%] ${message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                            }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Write a message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" className="shrink-0">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
