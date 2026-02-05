# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ Active support  |
| < 1.0   | ❌ No longer supported |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow responsible disclosure practices.

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please report security vulnerabilities by emailing:

📧 **teamsyntactix@gmail.com**

### What to Include

Please include the following information in your report:

- **Description**: A clear description of the vulnerability
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Impact**: Potential impact of the vulnerability
- **Affected Versions**: Which versions are affected
- **Suggested Fix**: If you have one (optional)

### Response Timeline

| Action | Timeline |
|--------|----------|
| Initial Response | Within 48 hours |
| Vulnerability Confirmation | Within 7 days |
| Patch Development | Within 30 days (depending on severity) |
| Public Disclosure | After patch is released |

## Security Best Practices for Users

When using MCP Generator:

1. **Environment Variables**: Never commit `.env` files to version control
2. **API Keys**: Use the `/secrets` endpoint pattern for sensitive credentials in generated servers
3. **Rate Limiting**: Keep rate limiting enabled in production
4. **Updates**: Keep your dependencies updated using Dependabot alerts
5. **Audit**: Regularly run `npm audit` to check for known vulnerabilities

## Security Features in Generated Servers

Our generated MCP servers include:

- 🛡️ **Auth Injection**: Dynamic API key handling via `/secrets` endpoint
- ⏱️ **Rate Limiting**: Built-in protection against abuse
- 🔒 **Helmet.js**: Security headers out of the box
- 📝 **Audit Logging**: Request/response logging for compliance

## Acknowledgments

We appreciate the security research community. Responsible disclosure helps keep our users safe.

Thank you for helping make MCP Generator more secure! 🙏
