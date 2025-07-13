// DashboardContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    const [userData, setUserData] = useState({
        name: "Alex Kumar",
        level: 12,
        currentXP: 2400,
        maxXP: 3000,
        title: "CRED Elite",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    });

    const [rewardData, setRewardData] = useState({
        currentPoints: 15640,
        nextMilestone: 20000,
        totalEarned: 45320,
        tier: 'Platinum',
        nextTier: 'Diamond',
        pointsToNextTier: 4360,
    });

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

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const claimBenefit = (id) => {
        setBenefits((prev) =>
            prev.map((b) => (b.id === id ? { ...b, claimed: true } : b))
        );
    };

    return (
        <DashboardContext.Provider value={{
            isLoading, userData, rewardData, benefits, setUserData, setRewardData, claimBenefit,
        }}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    return useContext(DashboardContext);
}
