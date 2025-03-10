
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { capitalizeFirstLetter } from "@/utils/textFormatting";
import { validatePassword } from "@/utils/passwordValidation";
import { TermsCheckbox } from "./TermsCheckbox";
import { PasswordFields } from "./PasswordFields";

interface OnboardingFormProps {
  onBack: () => void;
  onComplete: () => void;
}

export const OnboardingForm = ({ onBack, onComplete }: OnboardingFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      const errors = Object.values(passwordValidation.errors).filter(error => error);
      toast({
        title: "Invalid password",
        description: errors.join(". "),
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Account created",
      description: "Proceeding to the dashboard.",
    });
    
    onComplete();
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
      
      <PasswordFields
        password={formData.password}
        confirmPassword={formData.confirmPassword}
        onPasswordChange={(password) => setFormData(prev => ({ ...prev, password }))}
        onConfirmPasswordChange={(confirmPassword) => 
          setFormData(prev => ({ ...prev, confirmPassword }))
        }
      />

      <TermsCheckbox
        checked={formData.agreeToTerms}
        onCheckedChange={(checked) => 
          setFormData(prev => ({ ...prev, agreeToTerms: checked }))
        }
      />

      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary-light text-white transition-colors duration-200 text-sm tracking-wide"
        >
          Create account
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full text-secondary hover:text-secondary-light hover:bg-secondary/10 transition-colors duration-200 text-sm tracking-wide"
        >
          Back
        </Button>
      </div>
    </form>
  );
};
