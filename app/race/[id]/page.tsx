"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  Map,
  MessageCircle,
  Bell,
  Cloud,
  Car,
  Info,
  Navigation,
} from "lucide-react"

const raceDatabase = {
  "1": {
    id: "1",
    name: "Boston Marathon",
    distance: "26.2 mi",
    location: "Boston, MA",
    date: "April 21, 2025",
    startTime: "9:00 AM",
    description: "The world's oldest annual marathon and one of the most prestigious road racing events.",
    weather: { temp: "52°F", condition: "Partly Cloudy", icon: "cloud" },
    startLocation: "Hopkinton, MA",
    finishLocation: "Copley Square, Boston",
    elevation: "+459 ft / -840 ft",
    participants: "30,000 runners",
    parking: "Limited street parking. Public transit recommended (MBTA Green Line).",
    courseHighlights: ["Wellesley Scream Tunnel", "Heartbreak Hill", "Citgo Sign"],
  },
  "2": {
    id: "2",
    name: "Chicago Half Marathon",
    distance: "13.1 mi",
    location: "Chicago, IL",
    date: "May 15, 2025",
    startTime: "7:30 AM",
    description: "A fast, flat course through Chicago's iconic lakefront and neighborhoods.",
    weather: { temp: "58°F", condition: "Sunny", icon: "sun" },
    startLocation: "Grant Park",
    finishLocation: "Grant Park",
    elevation: "+98 ft / -102 ft",
    participants: "15,000 runners",
    parking: "Millennium Park Garage, Grant Park North Garage. $25 event parking.",
    courseHighlights: ["Lake Shore Drive", "Museum Campus", "Soldier Field"],
  },
  "3": {
    id: "3",
    name: "New York Marathon",
    distance: "26.2 mi",
    location: "New York, NY",
    date: "November 2, 2025",
    startTime: "8:00 AM",
    description: "The largest marathon in the world, running through all five boroughs of NYC.",
    weather: { temp: "48°F", condition: "Clear", icon: "sun" },
    startLocation: "Staten Island (Verrazano Bridge)",
    finishLocation: "Central Park",
    elevation: "+878 ft / -874 ft",
    participants: "50,000 runners",
    parking: "No parking at start. Spectators use subway (multiple lines to Central Park).",
    courseHighlights: ["Verrazano Bridge", "Brooklyn", "Queensboro Bridge", "First Avenue", "Central Park"],
  },
}

export default function RaceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const race = raceDatabase[params.id as string] || raceDatabase["1"]

  const runners = [
    {
      id: 1,
      name: "Sarah Johnson",
      bib: "12345",
      status: "Mile 15",
      pace: "8:30/mi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Mike Chen",
      bib: "12346",
      status: "Mile 13",
      pace: "9:15/mi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Emma Davis",
      bib: "12347",
      status: "Mile 16",
      pace: "8:45/mi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const spectatorLocations = [
    { id: 1, name: "Mile 10 - Wellesley", members: 3, time: "10:30 AM" },
    { id: 2, name: "Mile 20 - Heartbreak Hill", members: 5, time: "12:00 PM" },
    { id: 3, name: "Finish Line", members: 8, time: "1:30 PM" },
  ]

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
              <h1 className="text-xl font-bold text-foreground">{race.name}</h1>
              <p className="text-sm text-muted-foreground">{race.location}</p>
            </div>
            <Button
              variant={notificationsEnabled ? "default" : "outline"}
              size="icon"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            >
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Race Info Card */}
          <Card className="p-4 bg-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">{race.name}</h2>
                <Badge className="bg-primary text-primary-foreground">{race.distance}</Badge>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{race.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{race.startTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{race.location}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{race.description}</p>
          </Card>

          {/* Weather & Course Info */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm text-foreground">Weather</h3>
              </div>
              <p className="text-lg font-bold text-foreground">{race.weather.temp}</p>
              <p className="text-xs text-muted-foreground">{race.weather.condition}</p>
            </Card>

            <Card className="p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm text-foreground">Participants</h3>
              </div>
              <p className="text-lg font-bold text-foreground">{race.participants.split(" ")[0]}</p>
              <p className="text-xs text-muted-foreground">runners</p>
            </Card>
          </div>

          {/* Course Details */}
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-2 mb-3">
              <Navigation className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Course Details</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start:</span>
                <span className="text-foreground font-medium">{race.startLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Finish:</span>
                <span className="text-foreground font-medium">{race.finishLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Elevation:</span>
                <span className="text-foreground font-medium">{race.elevation}</span>
              </div>
            </div>
          </Card>

          {/* Course Highlights */}
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Course Highlights</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {race.courseHighlights.map((highlight, index) => (
                <Badge key={index} variant="secondary" className="bg-muted text-foreground">
                  {highlight}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Parking Info */}
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Parking & Transit</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{race.parking}</p>
          </Card>

          {/* Runners Tracking */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Runners ({runners.length})</h2>
            <div className="space-y-3">
              {runners.map((runner) => (
                <Card key={runner.id} className="p-4 bg-card">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={runner.avatar || "/placeholder.svg"} alt={runner.name} />
                      <AvatarFallback>
                        {runner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{runner.name}</h3>
                      <p className="text-sm text-muted-foreground">Bib #{runner.bib}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{runner.status}</p>
                      <p className="text-xs text-muted-foreground">{runner.pace}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Spectator Locations */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Spectator Locations</h2>
            <div className="space-y-3">
              {spectatorLocations.map((location) => (
                <Card key={location.id} className="p-4 bg-card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{location.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{location.members} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{location.time}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 pb-6">
            <Button className="h-auto py-4 flex-col gap-2" onClick={() => router.push(`/map/${race.id}`)}>
              <Map className="w-5 h-5" />
              <span className="text-sm font-medium">View Map</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
              onClick={() => router.push("/chat/1")}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Group Chat</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
