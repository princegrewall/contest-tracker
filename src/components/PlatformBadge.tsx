
import React from 'react';
import { CodeIcon, Code2, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlatformBadgeProps {
  platform: 'codeforces' | 'leetcode' | 'codechef';
  className?: string;
}

const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platform, className }) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'codeforces':
        return <CodeIcon className="w-3 h-3" />;
      case 'leetcode':
        return <Code2 className="w-3 h-3" />;
      case 'codechef':
        return <Terminal className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getPlatformName = () => {
    switch (platform) {
      case 'codeforces':
        return 'CodeForces';
      case 'leetcode':
        return 'LeetCode';
      case 'codechef':
        return 'CodeChef';
      default:
        return '';
    }
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
      `badge-${platform}`,
      className
    )}>
      {getPlatformIcon()}
      <span>{getPlatformName()}</span>
    </div>
  );
};

export default PlatformBadge;
