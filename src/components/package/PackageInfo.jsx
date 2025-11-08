import {
  ScaleIcon,
  CubeTransparentIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  UserGroupIcon,
  TagIcon,
  CubeIcon,
  LinkIcon,
  BugAntIcon,
} from '@heroicons/react/24/solid';

export function PackageInfo({ packageData }) {
  const formatDate = (date) => {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const cleanRepoUrl = (url) => {
    if (!url) return null;
    return url
      .replace('git+', '')
      .replace('.git', '')
      .replace('ssh://git@', 'https://')
      .replace('git://', 'https://');
  };

  const npmUrl = `https://www.npmjs.com/package/${packageData.name}`;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">{packageData.name}</h2>
        <p className="text-gray-600 text-lg">{packageData.description}</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
          icon={<TagIcon className="w-5 h-5 text-blue-500" />}
          label="Version" 
          value={packageData.version} 
        />
        <StatCard 
          icon={<CubeIcon className="w-5 h-5 text-green-500" />}
          label="Total Versions" 
          value={packageData.totalVersions || packageData.versions?.length || 0} 
        />
        <StatCard 
          icon={<svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>}
          label="License" 
          value={packageData.license} 
        />
        <StatCard 
          icon={<svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>
          </svg>}
          label="Author" 
          value={packageData.author} 
        />
      </div>

      {/* Detailed Information Sections */}
      <div className="space-y-6">
        {/* Publish Information */}
        <InfoSection icon={<CalendarIcon className="w-5 h-5" />} title="Publish Information">
          <InfoRow label="First Published" value={formatDate(packageData.createdDate)} />
          <InfoRow label="Last Updated" value={formatDate(packageData.modifiedDate)} />
          <InfoRow label="Total Downloads" value={packageData.downloads?.toLocaleString() || 'N/A'} />
        </InfoSection>

        {/* Maintainers */}
        {packageData.maintainers && packageData.maintainers.length > 0 && (
          <InfoSection icon={<UserGroupIcon className="w-5 h-5" />} title="Maintainers">
            <div className="flex flex-wrap gap-2">
              {packageData.maintainers.map((maintainer, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {maintainer}
                </span>
              ))}
            </div>
          </InfoSection>
        )}

        {/* Distribution Tags */}
        {packageData.distTags && Object.keys(packageData.distTags).length > 1 && (
          <InfoSection icon={<TagIcon className="w-5 h-5" />} title="Distribution Tags">
            <div className="space-y-1">
              {Object.entries(packageData.distTags).map(([tag, version]) => (
                <InfoRow key={tag} label={tag} value={version} />
              ))}
            </div>
          </InfoSection>
        )}

        {/* Keywords */}
        {packageData.keywords && packageData.keywords.length > 0 && (
          <InfoSection icon={<TagIcon className="w-5 h-5" />} title="Keywords">
            <div className="flex flex-wrap gap-2">
              {packageData.keywords.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </InfoSection>
        )}

        {/* Links */}
        <InfoSection icon={<LinkIcon className="w-5 h-5" />} title="Links">
          <div className="space-y-2">
            <ExternalLink href={npmUrl} label="NPM Package" />
            {packageData.repository && (
              <ExternalLink href={cleanRepoUrl(packageData.repository)} label="Repository" />
            )}
            {packageData.homepage && (
              <ExternalLink href={packageData.homepage} label="Homepage" />
            )}
            {packageData.bugs && (
              <ExternalLink href={packageData.bugs} label="Report Issues" icon={<BugAntIcon className="w-4 h-4" />} />
            )}
          </div>
        </InfoSection>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="font-bold text-lg text-gray-900 truncate">{value}</div>
    </div>
  );
}

function InfoSection({ icon, title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-blue-600">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="ml-7">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex py-1">
      <span className="font-medium text-gray-700 min-w-[140px]">{label}:</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}

function ExternalLink({ href, label, icon }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
    >
      {icon || <LinkIcon className="w-4 h-4" />}
      <span>{label}</span>
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
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
