import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ 
  onSearch, 
  onInputChange, 
  suggestions, 
  onSuggestionSelect,
  loading,
  initialValue = ''
}) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Update input when initialValue changes (e.g., from URL)
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(true);
    onInputChange(value);
  };

  const handleSuggestionClick = (packageName) => {
    setInputValue(packageName);
    setShowSuggestions(false);
    onSuggestionSelect(packageName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Enter npm package name (e.g., react, express, lodash)"
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-80 overflow-y-auto">
              {suggestions.map((pkg) => (
                <div
                  key={pkg.name}
                  onClick={() => handleSuggestionClick(pkg.name)}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                >
                  <div className="font-medium text-gray-900">{pkg.name}</div>
                  <div className="text-sm text-gray-600 truncate">
                    {pkg.description}
                  </div>
                  {pkg.version && (
                    <div className="text-xs text-gray-500 mt-1">
                      v{pkg.version}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !inputValue.trim()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Searching...
            </span>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
}
