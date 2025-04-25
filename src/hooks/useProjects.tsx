
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';

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

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getClientProjects();
      // Make sure skills_required is always an array
      const formattedData = data.map((project: any) => ({
        ...project,
        skills_required: typeof project.skills_required === 'string' 
          ? project.skills_required.split(',').map((s: string) => s.trim()) 
          : project.skills_required || []
      }));
      setProjects(formattedData);
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

  const updateProjectStatus = async (projectId: number, status: 'open' | 'in_progress' | 'completed' | 'cancelled') => {
    try {
      await api.updateProject(projectId, projects.find(p => p.id === projectId)?.deadline || '', status);
      await loadProjects(); // Refresh projects
      
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

  const addProject = async (project: Omit<Project, 'id'>) => {
    try {
      await api.postProject(project);
      await loadProjects(); // Refresh projects
      
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
