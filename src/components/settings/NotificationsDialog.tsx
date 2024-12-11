import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bell, FileCheck, RefreshCw, FileEdit, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationsDialog = ({ open, onOpenChange }: NotificationsDialogProps) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    claimsUpdate: true,
    autoRenew: true,
    newCover: true,
    policyChange: true,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      toast({
        title: `Notification ${newState[key] ? 'enabled' : 'disabled'}`,
        description: `You will ${newState[key] ? 'now' : 'no longer'} receive notifications for ${key
          .replace(/([A-Z])/g, ' $1')
          .toLowerCase()
          .trim()}.`,
      });
      return newState;
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated successfully.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-4 space-y-0 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary hover:text-primary hover:bg-primary/10"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-lg font-headers text-primary">Notification settings</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-headers text-gray-800 flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              Manage notifications
            </h3>
            <p className="text-sm text-gray-600">
              Choose which notifications you'd like to receive
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-primary" />
                  Claims update
                </Label>
                <p className="text-sm text-gray-500">
                  Get notified about the status of your claims
                </p>
              </div>
              <Switch
                checked={notifications.claimsUpdate}
                onCheckedChange={() => handleToggle('claimsUpdate')}
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-primary" />
                  Auto-renew
                </Label>
                <p className="text-sm text-gray-500">
                  Receive reminders about policy renewals
                </p>
              </div>
              <Switch
                checked={notifications.autoRenew}
                onCheckedChange={() => handleToggle('autoRenew')}
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  New cover
                </Label>
                <p className="text-sm text-gray-500">
                  Be notified when a new policy is issued
                </p>
              </div>
              <Switch
                checked={notifications.newCover}
                onCheckedChange={() => handleToggle('newCover')}
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <FileEdit className="w-4 h-4 text-primary" />
                  Policy change
                </Label>
                <p className="text-sm text-gray-500">
                  Get updates when your policy details change
                </p>
              </div>
              <Switch
                checked={notifications.policyChange}
                onCheckedChange={() => handleToggle('policyChange')}
              />
            </div>
          </div>

          <Button 
            className="w-full bg-secondary hover:bg-secondary-light text-white mt-6"
            onClick={handleSave}
          >
            Save settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};