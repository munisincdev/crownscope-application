import { Flag, Heart, Home, Shield } from "lucide-react";

const products = [
  { icon: Flag, label: "Travel insurance", color: "bg-product-travel" },
  { icon: Heart, label: "Individual medical", color: "bg-product-medical" },
  { icon: Flag, label: "Golfer's insurance", color: "bg-product-golfer" },
  { icon: Shield, label: "Personal accident", color: "bg-product-accident" },
  { icon: Home, label: "Domestic package", color: "bg-product-domestic" },
];

interface ProductGridProps {
  onProductSelect: (productLabel: string) => void;
}

export const ProductGrid = ({ onProductSelect }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <button
          key={product.label}
          className="flex flex-col items-center gap-3 group"
          onClick={() => onProductSelect(product.label)}
        >
          <div className={`${product.color} p-3.5 rounded-full transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
            <product.icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-gray-600 text-center leading-tight group-hover:text-primary">
            {product.label}
          </span>
        </button>
      ))}
    </div>
  );
};