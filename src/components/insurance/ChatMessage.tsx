import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div className={`flex items-start gap-2 ${role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
      {role === 'assistant' && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/lovable-uploads/9200986a-e7ad-4490-a49f-74100d47da51.png" alt="Prince" />
          <AvatarFallback>
            <UserRound className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
          role === 'assistant'
            ? 'bg-white shadow-sm border text-foreground'
            : 'bg-primary text-primary-foreground'
        } ${role === 'assistant' ? 'rounded-tl-none' : 'rounded-tr-none'}`}
      >
        {content}
      </div>
    </div>
  );
};