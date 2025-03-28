import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <section className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <span className="font-bold">QuestBoard</span>
        </div>
      </section>
    </footer>
  )
} 