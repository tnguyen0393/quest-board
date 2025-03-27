import { UserMenu } from "@/components/user-menu"
import { SearchForm } from "@/components/search-form"
import { MobileNav } from "@/components/mobile-nav"
import { MainNav } from "@/components/main-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <section className="flex h-16 items-center px-4 md:px-6">
        <MobileNav />
        <MainNav />
        <section className="ml-auto flex items-center gap-2">
          <SearchForm />
          <UserMenu />
        </section>
      </section>
    </header>
  )
} 