
import { create } from 'zustand';

export interface PhoneNumber {
  id: string;
  number: string;
  type: 'Local' | 'Toll-Free' | 'International';
  location: string;
  status: 'active' | 'inactive';
}

export interface WhatsAppAccount {
  id: string;
  phoneNumber: string;
  businessName: string;
  apiKey: string;
  webhookUrl: string;
  status: 'active' | 'inactive';
}

export interface EmailAccount {
  id: string;
  email: string;
  smtpHost: string;
  smtpPort: string;
  username: string;
  status: 'active' | 'inactive';
}

export interface TelegramBot {
  id: string;
  botName: string;
  botToken: string;
  username: string;
  webhookUrl: string;
  status: 'active' | 'inactive';
}

export interface WeChatAccount {
  id: string;
  accountName: string;
  appId: string;
  appSecret: string;
  status: 'active' | 'inactive';
}

interface IntegrationsStore {
  phoneNumbers: PhoneNumber[];
  whatsappAccounts: WhatsAppAccount[];
  emailAccounts: EmailAccount[];
  telegramBots: TelegramBot[];
  wechatAccounts: WeChatAccount[];
  
  // Actions
  addPhoneNumber: (phoneNumber: Omit<PhoneNumber, 'id'>) => void;
  addWhatsAppAccount: (account: Omit<WhatsAppAccount, 'id'>) => void;
  addEmailAccount: (account: Omit<EmailAccount, 'id'>) => void;
  addTelegramBot: (bot: Omit<TelegramBot, 'id'>) => void;
  addWeChatAccount: (account: Omit<WeChatAccount, 'id'>) => void;
}

export const useIntegrationsStore = create<IntegrationsStore>((set) => ({
  // Mock data for demonstration
  phoneNumbers: [
    { id: '1', number: '+1 (555) 123-4567', type: 'Local', location: 'New York, NY', status: 'active' },
    { id: '2', number: '+1 (555) 987-6543', type: 'Toll-Free', location: 'US National', status: 'active' },
    { id: '3', number: '+44 20 7946 0958', type: 'International', location: 'London, UK', status: 'active' },
  ],
  whatsappAccounts: [
    { id: '1', phoneNumber: '+1234567890', businessName: 'My Business', apiKey: 'wa_key_123', webhookUrl: 'https://webhook.com', status: 'active' },
  ],
  emailAccounts: [
    { id: '1', email: 'support@company.com', smtpHost: 'smtp.gmail.com', smtpPort: '587', username: 'support@company.com', status: 'active' },
  ],
  telegramBots: [
    { id: '1', botName: 'Support Bot', botToken: 'bot123456789:ABC', username: '@supportbot', webhookUrl: 'https://webhook.com', status: 'active' },
  ],
  wechatAccounts: [
    { id: '1', accountName: 'Business WeChat', appId: 'wx123456789', appSecret: 'secret123', status: 'active' },
  ],

  // Actions
  addPhoneNumber: (phoneNumber) =>
    set((state) => ({
      phoneNumbers: [...state.phoneNumbers, { ...phoneNumber, id: Date.now().toString() }],
    })),
  
  addWhatsAppAccount: (account) =>
    set((state) => ({
      whatsappAccounts: [...state.whatsappAccounts, { ...account, id: Date.now().toString() }],
    })),
  
  addEmailAccount: (account) =>
    set((state) => ({
      emailAccounts: [...state.emailAccounts, { ...account, id: Date.now().toString() }],
    })),
  
  addTelegramBot: (bot) =>
    set((state) => ({
      telegramBots: [...state.telegramBots, { ...bot, id: Date.now().toString() }],
    })),
  
  addWeChatAccount: (account) =>
    set((state) => ({
      wechatAccounts: [...state.wechatAccounts, { ...account, id: Date.now().toString() }],
    })),
}));
