import { Mail, Bell, Settings } from "lucide-react";
import { Badge } from "./ui/badge";

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white">
      <img 
        src="/lovable-uploads/9200986a-e7ad-4490-a49f-74100d47da51.png" 
        alt="Crownscope Logo" 
        className="h-12"
        key={Date.now()} // Force image refresh
      />
      <div className="flex gap-4">
        <div className="relative">
          <div className="bg-[#8B2F97] p-2 rounded-full">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <Badge className="absolute -top-2 -right-2 bg-[#8B2F97] text-white text-xs">1</Badge>
        </div>
        <div className="relative">
          <div className="bg-[#8B2F97] p-2 rounded-full">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <Badge className="absolute -top-2 -right-2 bg-[#8B2F97] text-white text-xs">1</Badge>
        </div>
        <div className="bg-[#8B2F97] p-2 rounded-full">
          <Settings className="w-5 h-5 text-white" />
        </div>
      </div>
    </header>
  );
};