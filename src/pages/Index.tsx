import { Header } from "@/components/Header";
import { QuickActions } from "@/components/QuickActions";
import { InsuranceProducts } from "@/components/InsuranceProducts";
import { BottomNav } from "@/components/BottomNav";
import { Flag, Sun, Moon, Sunrise, Sunset } from "lucide-react";

const Index = () => {
  const getTimeIcon = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) return <Sunrise className="w-5 h-5 inline-block ml-2" fill="#ab1f74" fillOpacity={0.1} stroke="#ab1f74" />;
    if (hour >= 12 && hour < 17) return <Sun className="w-5 h-5 inline-block ml-2" fill="#ab1f74" fillOpacity={0.1} stroke="#ab1f74" />;
    if (hour >= 17 && hour < 20) return <Sunset className="w-5 h-5 inline-block ml-2" fill="#ab1f74" fillOpacity={0.1} stroke="#ab1f74" />;
    return <Moon className="w-5 h-5 inline-block ml-2" fill="#ab1f74" fillOpacity={0.1} stroke="#ab1f74" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 font-sans">
      <Header />
      
      <div className="p-3">
        <div className="mb-4">
          <h1 className="text-xl font-semibold font-headers mb-1 flex items-center">
            Good morning, Brian
            {getTimeIcon()}
          </h1>
          <p className="text-sm text-gray-500">Welcome back to your insurance dashboard. Last logged in 2 weeks ago.</p>
        </div>
      </div>

      <QuickActions />

      <div className="p-3 bg-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold font-headers">Most recent cover</h2>
          <button className="text-secondary text-sm font-medium">See all</button>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
          <div className="bg-[#4CAF50] p-2 rounded-full flex-shrink-0">
            <Flag className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold font-headers mb-1 truncate">Golfer's Insurance</h3>
            <p className="text-sm text-gray-500 truncate">Policy number: GOL/072244355/25</p>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
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