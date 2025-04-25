
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProjects, Project } from "@/hooks/useProjects";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, DollarSign, FileCheck, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EnrollConfirmPage() {
  const { projectId } = useParams();
  const { user } = useAuth();
  const { projects, enrollProject, loading } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!loading && projectId) {
      const foundProject = projects.find(p => p.id === parseInt(projectId));
      setProject(foundProject || null);
    }
  }, [projectId, projects, loading]);
  
  const handleEnroll = async () => {
    if (!user || !project) return;
    
    setEnrolling(true);
    
    try {
      const success = await enrollProject(project.id, user.id);
      if (success) {
        toast({
          title: "Enrollment successful!",
          description: "You have successfully enrolled in this project.",
        });
        navigate("/student-dashboard");
      }
    } finally {
      setEnrolling(false);
    }
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/enroll-project">
            <Button>Return to Available Projects</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <Link to="/enroll-project" className="inline-flex items-center text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Available Projects
        </Link>
        <h1 className="text-3xl font-bold">Project Enrollment</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <CardDescription className="flex items-center">
                <Badge>{project.category}</Badge>
                <div className="ml-4 text-muted-foreground">Posted by Client #{project.client_id}</div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Project Description</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills_required.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <DollarSign className="w-5 h-5 mr-2 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Budget</div>
                    <div className="text-muted-foreground">${project.budget}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Deadline</div>
                    <div className="text-muted-foreground">{formatDate(project.deadline)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <User className="w-5 h-5 mr-2 text-muted-foreground" />
                <div>
                  <div className="font-medium">Enrolled As</div>
                  <div className="text-muted-foreground">{user?.name}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <FileCheck className="w-5 h-5 mr-2 text-muted-foreground" />
                <div>
                  <div className="font-medium">Project Status</div>
                  <div className="text-muted-foreground capitalize">{project.status}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                <div>
                  <div className="font-medium">Time Commitment</div>
                  <div className="text-muted-foreground">Until {formatDate(project.deadline)}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button 
                className="w-full skill-gradient" 
                onClick={handleEnroll}
                disabled={enrolling}
              >
                {enrolling ? "Processing..." : "Confirm Enrollment"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By enrolling, you commit to completing this project by the stated deadline 
                and to maintain professional communication with the client.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
