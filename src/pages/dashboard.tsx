import { Tabs, TabsContent } from "@/components/ui/tabs"
import { employees } from "@/data/employees.tsx"
import { EmployeeCard } from "@/components/employee-card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <section className="flex flex-col gap-4 md:gap-8">
          <header className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <section>
              <h1 className="text-3xl font-bold tracking-tight">Team Quest Board</h1>
              <p className="text-muted-foreground">
                Monitor your team&apos;s progress through learning quests and skill development.
              </p>
            </section>
          </header>
          <Tabs defaultValue="all" className="w-full">
            <TabsContent value="all" className="mt-0">
              <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {employees.map((employee) => (
                  <EmployeeCard key={employee.id} employee={employee} />
                ))}
              </section>
            </TabsContent>
            <TabsContent value="active" className="mt-0">
              <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {employees
                  .filter((employee) => employee.courses.some((course) => !course.completed))
                  .map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                  ))}
              </section>
            </TabsContent>
            <TabsContent value="completed" className="mt-0">
              <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {employees
                  .filter((employee) => employee.courses.some((course) => course.completed))
                  .map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                  ))}
              </section>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  )
}