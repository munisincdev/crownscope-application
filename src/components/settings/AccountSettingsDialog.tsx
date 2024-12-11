import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AccountSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AccountSettingsDialog = ({ open, onOpenChange }: AccountSettingsDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("Brian Kachumbari");
  const [email, setEmail] = useState("brian.k@gmail.com");
  const [phone, setPhone] = useState("+254 712 345 678");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Here you would typically make an API call to update the profile
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically make an API call to change the password
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully.",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white p-0 gap-0">
        <DialogHeader className="p-4 space-y-0 border-b">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary hover:text-primary-light hover:bg-primary/10"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-lg font-headers text-primary">Account Settings</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-4 space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={profileImage || undefined} />
                <AvatarFallback className="bg-primary/10">
                  <User className="w-8 h-8 text-primary" />
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="profile-image" 
                className="absolute bottom-0 right-0 p-2 bg-primary hover:bg-primary-light text-white rounded-full cursor-pointer shadow-md transition-colors"
              >
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <span className="text-secondary hover:text-secondary-light text-sm cursor-pointer">
              Change picture
            </span>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-gray-200"
              />
            </div>

            <Button 
              className="w-full bg-secondary hover:bg-secondary-light text-white"
              onClick={handleSaveProfile}
            >
              Save Changes
            </Button>
          </div>

          {/* Password Change */}
          <div className="pt-4 border-t space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              Change Password
            </h3>

            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-gray-200"
              />
            </div>

            <Button 
              className="w-full bg-secondary hover:bg-secondary-light text-white"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};