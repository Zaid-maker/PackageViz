import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="min-h-screen flex flex-col"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ 
          duration: 0.2,
          ease: 'easeInOut'
        }}
      >
        <div className="flex-1 pt-16">
          {children}
        </div>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}