import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function FindFriendsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-md" />
            <div className="flex-1">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="w-10 h-10 rounded-md" />
          </div>
        </div>

        <div className="p-4 space-y-4">
          <Card className="h-[300px] bg-muted" />
          <Card className="p-4">
            <Skeleton className="h-32 w-full" />
          </Card>
          <Card className="p-4">
            <Skeleton className="h-16 w-full" />
          </Card>
        </div>
      </div>
    </div>
  )
}
