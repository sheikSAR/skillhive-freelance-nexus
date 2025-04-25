
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-skill-blue to-skill-purple bg-clip-text text-transparent">
                KARE SkillHive
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={`text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm ${location.pathname === '/' ? 'font-semibold' : ''}`}>
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to={user.role === 'student' ? '/student-dashboard' : '/client-dashboard'} 
                  className={`text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm ${
                    location.pathname.includes('dashboard') ? 'font-semibold' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <div className="flex gap-2">
                  <Link to="/student-login">
                    <Button variant="outline">Student Login</Button>
                  </Link>
                  <Link to="/client-login">
                    <Button variant="outline">Client Login</Button>
                  </Link>
                </div>
              </>
            )}
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/' ? 'text-foreground font-bold' : 'text-foreground/70'}`}>
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to={user.role === 'student' ? '/student-dashboard' : '/client-dashboard'} 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname.includes('dashboard') ? 'text-foreground font-bold' : 'text-foreground/70'
                  }`}
                >
                  Dashboard
                </Link>
                <Button className="w-full mt-2" variant="outline" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2 p-3">
                <Link to="/student-login">
                  <Button className="w-full" variant="outline">Student Login</Button>
                </Link>
                <Link to="/client-login">
                  <Button className="w-full" variant="outline">Client Login</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
