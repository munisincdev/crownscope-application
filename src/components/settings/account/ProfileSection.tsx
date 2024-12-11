import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Mail, Phone, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProfileSectionProps {
  name: string;
  email: string;
  phone: string;
  profileImage: string | null;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

export const ProfileSection = ({
  name,
  email,
  phone,
  profileImage,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onImageUpload,
  onSave
}: ProfileSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-20 h-20 border-2 border-white shadow">
            <AvatarImage src={profileImage || undefined} />
            <AvatarFallback className="bg-primary/10">
              <User className="w-6 h-6 text-primary" />
            </AvatarFallback>
          </Avatar>
          <label 
            htmlFor="profile-image" 
            className="absolute bottom-0 right-0 p-1.5 bg-primary hover:bg-primary-light text-white rounded-full cursor-pointer shadow-md transition-colors"
          >
            <Camera className="w-3 h-3" />
            <input
              type="file"
              id="profile-image"
              className="hidden"
              accept="image/*"
              onChange={onImageUpload}
            />
          </label>
        </div>
        <span className="text-secondary hover:text-secondary-light text-sm cursor-pointer">
          Change picture
        </span>
      </div>

      <div className="grid gap-3">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4 text-primary" />
            Full Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-primary" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-primary" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <Button 
        className="w-full bg-secondary hover:bg-secondary-light text-white"
        onClick={onSave}
      >
        Save Changes
      </Button>
    </div>
  );
};