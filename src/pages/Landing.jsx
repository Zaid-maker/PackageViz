import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Search,
  TrendingUp,
  Code,
  Download,
  PieChart,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  Package,
} from 'lucide-react';
import { useNpmStats } from '../hooks/useNpmStats';

export default function Landing() {
  const { stats, loading } = useNpmStats();

  const statsItems = [
    { id: 1, name: 'NPM Packages', value: stats.packages, icon: Package },
    { id: 2, name: 'Daily Downloads', value: stats.downloads, icon: Download },
    { id: 3, name: 'Active Users', value: stats.users, icon: Users },
    { id: 4, name: 'Data Points', value: stats.dataPoints, icon: BarChart3 },
  ];

  const features = [
    {
      title: "Real-Time Analytics",
      description: "Get instant access to package download statistics and trends across all NPM packages",
      icon: BarChart3,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Version Insights",
      description: "Track version adoption rates and see which versions are most popular in the ecosystem",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Smart Search",
      description: "Lightning-fast package search with intelligent autocomplete and suggestions",
      icon: Search,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Dependency Analysis",
      description: "Understand package dependencies and their impact on your project",
      icon: Code,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Interactive Charts",
      description: "Visualize data through beautiful, interactive charts and graphs",
      icon: PieChart,
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Lightning Fast",
      description: "Optimized performance ensures you get the data you need instantly",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const benefits = [
    {
      title: 'Make Informed Decisions',
      description: 'Choose the right packages for your project based on real data and trends.',
      icon: CheckCircle2,
    },
    {
      title: 'Save Development Time',
      description: 'Quickly compare packages and understand their ecosystem without manual research.',
      icon: Clock,
    },
    {
      title: 'Stay Updated',
      description: 'Monitor your dependencies and stay informed about version releases and adoption.',
      icon: Shield,
    },
  ];

  const popularPackages = [
    { name: 'react', downloads: '20M+', trend: '+12%' },
    { name: 'express', downloads: '15M+', trend: '+8%' },
    { name: 'axios', downloads: '18M+', trend: '+15%' },
    { name: 'lodash', downloads: '25M+', trend: '+5%' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-8 border border-white/20"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">The Ultimate NPM Package Visualizer</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight"
            >
              Visualize NPM Packages
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
                Like Never Before
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl mx-auto text-xl text-blue-100 leading-relaxed"
            >
              Discover insights, track downloads, analyze dependencies, and make data-driven decisions 
              with our powerful visualization tools.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/visualize"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Start Visualizing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                Learn More
              </a>
            </motion.div>

            {/* Popular Packages Preview */}
            <motion.div
              variants={itemVariants}
              className="mt-16 flex flex-wrap justify-center gap-4"
            >
              <span className="text-blue-200 text-sm font-medium">Popular packages:</span>
              {popularPackages.map((pkg) => (
                <Link
                  key={pkg.name}
                  to={`/visualize?package=${pkg.name}`}
                  className="group px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  <span className="text-white font-mono text-sm">{pkg.name}</span>
                  <span className="ml-2 text-blue-200 text-xs">{pkg.downloads}</span>
                  <span className="ml-1 text-green-300 text-xs">{pkg.trend}</span>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsItems.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {loading ? (
                  <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  stat.value
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-gray-500">{stat.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        id="features"
        className="py-24 bg-gradient-to-b from-white to-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Features
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
            >
              Everything You Need
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Powerful features to help you understand and analyze NPM packages
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        className="py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
            >
              Why Developers Love PackageViz
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Join thousands of developers making smarter package decisions
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-6 shadow-lg">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-24 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Ready to Start Exploring?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of developers who use PackageViz to make informed decisions about their dependencies.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/visualize"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Get Started for Free
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
            <p className="mt-6 text-sm text-blue-200">
              No sign-up required • Completely free • Open source
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}