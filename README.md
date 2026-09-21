# react-native-multicolumn-modal-picker

[![npm](https://img.shields.io/npm/v/react-native-multicolumn-modal-picker?label=npm%20version)](https://www.npmjs.com/package/react-native-multicolumn-modal-picker)
[![monthly downloads](https://img.shields.io/npm/dm/react-native-multicolumn-modal-picker?label=monthly%20downloads)](https://www.npmjs.com/package/react-native-multicolumn-modal-picker)
[![platform](https://img.shields.io/badge/platform-iOS-lightgrey)](https://github.com/Rio9735/react-native-multicolumn-modal-picker)
[![license](https://img.shields.io/npm/l/react-native-multicolumn-modal-picker)](./LICENSE)

## A flexible React Native modal picker with up to three configurable columns, optional single-column search, customizable actions and styling, and localized default text

## Demo

<!-- markdownlint-disable MD033 -->
<p align="center">
  <img src="https://raw.githubusercontent.com/Rio9735/react-native-multicolumn-modal-picker/main/assets/singleColumnSelector.gif" alt="Single-column picker" height="400" />
  <img src="https://raw.githubusercontent.com/Rio9735/react-native-multicolumn-modal-picker/main/assets/twoColumnSelector.gif" alt="Two-column picker" height="400" />
  <img src="https://raw.githubusercontent.com/Rio9735/react-native-multicolumn-modal-picker/main/assets/singleColumnSelectorSearchBar.gif" alt="Single-column picker with search" height="400" />
</p>

## Features

- Configure up to three picker columns.
- Search a single-column picker by label or value.
- Place or hide action buttons.
- Customize colors, theme styling, spacing, labels, and text styles.
- Use built-in light/dark theming or define custom color schemes with `theme` and `customColorScheme`.
- Automatic device localization for default buttons and search placeholder, with manual `locale` override support.

## Requirements

- React `>=16.8.0`
- React Native `>=0.62.0`
- iOS

Android support is not currently provided by this package.

## Package dependencies

[![@react-native-picker/picker](https://img.shields.io/npm/v/@react-native-picker/picker?label=%40react-native-picker%2Fpicker)](https://www.npmjs.com/package/@react-native-picker/picker)

`@react-native-picker/picker` is a runtime dependency of this package and is installed automatically with it.

## Installation

```bash
npm install react-native-multicolumn-modal-picker
```

or:

```bash
yarn add react-native-multicolumn-modal-picker
```

For Expo projects:

```bash
npx expo install react-native-multicolumn-modal-picker
```

## Usage

```tsx
import { useState } from "react";
import { Button, View } from "react-native";
import MultiColumnModalPicker from "react-native-multicolumn-modal-picker";

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

export default function App() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(2);

  return (
    <View>
      <Button title="Open picker" onPress={() => setVisible(true)} />
      <MultiColumnModalPicker
        visible={visible}
        columns={[options]}
        selectedValues={[value]}
        onValueChange={(nextValue, columnIndex) => {
          if (columnIndex === 0 && typeof nextValue === "number") {
            setValue(nextValue);
          }
        }}
        onClose={() => setVisible(false)}
      />
    </View>
  );
}
```

`onClose` is called for both the accept and cancel flows. Tapping outside the picker follows the accept path, so it calls `onAccept` (when provided) and then `onClose`; it does not call `onCancel`.

The cancel button and the modal request-close event restore the values from when the modal opened, call `onCancel` (when provided), and then call `onClose`.

## Examples

### Two columns

```tsx
import { useState } from "react";
import { Button, View } from "react-native";
import MultiColumnModalPicker from "react-native-multicolumn-modal-picker";

export default function TimePickerExample() {
  const [visible, setVisible] = useState(false);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);

  const hours = Array.from({ length: 24 }, (_, hour) => ({
    label: String(hour).padStart(2, "0"),
    value: hour,
  }));

  const minutes = Array.from({ length: 60 }, (_, minute) => ({
    label: String(minute).padStart(2, "0"),
    value: minute,
  }));

  return (
    <View>
      <Button title="Select time" onPress={() => setVisible(true)} />
      <MultiColumnModalPicker
        visible={visible}
        actionButtonsPosition="bottom"
        columns={[hours, minutes]}
        selectedValues={[hour, minute]}
        onValueChange={(nextValue, columnIndex) => {
          if (columnIndex === 0 && typeof nextValue === "number") {
            setHour(nextValue);
          }

          if (columnIndex === 1 && typeof nextValue === "number") {
            setMinute(nextValue);
          }
        }}
        onClose={() => setVisible(false)}
        onAccept={() => console.log(`Selected ${hour}:${minute}`)}
      />
    </View>
  );
}
```

### Single column with search

Search is available only when a single column is active.

```tsx
import { useState } from "react";
import { Button, View } from "react-native";
import MultiColumnModalPicker from "react-native-multicolumn-modal-picker";

const countries = [
  { label: "Australia", value: "+61" },
  { label: "France", value: "+33" },
  { label: "Japan", value: "+81" },
];

export default function SearchExample() {
  const [visible, setVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("+33");

  return (
    <View>
      <Button title="Select country" onPress={() => setVisible(true)} />
      <MultiColumnModalPicker
        visible={visible}
        enableSearch
        columns={[countries]}
        selectedValues={[countryCode]}
        onValueChange={(nextValue) => {
          if (nextValue !== null) setCountryCode(String(nextValue));
        }}
        onClose={() => setVisible(false)}
      />
    </View>
  );
}
```

## API

### Public types

The package exposes the public value, item, column, locale, theme, palette, and callback types used by `MultiColumnModalPickerProps` for editor autocomplete and static typing.

### Modern API surface

The defaults below reflect the actual TypeScript contract in `MultiColumnModalPickerProps`. Optional props resolve to `undefined` and the component applies runtime fallbacks from the selected theme/locale when needed.

| Prop                    | Type                                                                             | Default                             | Description                                                                           |
| ----------------------- | -------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------- |
| `visible`               | `boolean`                                                                        | required                            | Controls modal visibility.                                                            |
| `columns`               | `readonly [PickerColumn, PickerColumn?, PickerColumn?]`                          | `undefined`                         | Full column set passed as a tuple.                                                    |
| `selectedValues`        | `readonly [PickerValue \| null, (PickerValue \| null)?, (PickerValue \| null)?]` | `undefined`                         | Selected values for all columns.                                                      |
| `onValueChange`         | `(value: PickerValue \| null, columnIndex: number, index?: number) => void`      | `undefined`                         | Called when a picker value changes.                                                   |
| `onClose`               | `() => void`                                                                     | required                            | Called when the modal closes.                                                         |
| `onAccept`              | `() => void`                                                                     | `undefined`                         | Called when the user confirms the current selection.                                  |
| `onCancel`              | `() => void`                                                                     | `undefined`                         | Called when the user cancels without accepting.                                       |
| `actionButtonsPosition` | `ActionButtonsPosition`                                                          | `"none"`                            | Position of the action buttons row.                                                   |
| `acceptButtonText`      | `string`                                                                         | `undefined`                         | Custom text for the accept button. If omitted, the localized default applies.         |
| `cancelButtonText`      | `string`                                                                         | `undefined`                         | Custom text for the cancel button. If omitted, the localized default applies.         |
| `searchPlaceholder`     | `string`                                                                         | `undefined`                         | Custom placeholder for the search field. If omitted, the localized default applies.   |
| `enableSearch`          | `boolean`                                                                        | `false`                             | Enables search in single-column mode.                                                 |
| `theme`                 | `PickerThemeName`                                                                | `undefined` (device theme fallback) | Theme key used to select the base palette. Omitted means use the active system theme. |
| `customColorScheme`     | `Partial<Record<string, Partial<PickerPalette>>>`                                | `undefined`                         | Final color overrides applied on top of the selected base theme.                      |
| `locale`                | `PickerLocale`                                                                   | device locale, then `"en"`          | Localizes the built-in default texts when explicit overrides are not provided.        |
| `rightInfo`             | `string`                                                                         | `undefined`                         | Static text shown to the right side of the picker columns.                            |
| `title`                 | `string`                                                                         | `undefined`                         | Optional title shown above the picker.                                                |

### Styling props

| Prop                    | Type                   | Description                                           |
| ----------------------- | ---------------------- | ----------------------------------------------------- |
| `acceptButtonTextStyle` | `StyleProp<TextStyle>` | Accept button label style.                            |
| `cancelButtonTextStyle` | `StyleProp<TextStyle>` | Cancel button label style.                            |
| `horizontalPadding`     | `number`               | Horizontal padding applied around the picker content. |
| `itemStyle`             | `StyleProp<TextStyle>` | Style applied to picker item labels.                  |
| `pickerItemTextStyle`   | `StyleProp<TextStyle>` | Compatibility alias for `itemStyle`.                  |
| `rightInfoTextStyle`    | `StyleProp<TextStyle>` | Style for the right-side info text.                   |
| `searchBoxStyle`        | `StyleProp<ViewStyle>` | Style applied to the search input container.          |
| `searchTextStyle`       | `StyleProp<TextStyle>` | Style for the search input text.                      |
| `titleStyle`            | `StyleProp<TextStyle>` | Style for the title text.                             |

> All custom color styling should go through `customColorScheme`. Individual color props were removed from the recommended API because they duplicate the same responsibility and make the theme model harder to reason about.

### Deprecated aliases

The following props are still supported for compatibility, but they are deprecated as of version 1.1.0 and should be replaced in new code. They remain available only to avoid breaking existing integrations, and they are expected to be removed in a future major version.

| Deprecated prop            | Deprecated since | Replace with            | Notes                                                  |
| -------------------------- | ---------------- | ----------------------- | ------------------------------------------------------ |
| `actionButtons`            | `1.1.0`          | `actionButtonsPosition` | Kept for backward compatibility.                       |
| `bgColor`                  | `1.1.0`          | `customColorScheme`     | Legacy color alias; prefer the palette override model. |
| `cancelButtonBgColor`      | `1.1.0`          | `customColorScheme`     | Legacy color alias; prefer the palette override model. |
| `actionButtonsBorderColor` | `1.1.0`          | `customColorScheme`     | Legacy color alias; prefer the palette override model. |
| `hPadding`                 | `1.1.0`          | `horizontalPadding`     | Kept for backward compatibility.                       |
| `onValueChange1`           | `1.1.0`          | `onValueChange`         | Kept for backward compatibility.                       |
| `onValueChange2`           | `1.1.0`          | `onValueChange`         | Kept for backward compatibility.                       |
| `onValueChange3`           | `1.1.0`          | `onValueChange`         | Kept for backward compatibility.                       |
| `onValuesChange`           | `1.1.0`          | `onValueChange`         | Kept for backward compatibility.                       |
| `searchBar`                | `1.1.0`          | `enableSearch`          | Kept for backward compatibility.                       |
| `searchElementsColor`      | `1.1.0`          | `customColorScheme`     | Legacy color alias; prefer the palette override model. |
| `selectionHighlightColor`  | `1.1.0`          | `customColorScheme`     | Legacy color alias; prefer the palette override model. |

### Search behavior

Search is optional and only applies when a single column is used. Matching ignores case and accents. An exact value match is preferred; otherwise the first label-ranked match is selected. Clearing the field or finding no match restores the previous value.

### Localization

`locale` only provides the fallback translations for the built-in default texts: the accept button text, the cancel button text, and the search placeholder. If you pass `acceptButtonText`, `cancelButtonText`, or `searchPlaceholder` explicitly, those values take precedence and the locale no longer changes them.

In other words, the precedence is:

1. explicit `acceptButtonText` / `cancelButtonText` / `searchPlaceholder`
2. fallback translations from the selected `locale`
3. package defaults

Supported locales in the current public API:

- English (`en`)
- Español (`es`)
- Français (`fr`)
- Deutsch (`de`)
- Italiano (`it`)
- Português (`pt`)
- Русский (`ru`)
- 日本語 (`ja`)
- 한국어 (`ko`)
- 中文 (`zh`)
- العربية (`ar`)
- हिन्दी (`hi`)
- Türkçe (`tr`)
- Nederlands (`nl`)
- Polski (`pl`)
- Svenska (`sv`)
- Norsk (`nb`)
- Dansk (`da`)
- Suomi (`fi`)
- Čeština (`cs`)
- Ελληνικά (`el`)
- Bahasa Indonesia (`id`)
- ไทย (`th`)
- Українська (`uk`)
- עברית (`he`)
- Română (`ro`)
- Magyar (`hu`)
- Slovenčina (`sk`)
- Tiếng Việt (`vi`)

```tsx
<MultiColumnModalPicker locale="es" {...props} />
```

### Theme and custom color schemes

`theme` selects the base palette. `customColorScheme` is the final override layer: you provide only the colors you want to replace, and any omitted values fall back to the selected base theme.

```tsx
<MultiColumnModalPicker
  visible={visible}
  theme="midnight"
  customColorScheme={{
    light: {
      modalBackground: "#F5F5F5",
      border: "#D8D8D8",
      selectionHighlight: "#4A90E2",
    },
    dark: {
      modalBackground: "#1E1E1E",
      border: "#3A3A3A",
      selectionHighlight: "#7C9CFF",
    },
    midnight: {
      modalBackground: "#111827",
      border: "#374151",
      selectionHighlight: "#60A5FA",
      buttonText: "#F9FAFB",
    },
  }}
  columns={[countries]}
  selectedValues={[countryCode]}
  onClose={() => setVisible(false)}
/>
```

Partial overrides are supported, and a custom scheme name is only active when `theme` is set to that same name. `customColorScheme` overrides the selected base theme, and any omitted colors fall back to that base theme.

### TypeScript support

The package exports `MultiColumnModalPickerProps`, `PickerLocale`, `PickerValue`, `PickerItem`, `PickerColumn`, `ActionButtonsPosition`, `PickerThemeMode`, `PickerPalette`, `PickerThemeName`, and the callback helper types for editor autocomplete and validation.

## What's new in 1.1.0

- Public TypeScript typings and generated declarations are now exported for editor support and static checks.
- The public API was cleaned up to use clearer prop names while preserving compatibility aliases.
- Built-in localized default UI text is available through the `locale` prop for all 30 supported locales.

For the complete version history, see [CHANGELOG.md](./CHANGELOG.md).

## Contributing

Please open an [issue](https://github.com/Rio9735/react-native-multicolumn-modal-picker/issues) or join the [discussion](https://github.com/Rio9735/react-native-multicolumn-modal-picker/discussions/1).

If this package is useful, consider giving it a [star on GitHub](https://github.com/Rio9735/react-native-multicolumn-modal-picker).

## Author

_**Río**_ · [markidelrio@gmail.com](mailto:markidelrio@gmail.com)

## License

MIT. See [LICENSE](./LICENSE).
