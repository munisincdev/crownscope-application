import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PrivacyPolicy } from "../policy/PrivacyPolicy";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { capitalizeFirstLetter } from "@/utils/textFormatting";

interface OnboardingFormProps {
  onBack: () => void;
  onComplete: (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
}

export const OnboardingForm = ({ onBack, onComplete }: OnboardingFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    agreeToTerms: false,
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number to continue.",
        variant: "destructive",
      });
      return;
    }
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms & conditions",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Verification required",
      description: "Please check your phone and email for verification codes.",
    });
    
    onComplete({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'email' ? value.toLowerCase() : capitalizeFirstLetter(value)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First name</Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last name</Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone number</Label>
        <PhoneInput
          country={'ke'}
          value={formData.phone}
          onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
          inputClass="!w-full !h-9 !text-sm"
          containerClass="!w-full"
          buttonClass="!h-9"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => 
            setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
          }
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-secondary hover:text-secondary-light underline">
                  terms and conditions
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <PrivacyPolicy />
              </DialogContent>
            </Dialog>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary-light text-white transition-colors duration-200 text-sm tracking-wide"
        >
          Create account
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
  );
};