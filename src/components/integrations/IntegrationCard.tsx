
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBackground?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const IntegrationCard = ({
  title,
  description,
  icon: Icon,
  iconBackground = "bg-gradient-to-r from-purple-600 to-blue-600",
  children,
  footer,
  className,
}: IntegrationCardProps) => {
  return (
    <Card className={cn("bg-gray-900 border-gray-800", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBackground)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-white text-xl">{title}</CardTitle>
            <CardDescription className="text-gray-400">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
