'use client';

import { useEffect } from 'react';
import { useNetwork } from '@/contexts/network.context';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';
import Notification from '../ui/notification/Notification';

type AppLandingProps = {
  children: React.ReactNode;
};

const AppLanding: React.FC<AppLandingProps> = ({ children }) => {
  const { isOnline, connectionRef } = useNetwork();

  useEffect(() => {
    const wasOnline = connectionRef.current;

    if (wasOnline !== null && wasOnline !== isOnline) {
      Notification({
        message: isOnline ? 'Connected to internet' : 'You are offline',
        description: isOnline
          ? 'Your network connection has been restored.'
          : 'Please check your connection and try again.',
        type: isOnline ? 'success' : 'error',
      });
    }

    connectionRef.current = isOnline;
  }, [isOnline, connectionRef]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* NAVBAR */}
      <AppNavbar />
      {/* MAIN CONTENT */}
      <main className="flex-1">{children}</main>
      {/* FOOTER */}
      <AppFooter />
    </div>
  );
};

export default AppLanding;
