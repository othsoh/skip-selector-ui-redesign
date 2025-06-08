import React from 'react';

interface LoadingProps {
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-16">
      <div className="w-10 h-10 border-4 border-slate-700 border-t-primary rounded-full loading-spinner"></div>
      <p className="mt-4 text-slate-400 text-base">{text}</p>
    </div>
  );
};
