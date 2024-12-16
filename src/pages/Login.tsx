import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { LoginForm } from "@/components/auth/LoginForm";
import { AlternativeAuth } from "@/components/auth/AlternativeAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPINMode, setIsPINMode] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handlePasswordReset = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address first",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;

      toast({
        title: "Password reset email sent",
        description: "Please check your email for the password reset link",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleBiometricAuth = async () => {
    toast({
      title: "Biometric Authentication",
      description: "This feature will be available soon.",
    });
  };

  const handleFaceID = async () => {
    toast({
      title: "Face ID",
      description: "This feature will be available soon.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 sm:p-8 bg-gradient-to-br from-[#932790] via-[#EAACE8] to-[#F6DBF5]">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-7 sm:p-9">
        <div className="space-y-8">
          <img
            src="/lovable-uploads/8763b5a0-eb49-4a9c-a858-332b4dcd2553.png"
            alt="Crownscope Insurance Brokers"
            className="w-56 sm:w-64 mx-auto object-contain"
            style={{
              imageRendering: 'crisp-edges',
              transform: 'scale(1.1)',
            }}
            draggable="false"
          />
          
          <h1 className="text-2xl font-headers font-bold text-primary text-center">Welcome Back</h1>
          
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isPINMode={isPINMode}
            setIsPINMode={setIsPINMode}
            handleSubmit={handleSubmit}
            handlePasswordReset={handlePasswordReset}
          />

          <AlternativeAuth
            handleBiometricAuth={handleBiometricAuth}
            handleFaceID={handleFaceID}
          />

          <p className="text-center text-sm text-gray-600 font-sans">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/onboarding")}
              className="text-secondary hover:text-secondary-light font-medium transition-colors duration-200"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;