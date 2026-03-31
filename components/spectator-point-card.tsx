"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Car, Clock } from "lucide-react"

interface SpectatorPointCardProps {
  number: number
  name: string
  mileMarker: string
  description: string
  hasParking: boolean
  travelTime: string
  onNavigate?: () => void
}

export function SpectatorPointCard({
  number,
  name,
  mileMarker,
  description,
  hasParking,
  travelTime,
  onNavigate,
}: SpectatorPointCardProps) {
  return (
    <Card className="p-4 bg-card">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            {number}
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{mileMarker}</p>
          </div>

          <p className="text-sm text-foreground leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2">
            {hasParking && (
              <Badge variant="outline" className="text-xs">
                <Car className="w-3 h-3 mr-1" />
                Parking Available
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {travelTime}
            </Badge>
          </div>

          {onNavigate && (
            <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={onNavigate}>
              <MapPin className="w-4 h-4 mr-2" />
              Navigate Here
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
