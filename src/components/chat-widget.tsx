"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";
import { Bot, Paperclip, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "./ui/scroll-area";





export default function ChatWidget() {

  const [session, setSession] = useState(null);

  const [isOpen, setIsOpen] = useState(false); // State to toggle chat widget visibility
  const { messages, input, handleInputChange, handleSubmit } = useChat(); // Chat hook for handling messages and input

  const suggestions = ["What should be the apprach to solve this problem ? ", "what am i doing wrong in code ? "]; // Predefined suggestions for quick input

  return (
    <>
      {/* Chat Button with Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(true)}
              className="fixed bottom-4 right-12 h-12 w-12 rounded-full shadow-lg border-4 border-red-400 "
            >
              <Bot className="h-8 w-8" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Assistance</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Chat Modal - Displays when isOpen is true */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)]">
          <Card className="relative">
            {/* Close Button */}
            <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>

            {/* User Avatar and Header */}
            <CardHeader className="flex items-center space-y-3 pt-8">
              <Avatar className="h-12 w-12 bg-primary/10">
                <AvatarImage src={"/user"} alt="User Avatar" />
                <AvatarFallback>{"C"}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{"How can I help you today?"}</h2>
            </CardHeader>

            <CardContent>
              {/* Scrollable Chat Area */}
              <ScrollArea className="h-[300px] pr-4">
                {messages.length === 0 ? (
                  // Show predefined suggestions when there are no messages
                  <div className="grid grid-cols-2 gap-2">
                    {suggestions.map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        className="h-auto whitespace-normal p-4 text-center"
                        onClick={() => {
                          handleInputChange({
                            target: { value: suggestion },
                          } as React.ChangeEvent<HTMLInputElement>);
                          handleSubmit(new Event("submit") as unknown as React.FormEvent<HTMLFormElement>);
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                ) : (
                  // Display chat messages
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`rounded-lg px-3 py-2 max-w-[80%] ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Message Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                className="mt-4 flex items-center space-x-2"
              >

                {/* Text Input */}
                <Input value={input} onChange={handleInputChange} placeholder="Write a message..." className="flex-1" />
                {/* Send Button */}
                <Button type="submit" size="icon" className="shrink-0">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
