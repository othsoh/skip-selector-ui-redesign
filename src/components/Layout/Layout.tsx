import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-slate-100">
      <main className="flex-1 p-0 m-0 w-full h-full">
        {children}
      </main>
      <footer className="bg-gray-900 text-slate-400 py-8 mt-auto border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-4 text-center sm:px-6">
          <p className="m-0 text-slate-500 text-sm">
          </p>
        </div>
      </footer>
    </div>
  );
};
