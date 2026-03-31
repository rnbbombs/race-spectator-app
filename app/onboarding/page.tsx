"use client"

import type React from "react"
import { CheerLoopLogo } from "@/components/cheerloop-logo"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Users, MessageCircle, Bell, CheckCircle, ArrowLeft } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleLocationPermission = () => {
    // In a real app, this would request actual location permission
    setLocationEnabled(true)
  }

  const handleNotificationPermission = () => {
    // In a real app, this would request actual notification permission
    setNotificationsEnabled(true)
  }

  const handleComplete = () => {
    // Mark onboarding as complete and navigate to home
    localStorage.setItem("onboarding_complete", "true")
    router.push("/")
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      // Swipe left = go to next step
      handleNext()
    }

    if (isRightSwipe) {
      // Swipe right = go back
      handleBack()
    }
  }

  const steps = [
    // Step 0: Welcome
    <div key="welcome" className="flex flex-col items-center text-center space-y-6">
      <CheerLoopLogo size={96} />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome to CheerLoop</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          The easiest way to coordinate with friends and support your runners on race day
        </p>
      </div>
      <Button size="lg" className="w-full max-w-xs" onClick={() => setStep(1)}>
        Get Started
      </Button>
    </div>,

    // Step 1: Features
    <div key="features" className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Everything You Need</h2>
        <p className="text-muted-foreground">Coordinate, track, and cheer together</p>
      </div>

      <div className="space-y-4">
        <Card className="p-4 bg-card">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Track Runners Live</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                See exactly where your runners are on the course in real-time
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Find Your Friends</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Locate your group and get smart suggestions for the best meeting spots
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Stay Connected</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Chat with your group and share updates throughout the race
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Added back button and updated button layout */}
      <div className="flex gap-3">
        <Button size="lg" variant="outline" onClick={handleBack} className="w-20 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button size="lg" className="flex-1" onClick={() => setStep(2)}>
          Continue
        </Button>
      </div>
    </div>,

    // Step 2: Permissions
    <div key="permissions" className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Quick Setup</h2>
        <p className="text-muted-foreground">Enable these features for the best experience</p>
      </div>

      <div className="space-y-4">
        <Card className="p-4 bg-card">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Location Services</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Share your location to help friends find you and get smart meeting suggestions
              </p>
              {locationEnabled ? (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Enabled</span>
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={handleLocationPermission}>
                  Enable Location
                </Button>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Notifications</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Get updates when runners reach checkpoints and group messages arrive
              </p>
              {notificationsEnabled ? (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Enabled</span>
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={handleNotificationPermission}>
                  Enable Notifications
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Added back button to permissions step */}
      <div className="space-y-3">
        <Button size="lg" className="w-full" onClick={handleComplete}>
          Start Using CheerLoop
        </Button>
        <div className="flex gap-3">
          <Button size="lg" variant="outline" onClick={handleBack} className="w-20 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="ghost" className="flex-1" onClick={handleComplete}>
            Skip for Now
          </Button>
        </div>
      </div>
    </div>,
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 safe-area-header">
      <div className="w-full max-w-md" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        {steps[step]}

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${i === step ? "w-8 bg-primary" : "w-2 bg-muted"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
