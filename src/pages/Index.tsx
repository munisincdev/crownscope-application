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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 font-sans">
      <Header />
      
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-headers mb-2 flex items-center text-gray-900">
            Good morning, Brian
            {getTimeIcon()}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Welcome back to your insurance dashboard
            <span className="block text-xs mt-1 text-gray-400">Last logged in 2 weeks ago</span>
          </p>
        </div>
      </div>

      <div className="mb-6">
        <QuickActions />
      </div>

      <div className="bg-white shadow-sm">
        <div className="px-4 py-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold font-headers text-gray-900">Most recent cover</h2>
            <button className="text-secondary text-sm font-medium hover:text-secondary-light transition-colors">
              See all
            </button>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <div className="bg-success p-3 rounded-full flex-shrink-0">
              <Flag className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold font-headers mb-1 text-gray-900">Golfer's Insurance</h3>
              <p className="text-sm text-gray-500 truncate">Policy number: GOL/072244355/25</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold mb-1 text-gray-900">-Ksh. 1,250</p>
              <p className="text-xs text-gray-500">27 Nov, 02:45 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <InsuranceProducts />
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Index;