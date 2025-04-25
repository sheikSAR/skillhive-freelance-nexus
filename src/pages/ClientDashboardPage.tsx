
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ProjectCard } from "@/components/ProjectCard";
import { DashboardStats } from "@/components/DashboardStats";
import { Navigate, Link } from "react-router-dom";
import { Briefcase, Clock, DollarSign, Users } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ClientDashboardPage() {
  const { user } = useAuth();
  const { getClientProjects, updateProjectStatus, addProject, loading } = useProjects();
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    skills_required: "",
    budget: "",
    deadline: "",
    category: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Check if user is client
  if (!user) {
    return <Navigate to="/client-login" />;
  }
  
  if (user.role !== "client") {
    return <Navigate to="/student-dashboard" />;
  }
  
  useEffect(() => {
    // Get client projects
    if (!loading) {
      setProjects(getClientProjects(user.id));
    }
  }, [user, loading]);
  
  const handleStatusUpdate = async (projectId, status) => {
    await updateProjectStatus(projectId, status);
    // Refresh projects list
    setProjects(getClientProjects(user.id));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name, value) => {
    setNewProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format skills as array
    const formattedProject = {
      ...newProject,
      client_id: user.id,
      skills_required: newProject.skills_required.split(',').map(skill => skill.trim()),
      status: 'open'
    };
    
    const success = await addProject(formattedProject);
    if (success) {
      setDialogOpen(false);
      setNewProject({
        title: "",
        description: "",
        skills_required: "",
        budget: "",
        deadline: "",
        category: "",
      });
      
      // Refresh projects list
      setProjects(getClientProjects(user.id));
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">
            Manage your projects and connect with talented students
          </p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="skill-gradient">Post New Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Post a New Project</DialogTitle>
                  <DialogDescription>
                    Fill in the project details to find the perfect student freelancer.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newProject.title}
                      onChange={handleInputChange}
                      placeholder="E.g., E-commerce Website Development"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newProject.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Web Development">Web Development</SelectItem>
                          <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                          <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                          <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                          <SelectItem value="Content Writing">Content Writing</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                          <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                          <SelectItem value="Multimedia">Multimedia</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget ($)</Label>
                      <Input
                        id="budget"
                        name="budget"
                        type="number"
                        min="0"
                        value={newProject.budget}
                        onChange={handleInputChange}
                        placeholder="E.g., 500"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newProject.description}
                      onChange={handleInputChange}
                      placeholder="Describe the project requirements, goals, and expectations..."
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills_required">Required Skills (comma-separated)</Label>
                    <Input
                      id="skills_required"
                      name="skills_required"
                      value={newProject.skills_required}
                      onChange={handleInputChange}
                      placeholder="E.g., React, Node.js, MongoDB"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={newProject.deadline}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Post Project</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <DashboardStats 
          icon={Briefcase}
          title="Total Projects"
          value={projects.length}
          description="Projects you've posted"
        />
        <DashboardStats 
          icon={Clock}
          title="In Progress"
          value={projects.filter(p => p.status === 'in_progress').length}
          description="Currently being worked on"
        />
        <DashboardStats 
          icon={Users}
          title="Freelancers"
          value={projects.filter(p => p.status === 'in_progress').length}
          description="Students working on your projects"
        />
        <DashboardStats 
          icon={DollarSign}
          title="Total Budget"
          value={`$${projects.reduce((sum, project) => sum + parseInt(project.budget || 0), 0)}`}
          description="Across all projects"
        />
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
        
        {loading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                {...project} 
                onUpdateStatus={handleStatusUpdate}
              />
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 rounded-lg py-12 text-center">
            <h3 className="text-xl font-medium mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">Post your first project to find talented student freelancers.</p>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>Post Your First Project</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                {/* Same content as above dialog */}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}
