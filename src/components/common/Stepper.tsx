import React from 'react';

export interface Step {
  id: number;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface StepperProps {
  steps: Step[];
  currentStep?: number;
}

// Icon components
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 md:w-4 md:h-4">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 md:w-4 md:h-4">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 md:w-4 md:h-4">
    <polyline points="3,6 5,6 21,6"/>
    <path d="m19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 md:w-4 md:h-4">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16,8 20,8 23,11 23,16 16,16"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 md:w-4 md:h-4">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 md:w-4 md:h-4">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const CreditCardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 md:w-4 md:h-4">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const getStepIcon = (stepId: number, status: string) => {
  if (status === 'completed') return <CheckIcon />;
  
  switch (stepId) {
    case 1: return <LocationIcon />;
    case 2: return <TrashIcon />;
    case 3: return <TruckIcon />;
    case 4: return <ShieldIcon />;
    case 5: return <CalendarIcon />;
    case 6: return <CreditCardIcon />;
    default: return stepId;
  }
};

const getStepStyles = (status: 'completed' | 'current' | 'upcoming') => {
  const baseClasses = "w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-sm md:text-base border-2 md:border-3 relative z-10 transition-all duration-300";
  
  switch (status) {
    case 'completed':
      return `${baseClasses} bg-green-500 border-green-500 text-white`;
    case 'current':
      return `${baseClasses} bg-blue-500 border-blue-500 text-white shadow-[0_0_0_3px_rgba(59,130,246,0.2)] md:shadow-[0_0_0_4px_rgba(59,130,246,0.2)]`;
    case 'upcoming':
      return `${baseClasses} bg-white/10 border-gray-400/40 text-white/60`;
    default:
      return `${baseClasses} bg-white/10 border-gray-400/40 text-white/60`;
  }
};

const getLabelStyles = (status: 'completed' | 'current' | 'upcoming') => {
  const baseClasses = "text-xs md:text-sm font-medium text-center";
  
  switch (status) {
    case 'completed':
      return `${baseClasses} text-green-500`;
    case 'current':
      return `${baseClasses} text-blue-500`;
    case 'upcoming':
      return `${baseClasses} text-white/50`;
    default:
      return `${baseClasses} text-white/50`;
  }
};

export const Stepper: React.FC<StepperProps> = ({ steps }) => {
  return (
    <div className="w-full mb-4 md:mb-8 py-2 md:py-4">
      {/* Desktop Layout - Single Row */}
      <div className="hidden lg:flex items-center gap-2 justify-center w-full max-w-5xl mx-auto py-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative flex-shrink-0">
              <div className={getStepStyles(step.status)}>
                {getStepIcon(step.id, step.status)}
              </div>
              <div className={getLabelStyles(step.status)}>
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`flex-1 h-0.5 rounded-full min-w-8 max-w-16 mx-[-2px] ${
                  step.status === 'completed' ? 'bg-green-500' : 'bg-gray-400/30'
                }`} 
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Tablet Layout - 2x3 Grid */}
      <div className="hidden md:block lg:hidden px-4">
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 max-w-md mx-auto">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={getStepStyles(step.status)}>
                {getStepIcon(step.id, step.status)}
              </div>
              <div className={`${getLabelStyles(step.status)} mt-2 text-center text-xs leading-tight`}>
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>      {/* Mobile Layout - Simple 2 Rows with Numbers and Connecting Lines */}
      <div className="block md:hidden px-4">
        <div className="relative max-w-sm mx-auto">
          {/* Connecting Lines */}
          <div className="absolute inset-0 z-0">
            {/* First row connecting lines (1-2, 2-3) */}
            <div className={`absolute top-[14px] left-[28px] w-[calc(33.333%-28px)] h-0.5 transition-colors duration-300 ${
              steps[1]?.status === 'completed' || steps[1]?.status === 'current' ? 'bg-green-400' : 'bg-gray-400/30'
            }`}></div>
            <div className={`absolute top-[14px] left-[calc(33.333%+28px)] w-[calc(33.333%-28px)] h-0.5 transition-colors duration-300 ${
              steps[2]?.status === 'completed' || steps[2]?.status === 'current' ? 'bg-green-400' : 'bg-gray-400/30'
            }`}></div>
            
            {/* Vertical connecting line from step 3 to 4 */}
            <div className={`absolute top-[calc(14px+14px)] right-[14px] w-0.5 h-3 transition-colors duration-300 ${
              steps[3]?.status === 'completed' || steps[3]?.status === 'current' ? 'bg-green-400' : 'bg-gray-400/30'
            }`}></div>
            
            {/* Second row connecting lines (4-5, 5-6) - Note: right to left */}
            <div className={`absolute top-[calc(14px+3rem+12px)] right-[28px] w-[calc(33.333%-28px)] h-0.5 transition-colors duration-300 ${
              steps[4]?.status === 'completed' || steps[4]?.status === 'current' ? 'bg-green-400' : 'bg-gray-400/30'
            }`}></div>
            <div className={`absolute top-[calc(14px+3rem+12px)] right-[calc(33.333%+28px)] w-[calc(33.333%-28px)] h-0.5 transition-colors duration-300 ${
              steps[5]?.status === 'completed' || steps[5]?.status === 'current' ? 'bg-green-400' : 'bg-gray-400/30'
            }`}></div>
          </div>
          
          <div className="grid grid-cols-3 gap-x-4 gap-y-3 relative z-10">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm border-2 relative z-10 transition-all duration-300 ${
                  step.status === 'completed' 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : step.status === 'current'
                    ? 'bg-blue-500 border-blue-500 text-white shadow-[0_0_0_3px_rgba(59,130,246,0.2)]'
                    : 'bg-white/10 border-gray-400/40 text-white/60'
                }`}>
                  {step.status === 'completed' ? <CheckIcon /> : step.id}
                </div>
                <div className={`${getLabelStyles(step.status)} mt-1 text-center text-xs leading-tight px-1`}>
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
