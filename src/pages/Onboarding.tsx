import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Sparkles, Zap, ShieldCheck, PiggyBank, ArrowRightCircle } from "lucide-react";

const OnboardingSlides = [
  {
    title: "Stress-free insurance\nfor the 21st Century",
    description: "Africa's first AI-powered\ninsurance solution",
    action: "Next",
    icon: <Sparkles className="w-12 h-12 text-secondary" />,
  },
  {
    title: "From days and weeks\nto mere seconds",
    description: "Our AI Prince issues cover and\nprocesses claims instantly",
    action: "Next",
    icon: <Zap className="w-12 h-12 text-secondary" />,
  },
  {
    title: "Impeccable claims\nrecord and service",
    description: "100% claims payout rate with\nover 3000 claims processed",
    action: "Next",
    icon: <ShieldCheck className="w-12 h-12 text-secondary" />,
  },
  {
    title: "Highly competitive\ninsurance rates",
    description: "Leveraging 36 years of expertise\nto offer you the best prices",
    action: "Next",
    icon: <PiggyBank className="w-12 h-12 text-secondary" />,
  },
  {
    title: "Get started with the\nfuture of insurance",
    description: "Sign up in under 2 minutes and\nget covered immediately",
    action: "Get started",
    icon: <ArrowRightCircle className="w-12 h-12 text-secondary" />,
  },
];

type SignUpStep = 'slides' | 'form' | 'verification';

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState<SignUpStep>('slides');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    agreeToTerms: false,
  });
  const [verificationCodes, setVerificationCodes] = useState({
    email: '',
    phone: '',
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < OnboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentStep('form');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically send the verification codes
    // For now, we'll just move to verification step
    setCurrentStep('verification');
    toast({
      title: "Verification codes sent",
      description: "Please check your email and phone for verification codes.",
    });
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would verify the codes
    // For now, we'll just show success and redirect
    toast({
      title: "Verification successful",
      description: "Prince AI will now complete your registration.",
    });
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate('/');
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'slides':
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center items-center h-16 mb-2">
              {OnboardingSlides[currentSlide].icon}
            </div>
            <h1 className="font-['Open_Sans'] text-xl font-bold text-primary whitespace-pre-line leading-snug tracking-tight mb-4">
              {OnboardingSlides[currentSlide].title}
            </h1>
            <p className="font-['Lato'] text-base text-muted leading-relaxed whitespace-pre-line">
              {OnboardingSlides[currentSlide].description}
            </p>
          </div>
        );

      case 'form':
        return (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, agreeToTerms: checked as boolean })
                }
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions
              </label>
            </div>
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
              Continue
            </Button>
          </form>
        );

      case 'verification':
        return (
          <form onSubmit={handleVerificationSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-center">Verify Your Account</h2>
              <p className="text-sm text-center text-muted-foreground">
                Enter the verification codes sent to your email and phone
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailCode">Email Verification Code</Label>
                <Input
                  id="emailCode"
                  value={verificationCodes.email}
                  onChange={(e) => setVerificationCodes({ ...verificationCodes, email: e.target.value })}
                  required
                  placeholder="Enter code sent to your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneCode">Phone Verification Code</Label>
                <Input
                  id="phoneCode"
                  value={verificationCodes.phone}
                  onChange={(e) => setVerificationCodes({ ...verificationCodes, phone: e.target.value })}
                  required
                  placeholder="Enter code sent to your phone"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
              Verify & Continue
            </Button>
          </form>
        );
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between p-8"
      style={{
        background: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
      }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <img
          src="/lovable-uploads/8763b5a0-eb49-4a9c-a858-332b4dcd2553.png"
          alt="Crownscope Insurance Brokers"
          className="w-[56rem] mx-auto mb-8 object-contain"
          draggable="false"
        />
        
        {renderContent()}

        {currentStep === 'slides' && (
          <>
            <div className="space-y-4 mt-10">
              <Button
                onClick={handleNext}
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold h-10"
              >
                {OnboardingSlides[currentSlide].action}
              </Button>

              <div className="flex justify-center gap-2">
                {OnboardingSlides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-secondary" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Onboarding;