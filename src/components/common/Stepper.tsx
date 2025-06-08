import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { colors, spacing } from '../../styles/theme';

const StepperGlobalStyle = createGlobalStyle`
  @media (max-width: 768px) {
    .desktop-icon {
      width: 16px !important;
      height: 16px !important;
    }
  }
`;

export interface Step {
  id: number;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const StepperContainer = styled.div`
  width: 100%;
  margin-bottom: ${spacing.sm};
  padding: ${spacing.xs} 0;
  
  @media (max-width: 768px) {
    margin-bottom: ${spacing.lg};
    padding: ${spacing.md} 0;
  }
`;

// Desktop: Single row layout
const DesktopStepper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.xs} 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Mobile: Two-row layout
const MobileStepper = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: relative;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const StepRow = styled.div<{ isBottomRow?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.isBottomRow ? '0' : spacing.xl};
  position: relative;
  
  @media (min-width: 769px) {
    margin-bottom: ${props => props.isBottomRow ? '0' : spacing.md};
  }
`;

const StepCircle = styled.div<{ status: 'completed' | 'current' | 'upcoming' }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  border: 2px solid;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1rem;
    border: 3px solid;
  }
  
  ${props => {
    switch (props.status) {
      case 'completed':
        return `
          background: ${colors.success};
          border-color: ${colors.success};
          color: white;
        `;
      case 'current':        return `
          background: ${colors.primary};
          border-color: ${colors.primary};
          color: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        `;
      case 'upcoming':
        return `
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(100, 100, 100, 0.4);
          color: rgba(255, 255, 255, 0.6);
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(100, 100, 100, 0.4);
          color: rgba(255, 255, 255, 0.6);
        `;
    }
  }}
    @media (max-width: 768px) {
    ${props => {
    switch (props.status) {
      case 'current':
        return `
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        `;
      default:
        return '';
    }
  }}
  }
  
  transition: all 0.3s ease;
`;

const StepLabel = styled.div<{ status: 'completed' | 'current' | 'upcoming' }>`
  position: absolute;
  top: 44px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
  
  @media (max-width: 768px) {
    top: 60px;
    font-size: 0.875rem;
  }
  
  ${props => {
    switch (props.status) {
      case 'completed':
        return `color: ${colors.success};`;
      case 'current':
        return `color: ${colors.primary};`;
      case 'upcoming':
        return `color: rgba(255, 255, 255, 0.5);`;
      default:
        return `color: rgba(255, 255, 255, 0.5);`;
    }
  }}
`;

// Connection lines for mobile two-row layout
const ConnectionLine = styled.div<{ isActive: boolean }>`
  position: absolute;
  height: 2px;
  background: ${props => props.isActive ? colors.primary : 'rgba(100, 100, 100, 0.3)'};
  border-radius: 2px;
  z-index: 1;
  
  @media (max-width: 768px) {
    height: 3px;
  }
`;

const TopRowLine = styled(ConnectionLine)`
  top: 50%;
  left: 36px;
  right: 36px;
  transform: translateY(-50%);
  
  @media (max-width: 768px) {
    left: 50px;
    right: 50px;
  }
`;

const BottomRowLine = styled(ConnectionLine)`
  top: 50%;
  left: 36px;
  right: 36px;
  transform: translateY(-50%);
  
  @media (max-width: 768px) {
    left: 50px;
    right: 50px;
  }
`;

const VerticalConnector = styled(ConnectionLine)<{ isActive: boolean }>`
  width: 2px;
  height: 40px;
  right: 18px;
  top: 36px;
  background: ${props => props.isActive ? colors.primary : 'rgba(100, 100, 100, 0.3)'};
  
  @media (max-width: 768px) {
    width: 3px;
    height: 60px;
    right: 25px;
    top: 50px;
  }
`;

// Desktop connection lines (horizontal)
const DesktopConnectionLine = styled.div<{ isActive: boolean }>`
  flex: 1;
  height: 2px;
  background: ${props => props.isActive ? colors.primary : 'rgba(100, 100, 100, 0.3)'};
  border-radius: 2px;
  min-width: 30px;
  max-width: 60px;
  margin: 0 -2px;
`;

const MobileStepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-shrink: 0;
`;

const DesktopStepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-shrink: 0;
`;

const MobileStepLabel = styled.div<{ status: 'completed' | 'current' | 'upcoming' }>`
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: ${spacing.xs};
  text-align: center;
  max-width: 60px;
  
  ${props => {
    switch (props.status) {
      case 'completed':
        return `color: ${colors.success};`;
      case 'current':
        return `color: ${colors.primary};`;
      case 'upcoming':
        return `color: rgba(255, 255, 255, 0.5);`;
      default:
        return `color: rgba(255, 255, 255, 0.5);`;
    }
  }}
`;

const DesktopStepLabel = styled.div<{ status: 'completed' | 'current' | 'upcoming' }>`
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: ${spacing.xs};
  text-align: center;
  white-space: nowrap;
  
  ${props => {
    switch (props.status) {
      case 'completed':
        return `color: ${colors.success};`;
      case 'current':
        return `color: ${colors.primary};`;
      case 'upcoming':
        return `color: rgba(255, 255, 255, 0.5);`;
      default:
        return `color: rgba(255, 255, 255, 0.5);`;
    }
  }}
`;

// Icon components
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="desktop-icon">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="desktop-icon">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="desktop-icon">
    <polyline points="3,6 5,6 21,6"/>
    <path d="m19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="desktop-icon">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16,8 20,8 23,11 23,16 16,16"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="desktop-icon">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="desktop-icon">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const CreditCardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="desktop-icon">
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

export const Stepper: React.FC<StepperProps> = ({ steps }) => {
  // For mobile layout: arrange as 1-2-3 top row, 6-5-4 bottom row
  const topRowSteps = steps.slice(0, 3); // Steps 1, 2, 3
  const bottomRowSteps = steps.slice(3, 6).reverse(); // Steps 6, 5, 4 (reversed)

  const isConnectionActive = (fromStep: number, toStep: number) => {
    const fromIndex = steps.findIndex(s => s.id === fromStep);
    const toIndex = steps.findIndex(s => s.id === toStep);
    return fromIndex !== -1 && toIndex !== -1 && 
           (steps[fromIndex].status === 'completed' || steps[toIndex].status === 'completed');
  };
  const renderMobileStepCircle = (step: Step) => (
    <div key={step.id} style={{ position: 'relative' }}>
      <StepCircle status={step.status}>
        {getStepIcon(step.id, step.status)}
      </StepCircle>
      <StepLabel status={step.status}>
        {step.title}
      </StepLabel>
    </div>
  );
  return (
    <StepperContainer>
      <StepperGlobalStyle />
      {/* Desktop Layout - Single Row */}      <DesktopStepper>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <DesktopStepWrapper>
              <StepCircle status={step.status}>
                {getStepIcon(step.id, step.status)}
              </StepCircle>
              <DesktopStepLabel status={step.status}>
                {step.title}
              </DesktopStepLabel>
            </DesktopStepWrapper>
            {index < steps.length - 1 && (
              <DesktopConnectionLine isActive={step.status === 'completed'} />
            )}
          </React.Fragment>
        ))}
      </DesktopStepper>

      {/* Mobile Layout - Two Rows */}
      <MobileStepper>
        {/* Top Row: 1 -> 2 -> 3 */}
        <StepRow>
          {topRowSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              {renderMobileStepCircle(step)}
              {index < topRowSteps.length - 1 && (
                <TopRowLine isActive={isConnectionActive(step.id, topRowSteps[index + 1].id)} />
              )}
            </React.Fragment>
          ))}
          {/* Vertical connector from 3 to 4 */}
          <VerticalConnector isActive={isConnectionActive(3, 4)} />
        </StepRow>

        {/* Bottom Row: 6 <- 5 <- 4 */}
        <StepRow isBottomRow>
          {bottomRowSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              {renderMobileStepCircle(step)}
              {index < bottomRowSteps.length - 1 && (
                <BottomRowLine isActive={isConnectionActive(step.id, bottomRowSteps[index + 1].id)} />
              )}
            </React.Fragment>
          ))}
        </StepRow>
      </MobileStepper>
    </StepperContainer>
  );
};
