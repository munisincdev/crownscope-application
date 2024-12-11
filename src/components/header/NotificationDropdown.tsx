import { Bell } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Notification = {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  read: boolean;
};

export const NotificationDropdown = ({ 
  notifications 
}: { 
  notifications: Notification[] 
}) => {
  const unreadNotifications = notifications.filter(notif => !notif.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <div className="bg-primary hover:bg-primary-light transition-colors duration-200 p-2 rounded-full">
          <Bell className="w-4 h-4 text-white" />
        </div>
        {unreadNotifications > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs">
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
                    <div className="pointer-events-none select-none">
                      <Badge className="bg-secondary text-white text-xs mb-1">
                        Action Required
                      </Badge>
                    </div>
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
  );
};