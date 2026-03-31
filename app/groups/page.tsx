"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, MessageCircle, MapPin } from "lucide-react"

export default function AllGroupsPage() {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const userGroups = [
    {
      id: "1",
      name: "Team Marathon Support",
      memberCount: 5,
      raceName: "Boston Marathon",
      raceDate: "April 21, 2025",
      raceLocation: "Boston, MA",
      isActive: true,
    },
    {
      id: "2",
      name: "NYC Runners Crew",
      memberCount: 8,
      raceName: "New York Marathon",
      raceDate: "November 2, 2025",
      raceLocation: "New York, NY",
      isActive: true,
    },
    {
      id: "3",
      name: "Chicago Supporters",
      memberCount: 3,
      raceName: "Chicago Half Marathon",
      raceDate: "May 15, 2025",
      raceLocation: "Chicago, IL",
      isActive: true,
    },
    {
      id: "4",
      name: "LA 10K Squad",
      memberCount: 4,
      raceName: "Los Angeles 10K",
      raceDate: "March 10, 2025",
      raceLocation: "Los Angeles, CA",
      isActive: false,
    },
    {
      id: "5",
      name: "After Dark Crew",
      memberCount: 6,
      raceName: "Nike After Dark Tour",
      raceDate: "June 14, 2025",
      raceLocation: "Los Angeles, CA",
      isActive: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border z-10 px-4 py-3 safe-area-header">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Race Groups</h1>
              <p className="text-sm text-muted-foreground">{userGroups.length} total groups</p>
            </div>
          </div>
        </div>

        {/* Groups List */}
        <div className="p-4 space-y-4">
          {/* Active Groups */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Active Groups</h2>
            <div className="space-y-3">
              {userGroups
                .filter((group) => group.isActive)
                .map((group) => (
                  <Card
                    key={group.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => router.push(`/group/${group.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-lg text-foreground">{group.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{group.memberCount} members</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="secondary" className="font-medium">
                            {group.raceName}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{group.raceDate}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {group.raceLocation}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
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
                        className="flex-1 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/chat/${group.id}`)
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Past Groups */}
          {userGroups.filter((group) => !group.isActive).length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Past Groups</h2>
              <div className="space-y-3">
                {userGroups
                  .filter((group) => !group.isActive)
                  .map((group) => (
                    <Card
                      key={group.id}
                      className="p-4 cursor-pointer hover:shadow-md transition-shadow opacity-75"
                      onClick={() => router.push(`/group/${group.id}`)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-5 h-5 text-muted-foreground" />
                            <h3 className="font-semibold text-lg text-foreground">{group.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{group.memberCount} members</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline" className="font-medium">
                              {group.raceName}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{group.raceDate}</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {group.raceLocation}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/group/${group.id}`)
                        }}
                      >
                        View Details
                      </Button>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
