import { UserRound, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, Upload, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

interface MessageProps {
  role: 'assistant' | 'user';
  content: string;
  options?: {
    type: 'yesno' | 'input' | 'camera' | 'upload' | 'address' | 'calendar' | 'health';
    onResponse?: (response: any) => void;
  };
}

export const ChatMessage = ({ role, content, options }: MessageProps) => {
  const { toast } = useToast();
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingSpeed = 30; // milliseconds per character

  useEffect(() => {
    if (role === 'assistant') {
      let currentIndex = 0;
      setIsTyping(true);
      
      const typingInterval = setInterval(() => {
        if (currentIndex < content.length) {
          setDisplayedContent(content.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    } else {
      setDisplayedContent(content);
      setIsTyping(false);
    }
  }, [content, role]);

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
        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
          role === 'assistant'
            ? 'bg-white shadow-sm border text-foreground'
            : 'bg-primary text-primary-foreground'
        } ${role === 'assistant' ? 'rounded-tl-none' : 'rounded-tr-none'}`}
      >
        <div className="space-y-2">
          <p className="whitespace-pre-line">
            {displayedContent}
            {isTyping && role === 'assistant' && (
              <span className="inline-block animate-pulse">▋</span>
            )}
          </p>
          
          {!isTyping && options && (
            <div className="mt-4 space-y-2">
              {options.type === 'yesno' && (
                <div className="flex gap-2">
                  <Button 
                    onClick={() => options.onResponse?.(true)}
                    className="text-sm tracking-wide"
                  >
                    Yes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => options.onResponse?.(false)}
                    className="text-sm tracking-wide"
                  >
                    No
                  </Button>
                </div>
              )}
              
              {options.type === 'input' && (
                <InputWithIcon 
                  placeholder="Enter your KRA PIN"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      options.onResponse?.((e.target as HTMLInputElement).value);
                    }
                  }}
                />
              )}
              
              {options.type === 'camera' && (
                <Button 
                  onClick={() => {
                    toast({
                      title: "Camera functionality",
                      description: "Camera capture would be implemented here"
                    });
                  }}
                  className="text-sm tracking-wide"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              )}
              
              {options.type === 'upload' && (
                <div className="flex gap-2">
                  <Button className="text-sm tracking-wide">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" className="text-sm tracking-wide">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              )}
              
              {options.type === 'address' && (
                <div className="space-y-2">
                  <InputWithIcon 
                    placeholder="Enter your address"
                    icon={<MapPin className="w-4 h-4" />}
                  />
                </div>
              )}
              
              {options.type === 'calendar' && (
                <Button className="text-sm tracking-wide">
                  <Calendar className="w-4 h-4 mr-2" />
                  Select Date
                </Button>
              )}
              
              {options.type === 'health' && (
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="no-conditions"
                      onCheckedChange={() => options.onResponse?.(false)}
                    />
                    <label htmlFor="no-conditions" className="text-sm">
                      I confirm that I do not currently suffer from any of the aforementioned conditions
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="has-conditions"
                      onCheckedChange={() => options.onResponse?.(true)}
                    />
                    <label htmlFor="has-conditions" className="text-sm">
                      I suffer from one or more of the aforementioned conditions
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};