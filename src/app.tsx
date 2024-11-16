import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/navbar";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
        <main className="flex items-center justify-center mt-20">
          <Outlet />
        </main>
        <Footer />
        <Toaster/>
      </div>
    </QueryClientProvider>
  )
}

export default App
