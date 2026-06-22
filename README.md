# TDX Design System

An Angular implementation of the TDX Design System. The repository provides reusable, token-driven UI components with Storybook documentation and Angular preview pages for visual QA.

## What is included

- **Design Tokens**: global CSS custom properties for color, typography, spacing, radius, icons, and component semantics.
- **Angular Components**: reusable, accessible components implemented with Angular modules, templates, styles, models, and unit tests.
- **Storybook Documentation**: interactive component stories, controls, accessibility checks, and generated component documentation.
- **Angular Preview Pages**: routed pages for reviewing components in light and dark themes outside Storybook.

## Components

- Button
- Stepper
- Tag
- Progress Indicator

## Live Preview

During local development:

- [Angular Preview](http://127.0.0.1:4200/)
- [Storybook](http://127.0.0.1:6006/)

## Getting Started

```sh
npm install
npm start
```

Run Storybook in a separate terminal:

```sh
npm run storybook
```

## Available Commands

```sh
npm start
npm run build
npm test
npm run storybook
npm run build-storybook
npm run build:github-pages
```

## Project Structure

```text
.storybook/                         Storybook configuration
src/
  app/
    shared/components/
      button/                       Reusable Button component
      stepper/                      Reusable Stepper component
      tag/                          Reusable Tag component
      progress-indicator/           Reusable Progress Indicator component
    button-preview/                 Angular Button preview page
    stepper-preview/                Angular Stepper preview page
    tag-preview/                    Angular Tag preview page
    progress-indicator-preview/     Angular Progress Indicator preview page
    home/                           Preview application landing page
    app-routing.module.ts           Preview application routes
  styles.scss                       Global design tokens and theme mappings
```

## Development Principles

Components consume design-system tokens rather than hardcoded visual values, support accessible native interactions, and are documented through Storybook alongside Angular preview pages. Each component keeps its implementation, stories, and tests close together to make design-to-code review straightforward.
