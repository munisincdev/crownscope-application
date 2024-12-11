import { Mail, Bell, Settings } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Header = () => {
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

  const notifications = [
    {
      id: 1,
      title: "Document Upload Required",
      description: "Please upload your medical report for claim processing",
      type: "action_required",
      date: "2024-03-15T16:30:00",
      read: false,
    },
    {
      id: 2,
      title: "Claim Update",
      description: "Your claim has been approved. Check details.",
      type: "update",
      date: "2024-03-14T11:20:00",
      read: false,
    },
    {
      id: 3,
      title: "Policy Renewal",
      description: "Your policy expires in 30 days. Renew now.",
      type: "reminder",
      date: "2024-03-13T09:45:00",
      read: true,
    },
    {
      id: 4,
      title: "Complete Purchase",
      description: "Continue with your travel insurance purchase",
      type: "action_required",
      date: "2024-03-12T14:15:00",
      read: true,
    },
    {
      id: 5,
      title: "Information Update",
      description: "Please update your contact information",
      type: "action_required",
      date: "2024-03-11T10:30:00",
      read: true,
    },
  ];

  const unreadNotifications = notifications.filter(notif => !notif.read).length;

  return (
    <header className="flex justify-between items-center bg-white px-6 py-3 shadow-sm">
      <img 
        src="/lovable-uploads/1cd6fa64-14b1-446e-999d-5031ea3a85d8.png" 
        alt="Crownscope Insurance Brokers Logo" 
        className="h-24 w-auto drop-shadow-lg transition-transform hover:scale-105 object-contain"
        style={{ 
          imageRendering: 'crisp-edges',
          filter: 'contrast(1.1) brightness(1.05)'
        }}
        draggable="false"
        loading="eager"
      />
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="relative">
            <div className="bg-primary hover:bg-primary-light transition-colors duration-200 p-2 rounded-full">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs">1</Badge>
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

      <DropdownMenu>
        <DropdownMenuTrigger className="relative">
          <div className="bg-primary hover:bg-primary-light transition-colors duration-200 p-2 rounded-full">
            <Bell className="w-4 h-4 text-white" />
          </div>
          {unreadNotifications > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-destructive text-white text-xs">
              {unreadNotifications}
            </Badge>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-2 bg-white border border-gray-200 shadow-lg divide-y divide-gray-100">
          <div className="px-3 py-2 text-sm font-semibold text-gray-900">
            Notifications ({unreadNotifications} unread)
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className={`
                  flex flex-col items-start p-3 cursor-pointer 
                  hover:bg-gray-50 rounded-md focus:bg-gray-50 focus:text-inherit
                  ${!notification.read ? 'bg-gray-50' : ''}
                  transition-colors duration-200
                `}
              >
                <div className="flex items-start gap-2 w-full">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {notification.title}
                      </span>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {new Date(notification.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    {!notification.read && (
                      <Badge className="bg-destructive text-white text-xs mb-1">
                        Action Required
                      </Badge>
                    )}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {notification.description}
                    </p>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
          <div className="px-3 py-2">
            <button className="text-sm text-primary hover:text-primary-light transition-colors w-full text-center">
              View all notifications
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="bg-primary hover:bg-primary-light transition-colors duration-200 p-2 rounded-full">
        <Settings className="w-4 h-4 text-white" />
      </div>
    </header>
  );
};
