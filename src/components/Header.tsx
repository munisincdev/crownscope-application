import { Bell, Mail, Settings } from "lucide-react";
import { Badge } from "./ui/badge";

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white">
      <img src="/lovable-uploads/9200986a-e7ad-4490-a49f-74100d47da51.png" alt="Crownscope Logo" className="h-12" />
      <div className="flex gap-4">
        <div className="relative">
          <Mail className="w-6 h-6 text-secondary" />
          <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs">1</Badge>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6 text-secondary" />
          <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs">1</Badge>
        </div>
        <Settings className="w-6 h-6 text-secondary" />
      </div>
    </header>
  );
};