import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Bell, HelpCircle, User, ChevronRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AccountSettingsDialog } from "./AccountSettingsDialog";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const userEmail = "brian.k@gmail.com";
  const navigate = useNavigate();
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  const handleViewProfile = () => {
    onOpenChange(false);
    navigate('/profile');
  };

  return (
    <>
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
              <DialogTitle className="text-lg font-headers text-primary">Settings</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-2 px-2">
            {/* Profile Section */}
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800">Brian Kachumbari</h3>
                <p className="text-sm text-gray-500">{userEmail}</p>
              </div>
              <Button 
                variant="link" 
                className="text-secondary hover:text-secondary-light text-sm px-0"
                onClick={handleViewProfile}
              >
                View profile
              </Button>
            </div>

            {/* Settings Options */}
            <div className="space-y-1 p-2">
              <Button 
                variant="ghost" 
                className="w-full justify-between text-gray-700 hover:text-primary hover:bg-gray-50 h-14"
                onClick={() => setShowAccountSettings(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span>Account settings</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Button>

              <Button 
                variant="ghost" 
                className="w-full justify-between text-gray-700 hover:text-primary hover:bg-gray-50 h-14"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <span>Billing</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Button>

              <Button 
                variant="ghost" 
                className="w-full justify-between text-gray-700 hover:text-primary hover:bg-gray-50 h-14"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <span>Notifications</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Button>

              <Button 
                variant="ghost" 
                className="w-full justify-between text-gray-700 hover:text-primary hover:bg-gray-50 h-14"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span>Help and support</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Button>
            </div>

            {/* Log Out Button */}
            <div className="p-4">
              <Button 
                className="w-full bg-secondary hover:bg-secondary-light text-white"
                onClick={() => {
                  console.log("Logging out...");
                  onOpenChange(false);
                }}
              >
                Log out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AccountSettingsDialog
        open={showAccountSettings}
        onOpenChange={setShowAccountSettings}
      />
    </>
  );
};