
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { destinations, type Destination } from "@/services/travelDestinations";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";

type Step = 
  | 'destination'
  | 'departureDate'
  | 'returnDate'
  | 'travelingWith'
  | 'travelers'
  | 'passport';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  type?: 'destination-select' | 'date-select' | 'yes-no' | 'travelers-input' | 'passport-input';
}

export const TravelInsuranceChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey Brian, I see you'd like to take out travel cover. I can help with that.\n\nFirstly, can you tell me where you're travelling to?",
      type: 'destination-select'
    }
  ]);
  
  const [currentStep, setCurrentStep] = useState<Step>('destination');
  const [formData, setFormData] = useState({
    destination: '',
    departureDate: null as Date | null,
    returnDate: null as Date | null,
    travelingWithOthers: null as boolean | null,
    adults: 0,
    children: 0,
    passportNumber: ''
  });

  const handleDestinationSelect = (destination: string) => {
    const dest = destinations[destination as Destination];
    setFormData(prev => ({ ...prev, destination }));
    
    setMessages(prev => [
      ...prev,
      { role: 'user', content: destination },
      { 
        role: 'assistant', 
        content: `${destination} - that's great! ${dest.tips}.\n\nOkay, I'll just need to know how long you're going for. When are you planning on going?`,
        type: 'date-select'
      }
    ]);
    
    setCurrentStep('departureDate');
  };

  const handleDateSelect = (date: Date | null, type: 'departure' | 'return') => {
    if (!date) return;

    if (type === 'departure') {
      setFormData(prev => ({ ...prev, departureDate: date }));
      setMessages(prev => [
        ...prev,
        { role: 'user', content: format(date, 'PPP') },
        { 
          role: 'assistant',
          content: "And when will you be coming back to Kenya?",
          type: 'date-select'
        }
      ]);
      setCurrentStep('returnDate');
    } else {
      setFormData(prev => ({ ...prev, returnDate: date }));
      setMessages(prev => [
        ...prev,
        { role: 'user', content: format(date, 'PPP') },
        { 
          role: 'assistant',
          content: "Thanks. Will you be travelling with anyone else?",
          type: 'yes-no'
        }
      ]);
      setCurrentStep('travelingWith');
    }
  };

  const handleTravelingWithResponse = (withOthers: boolean) => {
    setFormData(prev => ({ ...prev, travelingWithOthers: withOthers }));
    
    if (withOthers) {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: 'Yes' },
        { role: 'assistant', content: "Got it.\n\nHow many people will be travelling on your policy?" },
        { role: 'assistant', content: "Please specify the number of adults (over 18) and children (under 18):", type: 'travelers-input' }
      ]);
      setCurrentStep('travelers');
    } else {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: 'No' },
        { 
          role: 'assistant',
          content: "I'll just need the following information so I can issue your policy right away.\n\nWhat's your passport number, please?",
          type: 'passport-input'
        }
      ]);
      setCurrentStep('passport');
    }
  };

  const handleTravelersSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = `${formData.adults} adult${formData.adults !== 1 ? 's' : ''} over 18 and ${formData.children} child${formData.children !== 1 ? 'ren' : ''} under 18`;
    
    setMessages(prev => [
      ...prev,
      { role: 'user', content: summary },
      { 
        role: 'assistant',
        content: "I'll just need the following information so I can issue your policy right away.\n\nWhat's your passport number, please?",
        type: 'passport-input'
      }
    ]);
    setCurrentStep('passport');
  };

  const handlePassportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).passport.value;
    setFormData(prev => ({ ...prev, passportNumber: input }));
    
    setMessages(prev => [
      ...prev,
      { role: 'user', content: input },
      { role: 'assistant', content: "Thank you. I've updated your records so you won't have to do this again." }
    ]);
  };

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
            <div className={cn(
              "rounded-lg p-4 max-w-[80%]",
              message.role === 'assistant' ? "bg-white border" : "bg-primary text-primary-foreground"
            )}>
              <p className="whitespace-pre-line">{message.content}</p>
              
              {message.type === 'destination-select' && currentStep === 'destination' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between mt-2"
                    >
                      {formData.destination || "Select destination..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search destination..." />
                      <CommandEmpty>No destination found.</CommandEmpty>
                      <CommandGroup>
                        {Object.keys(destinations).map((destination) => (
                          <CommandItem
                            key={destination}
                            value={destination}
                            onSelect={handleDestinationSelect}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.destination === destination ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {destination}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}

              {message.type === 'date-select' && (currentStep === 'departureDate' || currentStep === 'returnDate') && (
                <div className="mt-2 bg-white rounded-lg overflow-hidden">
                  <Calendar
                    mode="single"
                    selected={currentStep === 'departureDate' ? formData.departureDate : formData.returnDate}
                    onSelect={(date) => handleDateSelect(date, currentStep === 'departureDate' ? 'departure' : 'return')}
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                  />
                </div>
              )}

              {message.type === 'yes-no' && currentStep === 'travelingWith' && (
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => handleTravelingWithResponse(true)}>Yes</Button>
                  <Button variant="outline" onClick={() => handleTravelingWithResponse(false)}>No</Button>
                </div>
              )}

              {message.type === 'travelers-input' && currentStep === 'travelers' && (
                <form onSubmit={handleTravelersSubmit} className="mt-2 space-y-2">
                  <div>
                    <label className="text-sm text-gray-600">Adults over 18</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.adults}
                      onChange={(e) => setFormData(prev => ({ ...prev, adults: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Children under 18</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.children}
                      onChange={(e) => setFormData(prev => ({ ...prev, children: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <Button type="submit" className="w-full">Submit</Button>
                </form>
              )}

              {message.type === 'passport-input' && currentStep === 'passport' && (
                <form onSubmit={handlePassportSubmit} className="mt-2">
                  <Input name="passport" placeholder="Enter passport number" className="mb-2" />
                  <Button type="submit" className="w-full">Submit</Button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
