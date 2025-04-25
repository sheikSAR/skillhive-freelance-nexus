
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ProjectCard } from "@/components/ProjectCard";
import { Navigate } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EnrollProjectPage() {
  const { user } = useAuth();
  const { getOpenProjects, loading } = useProjects();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Check if user is a student
  if (!user) {
    return <Navigate to="/student-login" />;
  }
  
  if (user.role === "client") {
    return <Navigate to="/client-dashboard" />;
  }
  
  // If not a freelancer, redirect to application page
  if (user.role !== "freelancer") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Become a Freelancer First</h1>
          <p className="text-muted-foreground mb-6">
            You need to apply and be approved as a freelancer before you can enroll in projects.
          </p>
          <Navigate to="/apply-freelancer" />
        </div>
      </div>
    );
  }
  
  useEffect(() => {
    // Get open projects
    if (!loading) {
      const openProjects = getOpenProjects();
      setProjects(openProjects);
      setFilteredProjects(openProjects);
    }
  }, [loading]);
  
  // Filter projects based on search term and category
  useEffect(() => {
    let filtered = projects;
    
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills_required.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(project => project.category === categoryFilter);
    }
    
    setFilteredProjects(filtered);
  }, [searchTerm, categoryFilter, projects]);
  
  // Get unique categories
  const categories = [...new Set(projects.map(project => project.category))];
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Available Projects</h1>
        <p className="text-muted-foreground">
          Browse through available projects and find the perfect match for your skills
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by keyword, skill, or title..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">Loading projects...</div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              {...project}
              isEnrollView={true}
            />
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 rounded-lg py-12 text-center">
          <h3 className="text-xl font-medium mb-2">No matching projects found</h3>
          <p className="text-muted-foreground">
            {searchTerm || categoryFilter ? 
              "Try adjusting your search or filters to find more projects." : 
              "There are currently no open projects available. Check back later for new opportunities."
            }
          </p>
          {(searchTerm || categoryFilter) && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
