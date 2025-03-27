import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import EmployeeScorecard from "./pages/employee-scorecard"
import { Header } from "@/components/header"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee/:id" element={<EmployeeScorecard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
