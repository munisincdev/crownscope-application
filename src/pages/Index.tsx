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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16">
      <Header />
      
      <main className="space-y-4 px-4 pt-6">
        <div>
          <h1 className="text-xl font-bold font-headers mb-1 flex items-center text-gray-900">
            Good morning, Brian
            {getTimeIcon()}
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back! What would you like to do today?
            <span className="text-xs text-gray-400 ml-1">· Last logged in 2 weeks ago</span>
          </p>
        </div>

        <QuickActions />

        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-gray-900">Most recent cover</h2>
              <button className="text-secondary text-xs font-medium hover:text-secondary-light transition-colors">
                See all
              </button>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
              <div className="bg-success p-2 rounded-full flex-shrink-0">
                <Flag className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold font-headers text-sm mb-0.5 text-gray-900">Golfer's Insurance</h3>
                <p className="text-xs text-gray-500 truncate">Policy number: GOL/072244355/25</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold mb-0.5 text-gray-900">-Ksh. 1,250</p>
                <p className="text-xs text-gray-500">27 Nov, 02:45 PM</p>
              </div>
            </div>
          </div>
        </div>

        <InsuranceProducts />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;