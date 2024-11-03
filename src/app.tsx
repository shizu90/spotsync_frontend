import { Outlet } from "react-router-dom"
import { Navbar } from "./components/navbar/navbar"

function App() {
  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center mt-40">
        <Outlet />
      </main>
    </div>
  )
}

export default App
