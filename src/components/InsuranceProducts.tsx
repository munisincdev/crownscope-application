import { Flag, Heart, Home, Shield, UserRound, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

const products = [
  { icon: Flag, label: "Travel Insurance", color: "bg-[#8B7373]" },
  { icon: Heart, label: "Individual Medical", color: "bg-[#2A2A2A]" },
  { icon: Flag, label: "Golfer's Insurance", color: "bg-[#4CAF50]" },
  { icon: Shield, label: "Personal Accident", color: "bg-secondary" },
  { icon: Home, label: "Domestic Package", color: "bg-[#7E69AB]" },
];

const INITIAL_MESSAGE = "Hey there! 👋 I'm Prince, your personal insurance advisor. I'm here to help you find the perfect coverage that fits your needs. What would you like to know about";

export const InsuranceProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleProductClick = (productLabel: string) => {
    setSelectedProduct(productLabel);
    setIsDialogOpen(true);
    setMessages([
      {
        role: 'assistant',
        content: `${INITIAL_MESSAGE} ${productLabel.toLowerCase()}?`
      }
    ]);
  };

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
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Buy now</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <button
            key={product.label}
            className="flex flex-col items-center gap-2"
            onClick={() => handleProductClick(product.label)}
          >
            <div className={`${product.color} p-4 rounded-full`}>
              <product.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-center">{product.label}</span>
          </button>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10 bg-secondary">
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
                <div
                  key={index}
                  className={`flex items-start gap-2 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 bg-secondary">
                      <AvatarFallback>
                        <UserRound className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'assistant'
                        ? 'bg-white shadow-sm border'
                        : 'bg-secondary text-white'
                    } ${message.role === 'assistant' ? 'rounded-tl-none' : 'rounded-tr-none'}`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <Avatar className="h-8 w-8 bg-secondary">
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
    </div>
  );
};