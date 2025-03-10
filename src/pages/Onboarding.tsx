
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingSlides } from "@/components/onboarding/OnboardingSlides";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState<'slides' | 'form'>('slides');
  const { bypassAuth } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentSlide < OnboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentStep('form');
    }
  };

  const handleSkipToMain = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    bypassAuth();
    toast({
      title: "Development Mode",
      description: "Authentication bypassed. You now have access to all features.",
    });
    navigate("/");
  };

  const handleFormComplete = () => {
    // Skip verification and go straight to the main dashboard
    localStorage.setItem("hasSeenOnboarding", "true");
    bypassAuth();
    toast({
      title: "Account Created",
      description: "You have been automatically signed in for development purposes.",
    });
    navigate("/");
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
          className="w-full h-auto max-h-32 object-contain mx-auto mb-8 filter contrast-125 brightness-105"
          draggable="false"
        />
        
        {currentStep === 'slides' && (
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

            <div className="space-y-4 mt-10">
              <Button
                onClick={handleNext}
                className="w-full bg-secondary hover:bg-secondary-light text-white transition-colors duration-200 text-sm tracking-wide h-10"
              >
                {OnboardingSlides[currentSlide].action}
              </Button>

              <Button
                onClick={handleSkipToMain}
                variant="outline"
                className="w-full border-dashed border-yellow-400 text-yellow-600 hover:bg-yellow-50"
              >
                Development: Skip to Main Dashboard
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
          </div>
        )}

        {currentStep === 'form' && (
          <OnboardingForm 
            onBack={() => setCurrentStep('slides')} 
            onComplete={handleFormComplete} 
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
