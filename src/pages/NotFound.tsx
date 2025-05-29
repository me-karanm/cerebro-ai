
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule=""
        setActiveModule={() => {}}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
            <p className="text-xl text-gray-300 mb-4">Oops! Page not found</p>
            <Button asChild variant="default">
              <a href="/">Return to Dashboard</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
