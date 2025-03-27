import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 15
            }}
            className="inline-block"
          >
            <div className="text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              404
            </div>
          </motion.div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-surface-800 dark:text-surface-100">
          Page Not Found
        </h1>
        
        <p className="mb-8 text-surface-600 dark:text-surface-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Home size={18} />
              <span>Go Home</span>
            </motion.button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="btn btn-outline w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;