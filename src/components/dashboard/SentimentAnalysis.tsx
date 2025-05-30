
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SentimentData {
  type: 'positive' | 'neutral' | 'negative';
  percentage: number;
  emoji: string;
  color: string;
  bgColor: string;
}

const sentimentData: SentimentData[] = [
  {
    type: 'positive',
    percentage: 42,
    emoji: '😊',
    color: 'text-green-400',
    bgColor: 'bg-green-500'
  },
  {
    type: 'neutral',
    percentage: 35,
    emoji: '😐',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500'
  },
  {
    type: 'negative',
    percentage: 23,
    emoji: '😞',
    color: 'text-red-400',
    bgColor: 'bg-red-500'
  }
];

export const SentimentAnalysis = () => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-white">Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sentimentData.map((sentiment) => (
          <Tooltip key={sentiment.type}>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${sentiment.bgColor} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-lg">{sentiment.emoji}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium capitalize">{sentiment.type} Sentiment</div>
                    <div className="text-gray-400 text-sm">{sentiment.percentage}% of conversations</div>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${sentiment.color}`}>
                  {sentiment.percentage}%
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{sentiment.percentage}% of conversations show {sentiment.type} sentiment</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </CardContent>
    </Card>
  );
};
