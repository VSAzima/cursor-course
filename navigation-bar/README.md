# Navigation Bar

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test:e2e
```

## AI prompts used

Briefly: AI assistance was used to create this navigation bar component through the following prompts:

1. **Initial Component Creation**: Created responsive navigation bar with logo, menu items, search bar, user profile dropdown, and mobile hamburger menu using TypeScript and Tailwind CSS, with sticky scroll behavior and smooth animations.

2. **Search Placeholder Enhancement**: Added configurable search placeholder functionality with a default value and support for custom placeholder text.

3. **Smooth Scroll Implementation**: Implemented smooth scroll behavior for anchor links, including scroll-to-top button, scroll utilities, and global smooth scroll support.

4. **Active Link Highlighting**: Added automatic active link highlighting that detects the current section using IntersectionObserver API, with visual indicators for both desktop and mobile views.

5. **Component Verification**: Verified all requested components (Navbar.tsx, MobileMenu.tsx, UserDropdown.tsx, and navigation types interface) exist and function correctly.

6. **Test Coverage & Stabilization**: Added Playwright end-to-end tests across authentication, navigation, accessibility, and responsive behaviors, plus selector stabilization via test IDs and aria-labels to keep tests reliable.

## License

MIT

## Credits

Built with React, TypeScript, and Tailwind CSS.
