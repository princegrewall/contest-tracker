
import React from 'react';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Contest } from '@/services/api';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import CountdownTimer from './CountdownTimer';
import PlatformBadge from './PlatformBadge';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';

interface ContestCardProps {
  contest: Contest;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDurationText = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  };

  return (
    <Card className={cn(
      "contest-card overflow-hidden h-full",
      `contest-card-${contest.platform}`
    )}>
      <CardContent className="p-6 pb-3">
        <div className="flex justify-between items-start mb-3">
          <PlatformBadge platform={contest.platform} />
          <StatusBadge status={contest.status} />
        </div>
        
        <h3 className="text-lg font-semibold line-clamp-2 mb-3">{contest.name}</h3>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(contest.startTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {/* <span>Duration: {getDurationText(contest.durationSeconds)}</span> */}
            <span>Duration: {`2 Hour`}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-2 flex justify-between items-center">
        {contest.status === 'upcoming' ? (
          <div className="flex items-center gap-1 text-sm">
            <span className="text-accent-foreground">Starts in:</span>
            <CountdownTimer targetDate={contest.startTime} />
          </div>
        ) : contest.status === 'ongoing' ? (
          <div className="flex items-center gap-1 text-sm">
            <span className="text-accent-foreground">Ends in:</span>
            <CountdownTimer targetDate={contest.endTime} />
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            {/* Ended {new Date().getDate() - contest.endTime.getDate()} days ago */}
          </div>
        )}
        
        <a 
          href={contest.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </CardFooter>
    </Card>
  );
};

export default ContestCard;
