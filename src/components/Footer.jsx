import { Link } from 'react-router-dom';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { title: 'Product', links: [
      { label: 'Home', path: '/' },
      { label: 'Visualizer', path: '/visualize' },
      { label: 'Documentation', href: '#' },
    ]},
    { title: 'Resources', links: [
      { label: 'NPM', href: 'https://www.npmjs.com/' },
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'jsDelivr', href: 'https://www.jsdelivr.com/' },
    ]},
    { title: 'Legal', links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ]},
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and description */}
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="flex items-center">
              <CubeTransparentIcon className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">PackageViz</span>
            </Link>
            <p className="text-gray-500 text-base">
              Visualize and analyze NPM packages with interactive charts and detailed statistics.
            </p>
          </div>

          {/* Footer Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerLinks.slice(0, 2).map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.path ? (
                          <Link
                            to={link.path}
                            className="text-base text-gray-500 hover:text-gray-900"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base text-gray-500 hover:text-gray-900"
                          >
                            {link.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              {footerLinks.slice(2).map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-400 text-center">
            &copy; {currentYear} PackageViz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}