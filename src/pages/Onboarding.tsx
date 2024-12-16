import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useNavigate } from "react-router-dom";

const OnboardingSlides = [
  {
    title: "Stress-free insurance for the 21st Century",
    description: "Africa's first AI-powered insurance solution",
    action: "SWIPE",
    image: "/lovable-uploads/779c8d4c-4855-4195-bb27-6dd676f8299f.png"
  },
  {
    title: "From days and weeks to seconds",
    description: "Our proprietary AI Prince can issue cover and process claims in seconds",
    action: "Next",
  },
  {
    title: "Impeccable claims record",
    description: "We paid out 100 per cent of over 3000 claims between 2015 and 2021",
    action: "Next",
  },
  {
    title: "Highly competitive rates",
    description: "We're leveraging over 36 years of industry experience towards getting you the best prices",
    action: "Next",
  },
  {
    title: "Get started with the future of insurance",
    description: "It'll take you less than 2 minutes to sign up so you can start getting covered immediately",
    action: "Start here",
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-8">
      <div className="w-full max-w-md">
        <img
          src="/lovable-uploads/779c8d4c-4855-4195-bb27-6dd676f8299f.png"
          alt="Crownscope Logo"
          className="w-48 mx-auto mb-12"
        />
        
        <div className="space-y-6 text-center mb-12">
          <h1 className="text-2xl font-bold font-headers">
            {OnboardingSlides[currentSlide].title}
          </h1>
          <p className="text-gray-400">
            {OnboardingSlides[currentSlide].description}
          </p>
        </div>

        <div className="space-y-6">
          {currentSlide === OnboardingSlides.length - 1 ? (
            <Button
              onClick={handleStart}
              className="w-full bg-secondary hover:bg-secondary/90"
            >
              Start here
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full bg-secondary hover:bg-secondary/90"
            >
              {OnboardingSlides[currentSlide].action}
            </Button>
          )}

          <div className="flex justify-center gap-2">
            {OnboardingSlides.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentSlide ? "bg-secondary" : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setShowAuth(true)}
            className="w-full text-center text-secondary text-sm"
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