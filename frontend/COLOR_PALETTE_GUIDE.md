# Color Palette Customization Guide

This project uses a custom color palette system that can be easily adjusted to match your logo colors. The colors are defined in CSS custom properties (variables) in `src/index.css`.

## Current Color Palette

The current design uses Saint Demiana Deacos School's brand colors:

### Primary Colors (Based on #a71f23)

- **Primary 50**: #fef2f2 (Very light red)
- **Primary 100**: #fee2e2 (Light red)
- **Primary 200**: #fecaca (Lighter red)
- **Primary 300**: #fca5a5 (Light red)
- **Primary 400**: #f87171 (Medium light red)
- **Primary 500**: #a71f23 (Deep red) - Main brand color
- **Primary 600**: #991b1b (Dark red) - Hover states
- **Primary 700**: #7f1d1d (Darker red) - Active states
- **Primary 800**: #6b1d1d (Very dark red)
- **Primary 900**: #5a1d1d (Darkest red)

### Neutral Colors

- **Neutral 50-900**: Warm gray scale that complements the red

### Accent Colors (Blue)

- **Accent 50**: #eff6ff (Very light blue)
- **Accent 100**: #dbeafe (Light blue)
- **Accent 200**: #bfdbfe (Lighter blue)
- **Accent 300**: #93c5fd (Light blue)
- **Accent 400**: #60a5fa (Medium light blue)
- **Accent 500**: #3b82f6 (Blue) - Main accent color
- **Accent 600**: #2563eb (Dark blue) - Hover states
- **Accent 700**: #1d4ed8 (Darker blue) - Active states
- **Accent 800**: #1e40af (Very dark blue)
- **Accent 900**: #1e3a8a (Darkest blue)

## How to Customize Colors Based on Your Logo

### Step 1: Extract Colors from Your Logo

1. Open your logo image in a design tool (Photoshop, Figma, etc.)
2. Use the color picker to identify the main colors
3. Note down the hex codes of the primary colors

### Step 2: Update the CSS Variables

In `src/index.css`, locate the `:root` section and update the primary color variables:

```css
:root {
  /* Replace these with your logo colors */
  --primary-50: #your-lightest-color;
  --primary-100: #your-very-light-color;
  --primary-200: #your-light-color;
  --primary-300: #your-medium-light-color;
  --primary-400: #your-medium-color;
  --primary-500: #your-main-brand-color; /* This is your main logo color */
  --primary-600: #your-medium-dark-color; /* Slightly darker for hover */
  --primary-700: #your-dark-color; /* Darker for active states */
  --primary-800: #your-darker-color;
  --primary-900: #your-darkest-color;
}
```

### Step 3: Generate Color Variations

If you only have one or two colors from your logo, you can:

1. **Use an online color generator** like:

   - [Coolors.co](https://coolors.co/)
   - [Adobe Color](https://color.adobe.com/)
   - [Paletton](https://paletton.com/)

2. **Create variations manually**:
   - Lighter shades: Add white or increase lightness
   - Darker shades: Add black or decrease lightness
   - Saturation variations: Adjust saturation for different intensities

### Step 4: Test Your Colors

After updating the colors:

1. Run your development server
2. Check how the colors look in the navbar and throughout the app
3. Ensure good contrast for accessibility
4. Test hover and active states

## Color Usage Guidelines

### Primary Colors

- **Primary 500**: Main brand color, used for primary buttons and important elements
- **Primary 600**: Hover states for buttons and links
- **Primary 700**: Active states and pressed buttons
- **Primary 50-200**: Background colors and subtle highlights
- **Primary 800-900**: Text on light backgrounds

### Neutral Colors

- **Neutral 900**: Main text color
- **Neutral 700**: Secondary text
- **Neutral 500**: Muted text
- **Neutral 200**: Borders and dividers
- **Neutral 50**: Page backgrounds

### Accessibility Considerations

- Ensure text has sufficient contrast (WCAG AA requires 4.5:1 for normal text)
- Test your color combinations with color blindness simulators
- Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Example: Red Brand Colors

If your logo uses red colors, you might use:

```css
:root {
  --primary-50: #fef2f2;
  --primary-100: #fee2e2;
  --primary-200: #fecaca;
  --primary-300: #fca5a5;
  --primary-400: #f87171;
  --primary-500: #ef4444; /* Your main red */
  --primary-600: #dc2626;
  --primary-700: #b91c1c;
  --primary-800: #991b1b;
  --primary-900: #7f1d1d;
}
```

## Example: Green Brand Colors

If your logo uses green colors:

```css
:root {
  --primary-50: #f0fdf4;
  --primary-100: #dcfce7;
  --primary-200: #bbf7d0;
  --primary-300: #86efac;
  --primary-400: #4ade80;
  --primary-500: #22c55e; /* Your main green */
  --primary-600: #16a34a;
  --primary-700: #15803d;
  --primary-800: #166534;
  --primary-900: #14532d;
}
```

## Components Using the Color Palette

The following components automatically use your custom colors:

1. **Navbar** (`src/components/Navbar.jsx`)

   - Background, borders, text colors
   - Hover states for navigation links
   - Button colors for Login/Signup

2. **App Layout** (`src/App.jsx`)

   - Background colors
   - Text colors
   - Button styling

3. **Global Styles** (`src/index.css`)
   - Scrollbar colors
   - Focus states
   - Transitions

## Tips for Professional Color Schemes

1. **Limit your palette**: Use 2-3 main colors plus neutrals
2. **Create hierarchy**: Use color intensity to show importance
3. **Consider context**: Ensure colors work in different lighting conditions
4. **Test on different devices**: Colors may appear differently on various screens
5. **Keep it consistent**: Use the same color variations throughout your app

## Need Help?

If you need assistance extracting colors from your logo or creating a professional color palette, consider:

1. Using design tools like Figma or Adobe Color
2. Consulting with a designer
3. Using online color palette generators
4. Following established brand guidelines if available
