import { Award, Book, Home, Menu, Shield, Users } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, isActive: true },
  { name: "Team", href: "#", icon: Users },
  { name: "Courses", href: "#", icon: Book },
  { name: "Achievements", href: "#", icon: Award },
]

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <nav className="grid gap-6 text-lg font-medium">
          <Link to="#" className="flex items-center gap-2 text-lg font-semibold">
            <Shield className="h-6 w-6" />
            <span>QuestBoard</span>
          </Link>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
} 