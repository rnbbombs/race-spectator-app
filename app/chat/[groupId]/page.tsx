"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Send, MapPin, ImageIcon, Smile } from "lucide-react"

interface Message {
  id: number
  senderId: number
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  type: "text" | "location" | "system"
  isCurrentUser?: boolean
}

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const groupName = "Team Marathon Support"

  // Mock messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: 0,
      senderName: "System",
      senderAvatar: "",
      content: "Alex Rivera created the group",
      timestamp: "Yesterday",
      type: "system",
    },
    {
      id: 2,
      senderId: 2,
      senderName: "Sarah Johnson",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      content: "Hey everyone! Excited for race day!",
      timestamp: "9:30 AM",
      type: "text",
    },
    {
      id: 3,
      senderId: 3,
      senderName: "Mike Chen",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      content: "I'll be at Mile 10 around 10:30. Who else is coming?",
      timestamp: "9:45 AM",
      type: "text",
    },
    {
      id: 4,
      senderId: 1,
      senderName: "You",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      content: "I'll be there! Let's meet at the Wellesley sign.",
      timestamp: "9:50 AM",
      type: "text",
      isCurrentUser: true,
    },
    {
      id: 5,
      senderId: 4,
      senderName: "Emma Davis",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      content: "I'm heading to Heartbreak Hill. Anyone want to join?",
      timestamp: "10:00 AM",
      type: "text",
    },
    {
      id: 6,
      senderId: 4,
      senderName: "Emma Davis",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      content: "📍 Heartbreak Hill, Newton, MA",
      timestamp: "10:01 AM",
      type: "location",
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        senderId: 1,
        senderName: "You",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
        isCurrentUser: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-4 safe-area-header">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">{groupName}</h1>
            <p className="text-xs text-muted-foreground">5 members</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4 space-y-4">
          {messages.map((msg) => {
            if (msg.type === "system") {
              return (
                <div key={msg.id} className="flex justify-center">
                  <p className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">{msg.content}</p>
                </div>
              )
            }

            if (msg.isCurrentUser) {
              return (
                <div key={msg.id} className="flex justify-end gap-2">
                  <div className="max-w-[75%]">
                    <Card className="p-3 bg-primary text-primary-foreground">
                      {msg.type === "location" ? (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{msg.content}</span>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      )}
                    </Card>
                    <p className="text-xs text-muted-foreground mt-1 text-right">{msg.timestamp}</p>
                  </div>
                </div>
              )
            }

            return (
              <div key={msg.id} className="flex gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.senderAvatar || "/placeholder.svg"} alt={msg.senderName} />
                  <AvatarFallback>
                    {msg.senderName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-[75%]">
                  <p className="text-xs font-medium text-foreground mb-1">{msg.senderName}</p>
                  <Card className="p-3 bg-card">
                    {msg.type === "location" ? (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">{msg.content}</span>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground leading-relaxed">{msg.content}</p>
                    )}
                  </Card>
                  <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="shrink-0">
              <MapPin className="w-5 h-5" />
            </Button>
            <div className="flex-1 flex items-end gap-2 bg-muted rounded-lg p-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button variant="ghost" size="icon" className="shrink-0">
                <Smile className="w-5 h-5" />
              </Button>
            </div>
            <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()} className="shrink-0">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
