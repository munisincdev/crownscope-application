import { Mail } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Email = {
  id: number;
  subject: string;
  date: string;
  read: boolean;
};

export const EmailDropdown = ({ recentEmails }: { recentEmails: Email[] }) => {
  const unreadCount = recentEmails.filter(email => !email.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <div className="bg-primary hover:bg-primary-light transition-colors duration-200 p-2 rounded-full">
          <Mail className="w-4 h-4 text-white" />
        </div>
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs">
            {unreadCount}
          </Badge>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2 bg-white border border-gray-200 shadow-lg">
        {recentEmails.map((email) => (
          <DropdownMenuItem 
            key={email.id} 
            className="flex flex-col items-start py-2 cursor-pointer hover:bg-gray-50 rounded-md focus:bg-gray-50 focus:text-inherit"
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
  );
};