
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface PhoneNumber {
  id: string;
  number: string;
  type: string;
  location: string;
  status: 'active' | 'pending';
  createdAt: string;
}

export interface WhatsAppAccount {
  id: string;
  phoneNumber: string;
  name: string;
  status: 'active' | 'pending' | 'failed';
}

export interface EmailAccount {
  id: string;
  name: string;
  email: string;
  provider: string;
  status: 'active' | 'error';
}

export interface TelegramBot {
  id: string;
  name: string;
  username: string;
  status: 'active' | 'error';
}

export interface WeChatAccount {
  id: string;
  name: string;
  accountId: string;
  status: 'active' | 'pending';
}

interface IntegrationsState {
  phoneNumbers: PhoneNumber[];
  whatsappAccounts: WhatsAppAccount[];
  emailAccounts: EmailAccount[];
  telegramBots: TelegramBot[];
  wechatAccounts: WeChatAccount[];

  // Phone Numbers
  addPhoneNumber: (phoneNumber: PhoneNumber) => void;
  removePhoneNumber: (id: string) => void;
  updatePhoneNumber: (id: string, updates: Partial<PhoneNumber>) => void;

  // WhatsApp
  addWhatsAppAccount: (account: WhatsAppAccount) => void;
  removeWhatsAppAccount: (id: string) => void;
  updateWhatsAppAccount: (id: string, updates: Partial<WhatsAppAccount>) => void;

  // Email
  addEmailAccount: (account: EmailAccount) => void;
  removeEmailAccount: (id: string) => void;
  updateEmailAccount: (id: string, updates: Partial<EmailAccount>) => void;

  // Telegram
  addTelegramBot: (bot: TelegramBot) => void;
  removeTelegramBot: (id: string) => void;
  updateTelegramBot: (id: string, updates: Partial<TelegramBot>) => void;

  // WeChat
  addWeChatAccount: (account: WeChatAccount) => void;
  removeWeChatAccount: (id: string) => void;
  updateWeChatAccount: (id: string, updates: Partial<WeChatAccount>) => void;
}

// Initial mock data
const initialPhoneNumbers: PhoneNumber[] = [
  { id: '1', number: '+1 (555) 123-4567', type: 'Local', location: 'New York, NY', status: 'active', createdAt: '2023-05-01' },
  { id: '2', number: '+1 (555) 987-6543', type: 'Toll-Free', location: 'US National', status: 'active', createdAt: '2023-06-15' },
  { id: '3', number: '+44 20 7946 0958', type: 'Local', location: 'London, UK', status: 'active', createdAt: '2023-07-22' }
];

const initialWhatsAppAccounts: WhatsAppAccount[] = [
  { id: '1', phoneNumber: '+1 (555) 234-5678', name: 'Sales Bot', status: 'active' },
  { id: '2', phoneNumber: '+1 (555) 876-5432', name: 'Support Bot', status: 'active' }
];

const initialEmailAccounts: EmailAccount[] = [
  { id: '1', name: 'Support Email', email: 'support@example.com', provider: 'SMTP', status: 'active' }
];

const initialTelegramBots: TelegramBot[] = [
  { id: '1', name: 'Support Bot', username: 'CompanySupportBot', status: 'active' }
];

const initialWeChatAccounts: WeChatAccount[] = [];

// Create the store
export const useIntegrationsStore = create<IntegrationsState>()(
  devtools(
    persist(
      (set) => ({
        // State
        phoneNumbers: initialPhoneNumbers,
        whatsappAccounts: initialWhatsAppAccounts,
        emailAccounts: initialEmailAccounts,
        telegramBots: initialTelegramBots,
        wechatAccounts: initialWeChatAccounts,

        // Phone Numbers
        addPhoneNumber: (phoneNumber) =>
          set((state) => ({ phoneNumbers: [...state.phoneNumbers, phoneNumber] })),
          
        removePhoneNumber: (id) =>
          set((state) => ({ phoneNumbers: state.phoneNumbers.filter(num => num.id !== id) })),
          
        updatePhoneNumber: (id, updates) =>
          set((state) => ({
            phoneNumbers: state.phoneNumbers.map(num =>
              num.id === id ? { ...num, ...updates } : num
            ),
          })),

        // WhatsApp
        addWhatsAppAccount: (account) =>
          set((state) => ({ whatsappAccounts: [...state.whatsappAccounts, account] })),
          
        removeWhatsAppAccount: (id) =>
          set((state) => ({ whatsappAccounts: state.whatsappAccounts.filter(acc => acc.id !== id) })),
          
        updateWhatsAppAccount: (id, updates) =>
          set((state) => ({
            whatsappAccounts: state.whatsappAccounts.map(acc =>
              acc.id === id ? { ...acc, ...updates } : acc
            ),
          })),

        // Email
        addEmailAccount: (account) =>
          set((state) => ({ emailAccounts: [...state.emailAccounts, account] })),
          
        removeEmailAccount: (id) =>
          set((state) => ({ emailAccounts: state.emailAccounts.filter(acc => acc.id !== id) })),
          
        updateEmailAccount: (id, updates) =>
          set((state) => ({
            emailAccounts: state.emailAccounts.map(acc =>
              acc.id === id ? { ...acc, ...updates } : acc
            ),
          })),

        // Telegram
        addTelegramBot: (bot) =>
          set((state) => ({ telegramBots: [...state.telegramBots, bot] })),
          
        removeTelegramBot: (id) =>
          set((state) => ({ telegramBots: state.telegramBots.filter(bot => bot.id !== id) })),
          
        updateTelegramBot: (id, updates) =>
          set((state) => ({
            telegramBots: state.telegramBots.map(bot =>
              bot.id === id ? { ...bot, ...updates } : bot
            ),
          })),

        // WeChat
        addWeChatAccount: (account) =>
          set((state) => ({ wechatAccounts: [...state.wechatAccounts, account] })),
          
        removeWeChatAccount: (id) =>
          set((state) => ({ wechatAccounts: state.wechatAccounts.filter(acc => acc.id !== id) })),
          
        updateWeChatAccount: (id, updates) =>
          set((state) => ({
            wechatAccounts: state.wechatAccounts.map(acc =>
              acc.id === id ? { ...acc, ...updates } : acc
            ),
          })),
      }),
      {
        name: 'integrations-storage',
      }
    )
  )
);

// Hook to use the store
export function usePhoneNumbers() {
  const store = useIntegrationsStore();

  return {
    phoneNumbers: store.phoneNumbers,
    isLoading: false,
    purchaseNumber: async (country: string, type: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const countryMap: Record<string, string> = {
        'us': 'United States',
        'uk': 'United Kingdom',
        'ca': 'Canada',
        'au': 'Australia'
      };
      
      const newNumber: PhoneNumber = {
        id: Math.random().toString(36).substring(2, 9),
        number: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
        type: type === 'toll-free' ? 'Toll-Free' : type === 'mobile' ? 'Mobile' : 'Local',
        location: type === 'toll-free' ? 'US National' : `${countryMap[country] || country}`,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      store.addPhoneNumber(newNumber);
      return newNumber;
    },
    deleteNumber: async (numberId: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      store.removePhoneNumber(numberId);
    }
  };
}
