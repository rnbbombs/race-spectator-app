"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, Bell, Shield, HelpCircle, LogOut, RotateCcw } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const router = useRouter()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [locationSharing, setLocationSharing] = useState(true)

  const user = {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    memberSince: "January 2025",
    groupsJoined: 3,
    racesSupported: 5,
  }

  // Function to reset onboarding
  const handleResetOnboarding = () => {
    localStorage.removeItem("onboarding_complete")
    router.push("/onboarding")
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
            <h1 className="text-xl font-bold text-foreground">Profile</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Profile Header */}
          <Card className="p-6 bg-card">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full w-8 h-8">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Member since {user.memberSince}</p>
              </div>
              <div className="flex gap-6 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{user.groupsJoined}</p>
                  <p className="text-xs text-muted-foreground">Groups</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{user.racesSupported}</p>
                  <p className="text-xs text-muted-foreground">Races</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Settings */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Account Settings</h3>
            <Card className="divide-y divide-border bg-card">
              <div className="p-4 space-y-3">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="p-4 space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
              <div className="p-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Change Password
                </Button>
              </div>
            </Card>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Preferences</h3>
            <Card className="divide-y divide-border bg-card">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive race updates</p>
                  </div>
                </div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Location Sharing</p>
                    <p className="text-sm text-muted-foreground">Share with group members</p>
                  </div>
                </div>
                <Switch checked={locationSharing} onCheckedChange={setLocationSharing} />
              </div>
            </Card>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Support</h3>
            <Card className="divide-y divide-border bg-card">
              <button className="p-4 flex items-center gap-3 w-full text-left hover:bg-muted/50 transition-colors">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Help Center</span>
              </button>
              <button className="p-4 flex items-center gap-3 w-full text-left hover:bg-muted/50 transition-colors">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Privacy Policy</span>
              </button>
              <button
                className="p-4 flex items-center gap-3 w-full text-left hover:bg-muted/50 transition-colors"
                onClick={handleResetOnboarding}
              >
                <RotateCcw className="w-5 h-5 text-muted-foreground" />
                <div>
                  <span className="font-medium text-foreground">Reset Onboarding</span>
                  <p className="text-sm text-muted-foreground">View the welcome tour again</p>
                </div>
              </button>
            </Card>
          </div>

          {/* Logout */}
          <div className="pb-6">
            <Button variant="outline" className="w-full text-destructive hover:text-destructive bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
