import { Button } from "@/components/ui/button";
import { Fingerprint, Scan } from "lucide-react";

interface AlternativeAuthProps {
  handleBiometricAuth: () => void;
  handleFaceID: () => void;
}

export const AlternativeAuth = ({
  handleBiometricAuth,
  handleFaceID,
}: AlternativeAuthProps) => {
  return (
    <div className="space-y-5">
      <p className="text-center text-sm text-gray-600 font-sans">Or sign in with</p>
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleBiometricAuth}
          className="flex items-center justify-center gap-3 border-gray-200 hover:bg-gray-50"
        >
          <Fingerprint className="w-4 h-4 text-primary" />
          Fingerprint
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleFaceID}
          className="flex items-center justify-center gap-3 border-gray-200 hover:bg-gray-50"
        >
          <Scan className="w-4 h-4 text-primary" />
          Face ID
        </Button>
      </div>
    </div>
  );
};