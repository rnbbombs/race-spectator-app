"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RaceCard } from "@/components/race-card"
import { Users, Search, Plus, ChevronRight } from "lucide-react"
import { CheerLoopLogo } from "@/components/cheerloop-logo"

export default function HomePage() {
  const router = useRouter()
  const [userGroups, setUserGroups] = useState([
    {
      id: "1",
      name: "Team Marathon Support",
      memberCount: 5,
      raceName: "Boston Marathon",
      raceDate: "April 21, 2025",
    },
    {
      id: "2",
      name: "NYC Runners Crew",
      memberCount: 8,
      raceName: "New York Marathon",
      raceDate: "November 2, 2025",
    },
    {
      id: "3",
      name: "Chicago Supporters",
      memberCount: 3,
      raceName: "Chicago Half Marathon",
      raceDate: "May 15, 2025",
    },
  ])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)

    const isSmartwatch = window.innerWidth <= 250
    if (isSmartwatch) {
      router.push("/watch")
      return
    }

    const onboardingComplete = localStorage.getItem("onboarding_complete")
    if (!onboardingComplete) {
      router.push("/onboarding")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle gradient accent at top */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
      
      <div className="max-w-2xl mx-auto p-4 space-y-6 relative z-10">
        {/* Header */}
        <div className="pt-4 flex items-center gap-4">
          <div className="p-2 rounded-xl bg-card shadow-sm">
            <CheerLoopLogo size={44} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Welcome back, Uri</h1>
            <p className="text-muted-foreground">Ready to support your runners?</p>
          </div>
        </div>

        {userGroups.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-foreground">
                {userGroups.length === 1 ? "Your Group" : "Your Groups"}
              </h2>
              {userGroups.length > 2 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="font-semibold"
                  onClick={() => router.push("/groups")}
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {userGroups.map((group) => (
                <Card
                  key={group.id}
                  className="p-4 bg-primary text-primary-foreground min-w-[280px] flex-shrink-0 cursor-pointer hover:brightness-110 hover:shadow-lg transition-all"
                  onClick={() => router.push(`/group/${group.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-5 h-5" />
                        <h3 className="font-semibold text-lg">{group.name}</h3>
                      </div>
                      <p className="text-sm opacity-90">
                        {group.memberCount} members
                      </p>
                      <p className="text-xs opacity-75 mt-1">{group.raceDate}</p>
                    </div>
                    <Badge className="bg-white/20 text-primary-foreground border-0 font-medium">
                      {group.raceName.includes("Marathon") ? "Marathon" : group.raceName.includes("Half") ? "Half" : "Race"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/group/${group.id}`)
                      }}
                    >
                      View Group
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/chat/${group.id}`)
                      }}
                    >
                      Chat
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Races */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Races</h2>
          <div className="space-y-3">
            <RaceCard
              name="Boston Marathon"
              distance="26.2 mi"
              location="Boston, MA"
              date="April 21, 2025"
              startTime="9:00 AM"
              onClick={() => router.push("/race/1")}
            />
            <RaceCard
              name="Chicago Half Marathon"
              distance="13.1 mi"
              location="Chicago, IL"
              date="May 15, 2025"
              startTime="7:30 AM"
              onClick={() => router.push("/race/2")}
            />
            <RaceCard
              name="New York Marathon"
              distance="26.2 mi"
              location="New York, NY"
              date="November 2, 2025"
              startTime="8:00 AM"
              onClick={() => router.push("/race/3")}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          <Button
            variant="outline"
            className="h-auto py-4 flex-col gap-2 bg-transparent"
            onClick={() => router.push("/search")}
          >
            <Search className="w-5 h-5" />
            <span className="text-sm font-medium">Search Races</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex-col gap-2 bg-transparent"
            onClick={() => router.push("/create-group")}
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Create Group</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
