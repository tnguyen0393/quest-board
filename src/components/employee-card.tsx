import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type Employee, Module } from "@/data/employees.tsx"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function EmployeeCard({ employee }: { employee: Employee }) {
  const navigate = useNavigate()
  
  const calculateCertificateProgress = (modules: Module[]) => {
    const totalProgress = modules.reduce((sum, module) => sum + module.progress, 0)
    return Math.round(totalProgress / modules.length)
  }

  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow"
    >
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
            <span className="text-sm font-medium">Progress on {employee.nextCertificate.name} Certificate</span>
            <span className="text-sm text-muted-foreground">{calculateCertificateProgress(employee.modules)}%</span>
          </div>
          <Progress value={calculateCertificateProgress(employee.modules)} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-col items-start gap-4">
        <div className="w-full">
          <h4 className="text-sm font-semibold mb-2">Skills Acquired</h4>
          <div className="flex flex-wrap gap-2">
            {employee.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill.icon}
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/employee/${employee.id}`)
          }}
        >
          View Progress
        </Button>
      </CardFooter>
    </Card>
  )
} 