import { ScrollArea } from "@/components/ui/scroll-area";

export const PrivacyPolicy = () => {
  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      <div className="space-y-4 text-sm">
        <h3 className="font-semibold text-primary">Data Collection Policy</h3>
        
        <div className="space-y-2">
          <p><span className="font-semibold">Personal Information:</span> We collect information that you provide directly to us, including your name, email address, and phone number.</p>
          
          <p><span className="font-semibold">Usage Data:</span> We automatically collect certain information about your device and how you interact with our services.</p>
          
          <p><span className="font-semibold">Insurance Information:</span> To provide insurance services, we collect relevant information about your insurance needs and history.</p>
          
          <p><span className="font-semibold">Security:</span> We implement appropriate technical and organizational measures to protect your personal data.</p>
          
          <p><span className="font-semibold">Your Rights:</span> You have the right to access, correct, or delete your personal data at any time.</p>
        </div>

        <h3 className="font-semibold text-primary pt-4">Terms and Conditions Highlights</h3>
        
        <div className="space-y-2">
          <p className="text-secondary font-medium">By creating an account, you agree to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Receive important notifications about your insurance coverage</li>
          </ul>
        </div>
      </div>
    </ScrollArea>
  );
};