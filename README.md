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
  ├── components/      # Reusable UI components
  ├── pages/          # Page components
  ├── hooks/          # Custom React hooks
  ├── assets/         # Static assets
  └── context/        # React context providers
```

## API Integration

PackageViz uses the following NPM Registry APIs:
- Registry API (`registry.npmjs.org`) for package information
- Downloads API (`api.npmjs.org`) for download statistics

## Security

Please see our [Security Policy](SECURITY.md) for reporting security vulnerabilities.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using [React](https://react.dev/) and [Vite](https://vitejs.dev/)
