import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useDashboard } from '@/context/DashboardContext';
import { RewardRadialChart } from './RewardRadialChart';

export function RewardProgress() {
  const [progress, setProgress] = useState(0);
  const { isLoading, rewardData } = useDashboard();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        const progressPercent = (rewardData.currentPoints / rewardData.nextMilestone) * 100;
        setProgress(progressPercent);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, rewardData]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-0">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-24 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Radial Progress with Recharts */}
      <Card className="glass border-0 shadow-xl hover-scale transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-center text-gradient">Reward Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <RewardRadialChart percentage={Math.round(progress)} />
          </div>

          <div className="text-center space-y-2">
            <div className="text-3xl font-bold">
              {rewardData.currentPoints.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {rewardData.pointsToNextTier.toLocaleString()} points to {rewardData.nextTier}
            </div>
            <Badge className="gradient-primary text-white border-0">
              {rewardData.tier} Member
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Linear Progress & Stats */}
      <Card className="glass border-0 shadow-xl hover-scale transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-gradient">Progress to Next Tier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{rewardData.tier}</span>
              <span>{rewardData.nextTier}</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{rewardData.currentPoints.toLocaleString()}</span>
              <span>{rewardData.nextMilestone.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground-gradient">
                {rewardData.totalEarned.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Total Earned
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground-gradient">
                {rewardData.pointsToNextTier.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Points Needed
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Next Tier Benefits:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                <span className="text-muted-foreground">Priority customer support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
                <span className="text-muted-foreground">Exclusive premium offers</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-500 rounded-full" />
                <span className="text-muted-foreground">Higher reward multipliers</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
