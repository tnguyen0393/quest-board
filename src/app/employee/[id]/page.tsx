import EmployeeScorecard from "@/pages/employee-scorecard"

export default function EmployeePage({ params }: { params: { id: string } }) {
  return <EmployeeScorecard employeeId={parseInt(params.id)} />
} 