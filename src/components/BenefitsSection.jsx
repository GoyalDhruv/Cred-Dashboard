import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/useToast';
import { CheckCircle, Clock, Star, Gift } from 'lucide-react';

export function BenefitsSection({ isLoading = false }) {
  const { toast } = useToast();

  const [benefits, setBenefits] = useState([
    {
      id: '1',
      title: 'Netflix Premium',
      description: 'Get 3 months free Netflix Premium subscription',
      icon: '🎬',
      discount: '₹597 OFF',
      category: 'Entertainment',
      claimed: false,
      expiresIn: '2 days',
    },
    {
      id: '2',
      title: 'Zomato Gold',
      description: 'Free delivery on your next 10 orders',
      icon: '🍕',
      discount: 'FREE',
      category: 'Food',
      claimed: false,
      expiresIn: '5 days',
    },
    {
      id: '3',
      title: 'Uber Rides',
      description: '50% off on your next 5 Uber rides',
      icon: '🚗',
      discount: '50% OFF',
      category: 'Travel',
      claimed: false,
      expiresIn: '1 week',
    },
    {
      id: '4',
      title: 'Myntra Fashion',
      description: 'Exclusive access to end of season sale',
      icon: '👕',
      discount: '70% OFF',
      category: 'Fashion',
      claimed: false,
      expiresIn: '3 days',
    },
    {
      id: '5',
      title: 'BookMyShow',
      description: 'Buy 1 get 1 free movie tickets',
      icon: '🎭',
      discount: 'BOGO',
      category: 'Entertainment',
      claimed: false,
      expiresIn: '1 week',
    },
    {
      id: '6',
      title: 'Amazon Prime',
      description: '6 months free Amazon Prime membership',
      icon: '📦',
      discount: '₹999 OFF',
      category: 'Shopping',
      claimed: false,
      expiresIn: '2 weeks',
    },
  ]);

  const handleClaim = (benefitId) => {
    setBenefits((prev) =>
      prev.map((benefit) =>
        benefit.id === benefitId ? { ...benefit, claimed: true } : benefit
      )
    );

    toast({
      title: 'Benefit Claimed! 🎉',
      description: 'Your benefit has been successfully claimed and will be available in your account.',
    });
  };

  const getIconComponent = (category) => {
    switch (category) {
      case 'Entertainment':
        return <Star className="h-4 w-4" />;
      case 'Food':
        return <Gift className="h-4 w-4" />;
      case 'Travel':
        return <Clock className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="glass border-0">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gradient">Available Benefits</h2>
        <Badge variant="outline" className="text-muted-foreground">
          {benefits.filter((b) => !b.claimed).length} available
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit) => (
          <Card
            key={benefit.id}
            className={`glass border-0 shadow-lg hover-scale transition-all duration-300 ${benefit.claimed ? 'opacity-75' : 'hover:shadow-2xl'
              }`}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-3xl">{benefit.icon}</div>
                <Badge
                  variant={benefit.claimed ? 'secondary' : 'default'}
                  className={benefit.claimed ? '' : 'gradient-secondary text-white border-0'}
                >
                  {benefit.discount}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  {getIconComponent(benefit.category)}
                  <span>{benefit.category}</span>
                </div>
                <span>Expires in {benefit.expiresIn}</span>
              </div>

              <Button
                className={`w-full transition-all duration-300 ${benefit.claimed
                    ? 'bg-green-500/20 text-green-600 cursor-not-allowed'
                    : 'gradient-primary hover:shadow-lg text-white border-0'
                  }`}
                onClick={() => !benefit.claimed && handleClaim(benefit.id)}
                disabled={benefit.claimed}
              >
                {benefit.claimed ? (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Claimed</span>
                  </div>
                ) : (
                  'Claim Now'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
