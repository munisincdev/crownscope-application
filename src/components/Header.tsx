import { Settings } from "lucide-react";
import { EmailDropdown } from "./header/EmailDropdown";
import { NotificationDropdown } from "./header/NotificationDropdown";
import { useState } from "react";
import { SettingsDialog } from "./settings/SettingsDialog";

export const Header = () => {
  const [showSettings, setShowSettings] = useState(false);
  
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

  return (
    <header className="flex justify-between items-center bg-white px-6 py-3 shadow-sm">
      <img 
        src="/lovable-uploads/8763b5a0-eb49-4a9c-a858-332b4dcd2553.png" 
        alt="Crownscope Insurance Brokers Logo" 
        className="h-32 w-auto transition-transform hover:scale-105 object-contain"
        draggable="false"
        loading="eager"
      />
      <div className="flex gap-4">
        <EmailDropdown recentEmails={recentEmails} />
        <NotificationDropdown notifications={notifications} />
        <button 
          onClick={() => setShowSettings(true)}
          className="bg-primary hover:bg-primary-light transition-colors duration-200 p-2 rounded-full"
        >
          <Settings className="w-4 h-4 text-white" />
        </button>
      </div>

      <SettingsDialog 
        open={showSettings}
        onOpenChange={setShowSettings}
      />
    </header>
  );
};
