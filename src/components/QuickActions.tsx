import { FileCheck, Shield, FileText, RefreshCw } from "lucide-react";

const actions = [
  { icon: FileCheck, label: "Make a claim", color: "bg-[#7E69AB]" },
  { icon: Shield, label: "Buy cover", color: "bg-[#7FB69C]" },
  { icon: FileText, label: "My documents", color: "bg-[#7AA1D2]" },
  { icon: RefreshCw, label: "Renewal centre", color: "bg-[#8B7373]" },
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
          <span className="text-xs text-center">{action.label}</span>
        </button>
      ))}
    </div>
  );
};