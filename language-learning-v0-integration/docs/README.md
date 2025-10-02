# Documentation Index

**Last Updated:** 2025-10-01

## Project Documentation Overview

This directory contains all technical documentation, work summaries, and architectural decisions for the Language Learning Platform.

---

## 📚 Table of Contents

### Getting Started
- [Quick Start Guide](quick-start.md) - How to set up and run the project

### Architecture & Design
- [Data Structure Proposal](data-structure-proposal.md) - Proposed data architecture
- [Data Structure](data-structure.md) - Current data structure implementation
- [Recommendation Algorithm Scoring](recommendation-algorithm-scoring.md) - Algorithm details and scoring logic
- [Language Motivation Scores Explanation](language-motivation-scores-explanation.md) - How motivation scores are calculated

### User Experience
- [User Process](user-process.md) - User journey and flow documentation
- [User Process v1](users_process_v1.md) - Version 1 of user process
- [Survey Questions Design](survey-questions-design.md) - Survey design and rationale

### Internationalization (i18n)
- [README i18n](README_I18N.md) - i18n implementation overview
- [i18n Summary](I18N_SUMMARY.md) - Summary of internationalization features
- [i18n Implementation](I18N_IMPLEMENTATION.md) - Technical implementation details
- [How to Add Translations](HOW_TO_ADD_TRANSLATIONS.md) - Guide for adding new translations
- [Translation Status](TRANSLATION_STATUS.md) - Current translation coverage

---

## 📝 Documentation Standards

All documentation in this directory follows the standards defined in [CLAUDE.md](../CLAUDE.md).

### Naming Conventions
- Feature documentation: `feature-[feature-name]-v[n].md`
- User flow documentation: `user-process-[flow-name]-v[n].md`
- Technical architecture: `architecture-[component]-v[n].md`
- Work session summaries: `session-[date]-[topic].md`

### Required Structure
```markdown
# [Title]

**Date:** YYYY-MM-DD
**Version:** vX
**Author:** Claude Code

## Overview
Brief description

## Changes/Features
- List of changes

## Technical Details
Implementation details

## Next Steps
What's next
```

---

## 🔄 Maintenance

- Update this index when adding new documentation
- Use version numbers for iterative documentation
- Archive outdated versions when major updates occur
- Keep documentation in sync with code changes
