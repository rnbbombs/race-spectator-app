"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RaceCard } from "@/components/race-card"
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react"

export default function SearchRacesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const distances = ["5K", "10K", "Half Marathon", "Marathon", "Ultra"]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Mock race data
  const races = [
    {
      id: "1",
      name: "Boston Marathon",
      distance: "26.2 mi",
      location: "Boston, MA",
      date: "April 21, 2025",
      startTime: "9:00 AM",
    },
    {
      id: "2",
      name: "Chicago Half Marathon",
      distance: "13.1 mi",
      location: "Chicago, IL",
      date: "May 15, 2025",
      startTime: "7:30 AM",
    },
    {
      id: "3",
      name: "New York Marathon",
      distance: "26.2 mi",
      location: "New York, NY",
      date: "November 2, 2025",
      startTime: "8:00 AM",
    },
    {
      id: "4",
      name: "San Francisco 10K",
      distance: "6.2 mi",
      location: "San Francisco, CA",
      date: "June 20, 2025",
      startTime: "8:30 AM",
    },
    {
      id: "5",
      name: "Miami Beach Half",
      distance: "13.1 mi",
      location: "Miami, FL",
      date: "March 10, 2025",
      startTime: "7:00 AM",
    },
  ]

  const filteredRaces = races.filter((race) => {
    const matchesSearch =
      race.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      race.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDistance =
      !selectedDistance ||
      race.distance.includes(
        selectedDistance === "Marathon"
          ? "26.2"
          : selectedDistance === "Half Marathon"
            ? "13.1"
            : selectedDistance === "10K"
              ? "6.2"
              : selectedDistance === "5K"
                ? "3.1"
                : "",
      )
    const matchesMonth = !selectedMonth || race.date.includes(selectedMonth)
    return matchesSearch && matchesDistance && matchesMonth
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4 safe-area-header">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Search Races</h1>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or location..."
                className="pl-9"
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Filters */}
          {showFilters && (
            <Card className="p-4 bg-card space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Distance</h3>
                <div className="flex flex-wrap gap-2">
                  {distances.map((distance) => (
                    <Badge
                      key={distance}
                      variant={selectedDistance === distance ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedDistance(selectedDistance === distance ? null : distance)}
                    >
                      {distance}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Month</h3>
                <div className="flex flex-wrap gap-2">
                  {months.slice(0, 6).map((month) => (
                    <Badge
                      key={month}
                      variant={selectedMonth === month ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedMonth(selectedMonth === month ? null : month)}
                    >
                      {month}
                    </Badge>
                  ))}
                </div>
              </div>
              {(selectedDistance || selectedMonth) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedDistance(null)
                    setSelectedMonth(null)
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              )}
            </Card>
          )}

          {/* Results */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              {filteredRaces.length} {filteredRaces.length === 1 ? "race" : "races"} found
            </p>
            <div className="space-y-3">
              {filteredRaces.map((race) => (
                <RaceCard
                  key={race.id}
                  name={race.name}
                  distance={race.distance}
                  location={race.location}
                  date={race.date}
                  startTime={race.startTime}
                  onClick={() => router.push(`/race/${race.id}`)}
                />
              ))}
            </div>
          </div>

          {filteredRaces.length === 0 && (
            <Card className="p-8 bg-card text-center">
              <p className="text-muted-foreground mb-2">No races found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
