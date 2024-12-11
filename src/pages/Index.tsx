import { Header } from "@/components/Header";
import { QuickActions } from "@/components/QuickActions";
import { InsuranceProducts } from "@/components/InsuranceProducts";
import { BottomNav } from "@/components/BottomNav";
import { Flag, Sun, Moon, Sunrise, Sunset } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  const getTimeIcon = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) return <Sunrise className="w-5 h-5 inline-block ml-2" fill="#ab1f74" fillOpacity={0.1} stroke="#ab1f74" />;
    if (hour >= 12 && hour < 17) return <Sun className="w-5 h-5 inline-block ml-2" fill="#ab1f74" fillOpacity={0.1} stroke="#ab1f74" />;
    if (hour >= 17 && hour < 20) return <Sunset className="w-5 h-5 inline-block ml-2" fill="#ab1f74" fillOpacity={0.1} stroke="#ab1f74" />;
    return <Moon className="w-5 h-5 inline-block ml-2" fill="#ab1f74" fillOpacity={0.1} stroke="#ab1f74" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
      <Header />
      
      <main className="space-y-6 px-4 pt-6 md:px-8 md:pt-8 max-w-7xl mx-auto">
        <div className="md:max-w-3xl">
          <h1 className="text-lg md:text-2xl font-semibold tracking-wide mb-3 flex items-center text-gray-700">
            Good morning, Brian
            {getTimeIcon()}
          </h1>
          <p className="text-xs md:text-sm tracking-wide text-gray-500">
            Welcome back! What would you like to do today?
            <span className="text-xs md:text-sm text-gray-400 ml-1 tracking-wide">· Last logged in 2 weeks ago</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <QuickActions />

          <div className="bg-gray-50 rounded-lg">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm md:text-base font-semibold tracking-wide text-gray-700">Most recent cover</h2>
                <button className="text-secondary hover:text-secondary-light transition-colors text-xs md:text-sm tracking-wide">
                  See all
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-product-golfer w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Flag className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col">
                    <h3 className="text-xs md:text-sm font-semibold tracking-wide mb-0.5">Golfer's</h3>
                    <p className="text-[10px] md:text-xs text-gray-500">GOL/072244355/25</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-semibold tracking-wide mb-0.5">KES 1,250</p>
                  <p className="text-[10px] md:text-xs text-gray-500">27 Nov, 14.45</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InsuranceProducts />
      </main>
      
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Index;