import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PolicySelector } from "./PolicySelector";

interface ClaimsMessageProps {
  role: 'user' | 'assistant';
  content: string;
  type?: 'policy-select' | 'media-input' | 'document-upload' | 'confirmation';
  options?: any;
  onPolicySelect?: (policyId: string) => void;
}

export const ClaimsMessage = ({ role, content, type, options, onPolicySelect }: ClaimsMessageProps) => {
  const mockPolicies = [
    { id: '1', name: "Golfer's Insurance", type: "Golfer's", number: "GOL/123456" },
    { id: '2', name: "Domestic Package", type: "Home", number: "DOM/123456" },
    { id: '3', name: "Personal Accident", type: "PA", number: "PA/123456" },
  ];

  return (
    <div className={`flex items-start gap-2 ${role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
      {role === 'assistant' && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/lovable-uploads/f30e9de8-22b6-4aa5-8f57-96b652aabd69.png" alt="Prince" />
          <AvatarFallback>
            <UserRound className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[80%] space-y-2 p-3 rounded-2xl text-sm ${
          role === 'assistant'
            ? 'bg-white shadow-sm border text-foreground rounded-tl-none'
            : 'bg-primary text-primary-foreground rounded-tr-none'
        }`}
      >
        <p>{content}</p>
        {type === 'policy-select' && onPolicySelect && (
          <div className="mt-2">
            <PolicySelector 
              policies={mockPolicies}
              onSelect={onPolicySelect}
            />
          </div>
        )}
      </div>
    </div>
  );
};