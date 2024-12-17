import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, Mic, Video, Send, Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ClaimsMessage } from "./ClaimsMessage";
import { PolicySelector } from "./PolicySelector";

type PolicyType = "golfer" | "domestic" | "personal_accident" | "travel" | "medical";

interface ClaimsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ClaimsDialog = ({ isOpen, onOpenChange }: ClaimsDialogProps) => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.first_name || "there";
  
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    type?: 'policy-select' | 'media-input' | 'document-upload' | 'confirmation';
    options?: any;
  }>>([
    {
      role: 'assistant',
      content: `Hey ${firstName}. I understand you'd like to report a claim. I'll be happy to help with that.`
    },
    {
      role: 'assistant',
      content: "First, can you confirm which policy you're claiming under?",
      type: 'policy-select'
    }
  ]);

  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);

  const handlePolicySelect = (policyId: string) => {
    setSelectedPolicy(policyId);
    setMessages(prev => [...prev, 
      { role: 'user', content: `Selected policy: ${policyId}` },
      { 
        role: 'assistant', 
        content: "I see. Can you tell me what happened? Remember you can record a voice note, shoot a live video recording or text.",
        type: 'media-input'
      }
    ]);
  };

  const getDocumentRequestMessage = (policyType: PolicyType) => {
    switch(policyType) {
      case "golfer":
        return "Thank you. Could you please upload a copy of the receipt for the replacement of your item?";
      case "domestic":
        return "Thank you. Could you please upload a copy of the receipt for the repairs done or the items that have been replaced?";
      case "personal_accident":
        return "Thank you. Could you please upload a copy of the hospital receipt for treatment following the accident?";
      case "travel":
        return "Thank you. Could you please upload any relevant documentation such as receipts and hospital discharge vouchers?";
      case "medical":
        return "Thank you. Could you please upload your hospital receipt and/or discharge voucher following treatment?";
      default:
        return "Thank you. Could you please upload the relevant documentation for your claim?";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/lovable-uploads/f30e9de8-22b6-4aa5-8f57-96b652aabd69.png" alt="Prince" />
              <AvatarFallback>
                <UserRound className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <DialogTitle className="text-base font-semibold tracking-wide mb-1">Chat with Prince</DialogTitle>
              <p className="text-xs tracking-wide text-gray-600">Your personal insurance advisor</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 h-[300px] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white rounded-lg">
            {messages.map((message, index) => (
              <ClaimsMessage 
                key={index} 
                {...message} 
                onPolicySelect={handlePolicySelect}
              />
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setIsRecording(!isRecording)}
              >
                <Mic className={`h-4 w-4 ${isRecording ? 'text-red-500' : ''}`} />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setIsVideoRecording(!isVideoRecording)}
              >
                <Video className={`h-4 w-4 ${isVideoRecording ? 'text-red-500' : ''}`} />
              </Button>
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 text-sm border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Handle message sending
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button type="submit" size="icon" className="rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};