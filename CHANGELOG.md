# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2025-10-02

### Added

- Ability to change themes in the navbar and keep the current one saved. There is Light, Dark and Luke Shephard (Default), and System to match Light/Dark with the system theme. (Backport from v1.0.0-alpha.2)
- Icons to navbar titles and socials. (Backport from v1.0.0-alpha.2)
- CHANGELOG.md. (Backport from v1.0.0-alpha.2)
- QMTrack (Backport from v1.0.0-alpha.1) and OutFit Weather to projects page.
- Multiple pictures for each project. (Backport from v1.0.0-alpha.1)
- Ability to view all project pictures on each of their supported platform. (Backport from v1.0.0-alpha.1)
- Image optimisation.
- Search Engine optimisation.

### Changed

- Links to reflect new branding (lukeshephard from ShephardLuke). (Backport from v1.0.0-alpha.1)
- Branding to now be "Luke Shephard" using the font "Shadows Into Light". (Backport from v1.0.0-alpha.1)
- Projects page to show one project at a time, with more detail and more focus on images. (Backport from v1.0.0-alpha.1)
- Default theme colours to be darker blues.
- Favicon to reflect the new branding, with versions for light and dark.
- Tablet views, width >=768px to <1024px, to be more similar to desktop views instead of mobile.
- Homepage to a more minimalist design.
- Navbar to stay fixed at the top of the page when scrolling for devices with a width >=768px.

### Removed

- Most projects from project page, only keeping the flagship ones for a less overwhelming experience. (Backport from v1.0.0-alpha.1)
- Project "view" pages. (Backport from v1.0.0-alpha.1)
- "About" from navbar. To get back to the homepage the user must press the logo.

## [1.0.0-alpha.2] - 2025-09-12

### Added

- Experience and education pages with placeholder text.
- 2 new themes, a pre-release design and a seaonal theme for testing.

### Changed

- The layout of the content to be centered and presented as "cards".
- Project page to feature each project in its own card, at the moment 2 for testing.
- Each project to have images for each of its supported platforms that the user can switch between.
- Theme button to a dropdown allowing the user to select from all themes.

### Removed

- Most projects from project page.
- Socials page.

## [1.0.0-alpha.1] - 2025-08-19

### Added

- Light and dark modes with a button on the navbar to switch theme.
- CHANGELOG.md.

### Changed

- Blue theme to either light or dark depending on the user's preferences.
- Navbar to be smaller and include icons.
- Logo text and style.
- View on GitHub to an icon.
- Upgrade all packages to latest versions.
- Handles and links on the socials page.
- Migrated from Cloudflare Pages to Cloudflare Workers, still a static website.

### Removed

- Project details pages.
- Footer.

## [0.4.0] - 2025-03-03

### Added

- Mobile support. Windows with >= 320 pixels are supported.

### Changed

- Replaced HTML tags with appropriate semantic tags for accessibility.
- Minor parts of the text.
- How dates are displayed.

## [0.3.0] - 2025-02-20

### Added

- New sections to all pages.
- Pages for each project that lead to more information.

### Changed

- Updated website-template to [v1.3.0](https://github.com/lukeshephard/website-template/releases/tag/v1.3.0).
- Formatting for dates.
- Contact page to socials.

### Fixed
- Links now show as grey when hovered or clicked.

## [0.3.0-alpha.2] - 2025-02-17

### Added

- Separate pages for each project that hold more information and links.

### Changed

- Updated website-template to [v1.3.0](https://github.com/lukeshephard/website-template/releases/tag/v1.3.0).
- Contact page to socials.

## [0.3.0-alpha.1] - 2025-02-08

### Added

- About me section and a highlighted projects section to homepage.
- Explanation to projects page.
- Links on socials page.

### Changed
- Renamed contact to socials.
- Projects database to allow projects to include optional attributes. For example, isWebsite is true by default but can be changed when added to a project.

## [0.2.0] - 2024-12-06

### Added

- Basic homepage.
- Links to GitHub projects on the projects page.
- Email on contact page.
- Consistent style across website.

## [0.1.0-alpha.1] - 2024-08-22

### Added

- Initial commit.

[0.5.0]: https://github.com/lukeshephard/portfolio/compare/v0.4.0...v0.5.0
[1.0.0-alpha.2]: https://github.com/lukeshephard/portfolio/compare/v0.1.0-alpha.1...v1.0.0-alpha.2
[1.0.0-alpha.1]: https://github.com/lukeshephard/portfolio/compare/v0.4.0...v1.0.0-alpha.1
[0.4.0]: https://github.com/lukeshephard/portfolio/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/lukeshephard/portfolio/compare/v0.2.0...v0.3.0
[0.3.0-alpha.2]: https://github.com/lukeshephard/portfolio/compare/v0.3.0-alpha.1...v0.3.0-alpha.2
[0.3.0-alpha.1]: https://github.com/lukeshephard/portfolio/compare/v0.2.0...v0.3.0-alpha.1
[0.2.0]: https://github.com/lukeshephard/portfolio/compare/v0.1.0-alpha.1...v0.2.0
[0.1.0-alpha.1]: https://github.com/lukeshephard/portfolio/commits/v0.1.0-alpha.1