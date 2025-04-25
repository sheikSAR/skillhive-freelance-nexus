
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Project {
  id: number;
  client_id: number;
  title: string;
  description: string;
  skills_required: string[];
  budget: string;
  deadline: string;
  category: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
}

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: 1,
    client_id: 1,
    title: 'E-commerce Website Development',
    description: 'Create a responsive e-commerce website with product listings, cart functionality, and payment integration.',
    skills_required: ['React', 'Node.js', 'MongoDB', 'Express'],
    budget: '500',
    deadline: '2025-06-30',
    category: 'Web Development',
    status: 'open',
  },
  {
    id: 2,
    client_id: 1,
    title: 'Mobile App UI Design',
    description: 'Design a modern UI/UX for a fitness tracking mobile app with focus on user experience and accessibility.',
    skills_required: ['UI/UX', 'Figma', 'Adobe XD', 'Mobile Design'],
    budget: '350',
    deadline: '2025-06-15',
    category: 'UI/UX Design',
    status: 'in_progress',
  },
  {
    id: 3,
    client_id: 1,
    title: 'Machine Learning Model for Text Classification',
    description: 'Develop a machine learning model to classify customer feedback into positive, negative, and neutral categories.',
    skills_required: ['Python', 'Machine Learning', 'NLP', 'TensorFlow'],
    budget: '800',
    deadline: '2025-07-20',
    category: 'Machine Learning',
    status: 'open',
  },
  {
    id: 4,
    client_id: 2,
    title: 'Video Editing for Marketing Campaign',
    description: 'Edit raw footage into a compelling 2-minute promotional video for a new product launch.',
    skills_required: ['Video Editing', 'Adobe Premiere', 'After Effects'],
    budget: '250',
    deadline: '2025-05-25',
    category: 'Multimedia',
    status: 'completed',
  },
  {
    id: 5,
    client_id: 2,
    title: 'Social Media Content Creation',
    description: 'Create engaging content for social media platforms including graphics, captions, and hashtag research.',
    skills_required: ['Content Writing', 'Graphic Design', 'Social Media Marketing'],
    budget: '180',
    deadline: '2025-06-01',
    category: 'Marketing',
    status: 'open',
  }
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load all projects
  const loadProjects = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setProjects(mockProjects);
      setError(null);
    } catch (err) {
      setError('Failed to load projects');
      toast({
        title: 'Error',
        description: 'Failed to load projects. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Get client projects
  const getClientProjects = (clientId: number) => {
    return projects.filter(project => project.client_id === clientId);
  };

  // Get open projects
  const getOpenProjects = () => {
    return projects.filter(project => project.status === 'open');
  };

  // Get enrolled projects for a student
  const getEnrolledProjects = (studentId: number) => {
    // In a real app, this would filter based on enrollments
    // For demo, we'll just return in_progress projects
    return projects.filter(project => project.status === 'in_progress');
  };

  // Add a new project
  const addProject = async (project: Omit<Project, 'id'>) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newProject: Project = {
        ...project,
        id: Math.max(...projects.map(p => p.id), 0) + 1,
      };
      
      setProjects(prev => [...prev, newProject]);
      
      toast({
        title: 'Success',
        description: 'Project created successfully!',
      });
      
      return true;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create project. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Update project status
  const updateProjectStatus = async (projectId: number, status: 'open' | 'in_progress' | 'completed' | 'cancelled') => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProjects(prev => 
        prev.map(project => 
          project.id === projectId ? { ...project, status } : project
        )
      );
      
      toast({
        title: 'Success',
        description: `Project status updated to ${status.replace('_', ' ')}`,
      });
      
      return true;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update project status. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Update project deadline
  const updateProjectDeadline = async (projectId: number, deadline: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProjects(prev => 
        prev.map(project => 
          project.id === projectId ? { ...project, deadline } : project
        )
      );
      
      toast({
        title: 'Success',
        description: `Project deadline updated successfully`,
      });
      
      return true;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update project deadline. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Enroll in a project
  const enrollProject = async (projectId: number, studentId: number) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update project status to in_progress
      setProjects(prev => 
        prev.map(project => 
          project.id === projectId ? { ...project, status: 'in_progress' } : project
        )
      );
      
      toast({
        title: 'Success',
        description: 'You have successfully enrolled in this project!',
      });
      
      return true;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to enroll in project. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    getClientProjects,
    getOpenProjects,
    getEnrolledProjects,
    addProject,
    updateProjectStatus,
    updateProjectDeadline,
    enrollProject,
    refreshProjects: loadProjects,
  };
}
