import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type Employee } from "@/data/employees.tsx"

export function EmployeeCard({ employee }: { employee: Employee }) {
  const completedModules = employee.modules.filter(module => module.completed)
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={employee.avatar || "/placeholder.svg"}
                alt={employee.name}
                width={60}
                height={60}
                className="rounded-full border-2 border-primary/20"
              />
            </div>
            <div>
              <CardTitle className="text-lg">{employee.name}</CardTitle>
              <CardDescription>{employee.role}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium">Progress to {employee.nextCertificate.name}</span>
            <span className="text-sm text-muted-foreground">{employee.nextCertificate.progress}%</span>
          </div>
          <Progress value={employee.nextCertificate.progress} className="h-2" />
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Completed Modules</h4>
          {completedModules.length > 0 ? (
            completedModules.map((module) => (
              <div key={module.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{module.name}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No completed modules yet</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-col items-start">
        <h4 className="text-sm font-semibold mb-2">Skills Acquired</h4>
        <div className="flex flex-wrap gap-2">
          {employee.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {skill.icon}
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
} 