# Security Policy

## Reporting a Vulnerability

At PackageViz, we take security seriously. We appreciate your efforts to responsibly disclose your findings and will make every effort to acknowledge your contributions.

### How to Report

**DO NOT CREATE A PUBLIC ISSUE** to report a security vulnerability. Instead, please:

1. **Email**: Send details of your findings to [security@packageviz.com](mailto:security@packageviz.com)
2. **Use Encryption**: If possible, encrypt your message using our [PGP key](#pgp-key)
3. **Include Details**:
   - A detailed description of the vulnerability
   - Steps to reproduce the issue
   - Affected versions
   - Potential impact
   - Any suggested fixes (if available)

### What to Expect

1. **Acknowledgment**: We will acknowledge your email within 48 hours
2. **Updates**: We will provide regular updates about our progress
3. **Timeline**:
   - Initial response: Within 48 hours
   - Status update: Every 5 days
   - Fix implementation: Depends on complexity
   - Public disclosure: After fix is deployed

### Scope

The following items are considered in scope:
- The PackageViz web application
- Our NPM package integration
- API endpoints
- Authentication mechanisms
- Data handling and storage

### Out of Scope

- Theoretical vulnerabilities without proof of concept
- Social engineering attacks
- DOS/DDOS attacks
- Issues in dependencies (report to respective projects)
- Issues in third-party services we use

## Bug Bounty Program

Currently, we do not offer a bug bounty program. However, we will:
1. Publicly acknowledge your contribution (if desired)
2. Add you to our security hall of fame
3. Provide detailed updates about fix implementation

## Security Best Practices

When working with PackageViz:
1. Always use the latest version
2. Keep your API keys secure
3. Report suspicious activity
4. Follow our security guidelines in the documentation

## Supported Versions

We provide security updates for:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## PGP Key

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
[Your PGP public key here]
-----END PGP PUBLIC KEY BLOCK-----
```

## Disclosure Policy

1. **Private Disclosure**: Initial report sent privately
2. **Fix Development**: Work on fix begins immediately
3. **Testing**: Comprehensive testing of the fix
4. **Deployment**: Fix deployed to all supported versions
5. **Public Disclosure**: 
   - After fix is deployed
   - Credit given to reporter (if desired)
   - Detailed write-up provided

## Previous Security Advisories

Security advisories are published in our GitHub repository's Security tab after fixes are deployed.

## Security Updates

To receive security update notifications:
1. Watch our GitHub repository
2. Follow our security advisory RSS feed
3. Join our security mailing list

## Code Security

We maintain security through:
1. Regular security audits
2. Dependency scanning
3. Static code analysis
4. Penetration testing

## Safe Harbor

We support safe harbor for security research that:
1. Follows our disclosure guidelines
2. Does not compromise user data
3. Does not disrupt our services
4. Is conducted in good faith

## Contact

For any questions about this security policy:
- Email: [security@packageviz.com](mailto:security@packageviz.com)
- Matrix: #packageviz-security:matrix.org
- Signal: Available upon request

Thank you for helping keep PackageViz and our users safe!