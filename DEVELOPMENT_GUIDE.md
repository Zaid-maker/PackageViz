# Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Adding a New Feature

### 1. Adding a New API Endpoint

Edit `src/services/npmService.js`:

```javascript
// Add a new method to the npmService object
getPackageVersions: async (packageName) => {
  try {
    const response = await apiClient.get(`/api/npm/${packageName}`);
    return Object.keys(response.data.versions);
  } catch (error) {
    console.error('Get package versions error:', error);
    throw error;
  }
},
```

### 2. Creating a Custom Hook

Create a new file in `src/hooks/`:

```javascript
// src/hooks/useMyFeature.js
import { useState, useEffect } from 'react';
import npmService from '../services/npmService';

export function useMyFeature() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await npmService.myNewMethod();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchData };
}
```

### 3. Creating a New Component

Create in appropriate directory:

```javascript
// src/components/package/MyComponent.jsx
export function MyComponent({ data }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">My Component</h3>
      <p>{data}</p>
    </div>
  );
}
```

### 4. Adding a New Route

Edit `src/App.jsx`:

```javascript
import MyNewPage from './pages/MyNewPage';

// Add to Routes
<Route path="/my-new-page" element={<MyNewPage />} />
```

## Project Standards

### File Naming

- Components: PascalCase (e.g., `SearchBar.jsx`)
- Hooks: camelCase with 'use' prefix (e.g., `usePackageData.js`)
- Services: camelCase (e.g., `npmService.js`)
- Utilities: camelCase (e.g., `formatters.js`)

### Component Structure

```javascript
// 1. Imports
import { useState } from 'react';
import { MyIcon } from '@heroicons/react/24/outline';

// 2. Component function
export function MyComponent({ prop1, prop2 }) {
  // 3. Hooks
  const [state, setState] = useState(null);
  
  // 4. Event handlers
  const handleClick = () => {
    // logic
  };
  
  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// 6. Sub-components (if needed)
function SubComponent() {
  return <div>Sub</div>;
}
```

### Service Pattern

```javascript
const myService = {
  // Method with try-catch
  getData: async (param) => {
    try {
      const response = await apiClient.get(`/endpoint/${param}`);
      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },
};

export default myService;
```

### Hook Pattern

```javascript
export function useMyHook() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (param) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await myService.getData(param);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
}
```

## Styling Guidelines

### Using Tailwind

- Use utility classes for common patterns
- Create components for complex/repeated styles
- Use `@layer` for custom utilities in index.css

### Common Patterns

```javascript
// Button
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
  Click me
</button>

// Card
<div className="bg-white p-6 rounded-xl shadow-md">
  Content
</div>

// Input
<input 
  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  type="text"
/>

// Grid layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* items */}
</div>
```

## Error Handling

### In Services

```javascript
try {
  const response = await apiClient.get('/endpoint');
  return response.data;
} catch (error) {
  console.error('Service name error:', error);
  if (error.status === 404) {
    throw { message: 'Not found', status: 404 };
  }
  throw error;
}
```

### In Components

```javascript
const { showToast } = useToast();

try {
  await someAction();
  showToast('Success!', 'success');
} catch (error) {
  showToast(error.message, 'error');
}
```

## Testing Tips

### Manual Testing Checklist

- [ ] Search functionality works
- [ ] Charts render correctly
- [ ] Loading states appear
- [ ] Errors show toast notifications
- [ ] Autocomplete suggestions appear
- [ ] Package info displays correctly
- [ ] Bundle size loads (or shows warning)
- [ ] Dependencies count correctly
- [ ] Chart switching works
- [ ] Mobile responsive

### Debug Tools

```javascript
// Add to any component for debugging
console.log('Component rendered:', { props, state });

// Log service calls
console.log('Fetching:', packageName);

// Check errors
console.error('Error occurred:', error);
```

## Performance Tips

1. **Memo-ize expensive computations**

```javascript
const processedData = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

2. **Callback for event handlers**

```javascript
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);
```

3. **Lazy load components**

```javascript
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

## Common Issues & Solutions

### Issue: API call fails with CORS

**Solution**: Check vite.config.js proxy configuration

### Issue: Component not re-rendering

**Solution**: Ensure state updates correctly, check dependencies array

### Issue: Chart not displaying

**Solution**: Verify data format matches chart expectations

### Issue: Styles not applying

**Solution**: Check Tailwind class names, rebuild if needed

## Useful Commands

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated

# Update packages
npm update

# Format code (if prettier installed)
npm run format

# Type check (if using TypeScript)
npm run type-check
```

## Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Axios Docs](https://axios-http.com)
- [Chart.js](https://www.chartjs.org)
- [React Router](https://reactrouter.com)

---

Happy coding! 🚀
