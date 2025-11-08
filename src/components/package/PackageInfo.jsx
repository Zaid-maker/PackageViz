import {
  ScaleIcon,
  CubeTransparentIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

export function PackageInfo({ packageData }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{packageData.name}</h2>
      <p className="text-gray-600 mb-4">{packageData.description}</p>
      <div className="space-y-2">
        <InfoRow label="Author" value={packageData.author} />
        <InfoRow label="Version" value={packageData.version} />
        <InfoRow label="License" value={packageData.license} />
        <InfoRow 
          label="Total Downloads" 
          value={packageData.downloads.toLocaleString()} 
        />
        {packageData.repository && (
          <InfoRow 
            label="Repository" 
            value={
              <a 
                href={packageData.repository.replace('git+', '').replace('.git', '')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on GitHub
              </a>
            } 
          />
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}

export function BundleInfo({ bundleSize }) {
  if (!bundleSize) return null;

  if (bundleSize.isError) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Bundle Size Analysis</h4>
            <p className="text-sm text-blue-700">
              Bundle size information is currently unavailable. This feature requires API access that has CORS restrictions in the browser.
            </p>
            <p className="text-xs text-blue-600 mt-2">
              💡 Tip: Visit <a href="https://bundlephobia.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">bundlephobia.com</a> directly to check bundle sizes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Bundle Analysis</h3>
      <div className="grid grid-cols-2 gap-4">
        <BundleCard
          icon={<ScaleIcon className="w-6 h-6 mx-auto text-blue-500 mb-2" />}
          label="Install Size"
          value={bundleSize.install.pretty || `${(bundleSize.install.bytes / 1024).toFixed(1)} KB`}
        />
        <BundleCard
          icon={<CubeTransparentIcon className="w-6 h-6 mx-auto text-blue-500 mb-2" />}
          label="Publish Size"
          value={bundleSize.publish.pretty || `${(bundleSize.publish.bytes / 1024).toFixed(1)} KB`}
        />
      </div>
      {bundleSize.version && (
        <div className="mt-3 text-sm text-gray-500 text-center">
          Size for version {bundleSize.version}
        </div>
      )}
    </div>
  );
}

function BundleCard({ icon, label, value }) {
  return (
    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
      {icon}
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

export function DependenciesInfo({ dependencies }) {
  if (!dependencies) return null;

  const depCounts = {
    dependencies: Object.keys(dependencies.dependencies || {}).length,
    devDependencies: Object.keys(dependencies.devDependencies || {}).length,
    peerDependencies: Object.keys(dependencies.peerDependencies || {}).length,
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Dependencies</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DependencyCard
          title="Dependencies"
          count={depCounts.dependencies}
        />
        <DependencyCard
          title="Dev Dependencies"
          count={depCounts.devDependencies}
        />
        <DependencyCard
          title="Peer Dependencies"
          count={depCounts.peerDependencies}
        />
      </div>
    </div>
  );
}

function DependencyCard({ title, count }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg text-center">
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="text-3xl font-semibold text-blue-600">{count}</div>
    </div>
  );
}
