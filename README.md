# PackageViz - NPM Package Visualizer

A modern web application built with React and Vite that provides interactive visualizations and analytics for NPM packages. Get insights about package downloads, version adoption, and more through beautiful charts and real-time data.

## Features

- 📊 **Interactive Visualizations**: View package data through Line, Bar, and Pie charts
- 🔄 **Real-time Stats**: Get live statistics from the NPM registry
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Vite and optimized for speed
- 🎨 **Modern UI**: Clean interface styled with Tailwind CSS

## Live Stats

- 📦 50K+ NPM Packages
- 📈 4B+ Daily Downloads
- 👥 2.5K+ Active Users
- 📊 90M+ Data Points

## Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/package-visualizer.git
cd package-visualizer
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun dev
```

The application will be available at `http://localhost:5173`

## Tech Stack

- [React](https://react.dev/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Router](https://reactrouter.com/) - Routing
- [Axios](https://axios-http.com/) - API requests

## Project Structure

```
src/
  ├── components/          # Reusable UI components
  │   ├── charts/         # Chart components (Line, Bar, Pie)
  │   ├── package/        # Package-related components
  │   ├── Navbar.jsx      # Navigation bar
  │   ├── Footer.jsx      # Footer component
  │   └── Layout.jsx      # Page layout wrapper
  ├── pages/              # Page components
  │   ├── Landing.jsx     # Landing page
  │   └── Visualizer.jsx  # Main visualizer page
  ├── hooks/              # Custom React hooks
  │   ├── useNpmStats.js  # NPM registry stats hook
  │   └── usePackageData.js # Package data fetching hook
  ├── services/           # API service layer
  │   ├── api.js          # Axios instance with interceptors
  │   └── npmService.js   # NPM API calls
  ├── assets/             # Static assets
  ├── App.jsx             # Root application component
  ├── ToastContext.jsx    # Toast notification context
  └── main.jsx            # Application entry point
```

## Architecture

### Service Layer

The application uses a clean service layer architecture:

- **API Client**: Configured axios instance with interceptors for error handling
- **NPM Service**: Centralized API calls to NPM registry and related services
- **Custom Hooks**: Reusable data fetching and state management logic

### Key Features

- **Separation of Concerns**: Business logic separated from UI components
- **Error Handling**: Centralized error handling with axios interceptors
- **Custom Hooks**: Data fetching logic abstracted into reusable hooks
- **Component Composition**: Small, focused components for better maintainability

## API Integration

PackageViz integrates with multiple APIs:

- **NPM Registry** (`registry.npmjs.org`) - Package metadata and information
- **jsDelivr** (`data.jsdelivr.com`) - Download statistics
- **Packagephobia** (`packagephobia.com`) - Bundle size information

### Proxy Configuration

The Vite proxy handles CORS issues for:

- `/api/npm` → NPM Registry
- `/api/packagephobia` → Packagephobia API

## Security

Please see our [Security Policy](SECURITY.md) for reporting security vulnerabilities.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using [React](https://react.dev/) and [Vite](https://vitejs.dev/)
