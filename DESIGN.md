---
name: RASEEN
description: Cloud governance and compliance platform
colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.145 0 0)"
  card: "oklch(1 0 0)"
  primary: "oklch(0.205 0 0)"
  secondary: "oklch(0.97 0 0)"
  border: "oklch(0.922 0 0)"
  brand: "oklch(0.623 0.214 259.815)"
  destructive: "oklch(0.577 0.245 27.325)"
  success: "oklch(0.627 0.194 149.214)"
  warning: "oklch(0.769 0.188 70.08)"
  info: "oklch(0.623 0.214 259.815)"
  sidebar: "oklch(0.985 0 0)"
typography:
  headline:
    fontFamily: '"Inter", "Geist", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: '"Inter", "Geist", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: '"Inter", "Geist", ui-sans-serif, system-ui, sans-serif'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: '"Inter", "Geist", ui-sans-serif, system-ui, sans-serif'
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.35
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
spacing:
  xs: "2px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "999px"
    padding: "2px 8px"
  card-default:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input-default:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
---

# Design System: RASEEN

## 1. Overview

**Creative North Star: "The Trusted Operations Desk"**

RASEEN is a product system for serious compliance work: structured, calm, and credible under pressure. The current implementation already leans on shadcn conventions, Tailwind v4, semantic CSS variables, and role-based application shells. The next step is not to replace that foundation, it is to make it more intentional. The design system should feel like one disciplined workbench across admin, auditor, and client flows, where every state and surface helps users make high-consequence decisions without friction.

The visual language should stay restrained, but not generic. The existing system uses a mostly neutral core with a blue-violet brand signal, semantic status colors, dark-mode support, and sturdy rounded surfaces. That foundation is good. What it currently lacks is a sharper point of view about when to use accent, how to control card density, and how to keep multi-role workflows consistent without sliding into either generic shadcn SaaS or cold audit bureaucracy.

**Key Characteristics:**

- Calm, high-trust operational surfaces
- Shared component vocabulary across admin, auditor, and client roles
- Accent used as signal, not decoration
- Dense information with clear hierarchy
- Dark mode maintained at parity with light mode

## 2. Colors

The palette is a restrained product system with strong semantic roles, neutral working surfaces, and a single blue-violet brand accent that should become more deliberate over time.

### Primary

- **Graphite Command** (`oklch(0.205 0 0)`): Primary actions, high-importance badges, and anchor controls. This is the system's default authority color, not a decorative fill.
- **Raseen Signal** (`oklch(0.623 0.214 259.815)`): Brand-led emphasis, informational highlights, and identity moments that need more character than the neutral primary alone.

### Secondary

- **Quiet Surface** (`oklch(0.97 0 0)`): Secondary buttons, mild emphasis blocks, and soft containers that need separation without calling attention to themselves.

### Tertiary

- **Audit Amber** (`oklch(0.769 0.188 70.08)`): Warning and in-progress states where the UI needs to slow the user down and ask for attention.
- **Verified Green** (`oklch(0.627 0.194 149.214)`): Success and compliant states, used sparingly so approval retains weight.

### Neutral

- **Paper White** (`oklch(1 0 0)`): Primary application canvas and card background in light mode.
- **Ink Slate** (`oklch(0.145 0 0)`): Main text and the highest-contrast foreground surfaces.
- **Line Quiet** (`oklch(0.922 0 0)`): Borders, dividers, and field structure.
- **Sidebar Mist** (`oklch(0.985 0 0)`): Sidebar and secondary navigation background.

### Named Rules

**The Signal Not Decoration Rule.** Brand and status colors mark action, state, or meaning. They do not exist to fill empty space or make neutral layouts feel less plain.

## 3. Typography

**Display Font:** Inter and Geist system sans stack (`"Inter", "Geist", ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Inter and Geist system sans stack (`"Inter", "Geist", ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** Geist Mono is available in the app shell, but the default UI language should stay in the sans stack unless code, identifiers, or data views specifically need mono.

**Character:** The type system should read as precise, modern, and operational. It should never become editorial or overly branded. The job is fast parsing and stable hierarchy across long forms, data-heavy cards, sidebars, and review flows.

### Hierarchy

- **Headline** (600, 1.5rem, 1.2): Page titles and major section anchors, like admin surface headers and audit-session views.
- **Title** (600, 1rem, 1.35): Card titles, grouped task headers, and table-adjacent section labels.
- **Body** (400, 0.875rem, 1.5): The default reading size for most application content, descriptions, and supporting copy.
- **Label** (500, 0.75rem, 1.35): Badges, dense metadata, helper labels, and compact UI controls.

### Named Rules

**The Reading-at-Speed Rule.** Typography exists to reduce hesitation. Use weight and spacing to separate meaning quickly, not to create personality through novelty.

## 4. Elevation

RASEEN is mostly a tonal-layering system with light shadow support. The default card implementation uses a small shadow and border, but the system should still read as flat and controlled at rest. Depth should come first from surface contrast, border clarity, and spacing groups, then from shadow only when a surface truly needs separation.

### Shadow Vocabulary

- **Resting Surface** (`shadow-sm`): Standard cards and grouped containers that need quiet lift from the page.
- **Interactive Focus** (border plus `ring-[3px]`): Buttons, inputs, badges, and controls communicate focus primarily through ring treatment rather than dramatic elevation.

### Named Rules

**The Surface Before Shadow Rule.** If a screen needs more hierarchy, fix spacing, contrast, and grouping before adding heavier shadows.

## 5. Components

### Buttons

- **Shape:** Compact rounded rectangle (`rounded-md`, 8px in practice)
- **Primary:** Dark graphite fill with light foreground, 36px default height, 16px horizontal padding, medium-weight label
- **Hover / Focus:** Subtle background shift on hover, visible ring on focus, no theatrical animation
- **Secondary / Ghost / Tertiary:** Secondary uses quiet neutral fill, outline relies on border and background contrast, ghost stays minimal for toolbar and inline actions

### Chips

- **Style:** Pills with full rounding, thin border support, and concise label sizing
- **State:** Badges should carry clear semantic meaning, especially for status, workflow stage, and role-specific metadata. Avoid decorative badge sprawl.

### Cards / Containers

- **Corner Style:** Large but controlled radius (`rounded-xl`, 14px visual family)
- **Background:** `bg-card` on light surfaces, with matching semantic foreground tokens
- **Shadow Strategy:** `shadow-sm` plus border, not floating dashboard chrome
- **Border:** Always quiet and structural
- **Internal Padding:** 24px at the container level, with smaller gaps inside for grouping

### Inputs / Fields

- **Style:** Transparent or lightly toned background, border-led structure, 36px default height, 12px horizontal padding
- **Focus:** Ring-based focus treatment with border reinforcement
- **Error / Disabled:** Error uses destructive ring and border language, disabled reduces contrast and pointer affordance without hiding field structure

### Navigation

- **Style:** Sidebar-led product navigation with subdued base states, active-state emphasis, nested collapsible items, and optional outline badges for context
- **Typography:** Compact sans labels designed for fast scanning rather than display flair
- **State:** Active navigation should feel deliberate and easy to spot; inactive navigation should stay quiet; nested items should inherit the same tone rather than invent a second style family

## 6. Do's and Don'ts

### Do:

- **Do** keep the neutral base strong and use `--brand`, `--info`, `--warning`, and `--success` as explicit signals rather than ambient decoration.
- **Do** maintain light and dark mode token parity in `apps/web/src/index.css` whenever you add or change semantic roles.
- **Do** treat cards as bounded work surfaces, not as the default wrapper for every section on the page.
- **Do** use visible focus rings, semantic status meaning beyond color alone, and dense but readable spacing as non-negotiable defaults.
- **Do** preserve one shared component vocabulary across admin, auditor, and client experiences even when page layouts diverge.

### Don't:

- **Don't** turn the product into generic shadcn SaaS with interchangeable neutral cards and no visual hierarchy beyond borders.
- **Don't** turn the product into cold audit bureaucracy with intimidating density, punitive tone, or needlessly institutional styling.
- **Don't** turn the product into consumer-app playful with cheerful accent overload, lightweight illustrations, or casual interaction language.
- **Don't** use accent color to compensate for weak layout hierarchy.
- **Don't** add stronger shadows, bigger radii, or extra color roles before proving that spacing, grouping, and component states are already disciplined.
