import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useDashboard } from '@/context/DashboardContext';

export function RewardProgress() {
  const [progress, setProgress] = useState(0);
  const [radialProgress, setRadialProgress] = useState(0);

  const { isLoading, rewardData } = useDashboard();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        const progressPercent = (rewardData.currentPoints / rewardData.nextMilestone) * 100;
        setProgress(progressPercent);
        setRadialProgress(progressPercent);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (radialProgress / 100) * circumference;

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
      {/* Radial Progress */}
      <Card className="glass border-0 shadow-xl hover-scale transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-center text-gradient">Reward Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted/20"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </div>
            </div>
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
