

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactsProvider } from "@/contexts/ContactsContext";
import Index from "./pages/Index";
import Agents from "./pages/Agents";
import { CreateAgentWizard } from "./components/agent/wizard/CreateAgentWizard";
import Integrations from "./pages/Integrations";
import Analytics from "./pages/Analytics";
import AnalyticsOverview from "./pages/AnalyticsOverview";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import Contacts from "./pages/Contacts";
import VoiceStudio from "./pages/VoiceStudio";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ContactsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agents/create" element={<CreateAgentWizard />} />
            <Route path="/agents/:agentId" element={<CreateAgentWizard />} />
            <Route path="/agents/:agentId/analytics" element={<Analytics />} />
            <Route path="/analytics" element={<AnalyticsOverview />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/:campaignId" element={<CampaignDetail />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/channels" element={<Integrations />} />
            <Route path="/voice-studio" element={<VoiceStudio />} />
            <Route path="/security" element={<Security />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ContactsProvider>
  </QueryClientProvider>
);

export default App;
