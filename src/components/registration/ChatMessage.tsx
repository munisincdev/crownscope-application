import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, Upload, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

  return (
    <div className={`flex ${role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] p-3 rounded-lg ${
        role === 'assistant' 
          ? 'bg-primary/10 text-primary' 
          : 'bg-secondary text-secondary-foreground'
      }`}>
        <p className="whitespace-pre-line">{content}</p>
        
        {options && (
          <div className="mt-4 space-y-2">
            {options.type === 'yesno' && (
              <div className="flex gap-2">
                <Button onClick={() => options.onResponse?.(true)}>Yes</Button>
                <Button variant="outline" onClick={() => options.onResponse?.(false)}>No</Button>
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
              <Button onClick={() => {
                toast({
                  title: "Camera functionality",
                  description: "Camera capture would be implemented here"
                });
              }}>
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            )}
            
            {options.type === 'upload' && (
              <div className="flex gap-2">
                <Button>
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline">
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
              <Button>
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
  );
};