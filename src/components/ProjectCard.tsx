import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  skills: string | string[];
  budget: string;
  deadline: string;
  category: string;
  status: string;
  isEnrollView?: boolean;
  onUpdateStatus?: (id: number, status: string) => void;
}

export function ProjectCard({
  id,
  title,
  description,
  skills,
  budget,
  deadline,
  category,
  status,
  isEnrollView = false,
  onUpdateStatus
}: ProjectCardProps) {
  const statusColor = {
    open: "bg-green-500",
    in_progress: "bg-blue-500",
    completed: "bg-purple-500",
    cancelled: "bg-red-500"
  }[status] || "bg-gray-500";
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Handle both string and array cases safely
  const skillsList = Array.isArray(skills) ? skills : 
                      (typeof skills === 'string' ? skills.split(',') : []);
  
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-1">{category}</CardDescription>
          </div>
          <div className={`px-2 py-1 rounded-full text-white text-xs ${statusColor}`}>
            {status.replace('_', ' ')}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {skillsList.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {typeof skill === 'string' ? skill.trim() : skill}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Budget</p>
            <p className="font-medium">${budget}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Deadline</p>
            <p className="font-medium">{formatDate(deadline)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {isEnrollView ? (
          <Link to={`/enroll/${id}`} className="w-full">
            <Button className="w-full skill-gradient">Enroll Now</Button>
          </Link>
        ) : (
          <div className="w-full flex justify-end gap-2">
            {onUpdateStatus && (
              <Button 
                variant="outline" 
                onClick={() => onUpdateStatus(id, status === 'open' ? 'in_progress' : 'open')}
              >
                {status === 'open' ? 'Mark In Progress' : 'Mark Open'}
              </Button>
            )}
            <Link to={`/project/${id}`}>
              <Button variant="secondary">View Details</Button>
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
