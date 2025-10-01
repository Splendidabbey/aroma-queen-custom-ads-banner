# Migration Guide - Discourse API Updates

## Version 1.1.0 - Modern API Migration

### What Changed?

Das Plugin wurde vollständig aktualisiert, um die neuesten Discourse APIs zu verwenden und die Warnung über veralteten Code zu beseitigen.

The plugin has been fully updated to use the latest Discourse APIs and eliminate the deprecated code warning.

### Technical Changes

#### Before (Deprecated)
- Used `decorateWidget` API for post stream modifications
- Used `post-stream:after-nth-post` widget decorator (deprecated)
- Relied on widget-based rendering

#### After (Modern)
- Uses **Plugin Outlets** and **Connectors**
- Modern Glimmer component architecture
- Better performance and maintainability
- Fully compatible with Discourse 3.0+

### Migration Steps

If you're upgrading from an older version:

1. **Backup Your Settings**
   - Note down all your ad HTML configurations
   - Save trust level and visibility settings

2. **Update the Plugin**
   ```bash
   cd /var/discourse
   ./launcher rebuild app
   ```

3. **Verify All Ads Still Display**
   - Check each ad position after update
   - Test on desktop and mobile
   - Verify as different user types (staff, regular users, anonymous)

4. **No Configuration Changes Needed**
   - All your existing settings will continue to work
   - No HTML changes required
   - Same admin interface

### New Plugin Outlets Used

The plugin now uses these modern Discourse plugin outlets:

1. **above-main-container** - For after-header ads
2. **post-after** - For post-related ads (first post, nth post, mobile)
3. **discovery-list-container-top** - For topic list top ads
4. **above-footer** - For before-footer ads

### Benefits of Modern API

✅ **Better Performance**
- Faster rendering
- Less DOM manipulation
- Cleaner component lifecycle

✅ **Better Compatibility**
- Works with latest Discourse versions
- No deprecation warnings
- Future-proof architecture

✅ **Better Maintenance**
- Cleaner code structure
- Easier to debug
- Better separation of concerns

✅ **Better User Experience**
- Smoother animations
- Better responsive behavior
- Consistent rendering

### Breaking Changes

**None!** This is a drop-in replacement. All features work exactly the same way.

### Deprecation Timeline

- **Old API**: Was marked deprecated in Discourse 2.8
- **Migration**: Completed in Plugin v1.1.0
- **Support**: Old API may be removed in Discourse 3.2+

### Testing Checklist

After upgrading, verify:

- [ ] After header banner displays correctly
- [ ] First post banner appears in topics
- [ ] Nth post banner appears at correct intervals
- [ ] Topic list banner shows on category pages
- [ ] Footer banner displays before footer
- [ ] Mobile banners work on mobile devices
- [ ] Staff hiding works correctly
- [ ] Trust level filtering works
- [ ] German translations display properly
- [ ] Dark mode styling looks good

### Troubleshooting

#### Ads Not Showing After Update?

1. Clear browser cache: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Check admin settings are still enabled
3. Verify in browser console (F12) for errors
4. Rebuild again: `./launcher rebuild app`

#### Still Seeing Deprecation Warning?

1. Ensure you're on the latest commit
2. Clear Discourse cache: **Admin → Tools → Clear Cache**
3. Restart sidekiq: `./launcher restart app`

#### Performance Issues?

The new version should be faster, but if you experience issues:
1. Check browser console for errors
2. Disable one ad position at a time to isolate
3. Ensure ad HTML is valid and optimized

### Support

If you encounter issues after migration:

- 📖 Check [README.md](README.md) for full documentation
- 🔧 Review [INSTALLATION.md](INSTALLATION.md) for setup
- 💬 Post in Discourse Meta community
- 🐛 Open GitHub issue with details

### Rollback (Not Recommended)

If you need to rollback to old version:

```bash
cd /var/discourse/plugins/discourse-aroma-queen-ads-banner
git checkout v1.0.0  # Use old version
cd /var/discourse
./launcher rebuild app
```

**Note**: Old version will continue showing deprecation warnings.

---

**Last Updated**: October 1, 2025
**Plugin Version**: 1.1.0

