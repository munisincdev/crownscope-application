import { useState } from "react";
import { MessageCircle, UserRound } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage } from "./ChatMessage";

const INITIAL_MESSAGE = "Hey there! 👋 I'm Prince, your personal insurance advisor. I'm here to help you find the perfect coverage that fits your needs. What would you like to know about";

interface ChatDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProduct: string | null;
}

export const ChatDialog = ({ isOpen, onOpenChange, selectedProduct }: ChatDialogProps) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I see you're interested in ${selectedProduct}! That's a great choice. I'd be happy to walk you through the coverage options and help you find the perfect plan. What specific aspects would you like to explore?`
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/lovable-uploads/9200986a-e7ad-4490-a49f-74100d47da51.png" alt="Prince" />
              <AvatarFallback>
                <UserRound className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <DialogTitle className="mb-1">Chat with Prince</DialogTitle>
              <p className="text-sm text-muted-foreground">Your Insurance Advisor</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 h-[300px] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white rounded-lg">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {isTyping && (
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/lovable-uploads/9200986a-e7ad-4490-a49f-74100d47da51.png" alt="Prince" />
                  <AvatarFallback>
                    <UserRound className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white shadow-sm border p-3 rounded-2xl rounded-tl-none">
                  Typing...
                </div>
              </div>
            )}
          </div>
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
              handleSendMessage(input.value);
              input.value = '';
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              name="message"
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-full"
            />
            <Button type="submit" size="icon" className="rounded-full">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};