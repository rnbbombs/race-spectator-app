"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Clock } from "lucide-react"

interface RaceCardProps {
  name: string
  distance: string
  location: string
  date: string
  startTime: string
  onClick?: () => void
}

export function RaceCard({ name, distance, location, date, startTime, onClick }: RaceCardProps) {
  return (
    <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-card" onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg text-foreground">{name}</h3>
        <Badge className="bg-primary text-primary-foreground font-medium">{distance}</Badge>
      </div>

      {/* Location chip */}
      <div className="mb-3">
        <Badge variant="secondary" className="font-normal">
          <MapPin className="w-3 h-3 mr-1" />
          {location}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{startTime}</span>
        </div>
      </div>
    </Card>
  )
}
