import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => (
  <div className="mx-auto max-w-[120rem] px-[1.6rem] tablet:px-[2.4rem]">
    {children}
  </div>
);

export default MainLayout;
