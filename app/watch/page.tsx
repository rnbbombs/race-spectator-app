"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Users, MessageCircle, Navigation, Activity } from "lucide-react"

export default function WatchPage() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<"overview" | "runner" | "meetup" | "group">("overview")

  // Mock data - in production this would come from real-time API
  const runnerData = {
    name: "Sarah Johnson",
    currentMile: 18.3,
    pace: "8:45 /mi",
    estimatedFinish: "3:42:15",
    nextCheckpoint: "Mile 20",
  }

  const nextMeetup = {
    location: "Heartbreak Hill",
    mile: 20,
    distance: "0.3 mi away",
    time: "12 min",
    members: 5,
  }

  const groupStatus = {
    name: "Team Marathon",
    unreadMessages: 3,
    membersAtLocation: 4,
  }

  if (currentView === "runner") {
    return (
      <div className="min-h-screen bg-background p-2 flex flex-col">
        <button onClick={() => setCurrentView("overview")} className="text-xs text-muted-foreground mb-2 text-left">
          ← Back
        </button>

        <Card className="flex-1 p-3 flex flex-col justify-center items-center text-center space-y-2">
          <Activity className="w-8 h-8 text-accent mb-1" />
          <h2 className="font-bold text-lg">{runnerData.name}</h2>

          <div className="w-full space-y-2 mt-2">
            <div className="bg-muted rounded-lg p-2">
              <div className="text-2xl font-bold text-primary">Mile {runnerData.currentMile}</div>
              <div className="text-xs text-muted-foreground">Current Position</div>
            </div>

            <div className="bg-muted rounded-lg p-2">
              <div className="text-lg font-semibold">{runnerData.pace}</div>
              <div className="text-xs text-muted-foreground">Pace</div>
            </div>

            <div className="bg-muted rounded-lg p-2">
              <div className="text-lg font-semibold">{runnerData.estimatedFinish}</div>
              <div className="text-xs text-muted-foreground">Est. Finish</div>
            </div>
          </div>

          <Button className="w-full mt-3" size="lg" onClick={() => setCurrentView("meetup")}>
            View Next Meetup
          </Button>
        </Card>
      </div>
    )
  }

  if (currentView === "meetup") {
    return (
      <div className="min-h-screen bg-background p-2 flex flex-col">
        <button onClick={() => setCurrentView("overview")} className="text-xs text-muted-foreground mb-2 text-left">
          ← Back
        </button>

        <Card className="flex-1 p-3 flex flex-col justify-center space-y-3">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
            <h2 className="font-bold text-lg">{nextMeetup.location}</h2>
            <p className="text-xs text-muted-foreground">Mile {nextMeetup.mile}</p>
          </div>

          <div className="space-y-2">
            <div className="bg-muted rounded-lg p-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Distance</span>
              <span className="font-semibold">{nextMeetup.distance}</span>
            </div>

            <div className="bg-muted rounded-lg p-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Time to reach</span>
              <span className="font-semibold">{nextMeetup.time}</span>
            </div>

            <div className="bg-muted rounded-lg p-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Group members</span>
              <span className="font-semibold">{nextMeetup.members} there</span>
            </div>
          </div>

          <Button className="w-full mt-2" size="lg">
            <Navigation className="w-4 h-4 mr-2" />
            Navigate
          </Button>
        </Card>
      </div>
    )
  }

  if (currentView === "group") {
    return (
      <div className="min-h-screen bg-background p-2 flex flex-col">
        <button onClick={() => setCurrentView("overview")} className="text-xs text-muted-foreground mb-2 text-left">
          ← Back
        </button>

        <Card className="flex-1 p-3 flex flex-col justify-center space-y-3">
          <div className="text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <h2 className="font-bold text-lg">{groupStatus.name}</h2>
          </div>

          <div className="space-y-2">
            <Button className="w-full bg-transparent" variant="outline" size="lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              Messages
              {groupStatus.unreadMessages > 0 && (
                <span className="ml-auto bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-xs">
                  {groupStatus.unreadMessages}
                </span>
              )}
            </Button>

            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{groupStatus.membersAtLocation}</div>
              <div className="text-xs text-muted-foreground">Members at next meetup</div>
            </div>
          </div>

          <Button className="w-full mt-2" size="lg" onClick={() => setCurrentView("meetup")}>
            View Meetup Details
          </Button>
        </Card>
      </div>
    )
  }

  // Overview screen - main smartwatch home
  return (
    <div className="min-h-screen bg-background p-2 flex flex-col justify-center">
      <div className="text-center mb-3">
        <h1 className="font-bold text-xl">CheerLoop</h1>
        <p className="text-xs text-muted-foreground">Race Day</p>
      </div>

      <div className="space-y-2">
        <Card
          className="p-4 cursor-pointer active:scale-95 transition-transform bg-primary text-primary-foreground"
          onClick={() => setCurrentView("runner")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold text-sm">Track Runner</div>
                <div className="text-xs opacity-90">Mile {runnerData.currentMile}</div>
              </div>
            </div>
            <div className="text-xl font-bold">{runnerData.pace}</div>
          </div>
        </Card>

        <Card
          className="p-4 cursor-pointer active:scale-95 transition-transform"
          onClick={() => setCurrentView("meetup")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold text-sm">Next Meetup</div>
                <div className="text-xs text-muted-foreground">{nextMeetup.location}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-primary">{nextMeetup.time}</div>
              <div className="text-xs text-muted-foreground">{nextMeetup.distance}</div>
            </div>
          </div>
        </Card>

        <Card
          className="p-4 cursor-pointer active:scale-95 transition-transform"
          onClick={() => setCurrentView("group")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold text-sm">{groupStatus.name}</div>
                <div className="text-xs text-muted-foreground">{groupStatus.membersAtLocation} at meetup</div>
              </div>
            </div>
            {groupStatus.unreadMessages > 0 && (
              <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {groupStatus.unreadMessages}
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-4 text-center">
        <button className="text-xs text-muted-foreground" onClick={() => router.push("/")}>
          Open Full App →
        </button>
      </div>
    </div>
  )
}
