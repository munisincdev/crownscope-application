import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChatMessage } from "./ChatMessage";
import { useRegistration } from "@/hooks/useRegistration";

export const RegistrationChat = () => {
  const { messages } = useRegistration();

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};