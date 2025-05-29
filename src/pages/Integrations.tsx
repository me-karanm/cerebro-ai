
import { useState } from 'react';
import { IntegrationsHeader } from '@/components/integrations/IntegrationsHeader';
import { PhoneNumbersSection } from '@/components/integrations/PhoneNumbersSection';
import { WhatsAppSection } from '@/components/integrations/WhatsAppSection';
import { EmailSection } from '@/components/integrations/EmailSection';
import { TelegramSection } from '@/components/integrations/TelegramSection';
import { WeChatSection } from '@/components/integrations/WeChatSection';

const Integrations = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <IntegrationsHeader />
      
      <div className="max-w-6xl mx-auto space-y-8">
        <PhoneNumbersSection />
        <WhatsAppSection />
        <EmailSection />
        <TelegramSection />
        <WeChatSection />
      </div>
    </div>
  );
};

export default Integrations;
