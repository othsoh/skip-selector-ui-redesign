# Skip Selector UI Redesign

A modern, responsive React TypeScript application for selecting waste disposal skips. This project represents a complete redesign and refactoring from styled-components to TailwindCSS, featuring a beautiful dark theme with gradient effects, animations, and mobile-first responsive design.

![Skip Selector UI](https://img.shields.io/badge/React-TypeScript-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)

## 🎯 Project Overview

This application allows users to browse and select from various skip sizes for waste disposal. The UI features:

- **Modern Design**: Dark theme with glass-morphism effects
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Step-by-Step Selection**: Guided user experience with progress indicators
- **Real-time Data**: Integration with skip availability API

## ✨ Key Features

### 🎨 Visual Design
- **Dark Theme**: Modern dark UI with blue accent colors
- **Glass Morphism**: Backdrop blur effects and transparent elements
- **Gradient Effects**: Custom CSS gradients for buttons and text
- **Smooth Animations**: CSS transitions and hover effects
- **Card-based Layout**: Clean, organized skip presentation

### 📱 Responsive Design
- **Mobile-First**: Optimized for touch devices
- **Adaptive Grid**: 2x3 grid on mobile/tablet, horizontal on desktop
- **Flexible Stepper**: Different layouts per screen size
- **Touch-Friendly**: Appropriate button sizes and spacing

### 🔧 Technical Features
- **TypeScript**: Full type safety and better developer experience
- **Modern React**: Functional components with hooks
- **TailwindCSS**: Utility-first CSS framework
- **Error Handling**: Graceful error states and loading indicators
- **API Integration**: Fetch skip data from external service

## 🛠 Technology Stack

### Frontend
- **React 19.1.0** - UI library
- **TypeScript 4.9.5** - Type safety
- **TailwindCSS 3.4.17** - Styling framework
- **React Testing Library** - Testing utilities

### Development Tools
- **Create React App** - Project setup and build tools
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **Git** - Version control

### Deployment
- **Vercel** - Hosting and continuous deployment
- **GitHub** - Code repository and CI/CD

## 🚀 Live Demo

**Production URL**: [https://skip-selector-ui-redesign.vercel.app](https://skip-selector-ui-redesign.vercel.app)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/othsoh/skip-selector-ui-redesign.git
   cd skip-selector-ui-redesign
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Background**: Dark slate (#0F172A)
- **Surface**: Dark gray with transparency
- **Text**: Light gray (#E2E8F0)
- **Accent**: Purple, Red for status indicators

### Typography
- **Headings**: Bold, large sizes for skip titles
- **Body Text**: Regular weight, comfortable reading size
- **Labels**: Small, muted for secondary information

### Layout Principles
- **Grid System**: CSS Grid for card layouts
- **Flexbox**: For component internal layout
- **Spacing**: Consistent padding and margins
- **Responsive Breakpoints**: Mobile-first approach

## 🏗 Architecture

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   │   ├── ErrorState.tsx
│   │   ├── Loading.tsx
│   │   └── Stepper.tsx
│   ├── Layout/          # App layout wrapper
│   ├── SkipCard/        # Individual skip display
│   └── SkipSelector/    # Main selection interface
├── hooks/               # Custom React hooks
├── services/            # API integration
├── types/               # TypeScript definitions
└── utils/               # Helper functions
```

### Component Hierarchy
```
App
└── Layout
    └── SkipSelector
        ├── Stepper
        ├── SkipCard[]
        ├── Loading
        └── ErrorState
```

## 🔄 Migration from Styled-Components

This project was completely refactored from styled-components to TailwindCSS:

### Before (Styled-Components)
- CSS-in-JS approach
- Component-scoped styles
- Theme provider for consistency
- Runtime style generation

### After (TailwindCSS)
- Utility-first CSS classes
- Design system in configuration
- Build-time CSS generation
- Better performance and smaller bundle

### Migration Benefits
- **Faster Development**: Pre-built utility classes
- **Better Performance**: No runtime CSS generation
- **Smaller Bundle**: Purged unused styles
- **Easier Maintenance**: Consistent design tokens
- **Better Developer Experience**: IntelliSense support

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (2x3 grid with connecting lines)
- **Tablet**: 640px - 1024px (2x3 grid)
- **Desktop**: > 1024px (horizontal stepper)

### Mobile Optimizations
- Touch-friendly button sizes (44px minimum)
- Simplified navigation
- Optimized image loading
- Reduced animations for performance

## 🧪 Testing

Run the test suite:
```bash
npm test
```

### Testing Strategy
- **Unit Tests**: Component functionality
- **Integration Tests**: API integration
- **Accessibility Tests**: Screen reader compatibility
- **Responsive Tests**: Multiple viewport sizes

## 🚀 Deployment

### Vercel Deployment
This project is automatically deployed to Vercel on every push to the main branch.

**Configuration Files:**
- `vercel.json` - Deployment settings
- `.npmrc` - Package manager configuration

### Manual Deployment
```bash
npm run build
vercel --prod
```

## 🔧 Configuration

### TailwindCSS Config
Custom configuration in `tailwind.config.js`:
- Extended color palette
- Custom spacing scale
- Component utilities
- Responsive breakpoints

### PostCSS Config
Processing pipeline in `postcss.config.js`:
- TailwindCSS
- Autoprefixer
- CSS optimization

## 🐛 Troubleshooting

### Common Issues

1. **TypeScript Errors**
   - Ensure TypeScript version 4.9.5 for React Scripts compatibility

2. **Dependency Conflicts**
   - Use `--legacy-peer-deps` flag with npm install

3. **Build Failures**
   - Check TailwindCSS purge configuration
   - Verify all imports are correct

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@othsoh](https://github.com/othsoh)
- Project: [Skip Selector UI Redesign](https://github.com/othsoh/skip-selector-ui-redesign)

## 🙏 Acknowledgments

- Original Create React App template
- TailwindCSS team for the amazing utility framework
- React community for excellent documentation and support
- Vercel for seamless deployment platform

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
