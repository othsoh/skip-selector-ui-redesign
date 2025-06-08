import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { SkipSelectorProps, Skip } from "../../types";
import { useSkips } from "../../hooks";
import { SkipCard } from "../SkipCard/SkipCard";
import { Loading, ErrorState, Stepper } from "../common";
import { colors, spacing, breakpoints } from "../../styles/theme";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing.md};

  @media (min-width: ${breakpoints.sm}) {
    padding: 0 ${spacing.lg};
  }
`;

const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${(props) => props.gap || spacing.lg};

  @media (min-width: ${breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  @media (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(${(props) => props.columns || 3}, 1fr);
  }
`;

const Button = styled.button<{
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${(props) => (props.size === "sm" ? "0.25rem" : "0.5rem")};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;

  padding: ${spacing.sm} ${spacing.lg};
  font-size: 1rem;

  ${(props) =>
    props.size === "sm" &&
    `
    padding: ${spacing.xs} ${spacing.sm};
    font-size: 0.875rem;
  `}

  ${(props) =>
    props.size === "lg" &&
    `
    padding: ${spacing.lg} ${spacing.xl};
    font-size: 1.125rem;
  `}
  
  ${(props) => props.fullWidth && "width: 100%;"}
  
  background-color: ${colors.primary};
  color: ${colors.white};

  ${(props) =>
    props.variant === "secondary" &&
    `
    background-color: ${colors.surface};
    color: ${colors.text};
  `}

  ${(props) =>
    props.variant === "outline" &&
    `
    background-color: transparent;
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
  `}
  
  &:hover {
    background-color: ${colors.primaryHover};
  }

  ${(props) =>
    props.variant === "secondary" &&
    `
    &:hover {
      background-color: ${colors.backgroundSecondary};
    }
  `}

  ${(props) =>
    props.variant === "outline" &&
    `
    &:hover {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SelectorContainer = styled.div`
  min-height: 100vh;
  background: ${colors.background};
  position: relative;
`;

const ContentContainer = styled.div`
  background: ${colors.background};
  padding: ${spacing.lg} 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${colors.text};
  margin-bottom: ${spacing.xs};

  @media (max-width: ${breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg};
  flex-wrap: wrap;
  gap: ${spacing.md};
`;

const ResultsCount = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.text};
  margin: 0;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

const SortSelect = styled.select`
  padding: ${spacing.xs} ${spacing.sm};
  border: 1px solid ${colors.border};
  border-radius: 0.375rem;
  background: ${colors.surface};
  font-size: 0.75rem;
  color: ${colors.text};
  cursor: pointer;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const SelectedSkipBar = styled.div<{ show: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${colors.surface};
  border-top: 2px solid ${colors.primary};
  padding: ${spacing.md};
  box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1);
  transform: translateY(${(props) => (props.show ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const SelectedSkipContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.md};
`;

const SelectedSkipInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

const SelectedSkipText = styled.div`
  h4 {
    margin: 0;
    color: ${colors.text};
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${colors.textSecondary};
    font-size: 0.8rem;
  }
`;

const HighlightedPrice = styled.span`
  background: ${colors.primary};
  color: ${colors.white};
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.85rem;
  margin-left: 4px;
`;

type SortOption = "size-asc" | "size-desc" | "price-asc" | "price-desc";

// Icon component
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12,5 19,12 12,19"/>
  </svg>
);

export const SkipSelector: React.FC<SkipSelectorProps> = ({
  postcode = "NR32",
  area = "Lowestoft",
  onSkipSelect,
}) => {
  const { data: skips, loading, error, refetch } = useSkips(postcode, area);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("size-asc");

  // Define stepper steps
  const steps = [
    {
      id: 1,
      title: "Postcode",
      description: "Enter location",
      status: "completed" as const,
    },
    {
      id: 2,
      title: "Waste Type",
      description: "Select waste category",
      status: "completed" as const,
    },
    {
      id: 3,
      title: "Select Skip",
      description: "Choose skip size",
      status: "current" as const,
    },
    {
      id: 4,
      title: "Permit Check",
      description: "Location verification",
      status: "upcoming" as const,
    },
    {
      id: 5,
      title: "Choose Date",
      description: "Pick delivery date",
      status: "upcoming" as const,
    },
    {
      id: 6,
      title: "Payment",
      description: "Complete order",
      status: "upcoming" as const,
    },
  ];

  const filteredAndSortedSkips = useMemo(() => {
    if (!skips) return [];

    // Just sort skips (removed filtering)
    return skips.sort((a, b) => {
      switch (sortBy) {
        case "size-desc":
          return b.size - a.size;
        case "price-asc":
          return a.price_before_vat - b.price_before_vat;
        case "price-desc":
          return b.price_before_vat - a.price_before_vat;
        default: // 'size-asc'
          return a.size - b.size;
      }
    });
  }, [skips, sortBy]);

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
    onSkipSelect?.(skip);
  };
  const handleProceed = () => {
    if (selectedSkip) {
      const priceWithVat = selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100);
      alert(
        `Proceeding with ${selectedSkip.size} Yard Skip - £${priceWithVat.toFixed(2)}`
      );
    }
  };
  if (loading) {
    return (
      <SelectorContainer>
        <ContentContainer>
          <Loading text="Loading available skips..." />
        </ContentContainer>
      </SelectorContainer>
    );
  }

  if (error) {
    return (
      <SelectorContainer>
        <ContentContainer>
          <ErrorState
            title="Failed to Load Skips"
            message={error}
            onRetry={refetch}
            retryText="Reload Skips"
          />
        </ContentContainer>
      </SelectorContainer>
    );
  }
  return (
    <SelectorContainer>
      <ContentContainer>
        <Container>
          <Stepper steps={steps} currentStep={3} />
          <Header>
            <Title>Choose Your Skip Size</Title>
            <Subtitle>
              Select the perfect skip for your project from our range of sizes.
            </Subtitle>
          </Header>

          <ResultsHeader>
            <ResultsCount>
              {filteredAndSortedSkips.length} Skip
              {filteredAndSortedSkips.length !== 1 ? "s" : ""} Available
            </ResultsCount>
            <SortContainer>
              <label htmlFor="sort-select">Sort by:</label>
              <SortSelect
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="size-asc">Size (Small to Large)</option>
                <option value="size-desc">Size (Large to Small)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </SortSelect>
            </SortContainer>
          </ResultsHeader>

          <Grid>
            {filteredAndSortedSkips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                onSelect={handleSkipSelect}
                isSelected={selectedSkip?.id === skip.id}
              />
            ))}
          </Grid>
        </Container>
        <SelectedSkipBar show={!!selectedSkip}>
          <Container>
            <SelectedSkipContent>              <SelectedSkipInfo>                <SelectedSkipText>
                  <h4>{selectedSkip?.size} Yard Skip Selected</h4>
                  <p>
                    <HighlightedPrice>
                      £
                      {selectedSkip
                        ? (() => {
                            const priceWithVat = selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100);
                            return priceWithVat % 1 === 0 
                              ? priceWithVat.toFixed(0) 
                              : priceWithVat.toFixed(2);
                          })()
                        : "0"}{" "}
                      inc. VAT
                    </HighlightedPrice>
                    {selectedSkip?.transport_cost && (
                      <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#9ca3af' }}>
                        + £{selectedSkip.transport_cost} transport
                      </span>
                    )}
                    {selectedSkip?.per_tonne_cost && (
                      <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#9ca3af' }}>
                        £{selectedSkip.per_tonne_cost}/tonne
                      </span>
                    )}
                  </p>
                </SelectedSkipText>
              </SelectedSkipInfo><Button size="md" onClick={handleProceed}>
                Proceed to Checkout
                <ArrowRightIcon />
              </Button>
            </SelectedSkipContent>
          </Container>
        </SelectedSkipBar>
      </ContentContainer>
    </SelectorContainer>
  );
};
