import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Fingerprint, Lock, KeyRound, Scan } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#932790] via-[#EAACE8] to-[#F6DBF5]">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <img
          src="/lovable-uploads/8763b5a0-eb49-4a9c-a858-332b4dcd2553.png"
          alt="Crownscope Insurance Brokers"
          className="w-48 mx-auto mb-8"
          draggable="false"
        />
        
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isPINMode && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          
          {isPINMode && (
            <div className="space-y-2">
              <Label htmlFor="pin">Enter PIN</Label>
              <Input
                id="pin"
                type="password"
                maxLength={6}
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="Enter 6-digit PIN"
                className="text-center text-2xl tracking-widest"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="mt-8">
          <p className="text-center text-sm text-gray-600 mb-4">Or sign in with</p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBiometricAuth}
              className="flex items-center justify-center gap-2"
            >
              <Fingerprint className="w-4 h-4" />
              Fingerprint
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleFaceID}
              className="flex items-center justify-center gap-2"
            >
              <Scan className="w-4 h-4" />
              Face ID
            </Button>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsPINMode(!isPINMode)}
            className="w-full mt-4"
          >
            {isPINMode ? (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Use Password
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4 mr-2" />
                Use PIN
              </>
            )}
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/onboarding")}
            className="text-secondary hover:text-secondary/90 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;