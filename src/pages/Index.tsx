import { Header } from "@/components/Header";
import { QuickActions } from "@/components/QuickActions";
import { InsuranceProducts } from "@/components/InsuranceProducts";
import { BottomNav } from "@/components/BottomNav";
import { Flag } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <Header />
      
      <div className="p-4">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold font-headers mb-1">Good morning, Brian</h1>
            <p className="text-sm text-gray-500">Welcome back to your insurance dashboard. Last logged in 2 weeks ago.</p>
          </div>
        </div>
      </div>

      <QuickActions />

      <div className="p-4 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold font-headers">Most recent cover</h2>
          <button className="text-secondary text-sm font-medium">See all</button>
        </div>
        <div className="flex items-center gap-4 bg-white p-6 rounded-lg">
          <div className="bg-[#4CAF50] p-3 rounded-full flex-shrink-0">
            <Flag className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold font-headers mb-1 truncate">Golfer's Insurance</h3>
            <p className="text-sm text-gray-500 truncate">Policy number: GOL/072244355/25</p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <p className="text-sm font-semibold mb-1 whitespace-nowrap">-Ksh. 1,250</p>
            <p className="text-xs text-gray-500 whitespace-nowrap">27 Nov, 02:45 PM</p>
          </div>
        </div>
      </div>

      <InsuranceProducts />
      
      <BottomNav />
    </div>
  );
};

export default Index;