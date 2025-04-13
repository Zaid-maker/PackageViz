import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  CodeBracketIcon,
  CloudArrowDownIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import { useNpmStats } from '../hooks/useNpmStats';

export default function Landing() {
  const { stats, loading } = useNpmStats();

  const statsItems = [
    { id: 1, name: 'NPM Packages', value: stats.packages },
    { id: 2, name: 'Daily Downloads', value: stats.downloads },
    { id: 3, name: 'Active Users', value: stats.users },
    { id: 4, name: 'Data Points', value: stats.dataPoints },
  ];

  const features = [
    {
      title: "Package Analytics",
      description: "Analyze NPM package statistics with interactive visualizations",
      icon: ChartBarIcon,
    },
    {
      title: "Version Tracking",
      description: "Track package versions and their adoption rates over time",
      icon: ArrowTrendingUpIcon,
    },
    {
      title: "Instant Search",
      description: "Search and compare package information in real-time",
      icon: MagnifyingGlassIcon,
    },
  ];

  const benefits = [
    {
      title: 'Real-time Package Stats',
      description: 'Get instant access to download statistics and version adoption rates.',
      icon: CloudArrowDownIcon,
    },
    {
      title: 'Advanced Visualizations',
      description: 'View package data through interactive charts and visualizations.',
      icon: ChartPieIcon,
    },
    {
      title: 'Developer Friendly',
      description: 'Built by developers, for developers, with a focus on usability.',
      icon: CodeBracketIcon,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <motion.div
                className="sm:text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Visualize and analyze</span>
                  <span className="block text-blue-600">NPM packages</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover insights about NPM packages through interactive visualizations. 
                  Track downloads, analyze version adoption, and make informed decisions.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/visualize"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="https://www.npmjs.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Browse NPM
                    </a>
                  </div>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="bg-blue-600 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {statsItems.map((stat) => (
              <motion.div
                key={stat.id}
                className="text-center"
                variants={itemVariants}
              >
                <motion.div
                  className="text-4xl font-extrabold text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  {loading ? (
                    <div className="h-8 w-24 mx-auto bg-blue-500/50 animate-pulse rounded"></div>
                  ) : (
                    stat.value
                  )}
                </motion.div>
                <p className="mt-2 text-base font-medium text-blue-100">
                  {stat.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="py-16 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Better way to analyze packages
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  className="relative"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        className="py-16 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Benefits</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why choose PackageViz?
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                className="bg-white rounded-lg shadow-sm p-6"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white mb-4">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-500">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="bg-blue-600 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to start analyzing packages?
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-100">
              Join thousands of developers who use PackageViz to make informed decisions.
            </p>
            <motion.div
              className="mt-8 flex justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/visualize"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}