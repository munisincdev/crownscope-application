import { Flag, Heart, Home, Plane, Shield } from "lucide-react";

const products = [
  { icon: Plane, label: "Travel\ninsurance", color: "bg-product-travel" },
  { icon: Heart, label: "Individual\nmedical", color: "bg-secondary" },
  { icon: Flag, label: "Golfer's\ninsurance", color: "bg-product-golfer" },
  { icon: Shield, label: "Personal\naccident", color: "bg-product-accident" },
  { icon: Home, label: "Domestic\npackage", color: "bg-product-domestic" },
];

interface ProductGridProps {
  onProductSelect: (productLabel: string) => void;
}

export const ProductGrid = ({ onProductSelect }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 md:gap-6">
      {products.slice(0, 3).map((product) => (
        <button
          key={product.label}
          className="flex flex-col items-center justify-center gap-2 md:gap-3 py-1.5 group"
          onClick={() => onProductSelect(product.label)}
        >
          <div className={`${product.color} p-3.5 md:p-4 rounded-full transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
            <product.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-xs md:text-sm tracking-wide text-gray-700 text-center leading-snug min-h-[2.5rem] group-hover:text-primary whitespace-pre-line font-sans">
            {product.label}
          </span>
        </button>
      ))}

      <div className="col-span-2 grid grid-cols-2 gap-4 md:gap-6">
        {products.slice(3).map((product) => (
          <button
            key={product.label}
            className="flex flex-col items-center justify-center gap-2 md:gap-3 py-1.5 group"
            onClick={() => onProductSelect(product.label)}
          >
            <div className={`${product.color} p-3.5 md:p-4 rounded-full transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
              <product.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xs md:text-sm tracking-wide text-gray-700 text-center leading-snug min-h-[2.5rem] group-hover:text-primary whitespace-pre-line font-sans">
              {product.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};