
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChannelsHeader } from './channels/ChannelsHeader';
import { PhoneNumbersTab } from './channels/PhoneNumbersTab';
import { OtherIntegrationsTab } from './channels/OtherIntegrationsTab';
import { AddIntegrationModal } from './AddIntegrationModal';
import { PurchaseNumberModal } from './channels/PurchaseNumberModal';

export const ChannelsModule = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [activeTab, setActiveTab] = useState('phone-numbers');

  const handleAddIntegration = () => {
    setShowAddModal(true);
  };

  const handlePurchaseNumber = () => {
    setShowPurchaseModal(true);
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6 w-full max-w-full overflow-x-hidden">
      <ChannelsHeader />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
          <TabsTrigger 
            value="phone-numbers" 
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm"
          >
            Phone Numbers
          </TabsTrigger>
          <TabsTrigger 
            value="other-integrations"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm"
          >
            Other Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phone-numbers" className="mt-4 lg:mt-6">
          <PhoneNumbersTab onPurchaseNumber={handlePurchaseNumber} />
        </TabsContent>

        <TabsContent value="other-integrations" className="mt-4 lg:mt-6">
          <OtherIntegrationsTab onAddIntegration={handleAddIntegration} />
        </TabsContent>
      </Tabs>

      <AddIntegrationModal 
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />

      <PurchaseNumberModal
        open={showPurchaseModal}
        onOpenChange={setShowPurchaseModal}
      />
    </div>
  );
};
