
import React, { useState, useEffect } from 'react';
import { Contest, fetchAllContests, filterContestsByPlatform, filterContestsByTimeRange } from '@/services/api';
import ContestList from '@/components/ContestList';
import ContestFilters from '@/components/ContestFilters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Code2, Hourglass } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<('codeforces' | 'leetcode' | 'codechef')[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'past' | 'upcoming' | 'ongoing' | 'all'>('all');

  useEffect(() => {
    const loadContests = async () => {
      setLoading(true);
      try {
        const data = await fetchAllContests();
        setContests(data);
      } catch (error) {
        console.error('Error loading contests:', error);
        toast.error('Failed to load contests');
      } finally {
        setLoading(false);
      }
    };

    loadContests();
    
    // Refresh data every 5 minutes
    const interval = setInterval(loadContests, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePlatformToggle = (platform: 'codeforces' | 'leetcode' | 'codechef') => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };

  const handleTimeRangeChange = (range: 'past' | 'upcoming' | 'ongoing' | 'all') => {
    setSelectedTimeRange(range);
  };

  const clearFilters = () => {
    setSelectedPlatforms([]);
  };

  // Apply filters
  const filteredContests = filterContestsByPlatform(
    filterContestsByTimeRange(contests, selectedTimeRange),
    selectedPlatforms
  );

  // Group contests by status
  const ongoingContests = filteredContests.filter(c => c.status === 'ongoing');
  const upcomingContests = filteredContests.filter(c => c.status === 'upcoming');
  const pastContests = filteredContests.filter(c => c.status === 'past');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span>CodeArena Tracker</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <ContestFilters
            selectedPlatforms={selectedPlatforms}
            onPlatformToggle={handlePlatformToggle}
            selectedTimeRange={selectedTimeRange}
            onTimeRangeChange={handleTimeRangeChange}
            clearFilters={clearFilters}
          />

          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-pulse-slow text-center">
                <Hourglass className="h-8 w-8 mx-auto text-primary mb-4" />
                <p>Loading contests...</p>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="all" className="space-y-8">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Contests</TabsTrigger>
                <TabsTrigger value="ongoing" className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Live ({ongoingContests.length})
                </TabsTrigger>
                <TabsTrigger value="upcoming">
                  <Calendar className="h-4 w-4 mr-1" />
                  Upcoming ({upcomingContests.length})
                </TabsTrigger>
                <TabsTrigger value="past">Past ({pastContests.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-10">
                {ongoingContests.length > 0 && (
                  <ContestList contests={ongoingContests} title="Live Contests" />
                )}
                {upcomingContests.length > 0 && (
                  <ContestList contests={upcomingContests} title="Upcoming Contests" />
                )}
                {pastContests.length > 0 && (
                  <ContestList contests={pastContests} title="Past Contests" />
                )}
                {filteredContests.length === 0 && (
                  <div className="bg-card/30 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-medium mb-2">No contests found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to see more contests
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ongoing">
                <ContestList 
                  contests={ongoingContests} 
                  title="Live Contests" 
                  emptyMessage="No ongoing contests at the moment" 
                />
              </TabsContent>

              <TabsContent value="upcoming">
                <ContestList 
                  contests={upcomingContests} 
                  title="Upcoming Contests" 
                  emptyMessage="No upcoming contests in the next 7 days" 
                />
              </TabsContent>

              <TabsContent value="past">
                <ContestList 
                  contests={pastContests} 
                  title="Past Contests" 
                  emptyMessage="No past contests in the last 7 days" 
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      <footer className="border-t border-border py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>CodeArena Tracker &copy; {new Date().getFullYear()} - Track coding contests from LeetCode, CodeForces, and CodeChef</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
