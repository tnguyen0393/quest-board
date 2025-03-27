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
  progress: number
  nextCertificate: {
    name: string
    progress: number
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
    progress: 65,
    nextCertificate: {
      name: "Advanced Customer Service",
      progress: 65
    },
    modules: [
      { 
        id: 1, 
        name: "Customer Service Fundamentals", 
        progress: 100, 
        completed: true
      },
      { 
        id: 2, 
        name: "Communication Excellence", 
        progress: 100, 
        completed: true
      },
      { 
        id: 3, 
        name: "Problem-Solving Techniques", 
        progress: 100, 
        completed: true
      },
      { 
        id: 4, 
        name: "Advanced Communication Strategies", 
        progress: 65, 
        completed: false
      },
      { 
        id: 5, 
        name: "Customer Experience Design", 
        progress: 45, 
        completed: false
      },
      { 
        id: 6, 
        name: "Service Recovery Excellence", 
        progress: 30, 
        completed: false
      }
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
    progress: 85,
    nextCertificate: {
      name: "Advanced Leadership",
      progress: 85
    },
    modules: [
      { 
        id: 1, 
        name: "Leadership Fundamentals", 
        progress: 100, 
        completed: true
      },
      { 
        id: 2, 
        name: "Team Management", 
        progress: 100, 
        completed: true
      },
      { 
        id: 3, 
        name: "Strategic Planning", 
        progress: 100, 
        completed: true
      },
      { 
        id: 4, 
        name: "Advanced Team Dynamics", 
        progress: 85, 
        completed: false
      },
      { 
        id: 5, 
        name: "Change Management", 
        progress: 75, 
        completed: false
      },
      { 
        id: 6, 
        name: "Organizational Leadership", 
        progress: 60, 
        completed: false
      }
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
    progress: 40,
    nextCertificate: {
      name: "Advanced Analytics",
      progress: 40
    },
    modules: [
      { 
        id: 1, 
        name: "Data Analysis Basics", 
        progress: 100, 
        completed: true
      },
      { 
        id: 2, 
        name: "Statistical Methods", 
        progress: 100, 
        completed: true
      },
      { 
        id: 3, 
        name: "Data Visualization", 
        progress: 100, 
        completed: true
      },
      { 
        id: 4, 
        name: "Advanced Statistical Analysis", 
        progress: 40, 
        completed: false
      },
      { 
        id: 5, 
        name: "Predictive Modeling", 
        progress: 25, 
        completed: false
      },
      { 
        id: 6, 
        name: "Business Intelligence", 
        progress: 15, 
        completed: false
      }
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
    progress: 75,
    nextCertificate: {
      name: "Advanced Technical Support",
      progress: 75
    },
    modules: [
      { 
        id: 1, 
        name: "Technical Support Basics", 
        progress: 100, 
        completed: true
      },
      { 
        id: 2, 
        name: "Troubleshooting Methods", 
        progress: 100, 
        completed: true
      },
      { 
        id: 3, 
        name: "Customer Communication", 
        progress: 100, 
        completed: true
      },
      { 
        id: 4, 
        name: "Advanced Troubleshooting", 
        progress: 75, 
        completed: false
      },
      { 
        id: 5, 
        name: "System Architecture", 
        progress: 60, 
        completed: false
      },
      { 
        id: 6, 
        name: "Technical Documentation", 
        progress: 45, 
        completed: false
      }
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