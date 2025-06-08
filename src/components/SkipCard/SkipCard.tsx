import React, { useState } from "react";
import { SkipCardProps } from "../../types";
import { getSkipImageUrl, formatHirePeriod } from "../../utils";

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
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="M12 2v20" />
    <path d="M3 8l9 4 9-4" />
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
    priceWithVat % 1 === 0 ? priceWithVat.toFixed(0) : priceWithVat.toFixed(2);  return (
    <div
      className={`
        relative cursor-pointer flex flex-col
        bg-surface backdrop-blur-sm rounded-2xl 
        shadow-lg transition-all duration-500 ease-out
        border border-slate-700 overflow-hidden
        card-shimmer h-full
        ${
          isSelected
            ? "border-primary shadow-[0_25px_50px_-12px_rgba(59,130,246,0.4)] bg-blue-500/15 -translate-y-0.5 scale-101"
            : ""
        }
        ${
          isHovered && !isSelected
            ? "-translate-y-1 scale-102 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]"
            : ""
        }
        ${
          !isSelected && !isHovered
            ? "hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:scale-102"
            : ""
        }
      `}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>

        {/* Skip Image */}
        <img
          src={imageUrl}
          alt={`${skip.size} Yard Skip`}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Feature Badges */}
        {!skip.allowed_on_road && (
          <div className="absolute top-4 left-4 z-20 px-2 py-1 rounded-md text-xs font-semibold backdrop-blur-sm bg-red-500/90 text-white flex items-center gap-1">
            <TruckIcon />
            Not Allowed on Road
          </div>
        )}

        {skip.allows_heavy_waste && (
          <div
            className="absolute left-4 z-20 px-2 py-1 rounded-md text-xs font-semibold backdrop-blur-sm bg-purple-500/90 text-white flex items-center gap-1"
            style={{ top: !skip.allowed_on_road ? "52px" : "16px" }}
          >
            <WeightIcon />
            Heavy Waste
          </div>
        )}

        {/* Size Badge */}
        <div className="absolute top-4 right-4 z-20 bg-gray-800/90 backdrop-blur-sm text-slate-100 font-bold text-sm px-2 py-1.5 rounded-md border border-slate-700">
          {skip.size} Yard
        </div>

        {/* Selected Overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-blue-500/20 z-20 flex items-center justify-center">
            <div className="bg-gray-800/95 border-2 border-primary rounded-full p-3 shadow-lg flex items-center justify-center text-primary">
              <CheckIconLarge />
            </div>
          </div>
        )}      </div>
      
      {/* Card Content */}
      <div className="flex flex-col p-6 flex-1">
        {/* Top Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-100 mb-2">
            {skip.size} Yard Skip
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {skip.hire_period_days} day hire period
            {skip.allowed_on_road
              ? " • Road placement allowed"
              : " • Private property only"}
            {skip.allows_heavy_waste ? " • Heavy waste accepted" : ""}
            {skip.forbidden ? " • Special restrictions apply" : ""}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <CalendarIcon />
              <span>{hirePeriod}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <PackageIcon />
              <span>{skip.size} yard capacity</span>
            </div>
            {skip.transport_cost && (
              <div className="flex items-center gap-2 text-slate-500">
                <TruckIcon />
                <span>£{skip.transport_cost} transport</span>
              </div>
            )}
            {skip.per_tonne_cost && (
              <div className="flex items-center gap-2 text-slate-500">
                <DollarIcon />
                <span>£{skip.per_tonne_cost} per tonne</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Fixed at bottom */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-gradient">
              £{formattedPrice}
            </div>
            <div className="text-xs text-slate-500">inc. VAT</div>
          </div>

          {/* Button */}
          <button
            onClick={handleButtonClick}
            className={`
              inline-flex items-center justify-center w-full gap-2
              border-0 rounded-lg font-semibold transition-all duration-300 
              cursor-pointer px-3 py-3 text-base
              ${
                isSelected
                  ? "btn-gradient-selected text-white shadow-[0_10px_15px_-3px_rgba(59,130,246,0.25)]"
                  : "btn-gradient text-white shadow-[0_10px_15px_-3px_rgba(59,130,246,0.25)]"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
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
          </button>
        </div>
      </div>
    </div>
  );
};
