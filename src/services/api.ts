
const API_URL = 'http://localhost:5000'; // Update this with your Flask server URL

interface LoginCredentials {
  email: string;
  password: string;
}

interface ClientRegisterData {
  name: string;
  email: string;
  password: string;
  organization?: string;
  phone?: string;
  location?: string;
}

interface StudentRegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  college: string;
  department: string;
  year: string;
  skills: string;
  portfolio?: string;
}

interface ProjectData {
  title: string;
  description: string;
  skills_required: string[];
  budget: string;
  deadline: string;
  category: string;
  status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
}

export const api = {
  // Auth endpoints
  async studentLogin(credentials: LoginCredentials) {
    const response = await fetch(`${API_URL}/student-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Invalid credentials');
    return response.json();
  },

  async clientLogin(credentials: LoginCredentials) {
    const response = await fetch(`${API_URL}/client-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Invalid credentials');
    return response.json();
  },

  async registerStudent(data: StudentRegisterData) {
    const response = await fetch(`${API_URL}/register-student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },

  async registerClient(data: ClientRegisterData) {
    const response = await fetch(`${API_URL}/register-client`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },

  // Project endpoints
  async getClientProjects() {
    const response = await fetch(`${API_URL}/client-dashboard`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  async postProject(projectData: ProjectData) {
    // Convert skills_required array to string for Flask backend
    const flaskProjectData = {
      ...projectData,
      skills_required: Array.isArray(projectData.skills_required) 
        ? projectData.skills_required.join(', ') 
        : projectData.skills_required
    };
    
    const response = await fetch(`${API_URL}/post-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flaskProjectData),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to post project');
    return response.json();
  },

  async updateProject(projectId: number, deadline: string, status: string) {
    const response = await fetch(`${API_URL}/update-project/${projectId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deadline, status }),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
  },

  async getStudentDashboard() {
    const response = await fetch(`${API_URL}/student-dashboard`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard');
    return response.json();
  },

  async applyFreelancer(formData: FormData) {
    const response = await fetch(`${API_URL}/apply-freelancer`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to apply');
    return response.json();
  },

  async enrollProject(projectId: number) {
    const response = await fetch(`${API_URL}/enroll/${projectId}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to enroll');
    return response.json();
  }
};
