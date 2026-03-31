"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Users,
  MapPin,
  Calendar,
  MessageCircle,
  UserPlus,
  Settings,
  Crown,
  MoreVertical,
  CheckCircle2,
  Trophy,
  MessageSquare,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function GroupManagementPage() {
  const params = useParams()
  const router = useRouter()
  const [showInvite, setShowInvite] = useState(false)
  const [showIMessageDialog, setShowIMessageDialog] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const groupsData: Record<string, any> = {
    "1": {
      id: "1",
      name: "Team Marathon Support",
      race: "Boston Marathon",
      raceDate: "April 21, 2025",
      location: "Boston, MA",
      memberCount: 5,
      isAdmin: true,
      isPast: false,
      members: [
        {
          id: 1,
          name: "Alex Rivera",
          role: "admin",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          phone: "+1234567890",
        },
        {
          id: 2,
          name: "Sarah Johnson",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          phone: "+1234567891",
        },
        {
          id: 3,
          name: "Mike Chen",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567892",
        },
        {
          id: 4,
          name: "Emma Davis",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          phone: "+1234567893",
        },
        {
          id: 5,
          name: "James Wilson",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567894",
        },
      ],
      spectatorPoints: [
        { id: 1, name: "Mile 10 - Wellesley", time: "10:30 AM", assignedMembers: ["Sarah Johnson", "Mike Chen"] },
        {
          id: 2,
          name: "Mile 20 - Heartbreak Hill",
          time: "12:00 PM",
          assignedMembers: ["Emma Davis", "James Wilson", "Alex Rivera"],
        },
        { id: 3, name: "Finish Line", time: "1:30 PM", assignedMembers: ["All Members"] },
      ],
    },
    "2": {
      id: "2",
      name: "NYC Runners Crew",
      race: "New York Marathon",
      raceDate: "November 2, 2025",
      location: "New York, NY",
      memberCount: 8,
      isAdmin: false,
      isPast: false,
      members: [
        {
          id: 1,
          name: "Maria Garcia",
          role: "admin",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          phone: "+1234567800",
        },
        {
          id: 2,
          name: "David Kim",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          phone: "+1234567801",
        },
        {
          id: 3,
          name: "Lisa Wong",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          phone: "+1234567802",
        },
        {
          id: 4,
          name: "Tom Brady",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567803",
        },
        {
          id: 5,
          name: "Nina Patel",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          phone: "+1234567804",
        },
        {
          id: 6,
          name: "Chris Evans",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          phone: "+1234567805",
        },
        { id: 7, name: "Amy Chen", role: "member", avatar: "/placeholder.svg?height=40&width=40", status: "offline" },
        {
          id: 8,
          name: "Jake Miller",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          phone: "+1234567807",
        },
      ],
      spectatorPoints: [
        { id: 1, name: "Mile 8 - Brooklyn", time: "9:45 AM", assignedMembers: ["David Kim", "Lisa Wong", "Tom Brady"] },
        {
          id: 2,
          name: "Mile 16 - Queensboro Bridge",
          time: "11:00 AM",
          assignedMembers: ["Nina Patel", "Chris Evans"],
        },
        { id: 3, name: "Mile 24 - Central Park", time: "12:30 PM", assignedMembers: ["Amy Chen", "Jake Miller"] },
        { id: 4, name: "Finish Line", time: "1:15 PM", assignedMembers: ["All Members"] },
      ],
    },
    "3": {
      id: "3",
      name: "Chicago Supporters",
      race: "Chicago Half Marathon",
      raceDate: "May 15, 2025",
      location: "Chicago, IL",
      memberCount: 3,
      isAdmin: true,
      isPast: false,
      members: [
        {
          id: 1,
          name: "Jordan Smith",
          role: "admin",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          phone: "+1234567810",
        },
        {
          id: 2,
          name: "Taylor Brown",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          phone: "+1234567811",
        },
        {
          id: 3,
          name: "Casey Jones",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567812",
        },
      ],
      spectatorPoints: [
        { id: 1, name: "Mile 5 - Lincoln Park", time: "8:30 AM", assignedMembers: ["Jordan Smith"] },
        { id: 2, name: "Mile 10 - Navy Pier", time: "9:15 AM", assignedMembers: ["Taylor Brown", "Casey Jones"] },
        { id: 3, name: "Finish Line - Grant Park", time: "10:00 AM", assignedMembers: ["All Members"] },
      ],
    },
    "4": {
      id: "4",
      name: "LA 10K Squad",
      race: "Los Angeles 10K",
      raceDate: "March 10, 2025",
      location: "Los Angeles, CA",
      memberCount: 4,
      isAdmin: true,
      isPast: true,
      completedDate: "March 10, 2025",
      members: [
        {
          id: 1,
          name: "Sam Rodriguez",
          role: "admin",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567820",
        },
        {
          id: 2,
          name: "Jamie Lee",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567821",
        },
        {
          id: 3,
          name: "Pat Murphy",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567822",
        },
        {
          id: 4,
          name: "Morgan Taylor",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567823",
        },
      ],
      spectatorPoints: [
        { id: 1, name: "Start Line - Griffith Park", time: "7:00 AM", assignedMembers: ["Sam Rodriguez", "Jamie Lee"] },
        { id: 2, name: "Mile 3 - Los Feliz", time: "7:30 AM", assignedMembers: ["Pat Murphy", "Morgan Taylor"] },
        { id: 3, name: "Finish Line - Griffith Park", time: "8:00 AM", assignedMembers: ["All Members"] },
      ],
      recap:
        "The LA 10K Squad had an amazing morning supporting our runners through Griffith Park. Perfect weather and great energy made this a memorable race day!",
    },
    "5": {
      id: "5",
      name: "After Dark Crew",
      race: "Nike After Dark Tour",
      raceDate: "June 14, 2025",
      location: "Los Angeles, CA",
      memberCount: 6,
      isAdmin: true,
      isPast: true,
      completedDate: "June 14, 2025",
      members: [
        {
          id: 1,
          name: "Alex Rivera",
          role: "admin",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567830",
        },
        {
          id: 2,
          name: "Jordan Lee",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567831",
        },
        {
          id: 3,
          name: "Taylor Swift",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567832",
        },
        {
          id: 4,
          name: "Casey Morgan",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567833",
        },
        {
          id: 5,
          name: "Riley Parker",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567834",
        },
        {
          id: 6,
          name: "Sam Chen",
          role: "member",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "offline",
          phone: "+1234567835",
        },
      ],
      spectatorPoints: [
        { id: 1, name: "Downtown Start Line", time: "8:00 PM", assignedMembers: ["Alex Rivera", "Jordan Lee"] },
        { id: 2, name: "Hollywood Blvd Mile 3", time: "8:45 PM", assignedMembers: ["Taylor Swift", "Casey Morgan"] },
        { id: 3, name: "Sunset Strip Mile 6", time: "9:30 PM", assignedMembers: ["Riley Parker", "Sam Chen"] },
        { id: 4, name: "Finish Line - Grand Park", time: "10:15 PM", assignedMembers: ["All Members"] },
      ],
      recap:
        "The After Dark Crew successfully supported all runners through the Nike After Dark Tour in LA. Great teamwork and coordination made this night run unforgettable!",
    },
  }

  const group = groupsData[params.id as string] || groupsData["1"]
  const members = group.members
  const spectatorPoints = group.spectatorPoints

  const createIMessageGroup = () => {
    const membersWithPhones = members.filter((m: any) => m.phone)
    const phoneNumbers = membersWithPhones.map((m: any) => m.phone).join(",")
    const message = `Hey team! Let's coordinate for ${group.race} on ${group.raceDate}. Join our CheerLoop group: ${group.name}`

    const url = `sms:${phoneNumbers}&body=${encodeURIComponent(message)}`
    window.location.href = url
    setShowIMessageDialog(false)
  }

  const membersWithPhones = members.filter((m: any) => m.phone)
  const membersWithoutPhones = members.filter((m: any) => !m.phone)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div
          className="sticky top-0 z-10 bg-background border-b border-border p-4 safe-area-header"
          style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
        >
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">{group.name}</h1>
                {group.isPast && (
                  <Badge variant="secondary" className="bg-muted text-muted-foreground">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{group.memberCount} members</p>
            </div>
            {group.isAdmin && !group.isPast && (
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Group Info Card */}
          <Card
            className={`p-4 ${group.isPast ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {group.isPast ? <Trophy className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                  <h2 className="font-semibold text-lg">{group.name}</h2>
                </div>
                <div className={`space-y-1 text-sm ${group.isPast ? "opacity-80" : "opacity-90"}`}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{group.race}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{group.isPast ? `Completed on ${group.completedDate}` : group.raceDate}</span>
                  </div>
                  {group.isPast && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{group.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {!group.isPast && (
                <Button variant="secondary" size="sm" className="flex-1" onClick={() => setShowInvite(!showInvite)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Members
                </Button>
              )}
              <Button
                variant={group.isPast ? "secondary" : "outline"}
                size="sm"
                className={`flex-1 ${!group.isPast && "bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"}`}
                onClick={() => router.push(`/chat/${params.id}`)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {group.isPast ? "View Chat History" : "Group Chat"}
              </Button>
            </div>
          </Card>

          {/* Create iMessage Group Card */}
          {!group.isPast && (
            <Card className="p-4 bg-secondary/10 border-secondary">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Create iMessage Group</h3>
                  <p className="text-sm text-muted-foreground">
                    Quickly start an iMessage group chat with all {membersWithPhones.length} members who have phone
                    numbers in their profiles.
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowIMessageDialog(true)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Create iMessage Group
              </Button>
            </Card>
          )}

          {group.isPast && group.recap && (
            <Card className="p-4 bg-card border-secondary">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Trophy className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Event Recap</h3>
                  <p className="text-sm text-muted-foreground">{group.recap}</p>
                </div>
              </div>
            </Card>
          )}

          {!group.isPast && (
            <Button
              variant="outline"
              className="w-full bg-transparent"
              size="lg"
              onClick={() => router.push(`/find-friends/${params.id}`)}
            >
              <Users className="w-5 h-5 mr-2" />
              Find My Friends
              <Badge variant="secondary" className="ml-2">
                New
              </Badge>
            </Button>
          )}

          {/* Invite Section - only for active groups */}
          {showInvite && !group.isPast && (
            <Card className="p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-3">Invite Members</h3>
              <div className="flex gap-2">
                <Input placeholder="Enter email address" className="flex-1" />
                <Button>Send</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Or share this code: <span className="font-mono font-semibold text-foreground">BM2025</span>
              </p>
            </Card>
          )}

          {/* Members List */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Members ({members.length})</h2>
            <div className="space-y-2">
              {members.map((member) => (
                <Card key={member.id} className="p-3 bg-card">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {member.status === "online" && !group.isPast && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{member.name}</h3>
                        {member.role === "admin" && <Crown className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">{member.role}</p>
                    </div>
                    {group.isAdmin && member.role !== "admin" && !group.isPast && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Make Admin</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Spectator Points */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">
                {group.isPast ? "Spectator Locations (Final)" : "Spectator Points"}
              </h2>
              {group.isAdmin && !group.isPast && (
                <Button variant="outline" size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Point
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {spectatorPoints.map((point) => (
                <Card key={point.id} className="p-4 bg-card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{point.name}</h3>
                      <p className="text-sm text-muted-foreground">{point.time}</p>
                    </div>
                    {group.isAdmin && !group.isPast && (
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {point.assignedMembers.map((memberName, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {memberName}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Leave Group - only for active groups */}
          {!group.isPast && (
            <div className="pb-6">
              <Button variant="outline" className="w-full text-destructive hover:text-destructive bg-transparent">
                Leave Group
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* iMessage Group Creation Dialog */}
      <AlertDialog open={showIMessageDialog} onOpenChange={setShowIMessageDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-secondary" />
              Create iMessage Group
            </AlertDialogTitle>
            <div className="space-y-3 pt-2">
              <p>
                This will open iMessage on your device with all group members who have phone numbers in their CheerLoop
                profiles.
              </p>

              <div className="bg-muted p-3 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Members with phone numbers:</span>
                  <Badge variant="secondary">
                    {membersWithPhones.length} of {members.length}
                  </Badge>
                </div>
                {membersWithoutPhones.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {membersWithoutPhones.length} member{membersWithoutPhones.length > 1 ? "s" : ""} without phone
                    numbers will not be included.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-foreground text-sm">How it works:</p>
                <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                  <li>iMessage will open with all phone numbers pre-filled</li>
                  <li>A suggested message will be included</li>
                  <li>You can edit the message before sending</li>
                  <li>All members will receive the group message</li>
                </ol>
              </div>

              <p className="text-xs text-muted-foreground italic">
                Note: Phone numbers will be visible to all group members in the iMessage conversation.
              </p>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={createIMessageGroup} className="bg-secondary hover:bg-secondary/90">
              Open iMessage
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
