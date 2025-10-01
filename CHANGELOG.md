# Changelog

All notable changes to the Aroma Queen Custom Ads Banner Plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-01

### Added
- Initial release of Aroma Queen Custom Ads Banner Plugin
- Multiple ad placement positions:
  - After site header
  - After first post in topics
  - After every Nth post
  - Sidebar placement
  - Before footer
  - Top of topic lists
  - Mobile-specific banners
- Full compatibility with Discourse Air theme
- Multilingual support:
  - English (en)
  - German (de)
- Advanced targeting features:
  - Hide ads from staff members
  - Hide ads based on user trust level
  - Granular visibility controls
- Responsive design for all screen sizes
- Dark mode support
- Smooth animations and transitions
- Print-friendly (hides ads when printing)
- Accessibility features (keyboard navigation, focus states)
- Support for common IAB ad sizes
- Comprehensive admin settings interface
- Custom CSS classes for easy styling
- Performance optimized with lazy rendering
- SEO-friendly implementation

### Documentation
- Comprehensive README.md with full feature documentation
- Detailed INSTALLATION.md guide
- EXAMPLES.md with ready-to-use ad templates
- Inline code comments for developers
- Multi-language admin interface

### Compatibility
- Discourse 2.7.0 and higher
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile, Firefox Mobile)
- Air theme (fully tested)
- Compatible with most standard Discourse themes

## [1.1.0] - 2025-10-01

### Changed
- **BREAKING FIX**: Migrated from deprecated widget decorators to modern plugin outlets
- Replaced `decorateWidget` API with Glimmer component connectors
- Updated to use modern Discourse plugin architecture (0.11.0+ API)
- Improved performance with component-based rendering
- Eliminated deprecation warning: `discourse.post-stream-widget-overrides`

### Added
- Plugin outlet connectors for all ad positions
- Better component lifecycle management
- Enhanced compatibility with Discourse 3.0+

### Technical Details
- Removed deprecated `post-stream:after-nth-post` widget decorator
- Added modern connectors: `post-after`, `above-main-container`, `discovery-list-container-top`, `above-footer`
- Updated minimum API version to 0.11.0
- Full backward compatibility maintained - no configuration changes needed

### Migration
- Automatic - no user action required
- All existing settings preserved
- See [MIGRATION.md](MIGRATION.md) for details

## [Unreleased]

### Planned Features
- Analytics integration for ad impressions and clicks
- A/B testing capabilities
- Ad rotation system
- Scheduled ads (show at specific times/dates)
- Category-specific ad targeting
- User group targeting
- Geographic targeting
- Ad performance dashboard
- Import/export ad configurations
- More language translations
- Integration with popular ad networks
- GDPR compliance tools
- Ad blocker detection

---

## Version Naming Convention

- **Major version (X.0.0)**: Breaking changes, major new features
- **Minor version (0.X.0)**: New features, backwards compatible
- **Patch version (0.0.X)**: Bug fixes, minor improvements

## Support

For questions, issues, or feature requests:
- GitHub Issues: [Report an issue](https://github.com/yourusername/discourse-aroma-queen-ads-banner/issues)
- Discourse Meta: [Visit the community](https://meta.discourse.org)

---

Last Updated: October 1, 2025



