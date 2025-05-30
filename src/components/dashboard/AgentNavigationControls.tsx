
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AgentNavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const AgentNavigationControls = ({ onPrevious, onNext }: AgentNavigationControlsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </>
  );
};
