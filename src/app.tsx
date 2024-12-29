import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer/footer";
import { Container } from "./components/layout/container";
import { MainContent } from "./components/layout/main-content";
import { Navbar } from "./components/navbar/navbar";
import { NotificationProvider } from "./components/notifications/notification-context";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <div>
          <Navbar />
          <main className="flex items-center justify-center mt-20">
            <Container>
              <MainContent>
                <Outlet />
              </MainContent>
            </Container>
          </main>
          <Footer />
          <Toaster/>
        </div>
      </NotificationProvider>
    </QueryClientProvider>
  )
}

export default App
