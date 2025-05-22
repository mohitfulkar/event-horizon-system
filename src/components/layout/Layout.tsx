
import React, { ReactNode } from 'react';
import { SideNav } from './SideNav';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <SideNav />
      <main className="flex-1 p-6 ml-64">
        {children}
      </main>
    </div>
  );
};
