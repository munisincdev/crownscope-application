import { Flag, Heart, Home, Shield } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

const products = [
  { icon: Flag, label: "Travel Insurance", color: "bg-[#8B7373]" },
  { icon: Heart, label: "Individual Medical", color: "bg-[#2A2A2A]" },
  { icon: Flag, label: "Golfer's Insurance", color: "bg-[#4CAF50]" },
  { icon: Shield, label: "Personal Accident", color: "bg-secondary" },
  { icon: Home, label: "Domestic Package", color: "bg-[#7E69AB]" },
];

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
        content: `Hi! I'm here to help you with your ${productLabel.toLowerCase()} policy. What would you like to know?`
      }
    ]);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I understand you're interested in ${selectedProduct}. Let me help you with that. What specific coverage details would you like to know about?`
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
            <DialogTitle>{selectedProduct}</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 h-[300px] overflow-y-auto p-4 bg-gray-50 rounded-lg">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'assistant'
                        ? 'bg-white'
                        : 'bg-primary text-white'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg">
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
                className="flex-1 p-2 border rounded-md"
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};