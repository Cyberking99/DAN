import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Award,
  User,
  Wallet,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Submissions", path: "/submissions", icon: FileText },
  { name: "Reviews", path: "/reviews", icon: BookOpen },
  { name: "Certificates", path: "/certificates", icon: Award },
];

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full glass glass-dark border-b border-border/50">
        <div className="flex h-16 items-center justify-between px-8">
          <h1 className="text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            DeSci Agent Network
          </h1>
          
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="p-1 rounded-full bg-primary/20">
                    <Wallet className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Connected</span>
                    <span className="text-sm font-mono font-medium">
                      {user?.address ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}` : 'Wallet'}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect
                </Button>
              </>
            ) : (
              <Button className="gap-2 gradient-primary hover:shadow-lg hover:shadow-primary/25 transition-all">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            )}
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
