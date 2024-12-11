import { Flag, Heart, Home, Plane, Shield } from "lucide-react";

const products = [
  { icon: Plane, label: "Travel insurance", color: "bg-product-travel" },
  { icon: Heart, label: "Individual medical", color: "bg-secondary" },
  { icon: Flag, label: "Golfer's insurance", color: "bg-product-golfer" },
  { icon: Shield, label: "Personal accident", color: "bg-product-accident" },
  { icon: Home, label: "Domestic package", color: "bg-product-domestic" },
];

interface ProductGridProps {
  onProductSelect: (productLabel: string) => void;
}

export const ProductGrid = ({ onProductSelect }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <button
        key={products[0].label}
        className="flex flex-col items-center justify-center gap-3 py-2 group col-span-1"
        onClick={() => onProductSelect(products[0].label)}
      >
        <div className={`${products[0].color} p-4 rounded-full transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
          <products[0].icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs text-gray-600 text-center leading-tight min-h-[2.5rem] group-hover:text-primary">
          {products[0].label}
        </span>
      </button>

      <button
        key={products[1].label}
        className="flex flex-col items-center justify-center gap-3 py-2 group col-span-1"
        onClick={() => onProductSelect(products[1].label)}
      >
        <div className={`${products[1].color} p-4 rounded-full transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
          <products[1].icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs text-gray-600 text-center leading-tight min-h-[2.5rem] group-hover:text-primary">
          {products[1].label}
        </span>
      </button>

      <button
        key={products[2].label}
        className="flex flex-col items-center justify-center gap-3 py-2 group col-span-1"
        onClick={() => onProductSelect(products[2].label)}
      >
        <div className={`${products[2].color} p-4 rounded-full transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
          <products[2].icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs text-gray-600 text-center leading-tight min-h-[2.5rem] group-hover:text-primary">
          {products[2].label}
        </span>
      </button>

      <button
        key={products[3].label}
        className="flex flex-col items-center justify-center gap-3 py-2 group col-start-2"
        onClick={() => onProductSelect(products[3].label)}
      >
        <div className={`${products[3].color} p-4 rounded-full transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
          <products[3].icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs text-gray-600 text-center leading-tight min-h-[2.5rem] group-hover:text-primary">
          {products[3].label}
        </span>
      </button>

      <button
        key={products[4].label}
        className="flex flex-col items-center justify-center gap-3 py-2 group"
        onClick={() => onProductSelect(products[4].label)}
      >
        <div className={`${products[4].color} p-4 rounded-full transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
          <products[4].icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs text-gray-600 text-center leading-tight min-h-[2.5rem] group-hover:text-primary">
          {products[4].label}
        </span>
      </button>
    </div>
  );
};