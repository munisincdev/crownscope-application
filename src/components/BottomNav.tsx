import { Receipt, Shield, Home, FileText, MessageCircle } from "lucide-react";

const navItems = [
  { icon: Receipt, label: "Billing" },
  { icon: Shield, label: "Policies" },
  { icon: Home, label: "Home" },
  { icon: FileText, label: "Claims" },
  { icon: MessageCircle, label: "Support" },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-nav-background border-t border-gray-200">
      <div className="flex justify-between px-4 py-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center gap-1"
          >
            <div className="text-nav-inactive hover:text-nav">
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-xs text-nav-inactive hover:text-nav">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};