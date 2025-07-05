import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserProfile({ isLoading = false }) {
  const [xpProgress, setXpProgress] = useState(0);

  const userData = {
    name: "Alex Kumar",
    level: 12,
    currentXP: 2400,
    maxXP: 3000,
    title: "CRED Elite",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setXpProgress((userData.currentXP / userData.maxXP) * 100);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <Card className="glass border-0 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const initials = userData.name
    ? userData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
    : "U";

  return (
    <Card className="glass border-0 shadow-2xl hover-scale transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="relative self-start sm:self-auto">
            <Avatar className="h-16 w-16 ring-4 ring-white/20">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="gradient-primary text-white font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span
              aria-label={`Level ${userData.level}`}
              className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
            >
              {userData.level}
            </span>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="text-xl font-bold text-gradient">{userData.name}</h3>
              <Badge variant="secondary" className="gradient-primary text-white border-0">
                {userData.title}
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Level {userData.level} Progress</span>
                <span>
                  {userData.currentXP}/{userData.maxXP} XP
                </span>
              </div>
              <Progress
                value={xpProgress}
                className="h-2 bg-muted/50 transition-[width] duration-500"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
