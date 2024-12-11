import { FileCheck, Shield, FileText, RefreshCw } from "lucide-react";

const actions = [
  { icon: FileCheck, label: "Make a\nclaim", color: "bg-action-claim" },
  { icon: Shield, label: "Buy\ncover", color: "bg-action-cover" },
  { icon: FileText, label: "My\ndocuments", color: "bg-action-documents" },
  { icon: RefreshCw, label: "Renewal\ncentre", color: "bg-action-renewal" },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {actions.map((action) => (
        <button
          key={action.label}
          className="flex flex-col items-center gap-2"
        >
          <div className={`${action.color} p-4 rounded-full`}>
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-center whitespace-pre-line">{action.label}</span>
        </button>
      ))}
    </div>
  );
};