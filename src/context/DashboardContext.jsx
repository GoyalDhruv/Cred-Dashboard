import { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();
import userMock from '@/mocks/user.json';
import rewardsMock from '@/mocks/rewards.json';
import benefitsMock from '@/mocks/benefits.json';

export function DashboardProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [rewardData, setRewardData] = useState(null);
    const [benefits, setBenefits] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setUserData(userMock);
            setRewardData(rewardsMock);
            setBenefits(benefitsMock);
            setIsLoading(false);
        }, 1000);

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
