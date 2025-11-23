# Contributing to Cosmic Financials

Thank you for your interest in contributing to Cosmic Financials! This document provides guidelines and instructions for contributing.

## 🌟 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, versions)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Include:

- **Clear use case**
- **Why this enhancement would be useful**
- **Possible implementation approach**

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request**

## 📝 Development Guidelines

### Code Style

#### Python (Backend)
```python
# Follow PEP 8
# Use type hints
def calculate_ratio(numerator: float, denominator: float) -> float:
    """Calculate a financial ratio.
    
    Args:
        numerator: The numerator value
        denominator: The denominator value
        
    Returns:
        The calculated ratio
    """
    if denominator == 0:
        return 0
    return numerator / denominator

# Use docstrings for all functions/classes
# Keep functions focused and small
# Write unit tests
```

#### TypeScript (Frontend)
```typescript
// Use TypeScript strict mode
// Define interfaces for all data structures
interface FinancialData {
  balance_sheet: Record<string, number>;
  income_statement: Record<string, number>;
}

// Use meaningful variable names
// Follow React best practices
// Use functional components with hooks
```

### Commit Messages

Follow the Conventional Commits specification:

```
feat: add new chart type for cash flow analysis
fix: resolve NaN error in ratio calculations
docs: update deployment guide with AWS instructions
style: format code with black and prettier
refactor: optimize file processing pipeline
test: add unit tests for financial analyzer
chore: update dependencies
```

### Testing

#### Backend Tests
```bash
cd backend
pytest tests/ -v --cov=app
```

#### Frontend Tests
```bash
cd frontend
npm test
npm run test:e2e  # End-to-end tests
```

**Required:**
- All new features must have tests
- Maintain >80% code coverage
- All tests must pass before PR

### Documentation

- Update README.md for new features
- Add JSDoc/docstrings for new functions
- Update API documentation
- Include examples in code comments

## 🏗️ Project Structure

### Backend Architecture

```
backend/
├── app/
│   ├── services/       # Business logic
│   ├── models/         # Data models
│   ├── utils/          # Utilities
│   └── __init__.py
├── tests/              # Test files
├── main.py             # Entry point
└── requirements.txt
```

### Frontend Architecture

```
frontend/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── lib/           # Utilities
│   └── types/         # TypeScript types
└── public/            # Static assets
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Multi-period financial analysis
- [ ] PDF report generation
- [ ] Custom benchmark creation
- [ ] Enhanced error handling
- [ ] Performance optimization

### Medium Priority
- [ ] Additional chart types
- [ ] Industry-specific templates
- [ ] Mobile responsiveness improvements
- [ ] Accessibility enhancements
- [ ] Internationalization (i18n)

### Good First Issues
- [ ] Documentation improvements
- [ ] UI/UX polish
- [ ] Test coverage expansion
- [ ] Code refactoring
- [ ] Bug fixes

## 🔍 Review Process

1. **Automated Checks**
   - Linting (ESLint, Pylint)
   - Type checking (TypeScript, mypy)
   - Tests (pytest, Jest)
   - Build verification

2. **Code Review**
   - At least one maintainer approval required
   - Address all review comments
   - Keep PRs focused and atomic

3. **Merge**
   - Squash and merge preferred
   - Clear merge commit message

## 🚀 Release Process

1. Version bumping follows Semantic Versioning
2. Update CHANGELOG.md
3. Create GitHub release with notes
4. Deploy to staging first
5. Deploy to production after verification

## 💬 Communication

- **GitHub Issues**: Bug reports, feature requests
- **Discussions**: General questions, ideas
- **Discord**: Real-time chat (link in README)
- **Email**: security@cosmic-financials.com for security issues

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the project
- Show empathy towards others

## 🔒 Security

Report security vulnerabilities privately to security@cosmic-financials.com

**Do not** open public issues for security problems.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Invited to maintainer team (for significant contributions)

---

**Thank you for making Cosmic Financials better! 🌌**
