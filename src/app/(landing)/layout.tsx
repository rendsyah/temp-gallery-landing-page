import AppLanding from '@/components/layouts/AppLanding';

const LandingLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <AppLanding>{children}</AppLanding>;
};

export default LandingLayoutPage;
