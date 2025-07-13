import { Dashboard } from '@/components/Dashboard';
import { DashboardProvider } from '@/context/DashboardContext';
import { ThemeProvider } from '@/providers/ThemeProvider';

const Index = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cred-garage-theme">
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </ThemeProvider>
  );
};

export default Index;
