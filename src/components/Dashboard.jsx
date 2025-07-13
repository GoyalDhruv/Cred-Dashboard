import { UserProfile } from './UserProfile';
import { BenefitsSection } from './BenefitsSection';
import { RewardProgress } from './RewardProgress';
import { ThemeToggle } from './ThemeToggle';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDashboard } from '@/context/DashboardContext';
import { AnimatedWrapper } from './AnimatedWrapper';

export function Dashboard() {
  const { isLoading, rewardData, benefits } = useDashboard();

  const claimedBenefitsCount = benefits.filter(b => b.claimed).length;
  const satisfactionScore = 98;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  <img src="/src/assets/images/logo.png" alt="Logo" width={32} height={32} />
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">CRED Garage</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="gradient-success text-white border-0 animate-pulse-slow">
                🔥 {benefits.filter(b => !b.claimed).length} new offers
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Message */}
        {!isLoading && (
          <div className="text-center space-y-2 animate-fade-in">
            <h2 className="text-3xl font-bold text-gradient">Welcome back!</h2>
            <p className="text-muted-foreground">
              Discover exclusive rewards and benefits crafted just for you
            </p>
          </div>
        )}

        {/* User Profile */}
        <AnimatedWrapper>
          <UserProfile />
        </AnimatedWrapper>

        {/* Reward Progress */}
        <AnimatedWrapper delay={0.1}>
          <RewardProgress />
        </AnimatedWrapper>

        {/* Benefits Section */}
        <AnimatedWrapper style={{ animationDelay: '0.2s' }}>
          <BenefitsSection />
        </AnimatedWrapper>

        {/* Quick Stats */}
        {
          !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Card className="glass border-0 shadow-lg hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-gradient">
                    ₹{rewardData.totalEarned.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Money Saved</div>
                </CardContent>
              </Card>

              <Card className="glass border-0 shadow-lg hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-gradient">
                    {claimedBenefitsCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Benefits Claimed</div>
                </CardContent>
              </Card>

              <Card className="glass border-0 shadow-lg hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-gradient">
                    {satisfactionScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">Satisfaction Score</div>
                </CardContent>
              </Card>
            </div>
          )
        }
      </main >

      {/* Footer */}
      < footer className="glass border-t border-white/10 mt-16" >
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 CRED Garage</p>
          </div>
        </div>
      </footer >
    </div >
  );
}
