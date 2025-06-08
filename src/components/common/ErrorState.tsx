import React from 'react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryText = 'Try Again'
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-16 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-danger mb-4">{title}</h3>
      <p className="text-slate-400 mb-16 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center border-0 rounded-lg font-semibold no-underline transition-all duration-200 cursor-pointer px-6 py-3 text-base bg-primary text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {retryText}
        </button>
      )}
    </div>
  );
};
