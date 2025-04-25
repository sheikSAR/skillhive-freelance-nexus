
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ApplyFreelancerPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    portfolio: "",
    skills: "",
    resume: null,
    resumeFileName: ""
  });
  
  // Check if user is a student
  if (!user) {
    return <Navigate to="/student-login" />;
  }
  
  if (user.role === "client") {
    return <Navigate to="/client-dashboard" />;
  }
  
  // If already a freelancer, redirect to dashboard
  if (user.role === "freelancer") {
    return <Navigate to="/student-dashboard" />;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ 
        ...prev, 
        resume: file,
        resumeFileName: file.name
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, this would upload the file and submit data to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Application submitted successfully!",
        description: "Your freelancer application is now being reviewed.",
      });
      
      // Update user role to freelancer (in a real app, this would be done after review)
      // For this demo, we'll simulate immediate approval
      localStorage.setItem("skillhive-user", JSON.stringify({...user, role: "freelancer"}));
      
      navigate("/student-dashboard", { state: { applied: true } });
    } catch (error) {
      toast({
        title: "Application failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-2 rounded-full skill-gradient">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Become a Freelancer</CardTitle>
          <CardDescription className="text-center">
            Showcase your skills and experience to start working on real-world projects
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resume">Upload Resume/CV (PDF)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="file:bg-primary file:text-white file:border-none file:rounded file:px-2 file:py-1 file:mr-2"
                />
              </div>
              {formData.resumeFileName && (
                <p className="text-sm text-muted-foreground">
                  Selected file: {formData.resumeFileName}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio URL</Label>
              <Input
                id="portfolio"
                name="portfolio"
                type="url"
                placeholder="https://yourportfolio.com"
                value={formData.portfolio}
                onChange={handleChange}
                required
              />
              <p className="text-sm text-muted-foreground">
                Link to your personal website, GitHub, Behance, or other portfolio sites
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skills">Skills & Expertise</Label>
              <Textarea
                id="skills"
                name="skills"
                placeholder="Describe your top skills, technologies you're familiar with, and areas of expertise..."
                value={formData.skills}
                onChange={handleChange}
                required
                className="min-h-[150px]"
              />
            </div>
            
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full skill-gradient" disabled={loading}>
              {loading ? "Submitting Application..." : "Submit Application"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              By applying, you agree to our terms of service for freelancers 
              and commit to maintaining professional standards.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
