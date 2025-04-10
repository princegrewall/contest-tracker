import axios from 'axios';
import { toast } from "@/components/ui/use-toast";

export type Contest = {
  name: string;
  url: string;
  startTime: Date;
  endTime: Date;
  site: string;
  durationSeconds : number;
  platform: 'codeforces' | 'leetcode' | 'codechef';
  status: 'upcoming' | 'ongoing' | 'past';
};

// Fetch Codeforces Contests
export const fetchAllContests = async (): Promise<Contest[]> => {
  try {
    const response = await axios.get(`https://codeforces.com/api/contest.list?gym=false`);
    const now = new Date();

    const contests: Contest[] = response.data.result.map((item: any) => {
      const start = new Date(item.startTimeSeconds * 1000);
      const duration = item.durationSeconds * 1000;
      const end = new Date(start.getTime() + duration);

      let status: Contest['status'];
      if (now < start) status = 'upcoming';
      else if (now > end) status = 'past';
      else status = 'ongoing';

      return {
        name: item.name,
        url: `https://codeforces.com/contest/${item.id}`,
        startTime: start,
        endTime: end,
        site: 'Codeforces',
        platform: 'codeforces',
        status,
      };
    });

    return contests;
  } catch (error) {
    console.error('Error fetching contests:', error);
    toast({ title: "Failed to fetch contests." });
    return [];
  }
};

// Filter contests by time range
export const filterContestsByTimeRange = (
  contests: Contest[],
  range: 'past' | 'upcoming' | 'ongoing' | 'all'
): Contest[] => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  if (range === 'all') {
    return contests.filter(contest => {
      const { startTime, endTime } = contest;
      return (
        // Ongoing
        (startTime <= now && endTime >= now) ||
        // Upcoming in next 7 days
        (startTime > now && startTime <= oneWeekLater) ||
        // Past in last 7 days
        (endTime < now && endTime >= oneWeekAgo)
      );
    });
  }

  return contests.filter(contest => {
    const { startTime, endTime } = contest;
    if (range === 'past') {
      return endTime < now && endTime >= oneWeekAgo;
    } else if (range === 'upcoming') {
      return startTime > now && startTime <= oneWeekLater;
    } else if (range === 'ongoing') {
      return startTime <= now && endTime >= now;
    }
    return false;
  });
};


// Filter contests by platform
export const filterContestsByPlatform = (contests: Contest[], platforms: ('codeforces' | 'leetcode' | 'codechef')[]): Contest[] => {
  if (platforms.length === 0) return contests;
  return contests.filter(contest => platforms.includes(contest.platform));
};
