import { useState } from "react";
import { OnboardingSlides } from "@/components/onboarding/OnboardingSlides";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { RegistrationChat } from "@/components/registration/RegistrationChat";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState<'slides' | 'form' | 'registration'>('slides');

  const handleNext = () => {
    if (currentSlide < OnboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentStep('form');
    }
  };

  const handleRegistrationComplete = () => {
    setCurrentStep('registration');
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
        
        {currentStep === 'slides' ? (
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
          </div>
        ) : currentStep === 'form' ? (
          <OnboardingForm onBack={() => setCurrentStep('slides')} onComplete={handleRegistrationComplete} />
        ) : (
          <RegistrationChat />
        )}
      </div>
    </div>
  );
};

export default Onboarding;