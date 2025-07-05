import { Dashboard } from '@/components/Dashboard';
import { ThemeProvider } from '@/providers/ThemeProvider';

const Index = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cred-garage-theme">
      <Dashboard />
    </ThemeProvider>
  );
};

export default Index;
