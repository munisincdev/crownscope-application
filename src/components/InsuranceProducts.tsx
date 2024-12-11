import { useState } from "react";
import { ProductGrid } from "./insurance/ProductGrid";
import { ChatDialog } from "./insurance/ChatDialog";

export const InsuranceProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProductClick = (productLabel: string) => {
    setSelectedProduct(productLabel);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4">
        <h2 className="text-sm font-semibold tracking-wide text-gray-700 text-left mb-4">Buy now</h2>
        <ProductGrid onProductSelect={handleProductClick} />
      </div>
      <ChatDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};