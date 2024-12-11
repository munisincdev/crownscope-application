import { UserRound, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  attachment?: {
    name: string;
    url: string;
  };
}

export const ChatMessage = ({ role, content, attachment }: ChatMessageProps) => {
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
        <div className="space-y-2">
          {content && <p>{content}</p>}
          {attachment && (
            <div className="flex items-center gap-2 p-2 bg-black/5 rounded">
              <FileText className="h-4 w-4" />
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline hover:no-underline truncate"
              >
                {attachment.name}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};