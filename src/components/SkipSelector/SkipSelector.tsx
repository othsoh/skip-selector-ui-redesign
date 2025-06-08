import React, { useState, useMemo } from "react";
import { SkipSelectorProps, Skip } from "../../types";
import { useSkips } from "../../hooks";
import { SkipCard } from "../SkipCard/SkipCard";
import { Loading, ErrorState, Stepper } from "../common";

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
      title: "Delivery Details",
      description: "Set delivery info",
      status: "upcoming" as const,
    },
    {
      id: 5,
      title: "Payment",
      description: "Complete payment",
      status: "upcoming" as const,
    },
    {
      id: 6,
      title: "Confirmation",
      description: "Order confirmed",
      status: "upcoming" as const,
    },
  ];

  const sortedSkips = useMemo(() => {
    if (!skips) return [];

    return [...skips].sort((a, b) => {
      switch (sortBy) {
        case "size-asc":
          return a.size - b.size;
        case "size-desc":
          return b.size - a.size;
        case "price-asc":
          return a.price_before_vat - b.price_before_vat;
        case "price-desc":
          return b.price_before_vat - a.price_before_vat;
        default:
          return 0;
      }
    });
  }, [skips, sortBy]);

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
    onSkipSelect?.(skip);
  };

  const handleProceed = () => {
    if (selectedSkip) {
      console.log("Proceeding with skip:", selectedSkip);
      // Handle proceed logic
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 relative">
        <div className="bg-gray-900 py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <Stepper steps={steps} />
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-slate-100 mb-2 sm:text-3xl">
                Select Your Skip
              </h1>
              <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Choose the perfect skip size for your waste disposal needs in {area}.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Loading text="Finding available skips..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 relative">
        <div className="bg-gray-900 py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <Stepper steps={steps} />
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-slate-100 mb-2 sm:text-3xl">
                Select Your Skip
              </h1>
              <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Choose the perfect skip size for your waste disposal needs in {area}.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ErrorState
            message="Failed to load available skips. Please try again."
            onRetry={refetch}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <div className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Stepper steps={steps} />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-slate-100 mb-2 sm:text-3xl">
              Select Your Skip
            </h1>
            <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Choose the perfect skip size for your waste disposal needs in {area}.
            </p>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-semibold text-slate-100 m-0">
              {sortedSkips.length} skip{sortedSkips.length !== 1 ? "s" : ""} available
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-slate-700 rounded-md bg-surface text-xs text-slate-100 cursor-pointer min-w-[140px] focus:outline-none focus:border-primary"
              >
                <option value="size-asc">Size (Small to Large)</option>
                <option value="size-desc">Size (Large to Small)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedSkips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                onSelect={handleSkipSelect}
                isSelected={selectedSkip?.id === skip.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Selected Skip Bar */}
      {selectedSkip && (
        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-primary p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transform translate-y-0 transition-transform duration-300 ease-in-out z-[1000]">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h4 className="m-0 text-slate-100 text-base font-semibold">
                  {selectedSkip.size} Yard Skip Selected
                </h4>
                <p className="m-0 text-slate-400 text-sm">
                  {selectedSkip.hire_period_days} day hire •{" "}
                  <span className="bg-primary text-white px-1.5 py-0.5 rounded font-semibold text-sm ml-1">
                    £{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={handleProceed}
              className="inline-flex items-center justify-center gap-2 border-0 rounded-lg font-semibold transition-all duration-200 cursor-pointer px-6 py-3 text-base bg-primary text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Delivery Details
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
