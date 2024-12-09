import { Header } from "@/components/Header";
import { QuickActions } from "@/components/QuickActions";
import { InsuranceProducts } from "@/components/InsuranceProducts";
import { BottomNav } from "@/components/BottomNav";
import { Flag } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-semibold">Good morning, Brian</h1>
            <p className="text-sm text-gray-500">Last logged in 2 weeks ago</p>
          </div>
        </div>
      </div>

      <QuickActions />

      <div className="p-4 bg-gray-100">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Most recent cover</h2>
          <button className="text-secondary text-sm">See all</button>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
          <div className="bg-[#4CAF50] p-3 rounded-full">
            <Flag className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Golfer's</h3>
            <p className="text-sm text-gray-500">GOL/072244355/25</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">-Ksh. 1,250</p>
            <p className="text-xs text-gray-500">27 Nov, 02:45 PM</p>
          </div>
        </div>
      </div>

      <InsuranceProducts />
      
      <BottomNav />
    </div>
  );
};

export default Index;