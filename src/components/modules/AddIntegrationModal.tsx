
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IntegrationSetupForm } from './IntegrationSetupForm';
import { useIntegrationsStore } from '@/store/integrationsStore';

interface AddIntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddIntegrationModal = ({ open, onOpenChange }: AddIntegrationModalProps) => {
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleClose = () => {
    if (isDirty) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmed) return;
    }
    onOpenChange(false);
    setFormData({});
    setIsDirty(false);
  };

  const handleFormChange = (data: any) => {
    setFormData(data);
    setIsDirty(true);
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to store based on integration type
      const { integrationType, ...integrationData } = data;
      
      switch (integrationType) {
        case 'whatsapp':
          useIntegrationsStore.getState().addWhatsAppAccount({
            phoneNumber: integrationData.phoneNumber || '',
            businessName: integrationData.businessName || '',
            apiKey: integrationData.apiKey || '',
            webhookUrl: integrationData.webhookUrl || '',
            status: 'active'
          });
          break;
        case 'email':
          useIntegrationsStore.getState().addEmailAccount({
            email: integrationData.fromEmail || '',
            smtpHost: integrationData.smtpHost || '',
            smtpPort: integrationData.smtpPort || '',
            username: integrationData.smtpUsername || '',
            status: 'active'
          });
          break;
        case 'telegram':
          useIntegrationsStore.getState().addTelegramBot({
            botName: integrationData.botName || '',
            botToken: integrationData.botToken || '',
            username: integrationData.username || '',
            webhookUrl: integrationData.webhookUrl || '',
            status: 'active'
          });
          break;
        case 'wechat':
          useIntegrationsStore.getState().addWeChatAccount({
            accountName: integrationData.accountName || '',
            appId: integrationData.appId || '',
            appSecret: integrationData.appSecret || '',
            status: 'active'
          });
          break;
      }
      
      onOpenChange(false);
      setFormData({});
      setIsDirty(false);
    } catch (error) {
      console.error('Failed to add integration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Add New Integration
          </DialogTitle>
        </DialogHeader>
        
        <IntegrationSetupForm
          data={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
