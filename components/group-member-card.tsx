import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface GroupMemberCardProps {
  name: string
  role: "organizer" | "runner" | "spectator"
  initials: string
}

export function GroupMemberCard({ name, role, initials }: GroupMemberCardProps) {
  const roleColors = {
    organizer: "bg-primary text-primary-foreground",
    runner: "bg-secondary text-secondary-foreground",
    spectator: "bg-muted text-muted-foreground",
  }

  const roleLabels = {
    organizer: "Organizer",
    runner: "Runner",
    spectator: "Spectator",
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
      <Avatar className="w-10 h-10">
        <AvatarFallback className="bg-muted text-foreground font-medium">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-medium text-foreground">{name}</p>
        <Badge className={`${roleColors[role]} text-xs mt-1`}>{roleLabels[role]}</Badge>
      </div>
    </div>
  )
}
