# Therapair - Unified Project

## Overview
Therapair is a non-profit initiative by Unison Mental Health that helps people find the right therapist through personality, values, and lived experience alignment.

## 🏗️ Project Structure

```
therapair/
├── products/           # Individual product repositories (Git submodules)
│   ├── landing-page/   # Main marketing website
│   ├── sandbox/        # Interactive therapist matching demo
│   ├── widget/         # Embeddable therapist finder widget
│   └── email-campaign/ # Email outreach campaigns
├── campaigns/          # Marketing and outreach
│   ├── email-campaign/ # Email templates and campaigns
│   └── typebot-survey/ # User research surveys
├── docs/               # Shared documentation
│   ├── strategy/       # Business strategy and planning
│   ├── architecture/   # Technical architecture
│   ├── design-system/  # Design guidelines
│   └── deployment/     # Deployment guides
├── scripts/            # Shared automation scripts
└── tests/              # Integration and E2E tests
```

## 🚀 Quick Start

### Initial Setup
```bash
# Clone this repository with all submodules
git clone --recursive <repo-url>

# Or if already cloned, initialize submodules
git submodule update --init --recursive
```

### Working with Submodules
```bash
# Update all submodules to latest
git submodule update --remote

# Work in a submodule
cd products/landing-page
# Make your changes, commit, and push
git add .
git commit -m "Your changes"
git push

# Update main repo to reference new submodule commit
cd ../..
git add products/landing-page
git commit -m "Update landing page submodule"
git push
```

## 📦 Products

### [Landing Page](./products/landing-page/)
Main marketing website for Therapair
- **Tech Stack:** React, TypeScript, Tailwind CSS
- **Deployment:** Static hosting
- **Documentation:** [README](./products/landing-page/README.md)

### [Sandbox Demo](./products/sandbox/)
Interactive therapist matching demonstration
- **Tech Stack:** Vanilla JavaScript, HTML, CSS
- **Features:** 100 realistic therapist profiles, matching algorithm
- **Documentation:** [SANDBOX-DEMO-GUIDE](./products/sandbox/SANDBOX-DEMO-GUIDE.md)

### [Widget](./products/widget/)
Embeddable therapist finder widget
- **Tech Stack:** Vanilla JavaScript, PHP
- **Deployment:** Unison Mental Health website
- **Documentation:** [WIDGET-DOCUMENTATION](./products/widget/WIDGET-DOCUMENTATION.md)

### [Email Campaign](./campaigns/email-campaign/)
Therapist outreach and engagement
- **Platform:** Mailchimp
- **Content:** HTML and plain text templates
- **Documentation:** [README](./campaigns/email-campaign/README.md)

## 🎯 Target Audience

### Primary: Solo Sarah
Independent therapist running a solo practice
- **Pain Points:** Client matching, directory visibility, administrative overhead
- **Goals:** Find quality clients, build reputation, focus on therapy
- **Technology:** Moderate comfort, prefers simple tools

### Secondary: Clients Seeking Therapy
Individuals looking for the right therapist match
- **Pain Points:** Overwhelming choice, unclear fit, trial and error
- **Goals:** Find compatible therapist quickly
- **Technology:** High comfort, mobile-first

## 📊 Key Metrics

- **Therapist Sign-ups:** Target 100+ Victorian therapists in Year 1
- **Client Matches:** Quality over quantity, focus on successful matches
- **Engagement:** Survey completion, demo usage, email open rates
- **Impact:** Therapist satisfaction, client retention

## 🛠️ Development

### Prerequisites
- Node.js 18+ (for products)
- Git with submodule support
- GitHub account

### Setup
```bash
# Install dependencies for all products
./scripts/setup-all.sh

# Run all tests
./scripts/test-all.sh

# Deploy all products
./scripts/deploy-all.sh
```

### Adding a New Product
1. Create new directory in `products/`
2. Initialize as separate Git repository
3. Add as submodule: `git submodule add <repo-url> products/new-product`
4. Update this README

## 📚 Documentation

- **Strategy:** [docs/strategy/](./docs/strategy/)
- **Architecture:** [docs/architecture/](./docs/architecture/)
- **Design System:** [docs/design-system/](./docs/design-system/)
- **Deployment:** [docs/deployment/](./docs/deployment/)

## 🤝 Contributing

1. Work in the appropriate product subdirectory
2. Follow the product-specific contribution guidelines
3. Update shared documentation in `docs/`
4. Submit pull requests to respective repositories

## 📝 License

Non-profit initiative by Unison Mental Health

## 🔗 Links

- **Website:** https://therapair.com.au
- **Sandbox Demo:** https://therapair.com.au/sandbox-demo.html
- **Email Campaign:** See [campaigns/email-campaign/](./campaigns/email-campaign/)

## 📞 Contact

For questions or support, see individual product documentation or contact Unison Mental Health.

---

**Last Updated:** October 17, 2025
**Status:** Active Development