import { FileCheck, Shield, FileText, RefreshCw } from "lucide-react";
import { useState } from "react";
import { ClaimsDialog } from "./claims/ClaimsDialog";

const actions = [
  { icon: FileCheck, label: "Make a\nclaim", color: "bg-action-claim" },
  { icon: Shield, label: "Buy\ncover", color: "bg-action-cover" },
  { icon: FileText, label: "My\ndocuments", color: "bg-action-documents" },
  { icon: RefreshCw, label: "Renewal\ncentre", color: "bg-action-renewal" },
];

export const QuickActions = () => {
  const [isClaimsDialogOpen, setIsClaimsDialogOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-4 gap-3 md:gap-4 p-3 md:p-6 bg-white rounded-lg shadow-sm">
        {actions.map((action, index) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-2 md:gap-3 group"
            onClick={() => {
              if (index === 0) setIsClaimsDialogOpen(true);
            }}
          >
            <div className={`${action.color} p-3 md:p-4 rounded-full transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
              <action.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xs md:text-sm tracking-wide text-center whitespace-pre-line leading-snug group-hover:text-primary font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      <ClaimsDialog 
        isOpen={isClaimsDialogOpen}
        onOpenChange={setIsClaimsDialogOpen}
      />
    </>
  );
};