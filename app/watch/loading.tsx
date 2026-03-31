export default function WatchLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-2" />
          <div className="h-3 bg-muted rounded w-24 mx-auto" />
        </div>
      </div>
    </div>
  )
}
