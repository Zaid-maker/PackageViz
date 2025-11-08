import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useToast } from './ToastContext';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props.showToast(error.message || 'An unexpected error occurred');
    console.error('Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg mt-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Something went wrong. Please try again.
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundaryWrapper({ children }) {
  const { showToast } = useToast();
  return <ErrorBoundary showToast={showToast}>{children}</ErrorBoundary>;
}