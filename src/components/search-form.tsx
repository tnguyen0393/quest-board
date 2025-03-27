import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  return (
    <form className="hidden md:flex relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder="Search employees..." className="w-64 pl-8 bg-background" />
    </form>
  )
} 