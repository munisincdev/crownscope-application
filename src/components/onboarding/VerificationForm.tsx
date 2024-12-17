import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VerificationFormProps {
  email: string;
  phone: string;
  onVerificationComplete: () => void;
  onBack: () => void;
}

export const VerificationForm = ({
  email,
  phone,
  onVerificationComplete,
  onBack,
}: VerificationFormProps) => {
  const [code, setCode] = useState("");
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("sms");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically verify the code with your backend
    // For now, we'll simulate a successful verification
    toast({
      title: "Verification successful",
      description: "Your identity has been verified.",
    });
    onVerificationComplete();
  };

  const handleResendCode = () => {
    toast({
      title: "Code resent",
      description: `A new verification code has been sent to your ${activeTab === "sms" ? "phone" : "email"}.`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-primary">Verify Your Identity</h2>
      <p className="text-center text-muted-foreground">
        Please enter the verification code we sent to your {activeTab === "sms" ? "phone" : "email"}.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="sms">
          <p className="text-sm text-center text-muted-foreground mb-4">
            Code sent to {phone}
          </p>
        </TabsContent>
        <TabsContent value="email">
          <p className="text-sm text-center text-muted-foreground mb-4">
            Code sent to {email}
          </p>
        </TabsContent>
      </Tabs>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <InputOTP
            value={code}
            onChange={setCode}
            maxLength={6}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, idx) => (
                  <InputOTPSlot key={idx} {...slot} index={idx} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>

        <div className="space-y-4">
          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary-light text-white transition-colors duration-200 text-sm tracking-wide"
          >
            Verify
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            onClick={handleResendCode}
            className="w-full text-secondary hover:text-secondary-light hover:bg-secondary/10 transition-colors duration-200 text-sm tracking-wide"
          >
            Resend code
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="w-full text-secondary hover:text-secondary-light hover:bg-secondary/10 transition-colors duration-200 text-sm tracking-wide"
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};