
import { toast } from "@/components/ui/sonner";

export interface Contest {
  id: string;
  name: string;
  url: string;
  platform: 'codeforces' | 'leetcode' | 'codechef';
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  status: 'upcoming' | 'ongoing' | 'past';
}

// Simulated API response for our frontend development
// In a real app, this would be fetched from a backend
const mockContests: Contest[] = [
  // CodeForces Contests
  {
    id: 'cf-1',
    name: 'Codeforces Round #900 (Div. 2)',
    url: 'https://codeforces.com/contests',
    platform: 'codeforces',
    startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    endTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    duration: 2 * 60 * 60, // 2 hours
    status: 'past'
  },
  {
    id: 'cf-2',
    name: 'Educational Codeforces Round #159',
    url: 'https://codeforces.com/contests',
    platform: 'codeforces',
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 2.5 * 60 * 60 * 1000),
    duration: 2.5 * 60 * 60, // 2.5 hours
    status: 'past'
  },
  {
    id: 'cf-3',
    name: 'Codeforces Round #901 (Div. 1)',
    url: 'https://codeforces.com/contests',
    platform: 'codeforces',
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    duration: 2 * 60 * 60, // 2 hours
    status: 'upcoming'
  },
  {
    id: 'cf-4',
    name: 'Codeforces Round #902 (Div. 1 + Div. 2)',
    url: 'https://codeforces.com/contests',
    platform: 'codeforces',
    startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 2.5 * 60 * 60 * 1000),
    duration: 2.5 * 60 * 60, // 2.5 hours
    status: 'upcoming'
  },
  
  // LeetCode Contests
  {
    id: 'lc-1',
    name: 'Weekly Contest 389',
    url: 'https://leetcode.com/contest/',
    platform: 'leetcode',
    startTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    endTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
    duration: 1.5 * 60 * 60, // 1.5 hours
    status: 'past'
  },
  {
    id: 'lc-2',
    name: 'Biweekly Contest 125',
    url: 'https://leetcode.com/contest/',
    platform: 'leetcode',
    startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    endTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
    duration: 1.5 * 60 * 60, // 1.5 hours
    status: 'past'
  },
  {
    id: 'lc-3',
    name: 'Weekly Contest 390',
    url: 'https://leetcode.com/contest/',
    platform: 'leetcode',
    startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
    duration: 1.5 * 60 * 60, // 1.5 hours
    status: 'upcoming'
  },
  {
    id: 'lc-4',
    name: 'Biweekly Contest 126',
    url: 'https://leetcode.com/contest/',
    platform: 'leetcode',
    startTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
    duration: 1.5 * 60 * 60, // 1.5 hours
    status: 'upcoming'
  },
  
  // CodeChef Contests
  {
    id: 'cc-1',
    name: 'April Long Challenge',
    url: 'https://www.codechef.com/contests',
    platform: 'codechef',
    startTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    duration: 3 * 24 * 60 * 60, // 3 days
    status: 'past'
  },
  {
    id: 'cc-2',
    name: 'Codechef Starters 112',
    url: 'https://www.codechef.com/contests',
    platform: 'codechef',
    startTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    endTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    duration: 2 * 60 * 60, // 2 hours
    status: 'ongoing'
  },
  {
    id: 'cc-3',
    name: 'Codechef Starters 113',
    url: 'https://www.codechef.com/contests',
    platform: 'codechef',
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    duration: 2 * 60 * 60, // 2 hours
    status: 'upcoming'
  },
  {
    id: 'cc-4',
    name: 'May Long Challenge',
    url: 'https://www.codechef.com/contests',
    platform: 'codechef',
    startTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
    endTime: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    duration: 3 * 24 * 60 * 60, // 3 days
    status: 'upcoming'
  },
];

// Function to fetch all contests
export const fetchAllContests = async (): Promise<Contest[]> => {
  try {
    // This would be an API call in a real application
    // return await fetch('/api/contests').then(res => res.json());
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update contest status based on current time
    const now = new Date();
    const updatedContests = mockContests.map(contest => {
      if (now < contest.startTime) {
        return { ...contest, status: 'upcoming' as const };
      } else if (now > contest.endTime) {
        return { ...contest, status: 'past' as const };
      } else {
        return { ...contest, status: 'ongoing' as const };
      }
    });
    
    return updatedContests;
  } catch (error) {
    console.error('Error fetching contests:', error);
    toast.error('Failed to fetch contest data');
    return [];
  }
};

// Function to filter contests by time range
export const filterContestsByTimeRange = (contests: Contest[], range: 'past' | 'upcoming' | 'ongoing' | 'all'): Contest[] => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  if (range === 'all') return contests;
  
  return contests.filter(contest => {
    if (range === 'past') {
      return contest.endTime < now && contest.endTime > oneWeekAgo;
    } else if (range === 'upcoming') {
      return contest.startTime > now && contest.startTime < oneWeekLater;
    } else if (range === 'ongoing') {
      return contest.startTime <= now && contest.endTime >= now;
    }
    return false;
  });
};

// Function to filter contests by platform
export const filterContestsByPlatform = (contests: Contest[], platforms: ('codeforces' | 'leetcode' | 'codechef')[]): Contest[] => {
  if (platforms.length === 0) return contests;
  return contests.filter(contest => platforms.includes(contest.platform));
};
