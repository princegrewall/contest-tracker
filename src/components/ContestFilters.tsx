
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import PlatformBadge from './PlatformBadge';
import { cn } from '@/lib/utils';

interface ContestFiltersProps {
  selectedPlatforms: ('codeforces' | 'leetcode' | 'codechef')[];
  onPlatformToggle: (platform: 'codeforces' | 'leetcode' | 'codechef') => void;
  selectedTimeRange: 'past' | 'upcoming' | 'ongoing' | 'all';
  onTimeRangeChange: (range: 'past' | 'upcoming' | 'ongoing' | 'all') => void;
  clearFilters: () => void;
}

const ContestFilters: React.FC<ContestFiltersProps> = ({
  selectedPlatforms,
  onPlatformToggle,
  selectedTimeRange,
  onTimeRangeChange,
  clearFilters
}) => {
  const platforms: ('codeforces' | 'leetcode' | 'codechef')[] = ['codeforces', 'leetcode', 'codechef'];
  
  const timeRanges = [
    { value: 'all', label: 'All Contests' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'upcoming', label: 'Next 7 Days' },
    { value: 'past', label: 'Last 7 Days' },
  ] as const;
  
  return (
    <div className="bg-card rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Filter by Platform</h3>
          <div className="flex flex-wrap gap-2">
            {platforms.map(platform => (
              <button
                key={platform}
                onClick={() => onPlatformToggle(platform)}
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  selectedPlatforms.includes(platform) 
                    ? `badge-${platform} ring-2 ring-${platform} ring-opacity-60` 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                )}
              >
                {selectedPlatforms.includes(platform) && <Check className="w-3 h-3" />}
                <PlatformBadge platform={platform} className="!py-0 !px-0" />
              </button>
            ))}
            {selectedPlatforms.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2" 
                onClick={clearFilters}
              >
                <X className="w-3.5 h-3.5 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Time Range</h3>
          <div className="flex flex-wrap gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => onTimeRangeChange(range.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  selectedTimeRange === range.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestFilters;
