import { Mail, Bell, Settings, ChevronDown } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Header = () => {
  // Mock data for recent emails - in a real app, this would come from an API
  const recentEmails = [
    {
      id: 1,
      subject: "Policy Renewal Notice - GOL/072244355/25",
      date: "2024-03-15T14:30:00",
      read: false,
    },
    {
      id: 2,
      subject: "Premium Payment Confirmation",
      date: "2024-03-14T09:15:00",
      read: true,
    },
    {
      id: 3,
      subject: "Policy Update: Coverage Enhancement",
      date: "2024-03-13T16:45:00",
      read: true,
    },
    {
      id: 4,
      subject: "Claim Status Update",
      date: "2024-03-12T11:20:00",
      read: true,
    },
    {
      id: 5,
      subject: "Important: Policy Document Available",
      date: "2024-03-11T13:10:00",
      read: true,
    },
  ];

  return (
    <header className="flex justify-between items-center bg-white">
      <img 
        src="/lovable-uploads/1cd6fa64-14b1-446e-999d-5031ea3a85d8.png" 
        alt="Crownscope Insurance Brokers Logo" 
        className="h-24 drop-shadow-md transition-transform hover:scale-105 object-contain pl-2"
        key={Date.now()}
        loading="eager"
      />
      <div className="flex gap-4 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="relative">
            <div className="bg-primary hover:bg-primary-light transition-colors duration-200 p-2 rounded-full">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs">1</Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-2 bg-white border border-gray-200 shadow-lg">
            {recentEmails.map((email) => (
              <DropdownMenuItem 
                key={email.id} 
                className="flex flex-col items-start py-3 cursor-pointer hover:bg-gray-50 rounded-md focus:bg-gray-50 focus:text-inherit"
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="text-sm font-medium truncate flex-1 text-gray-900 group-hover:text-gray-900">
                    {email.subject}
                  </span>
                  {!email.read && (
                    <Badge className="bg-secondary text-white text-xs">New</Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(email.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative">
          <div className="bg-primary hover:bg-primary-light transition-colors duration-200 p-2 rounded-full">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs">1</Badge>
        </div>
        <div className="bg-primary hover:bg-primary-light transition-colors duration-200 p-2 rounded-full">
          <Settings className="w-5 h-5 text-white" />
        </div>
      </div>
    </header>
  );
};