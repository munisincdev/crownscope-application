import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

interface PasswordSectionProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onChangePassword: () => void;
}

export const PasswordSection = ({
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onChangePassword
}: PasswordSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
        <Lock className="w-4 h-4 text-primary" />
        Change Password
      </h3>

      <div className="grid gap-3">
        <div>
          <Label htmlFor="current-password" className="text-sm text-gray-600">Current Password</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => onCurrentPasswordChange(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="new-password" className="text-sm text-gray-600">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => onNewPasswordChange(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="confirm-password" className="text-sm text-gray-600">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <Button 
        className="w-full bg-secondary hover:bg-secondary-light text-white"
        onClick={onChangePassword}
      >
        Change Password
      </Button>
    </div>
  );
};