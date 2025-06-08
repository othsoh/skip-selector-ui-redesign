# Skip Selector UI Redesign - WeWantWaste Coding Challenge

A complete redesign of the WeWantWaste skip selection page, built with React TypeScript and TailwindCSS. This project demonstrates modern front-end development practices, responsive design, and clean component architecture.

## 🚀 Live Demo

**Live Application**: [https://skip-selector-ui-redesign.vercel.app](https://skip-selector-ui-redesign.vercel.app)


## 📸 UI Screenshots

### Desktop View
![Desktop - Skip Selection Interface](https://github.com/user-attachments/assets/583784bf-b218-43b8-918f-78a8b93cb4a5)

### Mobile View
![Mobile - Responsive Design](https://github.com/user-attachments/assets/bad9fb53-0b97-4554-830f-a36f5594f48e)

### Key UI Features
- 🌙 **Dark Theme**: Professional dark interface with blue accents
- ✨ **Glass Morphism**: Backdrop blur effects and transparent cards
- 🎨 **Interactive Cards**: Hover effects and selection states with blue borders
- 📱 **Responsive Grid**: Adaptive layout across all screen sizes
- 🔄 **Smooth Animations**: CSS transitions and transform effects
- 💫 **Visual Feedback**: Clear selection indicators and progress tracking

*Screenshots showcase the complete visual transformation from the original WeWantWaste interface*

## 📋 Challenge Overview

This project is my submission for the WeWantWaste front-end coding challenge. The task was to completely redesign the "choose your skip size" page while maintaining all functionality and improving the user experience.

### Original Requirements:
- ✅ Complete visual redesign (looks completely different from original)
- ✅ Maintain all functionality intact
- ✅ Clean, maintainable React code
- ✅ Fully responsive (mobile and desktop)
- ✅ UI/UX improvements
- ✅ Use API data: `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`

## 🎯 My Approach

### Design Philosophy
I chose a **modern dark theme with glass-morphism effects** to create a premium, professional feel that stands out from typical waste management interfaces. The design focuses on:

- **Visual Hierarchy**: Clear skip pricing and features
- **User Experience**: Intuitive selection process with visual feedback
- **Modern Aesthetics**: Dark theme with blue accents and gradient effects
- **Mobile-First**: Touch-friendly interface for all devices

### Technical Decisions
- **React + TypeScript**: For type safety and maintainable code
- **TailwindCSS**: Utility-first CSS for rapid development and consistency
- **Component Architecture**: Modular, reusable components
- **Responsive Design**: Mobile-first approach with adaptive layouts

## ✨ Key Features & Improvements

### 🎨 Visual Design
- **Dark Theme**: Modern dark UI with blue accent colors
- **Glass Morphism**: Backdrop blur effects and transparent cards
- **Gradient Effects**: Custom gradients for buttons and pricing
- **Smooth Animations**: Hover effects and transitions
- **Card-based Layout**: Clean, organized skip presentation

### 📱 Responsive Design
- **Mobile (< 640px)**: 2x3 grid with connecting stepper lines
- **Tablet (640px - 1024px)**: 2x3 grid layout
- **Desktop (> 1024px)**: Horizontal stepper with card grid
- **Touch-Friendly**: 44px minimum touch targets

### 🔧 Functionality
- **Skip Selection**: Visual selection with confirmation states
- **Price Display**: Clear pricing with VAT included
- **Feature Badges**: Road placement, heavy waste acceptance
- **Progress Tracking**: Multi-step selection process
- **Error Handling**: Graceful API error states
- **Loading States**: Smooth loading experience

## 🛠 Technology Stack

- **React 19.1.0** - Modern React with functional components
- **TypeScript 4.9.5** - Type safety and better DX
- **TailwindCSS 3.4.17** - Utility-first styling
- **Axios** - API integration
- **Create React App** - Build tooling
- **Vercel** - Deployment platform
## 🏗 Architecture

### Component Structure
```
src/
├── components/
│   ├── common/
│   │   ├── ErrorState.tsx    # Error handling UI
│   │   ├── Loading.tsx       # Loading spinner
│   │   └── Stepper.tsx       # Progress indicator
│   ├── Layout/
│   │   └── Layout.tsx        # App layout wrapper
│   ├── SkipCard/
│   │   └── SkipCard.tsx      # Individual skip display
│   └── SkipSelector/
│       └── SkipSelector.tsx  # Main selection logic
├── hooks/
│   └── useSkips.ts          # API data fetching
├── services/
│   └── skipService.ts       # API integration
├── types/
│   └── skip.ts              # TypeScript definitions
└── utils/
    └── skipUtils.ts         # Helper functions
```

### Key Components

#### SkipCard
- Interactive skip display with hover effects
- Price calculation with VAT
- Feature badges (road placement, heavy waste)
- Selection states with visual feedback

#### Stepper
- Responsive progress indicator
- Different layouts per screen size
- Connecting lines on mobile
- Step status tracking

#### SkipSelector
- Main application logic
- API integration with error handling
- Skip selection state management
- Responsive grid layout

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) - CTAs and accents
- **Background**: Dark Slate (#0F172A) - Main background
- **Surface**: Gray with transparency - Cards and overlays
- **Text**: Light Gray (#E2E8F0) - Primary text
- **Success**: Green - Positive actions
- **Warning**: Red - Restrictions

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible sizes
- **Labels**: Subtle, secondary information

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/othsoh/skip-selector-ui-redesign.git

# Navigate to project
cd skip-selector-ui-redesign

# Install dependencies (use legacy-peer-deps for compatibility)
npm install --legacy-peer-deps

# Start development server
npm start

# Visit http://localhost:3000
```

### Build for Production
```bash
npm run build
```

## 🔄 Development Process

### From Styled-Components to TailwindCSS
This project was initially built with styled-components but completely migrated to TailwindCSS for:
- **Better Performance**: No runtime CSS generation
- **Faster Development**: Pre-built utility classes
- **Consistency**: Design system in configuration
- **Maintainability**: Easier to modify and extend

### API Integration
- **Endpoint**: WeWantWaste API for skip data
- **Error Handling**: Graceful degradation with user feedback
- **Loading States**: Smooth user experience
- **Type Safety**: Full TypeScript coverage

## 🧪 Testing & Quality

### Code Quality
- **TypeScript**: Full type coverage
- **ESLint**: Code linting and formatting
- **Component Testing**: React Testing Library
- **Responsive Testing**: Multiple viewport testing

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design tested on various devices

## 📈 Performance Optimizations

- **Code Splitting**: Lazy loading where appropriate
- **Image Optimization**: Efficient skip images
- **CSS Purging**: Unused TailwindCSS removal
- **Bundle Analysis**: Optimized build size

## 🔧 Configuration Files

- **vercel.json**: Deployment configuration
- **tailwind.config.js**: Design system setup
- **postcss.config.js**: CSS processing
- **.npmrc**: Package management settings

## 🌟 Unique Features

1. **Dynamic Stepper**: Adapts layout based on screen size
2. **Glass Morphism**: Modern visual effects
3. **Smart Responsive**: Different UIs for different devices
4. **Interactive Feedback**: Hover states and animations
5. **Accessibility**: WCAG compliant design

## 🚀 Deployment

Deployed on **Vercel** with automatic deployments from GitHub:
- **Production**: https://skip-selector-ui-redesign.vercel.app
- **Continuous Integration**: Auto-deploy on push to main
- **Environment**: Node.js with TypeScript support

## 📞 Contact

**Othman** - GitHub: [@othsoh](https://github.com/othsoh)

**Othman** - Linkedin: [@othsoh](https://www.linkedin.com/in/othman-sohab/)

