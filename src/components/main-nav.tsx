import { Home, Shield } from "lucide-react"
import { Link } from "react-router-dom"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, isActive: true },
]

export function MainNav() {
  return (
    <section className="flex items-center gap-2 md:gap-4">
      <Link to="/" className="flex items-center gap-2 md:mr-2">
        <Shield className="h-6 w-6" />
        <span className="font-bold hidden md:inline-block">QuestBoard</span>
      </Link>
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`transition-colors hover:text-foreground ${
              item.isActive ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </section>
  )
} 