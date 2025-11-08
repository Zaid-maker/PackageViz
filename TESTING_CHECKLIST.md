# Testing Checklist

## Pre-Deployment Testing

### 1. Core Functionality

#### Search & Autocomplete

- [ ] Enter package name shows autocomplete dropdown
- [ ] Clicking suggestion selects package
- [ ] Pressing Enter searches for package
- [ ] Pressing Escape closes dropdown
- [ ] Search with empty input shows error toast
- [ ] Search with invalid package shows error

#### Package Display

- [ ] Package name displays correctly
- [ ] Description shows properly
- [ ] Author/version/license info visible
- [ ] Repository link works (if available)
- [ ] Total downloads formatted correctly

#### Bundle Information

- [ ] Install size displays
- [ ] Publish size displays
- [ ] Version number shows
- [ ] Shows warning for unavailable packages
- [ ] Handles missing bundle data gracefully

#### Dependencies

- [ ] Dependencies count is accurate
- [ ] Dev dependencies count is accurate
- [ ] Peer dependencies count is accurate
- [ ] Handles packages with no dependencies

### 2. Charts & Visualizations

#### Chart Display

- [ ] Line chart renders correctly
- [ ] Bar chart renders correctly
- [ ] Pie chart renders correctly
- [ ] Chart switches when tab clicked
- [ ] Chart data matches package versions
- [ ] Tooltips show on hover

#### Chart Data

- [ ] Shows latest 10 stable versions
- [ ] Excludes pre-release versions (alpha, beta)
- [ ] Download counts formatted correctly
- [ ] Handles packages with no stats

### 3. Loading States

- [ ] Loading spinner shows during search
- [ ] Search button disabled while loading
- [ ] Loading text displays
- [ ] Previous data clears before new load
- [ ] Loading completes properly

### 4. Error Handling

#### Network Errors

- [ ] Package not found shows appropriate message
- [ ] Network timeout handled gracefully
- [ ] API errors show toast notification
- [ ] Error messages are user-friendly

#### Edge Cases

- [ ] Very long package names handled
- [ ] Special characters in search work
- [ ] Empty results handled
- [ ] Malformed data handled

### 5. UI/UX

#### Layout

- [ ] Header displays correctly
- [ ] Search bar is prominent
- [ ] Content is centered and readable
- [ ] Spacing is consistent
- [ ] Cards have proper shadows/borders

#### Interactions

- [ ] Buttons have hover effects
- [ ] Inputs focus properly
- [ ] Suggestions are clickable
- [ ] Scrolling works smoothly
- [ ] Animations are smooth

#### Empty States

- [ ] Shows placeholder when no package selected
- [ ] Helpful text guides user
- [ ] Search icon visible
- [ ] Instructions clear

### 6. Responsiveness

#### Mobile (< 768px)

- [ ] Search bar fits screen
- [ ] Cards stack vertically
- [ ] Charts render properly
- [ ] Text is readable
- [ ] Buttons are tappable

#### Tablet (768px - 1024px)

- [ ] Layout adjusts appropriately
- [ ] Grid shows 2 columns where applicable
- [ ] Charts scale properly

#### Desktop (> 1024px)

- [ ] Full width utilized
- [ ] Grid shows 3 columns
- [ ] Max-width enforced
- [ ] Comfortable reading width

### 7. Performance

- [ ] Initial page load < 3 seconds
- [ ] Search completes < 2 seconds
- [ ] Charts render < 1 second
- [ ] No memory leaks
- [ ] Smooth scrolling
- [ ] No layout shifts

### 8. Accessibility

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Alt text for icons
- [ ] ARIA labels present

### 9. Browser Compatibility

#### Chrome

- [ ] All features work
- [ ] Styles render correctly
- [ ] No console errors

#### Firefox

- [ ] All features work
- [ ] Styles render correctly
- [ ] No console errors

#### Safari

- [ ] All features work
- [ ] Styles render correctly
- [ ] No console errors

#### Edge

- [ ] All features work
- [ ] Styles render correctly
- [ ] No console errors

### 10. Landing Page

- [ ] Hero section displays
- [ ] Stats load properly
- [ ] Feature cards visible
- [ ] CTA button works
- [ ] Navigation to visualizer works
- [ ] Animations play smoothly

## Test Scenarios

### Scenario 1: New User

1. Visit landing page
2. Read information
3. Click "Get Started"
4. Search for "react"
5. View package details
6. Switch chart types
7. Search for another package

**Expected**: Smooth experience, no confusion

### Scenario 2: Power User

1. Direct to visualizer
2. Type partial package name
3. Select from autocomplete
4. Review all information quickly
5. Search multiple packages rapidly

**Expected**: Fast, responsive, no lag

### Scenario 3: Error Cases

1. Search for non-existent package
2. Search with network disconnected
3. Enter invalid characters
4. Leave search empty

**Expected**: Clear error messages, no crashes

### Scenario 4: Mobile User

1. Open on mobile device
2. Search for package
3. Scroll through results
4. Interact with charts
5. Switch chart types

**Expected**: Touch-friendly, readable, functional

## Test Packages

Use these real packages for testing:

### Small Packages

- `is-odd` - Minimal dependencies
- `is-even` - Simple package

### Medium Packages

- `axios` - Popular, well-maintained
- `lodash` - Many versions
- `chalk` - Good stats

### Large Packages

- `react` - Very popular
- `express` - Many downloads
- `typescript` - Large bundle

### Edge Cases

- `@types/node` - Scoped package
- `jquery` - Old but popular
- `left-pad` - Famous history

## Automated Tests (Future)

### Unit Tests

```javascript
// Service tests
describe('npmService', () => {
  it('should fetch package info', async () => {
    const data = await npmService.getPackageInfo('react');
    expect(data).toHaveProperty('name', 'react');
  });
});

// Hook tests
describe('usePackageData', () => {
  it('should load package data', async () => {
    const { result } = renderHook(() => usePackageData());
    await act(() => result.current.fetchPackageData('react'));
    expect(result.current.packageData).toBeDefined();
  });
});
```

### Integration Tests

```javascript
describe('Visualizer Page', () => {
  it('should search and display package', async () => {
    render(<Visualizer />);
    const input = screen.getByPlaceholderText(/enter npm package/i);
    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.click(screen.getByText(/search/i));
    await waitFor(() => {
      expect(screen.getByText('react')).toBeInTheDocument();
    });
  });
});
```

### E2E Tests

```javascript
describe('Full User Journey', () => {
  it('should complete search workflow', () => {
    cy.visit('/');
    cy.contains('Get Started').click();
    cy.get('input').type('react');
    cy.contains('Search').click();
    cy.contains('react').should('be.visible');
    cy.get('[data-testid="line-chart"]').should('be.visible');
  });
});
```

## Performance Metrics

### Target Metrics

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

### Lighthouse Scores

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

## Sign-Off

After completing all checks:

- [ ] All core functionality works
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] Errors handled gracefully
- [ ] Ready for deployment

**Tested by**: _______________  
**Date**: _______________  
**Version**: _______________  
**Status**: ⬜ Pass / ⬜ Fail  

---

Remember: Testing is continuous! Test after every change.
