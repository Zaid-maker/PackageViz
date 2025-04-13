# Contributing to PackageViz

Thank you for your interest in contributing to PackageViz! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. We expect all contributors to:
- Be respectful and inclusive
- Accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- A clear and descriptive title
- Steps to reproduce the behavior
- Expected behavior
- Screenshots (if applicable)
- Your environment (OS, browser, etc.)
- Any additional context

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- A clear and descriptive title
- Detailed explanation of the proposed functionality
- Any possible implementations you've considered
- Screenshots or sketches (if applicable)

### Development Process

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following our coding standards
4. Write or update tests as needed
5. Run tests and ensure they pass
6. Commit your changes:
   ```bash
   git commit -m "feat: add some feature"
   ```
7. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
8. Open a Pull Request

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools

### Code Style

- Use ESLint for code linting
- Follow Prettier formatting rules
- Write meaningful variable and function names
- Comment complex logic
- Keep functions small and focused
- Use TypeScript types/interfaces where possible

### Running Tests

```bash
bun test
```

### Development Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start the development server:
   ```bash
   bun dev
   ```

3. Run linting:
   ```bash
   bun run lint
   ```

### Working with Components

- Place new components in `src/components`
- Create test files alongside components
- Follow the existing component structure
- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling

### File Structure

```
src/
  ├── components/      # Reusable UI components
  ├── pages/          # Page components
  ├── hooks/          # Custom React hooks
  ├── assets/         # Static assets
  └── context/        # React context providers
```

### Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation if you're changing functionality
3. Add tests for new features
4. Ensure all tests pass
5. Get at least one code review from a maintainer
6. Wait for automated checks to pass

### After Your Pull Request is Merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main repository:

```bash
git checkout main
git pull upstream main
git branch -d feature/your-feature-name
```

## License

By contributing to PackageViz, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to contact the maintainers if you have any questions.

Thank you for contributing to PackageViz! 🎉