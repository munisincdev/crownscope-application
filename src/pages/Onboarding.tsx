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
    title: "From days and weeks\nto seconds",
    description: "Our proprietary AI Prince can issue cover\nand process claims in seconds",
    action: "Next",
    icon: <Zap className="w-12 h-12 text-secondary" />,
  },
  {
    title: "Impeccable claims\nrecord",
    description: "We paid out 100 per cent of over\n3000 claims between 2015 and 2021",
    action: "Next",
    icon: <ShieldCheck className="w-12 h-12 text-secondary" />,
  },
  {
    title: "Highly competitive\nrates",
    description: "We're leveraging over 36 years of industry\nexperience towards getting you the best prices",
    action: "Next",
    icon: <PiggyBank className="w-12 h-12 text-secondary" />,
  },
  {
    title: "Get started with the\nfuture of insurance",
    description: "It'll take you less than 2 minutes to sign up\nso you can start getting covered immediately",
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
          className="w-64 mx-auto mb-12 object-contain"
          draggable="false"
        />
        
        <div className="space-y-8 text-center">
          <div className="flex justify-center items-center h-16">
            {OnboardingSlides[currentSlide].icon}
          </div>
          <h1 className="text-2xl font-bold font-headers text-primary whitespace-pre-line leading-tight tracking-tight">
            {OnboardingSlides[currentSlide].title}
          </h1>
          <p className="text-muted text-lg leading-relaxed whitespace-pre-line font-sans">
            {OnboardingSlides[currentSlide].description}
          </p>
        </div>

        <div className="space-y-6 mt-12">
          {currentSlide === OnboardingSlides.length - 1 ? (
            <Button
              onClick={handleStart}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-6 h-auto text-base"
            >
              Start here
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-6 h-auto text-base"
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