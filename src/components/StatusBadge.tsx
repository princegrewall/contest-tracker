
import React from 'react';
import { Clock, CheckCircle2, CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'upcoming' | 'ongoing' | 'past';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'upcoming':
        return {
          icon: <Clock className="w-3 h-3" />,
          text: 'Upcoming',
          className: 'bg-blue-600/20 text-blue-400'
        };
      case 'ongoing':
        return {
          icon: <CircleDot className="w-3 h-3 animate-pulse" />,
          text: 'Live',
          className: 'bg-green-600/20 text-green-400'
        };
      case 'past':
        return {
          icon: <CheckCircle2 className="w-3 h-3" />,
          text: 'Ended',
          className: 'bg-gray-600/20 text-gray-400'
        };
      default:
        return {
          icon: null,
          text: '',
          className: ''
        };
    }
  };

  const { icon, text, className: statusClassName } = getStatusConfig();

  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
      statusClassName,
      className
    )}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default StatusBadge;
