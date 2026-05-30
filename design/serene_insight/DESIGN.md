---
name: Serene Insight
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#515659'
  on-tertiary: '#ffffff'
  tertiary-container: '#696e71'
  on-tertiary-container: '#edf1f5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#dfe3e7'
  tertiary-fixed-dim: '#c3c7cb'
  on-tertiary-fixed: '#171c1f'
  on-tertiary-fixed-variant: '#43474b'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Noto Sans KR
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Sans KR
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Noto Sans KR
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Noto Sans KR
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  headline-sm:
    fontFamily: Noto Sans KR
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Noto Sans KR
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Noto Sans KR
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Noto Sans KR
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Noto Sans KR
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1120px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system is centered on the concept of "Reflective Clarity." As a personal tarot journal, the UI must act as a neutral yet supportive canvas for introspection. The brand personality is professional, calm, and intellectually grounded, moving away from stereotypical mystical tropes in favor of a modern, editorial aesthetic.

The style leverages **Minimalism** with a focus on high-quality typography and intentional whitespace. It evokes an emotional response of peace and focus, ensuring that the user’s personal reflections and the tarot imagery remain the focal point of the experience.

## Colors
The color palette is anchored by a deep **Primary Blue (#2563EB)**, used strategically for actions and meaningful highlights. This is balanced by a high-ratio of white space to maintain a clean, "notebook" feel.

- **Primary:** Used for primary buttons, active states, and critical navigation links.
- **Secondary:** A muted slate gray for secondary information, meta-data, and icons.
- **Surface:** The background remains pure white, while card surfaces use a very subtle gray tint or border to distinguish depth.
- **Text:** Deep charcoal (#0F172A) provides maximum legibility for long-form journaling, while muted slate is reserved for secondary labels.

## Typography
The design system utilizes **Noto Sans KR** across all levels to ensure a clean, modern, and highly legible experience. 

The type hierarchy is strictly defined to help users distinguish between their journal entries and the app interface. **Display** and **Headline** sizes use tighter letter-spacing and heavier weights to provide structure. **Body** text uses a generous 1.6 line-height to facilitate comfortable reading of long-form tarot interpretations.

## Layout & Spacing
This design system employs a **Fixed Grid** model for desktop to maintain a scholarly, journal-like containment, while transitioning to a **Fluid Grid** for mobile.

- **Desktop:** 12-column grid centered in a 1120px max-width container. 24px gutters.
- **Tablet:** 8-column grid with 24px margins.
- **Mobile:** 4-column grid with 16px margins. 

Spacing follows a linear scale based on 8px increments. Generous padding (at least 24px) is required within cards and containers to reinforce the "Calm" brand pillar.

## Elevation & Depth
To maintain a professional and clean aesthetic, depth is communicated through **Tonal Layers** and **Low-contrast Outlines** rather than heavy shadows.

1.  **Level 0 (Background):** Pure white (#FFFFFF).
2.  **Level 1 (Cards/Surface):** White background with a 1px solid border (#E2E8F0).
3.  **Level 2 (Hover/Active):** An extremely soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.05)) to suggest interactivity without adding visual clutter.
4.  **Level 3 (Modals/Overlays):** Medium-diffusion shadow with a 15% opacity primary-tinted backdrop blur to keep the focus on the foreground task.

## Shapes
The shape language is consistently **Rounded**, utilizing a base border-radius of 12px (0.75rem). This softens the "professional" edge of the design, making the app feel more approachable and personal.

- **Small elements (Checkboxes, Tags):** 4px - 8px radius.
- **Buttons and Inputs:** 12px (rounded-lg equivalent).
- **Cards and Containers:** 16px (rounded-xl equivalent).
- **Images/Tarot Cards:** 12px to match the UI language.

## Components
### Buttons
- **Primary:** Solid #2563EB background with white text. High-contrast, 12px radius.
- **Secondary:** Light blue tint (#EFF6FF) with #2563EB text. No border.
- **Ghost:** No background, #64748B text, used for tertiary actions.

### Form Inputs
- **Default:** 1px border (#CBD5E1), 12px radius, 12px/16px padding. 
- **Focus State:** 2px border (#2563EB) with a soft 4px outer glow of the same color at 10% opacity.
- **Labels:** Always positioned above the input in `label-md` weight.

### Tarot Cards (Display)
- Journal entries should display tarot cards with a consistent 2:3 aspect ratio, 12px corner radius, and a subtle inner 1px border to ensure the card art "pops" against the white UI.

### Lists & Entries
- Journal history lists should use Level 1 surfaces (subtle borders) with `md` vertical spacing between items to prevent visual crowding.

### Chips/Tags
- Used for "Arcana" or "Suit" categories. 8px radius, using secondary slate colors to remain unobtrusive.