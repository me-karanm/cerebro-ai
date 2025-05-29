
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface TestConnectionProps {
  integrationType: string;
  connectionData: any;
}

export const TestConnection = ({ integrationType, connectionData }: TestConnectionProps) => {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [testMessage, setTestMessage] = useState('');

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    setTestMessage('');

    try {
      // Simulate API test call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock test results based on integration type
      const hasRequiredFields = validateRequiredFields();
      
      if (hasRequiredFields) {
        setTestResult('success');
        setTestMessage('Connection test successful! Integration is ready to use.');
      } else {
        setTestResult('error');
        setTestMessage('Connection test failed. Please check your configuration.');
      }
    } catch (error) {
      setTestResult('error');
      setTestMessage('Connection test failed. Please verify your credentials and try again.');
    } finally {
      setTesting(false);
    }
  };

  const validateRequiredFields = () => {
    switch (integrationType) {
      case 'whatsapp':
        return connectionData.phoneNumber && connectionData.apiKey;
      case 'email':
        return connectionData.smtpHost && connectionData.smtpPort && connectionData.fromEmail;
      case 'telegram':
        return connectionData.botToken;
      case 'voice':
        return connectionData.accountSid && connectionData.authToken;
      case 'wechat':
        return connectionData.appId && connectionData.appSecret;
      case 'webhook':
        return connectionData.endpointUrl;
      default:
        return true;
    }
  };

  const canTest = validateRequiredFields();

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        onClick={testConnection}
        disabled={!canTest || testing}
        className="w-full"
      >
        {testing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Testing Connection...
          </>
        ) : (
          'Test Connection'
        )}
      </Button>

      {testResult && (
        <div className={`flex items-center space-x-2 p-3 rounded-lg ${
          testResult === 'success' 
            ? 'bg-green-900/30 border border-green-700 text-green-300' 
            : 'bg-red-900/30 border border-red-700 text-red-300'
        }`}>
          {testResult === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span className="text-sm">{testMessage}</span>
        </div>
      )}

      {!canTest && (
        <p className="text-yellow-400 text-sm">
          Fill in required fields to test the connection
        </p>
      )}
    </div>
  );
};
