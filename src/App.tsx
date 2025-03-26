import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Button variant="default">
        Primary
      </Button>
      <Button variant="secondary">
        Secondary  
      </Button>
      <Button variant="destructive">
        Destructive
      </Button>
      <Button variant="ghost">
        Muted
      </Button>
    </div>
  )
}

export default App
