import { useState } from "react";
import { MessageCircle, UserRound, Upload, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage } from "./ChatMessage";
import { useToast } from "@/components/ui/use-toast";

const INITIAL_MESSAGE = "Hey there! 👋 I'm Prince, your personal insurance advisor. I'm here to help you find the perfect coverage that fits your needs. What would you like to know about";

interface ChatDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProduct: string | null;
}

export const ChatDialog = ({ isOpen, onOpenChange, selectedProduct }: ChatDialogProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string, attachment?: { name: string, url: string } }>>([
    { role: 'assistant', content: `${INITIAL_MESSAGE} ${selectedProduct}?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() && !selectedFile) return;

    const newMessage = {
      role: 'user' as const,
      content: message,
      ...(selectedFile && {
        attachment: {
          name: selectedFile.name,
          url: URL.createObjectURL(selectedFile)
        }
      })
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);
    setSelectedFile(null); // Clear the selected file after sending

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
              <AvatarImage src="/lovable-uploads/f30e9de8-22b6-4aa5-8f57-96b652aabd69.png" alt="Prince" />
              <AvatarFallback>
                <UserRound className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <DialogTitle className="text-base font-semibold tracking-wide mb-1">Chat with Prince</DialogTitle>
              <p className="text-xs tracking-wide text-gray-600">Your Personal Insurance Advisor</p>
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
                  <AvatarImage src="/lovable-uploads/f30e9de8-22b6-4aa5-8f57-96b652aabd69.png" alt="Prince" />
                  <AvatarFallback>
                    <UserRound className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white shadow-sm border p-3 rounded-2xl rounded-tl-none">
                  <span className="text-sm">Typing...</span>
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
            className="space-y-2"
          >
            {selectedFile && (
              <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                <span className="text-sm truncate flex-1">{selectedFile.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                name="message"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 text-sm border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-4 w-4" />
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </Button>
                <Button type="submit" size="icon" className="rounded-full">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};