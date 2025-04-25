
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ProjectCard } from "@/components/ProjectCard";
import { DashboardStats } from "@/components/DashboardStats";
import { Navigate } from "react-router-dom";
import { Briefcase, FileBadge, GraduationCap, Users } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const { getEnrolledProjects, loading } = useProjects();
  const [projects, setProjects] = useState([]);
  const { toast } = useToast();
  
  // Check if user is student
  if (!user) {
    return <Navigate to="/student-login" />;
  }
  
  if (user.role !== "student" && user.role !== "freelancer") {
    return <Navigate to="/client-dashboard" />;
  }
  
  useEffect(() => {
    // Get enrolled projects for this student
    if (!loading) {
      setProjects(getEnrolledProjects(user.id));
    }
  }, [user, loading]);

  const isFreelancer = user.role === "freelancer";
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">
            {isFreelancer ? 
              "Manage your enrolled projects and find new opportunities." :
              "Apply to become a freelancer to start working on projects."
            }
          </p>
        </div>
        <div className="flex mt-4 md:mt-0 gap-2">
          {isFreelancer ? (
            <Link to="/enroll-project">
              <Button className="skill-gradient">Find Projects</Button>
            </Link>
          ) : (
            <Link to="/apply-freelancer">
              <Button className="skill-gradient">Apply as Freelancer</Button>
            </Link>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <DashboardStats 
          icon={Briefcase}
          title="Enrolled Projects"
          value={projects.length}
          description="Your active projects"
        />
        <DashboardStats 
          icon={FileBadge}
          title="Completed Projects"
          value={0}
          description="Successfully delivered"
        />
        <DashboardStats 
          icon={GraduationCap}
          title="Account Type"
          value={isFreelancer ? "Freelancer" : "Student"}
          description={isFreelancer ? "You can enroll in projects" : "Apply to become a freelancer"}
        />
        <DashboardStats 
          icon={Users}
          title="Collaboration Score"
          value="N/A"
          description="Based on client feedback"
        />
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
        
        {loading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 rounded-lg py-12 text-center">
            <h3 className="text-xl font-medium mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">
              {isFreelancer ? 
                "You haven't enrolled in any projects yet." : 
                "You need to become a freelancer first to enroll in projects."
              }
            </p>
            {isFreelancer ? (
              <Link to="/enroll-project">
                <Button>Browse Available Projects</Button>
              </Link>
            ) : (
              <Link to="/apply-freelancer">
                <Button>Apply as Freelancer</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
