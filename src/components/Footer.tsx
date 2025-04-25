
import { Github, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-skill-blue to-skill-purple bg-clip-text text-transparent">
                KARE SkillHive
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Connecting talented students with real-world projects.
              Build your portfolio while earning experience.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <GitHub size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Students</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/student-login" className="text-muted-foreground hover:text-foreground">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/register-student" className="text-muted-foreground hover:text-foreground">
                  Register as Student
                </Link>
              </li>
              <li>
                <Link to="/apply-freelancer" className="text-muted-foreground hover:text-foreground">
                  Become a Freelancer
                </Link>
              </li>
              <li>
                <Link to="/enroll-project" className="text-muted-foreground hover:text-foreground">
                  Find Projects
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/client-login" className="text-muted-foreground hover:text-foreground">
                  Client Login
                </Link>
              </li>
              <li>
                <Link to="/register-client" className="text-muted-foreground hover:text-foreground">
                  Register as Client
                </Link>
              </li>
              <li>
                <Link to="/post-project" className="text-muted-foreground hover:text-foreground">
                  Post a Project
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} KARE SkillHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
