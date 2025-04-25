
import { Button } from "@/components/ui/button";
import { HexagonGrid } from "@/components/HexagonGrid";
import { FeatureCard } from "@/components/FeatureCard";
import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/ProjectCard";
import { GraduationCap, Briefcase, Code, Users, BarChartBig, Award } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const { getOpenProjects, loading } = useProjects();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  
  useEffect(() => {
    // Get only a few projects for the featured section
    setFeaturedProjects(getOpenProjects().slice(0, 3));
  }, [loading]);
  
  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80 z-10" />
          <div className="absolute inset-0 opacity-40">
            <HexagonGrid />
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="mt-10 lg:mt-0 order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Connect <span className="bg-gradient-to-r from-skill-blue to-skill-purple bg-clip-text text-transparent">Student Talent</span> with Real Projects
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                KARE SkillHive bridges the gap between students and organizations, creating opportunities for real-world experience and affordable expertise.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/register-student">
                  <Button size="lg" className="skill-gradient">
                    Join as Student
                  </Button>
                </Link>
                <Link to="/register-client">
                  <Button size="lg" variant="outline">
                    Post a Project
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-muted-foreground">Student Freelancers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-muted-foreground">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-muted-foreground">Partner Organizations</div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="w-full max-w-md h-[500px] relative">
                <div className="animate-float">
                  <img 
                    src="/placeholder.svg" 
                    alt="Students collaborating" 
                    className="rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Building the bridge between education and industry</h2>
          <p className="text-xl text-muted-foreground">
            Our platform creates opportunities for students to gain practical experience while clients get fresh perspectives and affordable solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={GraduationCap} 
            title="Real World Experience" 
            description="Students work on actual projects for real clients, building their portfolio and skills in their field of study."
          />
          <FeatureCard 
            icon={Briefcase} 
            title="Affordable Solutions" 
            description="Organizations get quality work at competitive rates while supporting the next generation of professionals."
          />
          <FeatureCard 
            icon={Code} 
            title="Diverse Skill Pool" 
            description="Access talent across various disciplines from web development to design, writing, marketing, and more."
          />
          <FeatureCard 
            icon={Users} 
            title="Collaborative Learning" 
            description="Students can form teams to tackle complex projects, learning teamwork and communication skills."
          />
          <FeatureCard 
            icon={BarChartBig} 
            title="Performance Analytics" 
            description="Track project progress, receive feedback, and build a reputation based on successful delivery."
          />
          <FeatureCard 
            icon={Award} 
            title="Verified Profiles" 
            description="Students are verified through their educational institutions, ensuring quality and accountability."
          />
        </div>
      </div>
      
      {/* Featured Projects */}
      <div className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground">
              Browse some of our open projects ready for talented students to tackle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <ProjectCard
                key={project.id}
                {...project}
                isEnrollView={true}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to={user?.role === 'student' ? '/enroll-project' : '/register-student'}>
              <Button size="lg">
                {user?.role === 'student' ? 'View All Open Projects' : 'Sign Up to Apply'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Our simple process connects students and clients in just a few steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <ol className="relative border-l border-muted-foreground/30">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 skill-gradient rounded-full -left-4">
                  1
                </span>
                <h3 className="font-semibold text-xl mb-2">Sign Up & Create Profile</h3>
                <p className="text-base text-muted-foreground">
                  Students register with verified college credentials and build their profile. Clients create company profiles.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 skill-gradient rounded-full -left-4">
                  2
                </span>
                <h3 className="font-semibold text-xl mb-2">Post or Browse Projects</h3>
                <p className="text-base text-muted-foreground">
                  Clients post project details, budget, and requirements. Students browse and apply to relevant projects.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 skill-gradient rounded-full -left-4">
                  3
                </span>
                <h3 className="font-semibold text-xl mb-2">Match & Collaborate</h3>
                <p className="text-base text-muted-foreground">
                  Students apply to become freelancers, then can enroll in projects. Clients review applications and collaborate.
                </p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 skill-gradient rounded-full -left-4">
                  4
                </span>
                <h3 className="font-semibold text-xl mb-2">Complete & Review</h3>
                <p className="text-base text-muted-foreground">
                  Projects are delivered, feedback is exchanged, and students build their portfolio and reputation.
                </p>
              </li>
            </ol>
          </div>
          
          <div className="order-first md:order-last">
            <img 
              src="/placeholder.svg" 
              alt="Project workflow" 
              className="rounded-xl shadow-lg mx-auto"
            />
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="skill-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Join our community of talented students and forward-thinking organizations today!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register-student">
              <Button size="lg" variant="secondary">
                Join as Student
              </Button>
            </Link>
            <Link to="/register-client">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                Post a Project
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
