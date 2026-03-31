"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MapPin, Navigation, Users, Zap, Clock, TrendingUp, RefreshCw } from "lucide-react"

interface MemberLocation {
  id: number
  name: string
  avatar: string
  lat: number
  lng: number
  lastUpdated: string
  distanceToSuggested: string
  timeToSuggested: string
}

interface Runner {
  name: string
  currentMile: number
  pace: string
  estimatedArrival: string
  lat: number
  lng: number
}

interface SuggestedSpot {
  name: string
  description: string
  lat: number
  lng: number
  mile: number
  estimatedRunnerArrival: string
  reasoning: string[]
  alternativeSpots: Array<{
    name: string
    mile: number
    reason: string
  }>
}

export default function FindFriendsPage() {
  const params = useParams()
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Mock data - in real app, this would come from real-time location services
  const members: MemberLocation[] = [
    {
      id: 1,
      name: "Alex Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      lat: 42.3398,
      lng: -71.1469,
      lastUpdated: "Just now",
      distanceToSuggested: "0.8 mi",
      timeToSuggested: "12 min walk",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lat: 42.3301,
      lng: -71.1656,
      lastUpdated: "1 min ago",
      distanceToSuggested: "1.2 mi",
      timeToSuggested: "18 min walk",
    },
    {
      id: 3,
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lat: 42.3451,
      lng: -71.1401,
      lastUpdated: "Just now",
      distanceToSuggested: "0.5 mi",
      timeToSuggested: "8 min walk",
    },
    {
      id: 4,
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      lat: 42.352,
      lng: -71.155,
      lastUpdated: "2 min ago",
      distanceToSuggested: "0.9 mi",
      timeToSuggested: "14 min walk",
    },
  ]

  const runner: Runner = {
    name: "Jamie Martinez",
    currentMile: 15.2,
    pace: "8:30/mi",
    estimatedArrival: "11:45 AM",
    lat: 42.3398,
    lng: -71.1469,
  }

  const suggestedSpot: SuggestedSpot = {
    name: "Mile 20 - Heartbreak Hill",
    description: "Citgo Sign area, near Boston College",
    lat: 42.3398,
    lng: -71.1469,
    mile: 20,
    estimatedRunnerArrival: "11:45 AM",
    reasoning: [
      "Central location - average 10 min walk for all members",
      "Runner will arrive in ~40 minutes",
      "Great viewing spot with crowd energy",
      "Easy access to food and restrooms nearby",
    ],
    alternativeSpots: [
      { name: "Mile 18 - Cleveland Circle", mile: 18, reason: "Closer for Sarah & Emma (30 min earlier)" },
      { name: "Mile 22 - Chestnut Hill", mile: 22, reason: "Less crowded, better photos (15 min later)" },
    ],
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4 safe-area-header">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Find My Friends</h1>
              <p className="text-sm text-muted-foreground">Team Marathon Support</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Map Container */}
          <Card className="p-0 overflow-hidden bg-card">
            <div className="h-[300px] bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Live map showing all locations</p>
                  <p className="text-xs text-muted-foreground">{members.length} spectators + 1 runner tracked</p>
                </div>
              </div>
              {/* Map legend */}
              <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg p-2 space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-foreground">Suggested Spot</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-foreground">Your Group</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-foreground">Runner</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Suggested Meeting Spot */}
          <Card className="p-4 bg-primary text-primary-foreground">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold">Best Meeting Spot</h2>
                  <Badge variant="secondary" className="text-xs">
                    Mile {suggestedSpot.mile}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-1">{suggestedSpot.name}</h3>
                <p className="text-sm opacity-90 mb-3">{suggestedSpot.description}</p>

                <div className="flex items-center gap-4 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Runner arrives: {suggestedSpot.estimatedRunnerArrival}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{members.length} members</span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4">
                  <p className="text-xs font-semibold opacity-75">Why this spot?</p>
                  {suggestedSpot.reasoning.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <TrendingUp className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="opacity-90">{reason}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() => router.push(`/map/${params.groupId}`)}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Share Location
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Runner Status */}
          <Card className="p-4 bg-accent text-accent-foreground">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent-foreground/10 flex items-center justify-center">
                <Navigation className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{runner.name} is running</h3>
                <div className="flex items-center gap-3 text-sm">
                  <span>Mile {runner.currentMile}</span>
                  <span>•</span>
                  <span>{runner.pace} pace</span>
                  <span>•</span>
                  <span className="font-medium">ETA: {runner.estimatedArrival}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Member Locations */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Group Locations</h2>
            <div className="space-y-2">
              {members.map((member) => (
                <Card key={member.id} className="p-3 bg-card">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-xs text-muted-foreground">{member.lastUpdated}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{member.distanceToSuggested}</p>
                      <p className="text-xs text-muted-foreground">{member.timeToSuggested}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Alternative Spots */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Alternative Spots</h2>
            <div className="space-y-2">
              {suggestedSpot.alternativeSpots.map((spot, idx) => (
                <Card key={idx} className="p-3 bg-card">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{spot.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          Mile {spot.mile}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{spot.reason}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <Card className="p-4 bg-muted">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Tip:</strong> Locations update automatically every 30 seconds. Make
              sure location sharing is enabled for accurate suggestions.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
