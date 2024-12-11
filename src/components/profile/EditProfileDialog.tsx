import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditProfileDialog = ({ open, onOpenChange }: EditProfileDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("Brian Kachumbari");
  const [email, setEmail] = useState("brian.k@gmail.com");

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    console.log("Saving profile...", { name, email });
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    onOpenChange(false);
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
            <DialogTitle className="text-lg font-headers text-primary">Edit Profile</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-200"
            />
          </div>

          <Button 
            className="w-full bg-secondary hover:bg-secondary-light text-white mt-4"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};