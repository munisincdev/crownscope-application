import { Flag, Heart, Home, Shield, GraduationCap } from "lucide-react";

const products = [
  { icon: Flag, label: "Travel Insurance", color: "bg-[#8B7373]" },
  { icon: Heart, label: "Individual Medical", color: "bg-[#2A2A2A]" },
  { icon: Flag, label: "Golfer's Insurance", color: "bg-[#4CAF50]" },
  { icon: Shield, label: "Personal Accident", color: "bg-secondary" },
  { icon: Home, label: "Domestic Package", color: "bg-[#7E69AB]" },
];

export const InsuranceProducts = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Buy now</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <button
            key={product.label}
            className="flex flex-col items-center gap-2"
          >
            <div className={`${product.color} p-4 rounded-full`}>
              <product.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-center">{product.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};