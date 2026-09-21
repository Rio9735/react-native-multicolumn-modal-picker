import type { ReactNode } from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export type PickerValue = string | number;

export type PickerItem = {
  readonly label: string;
  readonly value: PickerValue;
};

export type PickerColumn = readonly PickerItem[];

export type PickerLocale =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ru"
  | "ja"
  | "ko"
  | "zh"
  | "ar"
  | "hi"
  | "tr"
  | "nl"
  | "pl"
  | "sv"
  | "nb"
  | "da"
  | "fi"
  | "cs"
  | "el"
  | "id"
  | "th"
  | "uk"
  | "he"
  | "ro"
  | "hu"
  | "sk"
  | "vi";

export type ActionButtonsPosition = "top" | "bottom" | "cancel" | "none";

export type PickerThemeMode = "light" | "dark" | "auto";

export type PickerThemeName = PickerThemeMode | (string & {});

export type PickerPalette = {
  modalBackground: string;
  border: string;
  buttonText: string;
  cancelButtonText: string;
  secondaryText: string;
  rightInfoText: string;
  inputText: string;
  pickerItemText: string;
  searchBackground: string;
  searchClearBackground: string;
  searchClearText: string;
  searchElements: string;
  selectionHighlight: string;
  cancelText: string;
};

export type PickerValueChangeHandler = (
  value: PickerValue | null,
  index?: number,
) => void;

export type PickerColumnValueChangeHandler = (
  value: PickerValue | null,
  columnIndex: number,
  index?: number,
) => void;

export type PickerValuesChangeHandler = (
  values: Array<PickerValue | null>,
) => void;

export type MultiColumnModalPickerProps = {
  /**
   * @deprecated Use actionButtonsPosition instead.
   */
  actionButtons?: ActionButtonsPosition;
  /**
   * @deprecated Since 1.1.0. Use customColorScheme instead.
   *
   * Type: string.
   * Default: active theme modal background.
   */
  bgColor?: string;
  /**
   * @deprecated Since 1.1.0. Use customColorScheme instead.
   *
   * Type: string.
   * Default: active theme border color.
   */
  actionButtonsBorderColor?: string;
  /**
   * @deprecated Since 1.1.0. Use customColorScheme instead.
   *
   * Type: string.
   * Default: active theme modal background.
   */
  cancelButtonBgColor?: string;
  /**
   * @deprecated Since 1.1.0. Use horizontalPadding instead.
   *
   * Type: number.
   * Default: horizontalPadding.
   */
  hPadding?: number;
  /**
   * @deprecated Since 1.1.0. Use enableSearch instead.
   *
   * Type: boolean.
   * Default: enableSearch.
   */
  searchBar?: boolean;
  /**
   * @deprecated Since 1.1.0. Use customColorScheme instead.
   *
   * Type: string.
   * Default: active theme search elements color.
   */
  searchElementsColor?: string;
  /**
   * @deprecated Since 1.1.0. Use customColorScheme instead.
   *
   * Type: string.
   * Default: active theme selection highlight color.
   */
  selectionHighlightColor?: string;
  /**
   * @deprecated Use onValueChange instead.
   *
   * Signature: (value: string | number | null, index?: number) => void.
   * Default: onValueChange.
   */
  onValueChange1?: PickerValueChangeHandler;
  /**
   * @deprecated Use onValueChange instead.
   *
   * Signature: (value: string | number | null, index?: number) => void.
   * Default: onValueChange.
   */
  onValueChange2?: PickerValueChangeHandler;
  /**
   * @deprecated Use onValueChange instead.
   *
   * Signature: (value: string | number | null, index?: number) => void.
   * Default: onValueChange.
   */
  onValueChange3?: PickerValueChangeHandler;
  /**
   * @deprecated Use onValueChange instead.
   *
   * Signature: (values: Array<string | number | null>) => void.
   * Default: onValueChange.
   */
  onValuesChange?: PickerValuesChangeHandler;
  /**
   * Text shown on the accept button.
   *
   * Type: string.
   * Default: localized default text.
   */
  acceptButtonText?: string;
  /**
   * Text style for the accept button label.
   *
   * Type: StyleProp<TextStyle>.
   * Default: default button style.
   */
  acceptButtonTextStyle?: StyleProp<TextStyle>;
  /**
   * Position of the action buttons row.
   */
  actionButtonsPosition?: ActionButtonsPosition;
  /**
   * Text shown on the cancel button.
   *
   * Type: string.
   * Default: localized default text.
   */
  cancelButtonText?: string;
  /**
   * Text style for the cancel button label.
   *
   * Type: StyleProp<TextStyle>.
   * Default: default button style.
   */
  cancelButtonTextStyle?: StyleProp<TextStyle>;
  /**
   * @deprecated Use `columns` instead.
   */
  column1?: PickerColumn;
  /**
   * @deprecated Use `columns` instead.
   */
  column2?: PickerColumn;
  /**
   * @deprecated Use `columns` instead.
   */
  column3?: PickerColumn;
  /**
   * Full column set for the picker. Each tuple slot represents a column.
   */
  columns?: readonly [PickerColumn, PickerColumn?, PickerColumn?];
  /**
   * Horizontal padding applied around the picker content.
   */
  horizontalPadding?: number;
  /**
   * Text style applied to each picker item label.
   */
  itemStyle?: StyleProp<TextStyle>;
  /**
   * @deprecated Use `itemStyle` instead.
   */
  pickerItemTextStyle?: StyleProp<TextStyle>;
  /**
   * Called when any picker column changes value.
   *
   * Signature: (value: string | number | null, columnIndex: number, index?: number) => void.
   * Default: none.
   *
   * @param value The selected value for the changed column.
   * @param columnIndex Zero-based index of the column that changed.
   * @param index Zero-based index of the selected item in that column.
   */
  onValueChange?: PickerColumnValueChangeHandler;
  /**
   * Static text displayed to the right side of the picker columns.
   *
   * Type: string.
   * Default: undefined.
   */
  rightInfo?: string;
  /**
   * Text style for the right-side info text.
   *
   * Type: StyleProp<TextStyle>.
   * Default: default right-info style.
   */
  rightInfoTextStyle?: StyleProp<TextStyle>;
  /**
   * Enables the search input when only a single picker column is active.
   *
   * Type: boolean.
   * Default: false.
   */
  enableSearch?: boolean;
  /**
   * Style applied to the search input container.
   *
   * Type: StyleProp<ViewStyle>.
   * Default: default search box style.
   */
  searchBoxStyle?: StyleProp<ViewStyle>;
  /**
   * Placeholder text for the search input.
   *
   * Type: string.
   * Default: localized default text.
   */
  searchPlaceholder?: string;
  /**
   * Text style for the search input value.
   *
   * Type: StyleProp<TextStyle>.
   * Default: default input style.
   */
  searchTextStyle?: StyleProp<TextStyle>;
  /**
   * @deprecated Use `selectedValues` instead.
   */
  selectedValue1?: PickerValue | null;
  /**
   * @deprecated Use `selectedValues` instead.
   */
  selectedValue2?: PickerValue | null;
  /**
   * @deprecated Use `selectedValues` instead.
   */
  selectedValue3?: PickerValue | null;
  /**
   * Selected values for all columns, aligned by column index.
   */
  selectedValues?: readonly [
    PickerValue | null,
    (PickerValue | null)?,
    (PickerValue | null)?,
  ];
  /**
   * Title text displayed above the picker.
   *
   * Type: string.
   * Default: undefined.
   */
  title?: string;
  /**
   * Text style for the modal title.
   *
   * Type: StyleProp<TextStyle>.
   * Default: default title style.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Controls modal visibility.
   *
   * Type: boolean.
   * Default: none. This prop is required.
   */
  visible: boolean;
  /**
   * Theme name used to select the active palette.
   *
   * `theme` chooses the base palette. `customColorScheme` applies the final overrides.
   * Supported built-ins: "auto" | "light" | "dark" and any custom key you defined.
   */
  theme?: PickerThemeName;
  /**
   * Custom color schemes keyed by theme name.
   *
   * This is the final color override layer. Any keys you omit keep the values from the selected base theme.
   */
  customColorScheme?: Partial<Record<string, Partial<PickerPalette>>>;
  /**
   * Locale used for the built-in default texts.
   *
   * See `PickerLocale` for the supported values.
   */
  locale?: PickerLocale;
  /**
   * Called when the user confirms the current selection.
   *
   * Signature: () => void.
   * Default: none.
   */
  onAccept?: () => void;
  /**
   * Called when the user cancels without accepting.
   *
   * Signature: () => void.
   * Default: none.
   */
  onCancel?: () => void;
  /**
   * Called whenever the modal closes.
   *
   * Signature: () => void.
   * Default: none.
   */
  onClose: () => void;
  /**
   * Custom content rendered inside the modal. This is kept for compatibility.
   */
  children?: ReactNode;
};
