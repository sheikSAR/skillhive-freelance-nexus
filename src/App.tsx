
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AuthProvider } from "./hooks/useAuth";
import HomePage from "./pages/HomePage";
import StudentLoginPage from "./pages/StudentLoginPage";
import ClientLoginPage from "./pages/ClientLoginPage";
import StudentRegisterPage from "./pages/StudentRegisterPage";
import ClientRegisterPage from "./pages/ClientRegisterPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import ClientDashboardPage from "./pages/ClientDashboardPage";
import ApplyFreelancerPage from "./pages/ApplyFreelancerPage";
import EnrollProjectPage from "./pages/EnrollProjectPage";
import EnrollConfirmPage from "./pages/EnrollConfirmPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/student-login" element={<StudentLoginPage />} />
                <Route path="/client-login" element={<ClientLoginPage />} />
                <Route path="/register-student" element={<StudentRegisterPage />} />
                <Route path="/register-client" element={<ClientRegisterPage />} />
                <Route path="/student-dashboard" element={<StudentDashboardPage />} />
                <Route path="/client-dashboard" element={<ClientDashboardPage />} />
                <Route path="/apply-freelancer" element={<ApplyFreelancerPage />} />
                <Route path="/enroll-project" element={<EnrollProjectPage />} />
                <Route path="/enroll/:projectId" element={<EnrollConfirmPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
