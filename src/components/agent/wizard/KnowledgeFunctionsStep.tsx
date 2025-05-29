
import { KnowledgeBaseSection } from './sections/KnowledgeBaseSection';
import { FunctionsSection } from './sections/FunctionsSection';
import { MemorySettingsSection } from './sections/MemorySettingsSection';
import { AgentWizardData } from './useAgentWizard';

interface KnowledgeFunctionsStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

export const KnowledgeFunctionsStep = ({ data, onUpdate }: KnowledgeFunctionsStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Knowledge & Functions</h2>
        <p className="text-gray-400 mb-6">
          Build your agent's knowledge base and configure its capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Knowledge Base */}
        <div className="space-y-6">
          <KnowledgeBaseSection data={data} onUpdate={onUpdate} />
        </div>

        {/* Functions & Memory */}
        <div className="space-y-6">
          <FunctionsSection data={data} onUpdate={onUpdate} />
          <MemorySettingsSection data={data} onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  );
};
