
import React from 'react';
import { Contest } from '@/services/api';
import ContestCard from './ContestCard';

interface ContestListProps {
  contests: Contest[];
  title: string;
  emptyMessage?: string;
}

const ContestList: React.FC<ContestListProps> = ({ 
  contests, 
  title, 
  emptyMessage = "No contests found" 
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      
      {contests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contests.map(contest => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      ) : (
        <div className="bg-card/30 rounded-lg flex items-center justify-center p-6">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ContestList;
