import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  CalendarIcon,
  CheckCircle2,
  Edit,
  Save,
  Trash2,
  User,
  Lightbulb,
  ThumbsUp,
  Frown,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { employees, Module } from "@/data/employees"
import { generatePerformanceReviewGuidance } from "@/lib/openai"

export default function EmployeeScorecard() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(Number(id) || 1)
  const [goals, setGoals] = useState([
    { id: 1, description: "Complete Advanced Customer Service certification", completed: false },
    { id: 2, description: "Improve customer satisfaction rating by 15%", completed: true },
    { id: 3, description: "Mentor two junior team members", completed: true },
    { id: 4, description: "Reduce average call handling time by 10%", completed: false },
  ])

  const [summary, setSummary] = useState("")

  const [editingSummary, setEditingSummary] = useState(false)
  const [newGoal, setNewGoal] = useState("")

  const [selfReflection, setSelfReflection] = useState({
    achievements: "",
    challenges: "",
    learnings: "",
    nextSteps: "",
    support: "",
  })

  const [performanceGuidance, setPerformanceGuidance] = useState("")
  const [isGeneratingGuidance, setIsGeneratingGuidance] = useState(false)

  // Find the selected employee
  const selectedEmployee = employees.find((emp) => emp.id === selectedEmployeeId) || employees[0]

  // Update self-reflection and summary when employee changes
  useEffect(() => {
    if (selectedEmployee) {
      // Reset performance guidance when employee changes
      setPerformanceGuidance("")
      
      // Generate unique summary based on employee role and certificate
      const certificateProgress = calculateCertificateProgress(selectedEmployee.modules)
      const completedModules = selectedEmployee.modules.filter(m => m.completed).length
      const totalModules = selectedEmployee.modules.length
      
      setSummary(`${selectedEmployee.name} has made significant progress in their ${selectedEmployee.nextCertificate.name} certification journey. With ${completedModules} out of ${totalModules} modules completed (${certificateProgress}% overall progress), they have demonstrated strong commitment to professional development. Their expertise in ${selectedEmployee.skills.slice(0, 3).map(s => s.name).join(", ")} has been particularly valuable in their role as ${selectedEmployee.role}.`)

      // Generate unique self-reflection based on employee role and skills
      setSelfReflection({
        achievements: `Successfully completed ${completedModules} modules in the ${selectedEmployee.nextCertificate.name} certification program. Demonstrated excellence in ${selectedEmployee.skills.slice(0, 2).map(s => s.name).join(" and ")}.`,
        challenges: `Balancing ${selectedEmployee.nextCertificate.name} certification work with daily ${selectedEmployee.role} responsibilities. Mastering advanced concepts in ${selectedEmployee.modules.find(m => !m.completed)?.name || "upcoming modules"}.`,
        learnings: `Gained valuable insights in ${selectedEmployee.modules.filter(m => m.completed).map(m => m.name).join(", ")}. Developed stronger ${selectedEmployee.skills.slice(0, 2).map(s => s.name).join(" and ")} capabilities.`,
        nextSteps: `Complete remaining modules in ${selectedEmployee.nextCertificate.name} certification. Focus on applying ${selectedEmployee.modules.find(m => !m.completed)?.name || "new"} concepts in daily work.`,
        support: `Would benefit from mentorship in ${selectedEmployee.modules.find(m => !m.completed)?.name || "advanced topics"}. Additional practice opportunities for ${selectedEmployee.skills.slice(-2).map(s => s.name).join(" and ")} would be valuable.`
      })
    }
  }, [selectedEmployee])

  // Handle employee selection change
  const handleEmployeeChange = (value: string) => {
    const newId = Number.parseInt(value)
    setSelectedEmployeeId(newId)
    navigate(`/employee/${newId}`)
  }

  // Update selected employee when URL changes
  useEffect(() => {
    if (id) {
      setSelectedEmployeeId(Number(id))
    }
  }, [id])

  // Add a new goal
  const addGoal = () => {
    if (newGoal.trim() === "") return
    setGoals([...goals, { id: goals.length + 1, description: newGoal, completed: false }])
    setNewGoal("")
  }

  // Toggle goal completion
  const toggleGoalCompletion = (id: number) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)))
  }

  // Delete a goal
  const deleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  // Get modules to display based on showAllModules toggle
  const displayModules = selectedEmployee.modules

  // Handle self-reflection changes
  const handleReflectionChange = (field: keyof typeof selfReflection, value: string) => {
    setSelfReflection({
      ...selfReflection,
      [field]: value,
    })
  }

  // Calculate certificate progress from modules
  const calculateCertificateProgress = (modules: Module[]) => {
    const totalProgress = modules.reduce((sum, module) => sum + module.progress, 0)
    return Math.round(totalProgress / modules.length)
  }

  const handleGenerateGuidance = async () => {
    try {
      setIsGeneratingGuidance(true)
      const guidance = await generatePerformanceReviewGuidance({
        ...selectedEmployee,
        goals,
        selfReflection,
        summary,
      })
      setPerformanceGuidance(guidance)
    } catch (error) {
      console.error('Error generating performance guidance:', error)
      setPerformanceGuidance("Failed to generate performance review guidance. Please try again.")
    } finally {
      setIsGeneratingGuidance(false)
    }
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="space-y-6">
        {/* Employee Selector */}
        <div className="w-full">
          <Label htmlFor="employee-select">Select Employee</Label>
          <Select
            value={selectedEmployeeId.toString()}
            onValueChange={handleEmployeeChange}
          >
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Select an employee" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id.toString()}>
                  {employee.name} - {employee.role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.name} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{selectedEmployee.name}</h1>
              <p className="text-muted-foreground">{selectedEmployee.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Q1 2025 Review</span>
          </div>
        </div>

        <Separator />

        {/* Overall Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Progress on {selectedEmployee.nextCertificate.name} Certificate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">{calculateCertificateProgress(selectedEmployee.modules)}%</span>
              </div>
              <Progress value={calculateCertificateProgress(selectedEmployee.modules)} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Module Progress */}
        <Card>
          <CardHeader className="pb-2">
            <div>
              <CardTitle>Module Progress</CardTitle>
              <CardDescription>Tracking progress on professional development modules</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayModules.map((module) => (
                <div key={module.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{module.name}</span>
                      {module.completed && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-medium">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Skills</CardTitle>
            <CardDescription>Key competencies and areas of expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedEmployee.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                  {skill.icon}
                  <span>{skill.name}</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Development Goals</CardTitle>
            <CardDescription>Progress against established goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="flex items-start justify-between gap-2 p-3 border rounded-lg">
                  <div className="flex items-start gap-2 flex-1">
                    <div className="cursor-pointer mt-0.5" onClick={() => toggleGoalCompletion(goal.id)}>
                      <CheckCircle2
                        className={`h-5 w-5 ${
                          goal.completed ? "text-green-600 fill-green-600" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <span className={`${goal.completed ? "line-through text-muted-foreground" : ""}`}>
                      {goal.description}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)} className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Add a new goal..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addGoal()
                  }
                }}
              />
              <Button onClick={addGoal}>Add</Button>
            </div>
          </CardContent>
        </Card>

        {/* Self-Reflection */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Self-Reflection</CardTitle>
            <CardDescription>Your thoughts on your development journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-green-600" />
                  <Label htmlFor="achievements">Key Achievements</Label>
                </div>
                <Textarea
                  id="achievements"
                  placeholder="What accomplishments are you most proud of this period?"
                  value={selfReflection.achievements}
                  onChange={(e) => handleReflectionChange("achievements", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Frown className="h-5 w-5 text-amber-600" />
                  <Label htmlFor="challenges">Challenges Faced</Label>
                </div>
                <Textarea
                  id="challenges"
                  placeholder="What challenges or obstacles have you encountered?"
                  value={selfReflection.challenges}
                  onChange={(e) => handleReflectionChange("challenges", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  <Label htmlFor="learnings">Key Learnings</Label>
                </div>
                <Textarea
                  id="learnings"
                  placeholder="What are the most important things you've learned?"
                  value={selfReflection.learnings}
                  onChange={(e) => handleReflectionChange("learnings", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="next-steps">Next Steps</Label>
                <Textarea
                  id="next-steps"
                  placeholder="What specific actions will you take next to continue your development?"
                  value={selfReflection.nextSteps}
                  onChange={(e) => handleReflectionChange("nextSteps", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-needed">Support Needed</Label>
                <Textarea
                  id="support-needed"
                  placeholder="What support would help you achieve your development goals?"
                  value={selfReflection.support}
                  onChange={(e) => handleReflectionChange("support", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Summary */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Achievement Summary</CardTitle>
                <CardDescription>Overall assessment of your development and achievements</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setEditingSummary(!editingSummary)}>
                {editingSummary ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {editingSummary ? (
              <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="min-h-[150px]" />
            ) : (
              <div className="p-3 bg-muted/40 rounded-lg">
                <p className="text-sm leading-relaxed">{summary}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex justify-between w-full text-sm">
              <div>
                <Label className="text-muted-foreground">Employee</Label>
                <p>{selectedEmployee.name}</p>
              </div>
              <div className="text-right">
                <Label className="text-muted-foreground">Last Updated</Label>
                <p>March 26, 2025</p>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Performance Review Guidance */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Performance Review Guidance</CardTitle>
                <CardDescription>AI-powered guidance for presenting your growth</CardDescription>
              </div>
              <Button 
                onClick={handleGenerateGuidance} 
                disabled={isGeneratingGuidance}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {isGeneratingGuidance ? "Generating..." : "Generate Guidance"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {performanceGuidance ? (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap">{performanceGuidance}</div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Click the button above to generate personalized performance review guidance based on your progress and achievements.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

