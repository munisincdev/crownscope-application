import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useNavigate } from "react-router-dom";
import { Sparkles, Zap, ShieldCheck, PiggyBank, ArrowRightCircle } from "lucide-react";

const OnboardingSlides = [
  {
    title: "Stress-free insurance\nfor the 21st Century",
    description: "Africa's first AI-powered\ninsurance solution",
    action: "Get Started",
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
    action: "Start here",
    icon: <ArrowRightCircle className="w-12 h-12 text-secondary" />,
  },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < OnboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleStart = () => {
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    navigate('/');
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
          className="w-[44rem] mx-auto mb-8 object-contain"
          draggable="false"
        />
        
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

        <div className="space-y-4 mt-10">
          {currentSlide === OnboardingSlides.length - 1 ? (
            <Button
              onClick={handleStart}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold h-10"
            >
              Start here
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold h-10"
            >
              {OnboardingSlides[currentSlide].action}
            </Button>
          )}

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

          <button
            onClick={() => setShowAuth(true)}
            className="w-full text-center text-secondary hover:text-secondary/90 transition-colors text-sm font-medium"
          >
            Already a member? Sign in
          </button>
        </div>
      </div>

      <AuthDialog
        isOpen={showAuth}
        onOpenChange={setShowAuth}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Onboarding;