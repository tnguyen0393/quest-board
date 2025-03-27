import React from "react"
import { Book, Crown, Shield, Sword, Target } from "lucide-react"
import AlexJohnson from "@/assets/AlexJohnson.png"
import SarahMiller from "@/assets/SarahMiller.png"
import MichaelChen from "@/assets/MichaelChen.png"
import EmilyRodriguez from "@/assets/EmilyRodriguez.png"

export interface Module {
  id: number
  name: string
  progress: number
  completed: boolean
}

export interface Skill {
  name: string
  icon: React.ReactNode
}

export interface Employee {
  id: number
  name: string
  avatar: string
  role: string
  nextCertificate: {
    name: string
  }
  modules: Module[]
  skills: Skill[]
}

export const employees: Employee[] = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: AlexJohnson,
    role: "Customer Service Representative",
    nextCertificate: {
      name: "Advanced Customer Service"
    },
    modules: [
      // Each module is ~16.67% of the certificate.
      { id: 1, name: "Customer Service Fundamentals", progress: 100, completed: true },
      { id: 2, name: "Communication Excellence", progress: 100, completed: true },
      { id: 3, name: "Problem-Solving Techniques", progress: 100, completed: true },
      { id: 4, name: "Advanced Communication Strategies", progress: 90, completed: false },
      { id: 5, name: "Customer Experience Design", progress: 0, completed: false },
      { id: 6, name: "Service Recovery Excellence", progress: 0, completed: false }
    ],
    skills: [
      { name: "Performance Coaching", icon: <Shield className="h-4 w-4" /> },
      { name: "Quality Metrics", icon: <Sword className="h-4 w-4" /> },
      { name: "Feedback Systems", icon: <Target className="h-4 w-4" /> },
      { name: "Empathy", icon: <Book className="h-4 w-4" /> },
      { name: "Conflict Resolution", icon: <Crown className="h-4 w-4" /> },
      { name: "Active Listening", icon: <Shield className="h-4 w-4" /> },
      { name: "Data Storytelling", icon: <Target className="h-4 w-4" /> },
      { name: "Visual Analytics", icon: <Sword className="h-4 w-4" /> },
      { name: "Dashboard Design", icon: <Book className="h-4 w-4" /> },
    ],
  },
  {
    id: 2,
    name: "Sarah Miller",
    avatar: SarahMiller,
    role: "Call Center Supervisor",
    nextCertificate: {
      name: "Advanced Leadership"
    },
    modules: [
      // 85/16.67 ≈ 5.1 so five modules are complete.
      { id: 1, name: "Leadership Fundamentals", progress: 100, completed: true },
      { id: 2, name: "Team Management", progress: 100, completed: true },
      { id: 3, name: "Strategic Planning", progress: 100, completed: true },
      { id: 4, name: "Advanced Team Dynamics", progress: 100, completed: true },
      { id: 5, name: "Change Management", progress: 100, completed: true },
      // Remaining progress for module 6: 85 - (5*16.67) ≈ 1.67, i.e. (1.67/16.67)*100 ≈ 10%.
      { id: 6, name: "Organizational Leadership", progress: 10, completed: false }
    ],
    skills: [
      { name: "Team Building", icon: <Shield className="h-4 w-4" /> },
      { name: "Strategic Planning", icon: <Sword className="h-4 w-4" /> },
      { name: "Decision Making", icon: <Target className="h-4 w-4" /> },
      { name: "Process Optimization", icon: <Book className="h-4 w-4" /> },
      { name: "Efficiency Metrics", icon: <Crown className="h-4 w-4" /> },
      { name: "Resource Management", icon: <Shield className="h-4 w-4" /> },
      { name: "Sprint Planning", icon: <Target className="h-4 w-4" /> },
      { name: "Scrum Mastery", icon: <Sword className="h-4 w-4" /> },
      { name: "Agile Metrics", icon: <Book className="h-4 w-4" /> },
    ],
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: MichaelChen,
    role: "Call Center Quality Analyst",
    nextCertificate: {
      name: "Advanced Analytics"
    },
    modules: [
      // 40/16.67 ≈ 2.4 so first two modules are complete.
      { id: 1, name: "Data Analysis Basics", progress: 100, completed: true },
      { id: 2, name: "Statistical Methods", progress: 100, completed: true },
      // Module 3 gets the remaining: 40 - (2*16.67) ≈ 6.67, i.e. (6.67/16.67)*100 ≈ 40%.
      { id: 3, name: "Data Visualization", progress: 40, completed: false },
      { id: 4, name: "Advanced Statistical Analysis", progress: 0, completed: false },
      { id: 5, name: "Predictive Modeling", progress: 0, completed: false },
      { id: 6, name: "Business Intelligence", progress: 0, completed: false }
    ],
    skills: [
      { name: "Data Analysis", icon: <Target className="h-4 w-4" /> },
      { name: "Statistical Modeling", icon: <Sword className="h-4 w-4" /> },
      { name: "Business Intelligence", icon: <Book className="h-4 w-4" /> },
      { name: "Visual Analytics", icon: <Crown className="h-4 w-4" /> },
      { name: "Chart Design", icon: <Shield className="h-4 w-4" /> },
      { name: "Interactive Dashboards", icon: <Target className="h-4 w-4" /> },
      { name: "Quality Metrics", icon: <Sword className="h-4 w-4" /> },
      { name: "Process Auditing", icon: <Book className="h-4 w-4" /> },
      { name: "Performance Analysis", icon: <Crown className="h-4 w-4" /> },
    ],
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    avatar: EmilyRodriguez,
    role: "Technical Support Agent",
    nextCertificate: {
      name: "Advanced Technical Support"
    },
    modules: [
      // 75/16.67 ≈ 4.5 so first four modules are complete.
      { id: 1, name: "Technical Support Basics", progress: 100, completed: true },
      { id: 2, name: "Troubleshooting Methods", progress: 100, completed: true },
      { id: 3, name: "Customer Communication", progress: 100, completed: true },
      { id: 4, name: "Advanced Troubleshooting", progress: 100, completed: true },
      // Module 5: remaining progress = 75 - (4*16.67) ≈ 8.33, i.e. (8.33/16.67)*100 ≈ 50%.
      { id: 5, name: "System Architecture", progress: 50, completed: false },
      { id: 6, name: "Technical Documentation", progress: 0, completed: false }
    ],
    skills: [
      { name: "Team Leadership", icon: <Crown className="h-4 w-4" /> },
      { name: "Strategic Thinking", icon: <Shield className="h-4 w-4" /> },
      { name: "Change Management", icon: <Target className="h-4 w-4" /> },
      { name: "Data Analysis", icon: <Sword className="h-4 w-4" /> },
      { name: "Predictive Analytics", icon: <Book className="h-4 w-4" /> },
      { name: "Business Intelligence", icon: <Crown className="h-4 w-4" /> },
      { name: "Customer Journey Mapping", icon: <Target className="h-4 w-4" /> },
      { name: "Service Design", icon: <Sword className="h-4 w-4" /> },
      { name: "Experience Optimization", icon: <Book className="h-4 w-4" /> },
    ],
  },
]
