
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
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-sm sm:text-base">Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 lg:space-y-4 p-3 lg:p-4">
        {sentimentData.map((sentiment) => (
          <Tooltip key={sentiment.type}>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer">
                <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 ${sentiment.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-sm lg:text-lg">{sentiment.emoji}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white font-medium capitalize text-sm lg:text-base truncate">{sentiment.type} Sentiment</div>
                    <div className="text-gray-400 text-xs lg:text-sm truncate">{sentiment.percentage}% of conversations</div>
                  </div>
                </div>
                <div className={`text-xl lg:text-2xl font-bold ${sentiment.color} flex-shrink-0`}>
                  {sentiment.percentage}%
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs sm:text-sm">{sentiment.percentage}% of conversations show {sentiment.type} sentiment</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </CardContent>
    </Card>
  );
};
