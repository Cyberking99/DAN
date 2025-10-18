import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Award,
  User,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Submissions", path: "/submissions", icon: FileText },
  { name: "Reviews", path: "/reviews", icon: BookOpen },
  { name: "Certificates", path: "/certificates", icon: Award },
];

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full glass glass-dark border-b border-border/50">
        <div className="flex h-16 items-center justify-between px-8">
          <h1 className="text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            DeSci Agent Network
          </h1>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-all">
              <User className="h-5 w-5" />
            </Button>
            <Button className="gap-2 gradient-primary hover:shadow-lg hover:shadow-primary/25 transition-all">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>

      <div className="flex w-full">
        {/* Sidebar */}
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-border/50 glass glass-dark">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "gradient-primary text-white shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-foreground hover-lift"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 animate-in">
          {children}
        </main>
      </div>
    </div>
  );
}
