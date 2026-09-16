# Icons Directory

This directory contains SVG icons used throughout the application.

## Available Icons

- `home.svg` - Home icon for navigation
- `settings.svg` - Settings icon for configuration pages

## Usage

To use these icons in your React components:

```tsx
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";

function MyComponent() {
  return (
    <div>
      <HomeIcon className="w-6 h-6" />
    </div>
  );
}
```

The icons are styled using the `currentColor` value, which means they will inherit the color from their parent element's text color.
