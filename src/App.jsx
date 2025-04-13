import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Visualizer from './pages/Visualizer';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import { ToastProvider } from './ToastContext';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <Navbar />
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/visualize" element={<Visualizer />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </Router>
  );
}
