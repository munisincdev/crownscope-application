import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Message {
  role: 'assistant' | 'user';
  content: string;
  options?: {
    type: 'yesno' | 'input' | 'camera' | 'upload' | 'address' | 'calendar' | 'health';
    onResponse?: (response: any) => void;
  };
}

export const RegistrationChat = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.first_name || "there";

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi, ${firstName}! I'm Prince, your very own personal insurance assistant. My job is to get you covered at record speed!`
    },
    {
      role: 'assistant',
      content: "Before I can issue you with cover, I'll need to take a few basic details. This should only take a couple of minutes and you'll only need to do this once."
    },
    {
      role: 'assistant',
      content: "Firstly, do you have your KRA PIN to hand? We'll need this to issue you legitimate cover.",
      options: {
        type: 'yesno',
        onResponse: (hasKRA) => handleKRAResponse(hasKRA)
      }
    }
  ]);

  const [registrationData, setRegistrationData] = useState({
    kraPin: '',
    selfie: null as File | null,
    idDocument: null as File | null,
    address: '',
    dateOfBirth: '',
    hasPreExistingConditions: false
  });

  const handleKRAResponse = (hasKRA: boolean) => {
    if (hasKRA) {
      addMessage({
        role: 'assistant',
        content: "Wonderful. Could you please share it with me?",
        options: {
          type: 'input',
          onResponse: (pin) => {
            setRegistrationData(prev => ({ ...prev, kraPin: pin }));
            handleSelfiePrompt();
          }
        }
      });
    } else {
      addMessage({
        role: 'assistant',
        content: "No problem, you can always update this later in your dashboard. You'll have to do this before I can issue cover for legal purposes."
      });
      addMessage({
        role: 'assistant',
        content: "Let's proceed with registration in the meantime.",
        options: {
          type: 'camera',
          onResponse: handleSelfieCapture
        }
      });
    }
  };

  const handleSelfiePrompt = () => {
    addMessage({
      role: 'assistant',
      content: "Thanks! You can see what I look like, but I can't see you. Let's take a selfie, shall we?",
      options: {
        type: 'camera',
        onResponse: handleSelfieCapture
      }
    });
  };

  const handleSelfieCapture = (file: File) => {
    setRegistrationData(prev => ({ ...prev, selfie: file }));
    addMessage({
      role: 'assistant',
      content: "Lovely! I've now saved your photo, so in case anything comes up, like a claim, you're good to go."
    });
    addMessage({
      role: 'assistant',
      content: "Thank you for making it this far in the process. Remember this is a one-time only thing."
    });
    addMessage({
      role: 'assistant',
      content: "I'll need just one more thing to complete your registration: a copy of your ID. Do you have that at hand?",
      options: {
        type: 'yesno',
        onResponse: handleIDResponse
      }
    });
  };

  const handleIDResponse = (hasID: boolean) => {
    if (hasID) {
      addMessage({
        role: 'assistant',
        content: "Great, you can either upload it from your existing files or take a picture of it now.",
        options: {
          type: 'upload',
          onResponse: handleIDUpload
        }
      });
    } else {
      addMessage({
        role: 'assistant',
        content: "Not to worry, you can upload this later on your dashboard. I'll need this to be able to issue you cover for legal purposes."
      });
      promptForAddress();
    }
  };

  const handleIDUpload = (file: File) => {
    setRegistrationData(prev => ({ ...prev, idDocument: file }));
    addMessage({
      role: 'assistant',
      content: "That's perfect - thanks!"
    });
    promptForAddress();
  };

  const promptForAddress = () => {
    addMessage({
      role: 'assistant',
      content: "Next, I'll need your current home address.",
      options: {
        type: 'address',
        onResponse: handleAddressSelection
      }
    });
  };

  const handleAddressSelection = (address: string) => {
    setRegistrationData(prev => ({ ...prev, address }));
    addMessage({
      role: 'assistant',
      content: "Almost there!"
    });
    addMessage({
      role: 'assistant',
      content: "When were you born?",
      options: {
        type: 'calendar',
        onResponse: handleDateOfBirth
      }
    });
  };

  const handleDateOfBirth = (date: string) => {
    setRegistrationData(prev => ({ ...prev, dateOfBirth: date }));
    addMessage({
      role: 'assistant',
      content: "Lastly, could you run through the following statement and check the appropriate option?"
    });
    addMessage({
      role: 'assistant',
      content: `To the best of my knowledge, I'm not currently suffering from any one of the following:

High blood pressure, heart disease, high cholestrole levels, asthma, chronic obstructive airway disease, sinus disease, thyroid disease, diabetes mellitus, paralysis, epilepsy, sickle cell disease, leukemia, arthiritis, gout, chronic back pain/slipped disc, Pelvic Inflammatory Disease, Fibroids, Enlarged Prostate Disease, liver disease, stomach and duodenal ulcers, surgical operations, on pregnancy medication, history of caeserian, any other medical disabilities not aforementioned.`,
      options: {
        type: 'health',
        onResponse: handleHealthDeclaration
      }
    });
  };

  const handleHealthDeclaration = (hasConditions: boolean) => {
    setRegistrationData(prev => ({ ...prev, hasPreExistingConditions: hasConditions }));
    
    if (!hasConditions) {
      addMessage({
        role: 'assistant',
        content: "Thanks for completing your basic registration. You're now in a position to take out cover without having to go through this process again!"
      });
      addMessage({
        role: 'assistant',
        content: "Let me take you to your new dashboard where you can manage your cover"
      });
      // Generate report and redirect
      setTimeout(() => navigate("/"), 2000);
    } else {
      addMessage({
        role: 'assistant',
        content: "Any pre-existing condition may affect your ability to take out some covers like medical."
      });
      addMessage({
        role: 'assistant',
        content: "An advisor will reach out in the next 24 hours to run through some additional checks to complete your registration."
      });
      addMessage({
        role: 'assistant',
        content: "In the meantime, let me take you to your new dashboard"
      });
      // Generate report with conditions flag and redirect
      setTimeout(() => navigate("/"), 2000);
    }
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'assistant' 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                <p className="whitespace-pre-line">{message.content}</p>
                
                {message.options && (
                  <div className="mt-4 space-y-2">
                    {message.options.type === 'yesno' && (
                      <div className="flex gap-2">
                        <Button onClick={() => message.options?.onResponse?.(true)}>Yes</Button>
                        <Button variant="outline" onClick={() => message.options?.onResponse?.(false)}>No</Button>
                      </div>
                    )}
                    
                    {message.options.type === 'input' && (
                      <Input 
                        placeholder="Enter your KRA PIN"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            message.options?.onResponse?.((e.target as HTMLInputElement).value);
                          }
                        }}
                      />
                    )}
                    
                    {message.options.type === 'camera' && (
                      <Button onClick={() => {
                        // Implement camera capture logic
                        toast({
                          title: "Camera functionality",
                          description: "Camera capture would be implemented here"
                        });
                      }}>
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                    )}
                    
                    {message.options.type === 'upload' && (
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
                    
                    {message.options.type === 'address' && (
                      <div className="space-y-2">
                        <Input 
                          placeholder="Enter your address"
                          icon={<MapPin className="w-4 h-4" />}
                        />
                        {/* Implement address autocomplete dropdown here */}
                      </div>
                    )}
                    
                    {message.options.type === 'calendar' && (
                      <Button>
                        <Calendar className="w-4 h-4 mr-2" />
                        Select Date
                      </Button>
                    )}
                    
                    {message.options.type === 'health' && (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="no-conditions"
                            onCheckedChange={() => message.options?.onResponse?.(false)}
                          />
                          <label htmlFor="no-conditions" className="text-sm">
                            I confirm that I do not currently suffer from any of the aforementioned conditions
                          </label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="has-conditions"
                            onCheckedChange={() => message.options?.onResponse?.(true)}
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
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};