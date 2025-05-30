
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactsProvider } from '@/contexts/ContactsContext';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Index from '@/pages/Index';
import Agents from '@/pages/Agents';
import Campaigns from '@/pages/Campaigns';
import CampaignDetail from '@/pages/CampaignDetail';
import Integrations from '@/pages/Integrations';
import Contacts from '@/pages/Contacts';
import Analytics from '@/pages/Analytics';
import CreateAgent from '@/pages/CreateAgent';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <TooltipProvider>
      <ContactsProvider>
        <Router>
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/create" element={<CreateAgent />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaigns/:campaignId" element={<CampaignDetail />} />
              <Route path="/channels" element={<Integrations />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </ContactsProvider>
    </TooltipProvider>
  );
}

export default App;
