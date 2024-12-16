import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChatMessage } from "./ChatMessage";
import { useRegistration } from "@/hooks/useRegistration";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

export const RegistrationChat = () => {
  const { messages } = useRegistration();

  return (
    <Dialog open={true}>
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
        
        <div className="flex flex-col gap-4 h-[300px] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white rounded-lg">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};