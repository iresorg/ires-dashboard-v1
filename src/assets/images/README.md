# Images Directory

This directory contains image assets used in the application.

## Available Images

- `placeholder.svg` - A placeholder image for testing and development

## Usage

To use these images in your React components:

```tsx
import placeholderImage from "../assets/images/placeholder.svg";

function MyComponent() {
  return (
    <div>
      <img src={placeholderImage} alt="Placeholder" />
    </div>
  );
}
```

## Image Guidelines

1. Use SVG format for icons and simple graphics
2. Use WebP or optimized JPG/PNG for photographs
3. Keep image file sizes as small as possible
4. Always provide meaningful alt text for accessibility
