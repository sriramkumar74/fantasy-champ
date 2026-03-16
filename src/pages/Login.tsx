import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import stadiumHero from "@/assets/stadium-hero.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Stadium Hero */}
      <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden">
        <img
          src={stadiumHero}
          alt="Cricket Stadium"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Trophy size={36} className="text-accent" />
              <span className="text-3xl font-bold text-primary-foreground">FantasyCricket</span>
            </div>
            <h1 className="text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
              Build. Draft.<br />Dominate.
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-md">
              Create your ultimate XI, compete in snake drafts, and prove you're the greatest cricket mind.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Trophy size={28} className="text-primary" />
            <span className="text-2xl font-bold">FantasyCricket</span>
          </div>

          <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
          <p className="text-muted-foreground text-sm mb-8">Sign in to your account</p>

          {/* Login method toggle */}
          <div className="flex gap-1 bg-secondary rounded-lg p-1 mb-6">
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium fc-transition ${
                loginMethod === "email" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"
              }`}
            >
              <Mail size={14} className="inline mr-1.5" /> Email
            </button>
            <button
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium fc-transition ${
                loginMethod === "phone" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"
              }`}
            >
              <Phone size={14} className="inline mr-1.5" /> Phone
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginMethod === "email" ? (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9 bg-secondary/50 border-0 shadow-[inset_0_0_0_1px_hsl(var(--border))] focus:shadow-[inset_0_0_0_1px_hsl(var(--primary))]"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="pl-9 bg-secondary/50 border-0 shadow-[inset_0_0_0_1px_hsl(var(--border))] focus:shadow-[inset_0_0_0_1px_hsl(var(--primary))]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-9 bg-secondary/50 border-0 shadow-[inset_0_0_0_1px_hsl(var(--border))] focus:shadow-[inset_0_0_0_1px_hsl(var(--primary))]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full">Sign In</Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 text-sm">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </Button>
            <Button variant="outline" className="flex-1 text-sm">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <button className="text-primary font-medium hover:underline">Register</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
