"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Navigation, MapPin, Users, Layers, Locate } from "lucide-react"

interface Runner {
  id: number
  name: string
  bib: string
  currentMile: number
  pace: string
  avatar: string
  lat: number
  lng: number
}

interface SpectatorPoint {
  id: number
  name: string
  mile: number
  time: string
  members: string[]
  lat: number
  lng: number
}

export default function MapNavigationPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedRunner, setSelectedRunner] = useState<number | null>(null)
  const [showSpectators, setShowSpectators] = useState(true)
  const [showRunners, setShowRunners] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Mock data
  const runners: Runner[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      bib: "12345",
      currentMile: 15,
      pace: "8:30/mi",
      avatar: "/placeholder.svg?height=40&width=40",
      lat: 42.3398,
      lng: -71.1469,
    },
    {
      id: 2,
      name: "Mike Chen",
      bib: "12346",
      currentMile: 13,
      pace: "9:15/mi",
      avatar: "/placeholder.svg?height=40&width=40",
      lat: 42.3301,
      lng: -71.1656,
    },
    {
      id: 3,
      name: "Emma Davis",
      bib: "12347",
      currentMile: 16,
      pace: "8:45/mi",
      avatar: "/placeholder.svg?height=40&width=40",
      lat: 42.3451,
      lng: -71.1401,
    },
  ]

  const spectatorPoints: SpectatorPoint[] = [
    {
      id: 1,
      name: "Mile 10 - Wellesley",
      mile: 10,
      time: "10:30 AM",
      members: ["Alex", "Sarah"],
      lat: 42.2968,
      lng: -71.2874,
    },
    {
      id: 2,
      name: "Mile 20 - Heartbreak Hill",
      mile: 20,
      time: "12:00 PM",
      members: ["Mike", "Emma", "James"],
      lat: 42.3398,
      lng: -71.1469,
    },
    { id: 3, name: "Finish Line", mile: 26.2, time: "1:30 PM", members: ["All Members"], lat: 42.3519, lng: -71.0552 },
  ]

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-4 safe-area-header">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Race Map</h1>
            <p className="text-xs text-muted-foreground">Boston Marathon</p>
          </div>
          <Button variant="ghost" size="icon">
            <Locate className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Placeholder Map */}
        <div className="absolute inset-0 bg-muted">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">Interactive map would display here</p>
              <p className="text-xs text-muted-foreground">Showing race route, runners, and spectator points</p>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            variant={showRunners ? "default" : "outline"}
            size="icon"
            className="bg-background shadow-lg"
            onClick={() => setShowRunners(!showRunners)}
          >
            <Navigation className="w-5 h-5" />
          </Button>
          <Button
            variant={showSpectators ? "default" : "outline"}
            size="icon"
            className="bg-background shadow-lg"
            onClick={() => setShowSpectators(!showSpectators)}
          >
            <Users className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="bg-background shadow-lg">
            <Layers className="w-5 h-5" />
          </Button>
        </div>

        {/* Bottom Sheet - Runners */}
        <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-xl shadow-lg max-h-[40vh] overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Active Runners</h2>
              <Badge variant="secondary">{runners.length} tracking</Badge>
            </div>

            <div className="space-y-2 max-h-[25vh] overflow-y-auto">
              {runners.map((runner) => (
                <Card
                  key={runner.id}
                  className={`p-3 cursor-pointer transition-all ${
                    selectedRunner === runner.id ? "bg-primary text-primary-foreground" : "bg-card"
                  }`}
                  onClick={() => setSelectedRunner(selectedRunner === runner.id ? null : runner.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={runner.avatar || "/placeholder.svg"} alt={runner.name} />
                      <AvatarFallback>
                        {runner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${selectedRunner === runner.id ? "text-primary-foreground" : "text-foreground"}`}
                      >
                        {runner.name}
                      </h3>
                      <p
                        className={`text-sm ${selectedRunner === runner.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                      >
                        Bib #{runner.bib}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${selectedRunner === runner.id ? "text-primary-foreground" : "text-primary"}`}
                      >
                        Mile {runner.currentMile}
                      </p>
                      <p
                        className={`text-xs ${selectedRunner === runner.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                      >
                        {runner.pace}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Spectator Points Section */}
          <div className="border-t border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Spectator Points</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {spectatorPoints.map((point) => (
                <Card key={point.id} className="p-3 min-w-[200px] bg-card">
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-foreground">{point.name}</h4>
                      <p className="text-xs text-muted-foreground">{point.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{point.members.length} members</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
