import React, { useState } from "react";
import styled from "styled-components";
import { SkipCardProps } from "../../types";
import { getSkipImageUrl, formatHirePeriod } from "../../utils";
import { colors, spacing } from "../../styles/theme";

const Card = styled.div`
  background: ${colors.surface};
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${colors.border};
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    transform: translateY(-4px) scale(1.02);
  }
`;

const StyledCard = styled(Card)<{ isSelected?: boolean; isHovered?: boolean }>`
  position: relative;
  cursor: pointer;
  ${(props) =>
    props.isSelected &&
    `
    border: 1px solid #3b82f6;
    box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.4);
    background: rgba(59, 130, 246, 0.15);
    transform: translateY(-2px) scale(1.01);
  `}

  ${(props) =>
    props.isHovered &&
    !props.isSelected &&
    `
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.15);  `}
`;

const FeatureBadge = styled.div<{ type: "road" | "heavy" | "warning" }>`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 20;
  padding: 4px 8px;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 4px;

  ${(props) =>
    props.type === "road" &&
    `
    background: rgba(34, 197, 94, 0.9);
    color: white;
  `}

  ${(props) =>
    props.type === "heavy" &&
    `
    background: rgba(168, 85, 247, 0.9);
    color: white;
  `}
  
  ${(props) =>
    props.type === "warning" &&
    `
    background: rgba(239, 68, 68, 0.9);
    color: white;
  `}
`;

const ImageContainer = styled.div`
  position: relative;
  height: 224px;
  overflow: hidden;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
  z-index: 10;
`;

const SkipImage = styled.img<{ isHovered?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
  transform: ${(props) => (props.isHovered ? "scale(1.1)" : "scale(1)")};
`;

const SizeBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 20;
  background: rgba(28, 28, 28, 0.9);
  backdrop-filter: blur(10px);
  color: ${colors.text};
  font-weight: 700;
  font-size: 0.875rem;
  padding: 6px 8px;
  border-radius: 0.375rem;
  border: 1px solid ${colors.border};
`;

const SelectedOverlay = styled.div<{ show: boolean }>`
  position: absolute;
  inset: 0;
  background: rgba(59, 130, 246, 0.2);
  z-index: 20;
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled.div`
  background: rgba(28, 28, 28, 0.95);
  border: 2px solid ${colors.primary};
  border-radius: 50%;
  padding: 12px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
`;

const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.text};
  margin: 0 0 8px 0;
`;

const Description = styled.p`
  color: ${colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  font-size: 0.75rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.textMuted};
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid ${colors.border};
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, #3b82f6, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const VatText = styled.div`
  font-size: 0.75rem;
  color: ${colors.textMuted};
`;

const Button = styled.button<{
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isSelected?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: ${spacing.sm} ${spacing.lg};
  font-size: 1rem;
  width: 100%;
  gap: 8px;
  ${(props) =>
    props.isSelected
      ? `
    background: linear-gradient(to right, #1e40af, #3b82f6);
    color: white;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.25);
    
    &:hover {
      background: linear-gradient(to right, #1d4ed8, #2563eb);
    }
  `
      : `
    background: linear-gradient(to right, #3b82f6, #6366f1);
    color: white;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.25);
    
    &:hover {
      background: linear-gradient(to right, #2563eb, #4f46e5);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Icon components (simplified SVGs)
const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CheckIcon2 = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const CheckIconLarge = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const PackageIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const TruckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16,8 20,8 23,11 23,16 16,16" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const WeightIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6.5 6.5h11l-1 7h-9l-1-7z" />
    <path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    <circle cx="9" cy="9" r="1" />
    <circle cx="15" cy="9" r="1" />
  </svg>
);

const DollarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const SkipCard: React.FC<SkipCardProps> = ({
  skip,
  onSelect,
  isSelected = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    onSelect(skip);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(skip);
  };
  const imageUrl = getSkipImageUrl(skip);
  const hirePeriod = formatHirePeriod(skip);
  const priceWithVat = skip.price_before_vat * (1 + skip.vat / 100);
  const formattedPrice =
    priceWithVat % 1 === 0 ? priceWithVat.toFixed(0) : priceWithVat.toFixed(2);

  return (
    <StyledCard
      isSelected={isSelected}
      isHovered={isHovered}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      {" "}
      <ImageContainer>
        <ImageOverlay />
        <SkipImage
          src={imageUrl}
          alt={`${skip.size} Yard Skip`}
          isHovered={isHovered}
        />{" "}
        {!skip.allowed_on_road && (
          <FeatureBadge type="warning">
            <TruckIcon />
            Not Allowed on Road
          </FeatureBadge>
        )}
        {skip.allows_heavy_waste && (
          <FeatureBadge
            type="heavy"
            style={{ top: !skip.allowed_on_road ? "52px" : "16px" }}
          >
            <WeightIcon />
            Heavy Waste
          </FeatureBadge>
        )}
        <SizeBadge>{skip.size} Yard</SizeBadge>
        <SelectedOverlay show={isSelected}>
          <CheckIcon>
            <CheckIconLarge />
          </CheckIcon>
        </SelectedOverlay>
      </ImageContainer>
      <CardContent className="h-full flex flex-col justify-between">
        <div>
          <div>
            <Title>{skip.size} Yard Skip</Title>{" "}
            <Description>
              {skip.hire_period_days} day hire period
              {skip.allowed_on_road
                ? " • Road placement allowed"
                : " • Private property only"}
              {skip.allows_heavy_waste ? " • Heavy waste accepted" : ""}
              {skip.forbidden ? " • Special restrictions apply" : ""}
            </Description>
          </div>
          <InfoGrid>
            <InfoItem>
              <CalendarIcon />
              <span>{hirePeriod}</span>
            </InfoItem>
            <InfoItem>
              <PackageIcon />
              <span>{skip.size} yard capacity</span>
            </InfoItem>
            {skip.transport_cost && (
              <InfoItem>
                <TruckIcon />
                <span>£{skip.transport_cost} transport</span>
              </InfoItem>
            )}
            {skip.per_tonne_cost && (
              <InfoItem>
                <DollarIcon />
                <span>£{skip.per_tonne_cost} per tonne</span>
              </InfoItem>
            )}
          </InfoGrid>
        </div>
        <div>
          <PriceSection>
            <Price>£{formattedPrice}</Price>
            <VatText>inc. VAT</VatText>
          </PriceSection>
          <Button isSelected={isSelected} onClick={handleButtonClick}>
            {isSelected ? (
              <>
                <CheckIcon2 />
                Selected
              </>
            ) : (
              <>
                <PackageIcon />
                Select This Skip
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </StyledCard>
  );
};
