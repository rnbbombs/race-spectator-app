"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Search } from "lucide-react"

export default function CreateGroupPage() {
  const router = useRouter()
  const [groupName, setGroupName] = useState("")
  const [selectedRace, setSelectedRace] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [inviteEmails, setInviteEmails] = useState("")

  // Mock race data
  const races = [
    { id: "1", name: "Boston Marathon", date: "April 21, 2025", location: "Boston, MA" },
    { id: "2", name: "Chicago Half Marathon", date: "May 15, 2025", location: "Chicago, IL" },
    { id: "3", name: "New York Marathon", date: "November 2, 2025", location: "New York, NY" },
    { id: "4", name: "San Francisco 10K", date: "June 20, 2025", location: "San Francisco, CA" },
  ]

  const filteredRaces = races.filter(
    (race) =>
      race.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      race.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateGroup = () => {
    if (groupName && selectedRace) {
      // In a real app, this would create the group via API
      console.log("[v0] Creating group:", { groupName, selectedRace, inviteEmails })
      router.push(`/group/${selectedRace}`)
    }
  }

  const isFormValid = groupName.trim() && selectedRace

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4 safe-area-header">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Create Support Group</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Group Name */}
          <Card className="p-4 bg-card">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Users className="w-5 h-5" />
                <h2 className="font-semibold text-foreground">Group Details</h2>
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g., Team Marathon Support"
                />
                <p className="text-xs text-muted-foreground">
                  Choose a name that helps your group members identify the team
                </p>
              </div>
            </div>
          </Card>

          {/* Select Race */}
          <Card className="p-4 bg-card">
            <div className="space-y-3">
              <h2 className="font-semibold text-foreground">Select Race</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search races..."
                  className="pl-9"
                />
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredRaces.map((race) => (
                  <Card
                    key={race.id}
                    className={`p-3 cursor-pointer transition-colors ${
                      selectedRace === race.id ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
                    }`}
                    onClick={() => setSelectedRace(race.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{race.name}</h3>
                        <p className={`text-xs ${selectedRace === race.id ? "opacity-90" : "text-muted-foreground"}`}>
                          {race.date} • {race.location}
                        </p>
                      </div>
                      {selectedRace === race.id && (
                        <Badge variant="secondary" className="text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>

          {/* Invite Members (Optional) */}
          <Card className="p-4 bg-card">
            <div className="space-y-3">
              <div>
                <h2 className="font-semibold text-foreground mb-1">Invite Members (Optional)</h2>
                <p className="text-xs text-muted-foreground">You can also invite members later</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inviteEmails">Email Addresses</Label>
                <Input
                  id="inviteEmails"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  placeholder="email1@example.com, email2@example.com"
                />
                <p className="text-xs text-muted-foreground">Separate multiple emails with commas</p>
              </div>
            </div>
          </Card>

          {/* Create Button */}
          <div className="pb-6">
            <Button className="w-full h-12 text-base font-semibold" disabled={!isFormValid} onClick={handleCreateGroup}>
              Create Group
            </Button>
            {!isFormValid && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Please enter a group name and select a race
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
