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
  overlay: string;
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
   *
   * Used only when `actionButtonsPosition` is undefined.
   */
  actionButtons?: ActionButtonsPosition;
  /**
   * @deprecated Since 1.1.0. Use customColorScheme instead.
   *
   * Type: string.
   * Default: active theme modal background. Used only when defined and when
   * no corresponding custom palette override is provided.
   */
  bgColor?: string;
  /**
   * @deprecated Since 1.1.0. Use customColorScheme instead.
   *
   * Type: string.
   * Default: active theme border color. Used only when defined and when
   * no corresponding custom palette override is provided.
   */
  actionButtonsBorderColor?: string;
  /**
   * @deprecated Since 1.1.0. Use customColorScheme instead.
   *
   * Type: string.
   * Default: active theme modal background. Applies only to detached cancel
   * actions and takes precedence over the resolved modal background.
   */
  cancelButtonBgColor?: string;
  /**
   * @deprecated Since 1.1.0. Use horizontalPadding instead.
   *
   * Type: number.
   * Default: horizontalPadding. Has no effect when `horizontalPadding` is defined.
   */
  hPadding?: number;
  /**
   * @deprecated Since 1.1.0. Use enableSearch instead.
   *
   * Type: boolean.
   * Default: false. Enables search together with `enableSearch`; the search
   * bar is rendered only when exactly one column is active.
   */
  searchBar?: boolean;
  /**
   * @deprecated Since 1.1.0. Use customColorScheme instead.
   *
   * Type: string.
   * Default: active theme search elements color. Applied only when search is
   * rendered and no corresponding custom palette override is provided.
   */
  searchElementsColor?: string;
  /**
   * @deprecated Since 1.1.0. Use customColorScheme instead.
   *
   * Type: string.
   * Default: active theme selection highlight color. Applied only to the
   * rendered overlay and when no corresponding custom palette override is provided.
   */
  selectionHighlightColor?: string;
  /**
   * @deprecated Use onValueChange instead.
   *
   * Signature: (value: string | number | null, index?: number) => void.
   * Called for changes in column 1. If both new and legacy callbacks are
   * defined, both are called.
   */
  onValueChange1?: PickerValueChangeHandler;
  /**
   * @deprecated Use onValueChange instead.
   *
   * Signature: (value: string | number | null, index?: number) => void.
   * Called for changes in column 2. If both new and legacy callbacks are
   * defined, both are called.
   */
  onValueChange2?: PickerValueChangeHandler;
  /**
   * @deprecated Use onValueChange instead.
   *
   * Signature: (value: string | number | null, index?: number) => void.
   * Called for changes in column 3. If both new and legacy callbacks are
   * defined, both are called.
   */
  onValueChange3?: PickerValueChangeHandler;
  /**
   * @deprecated Use onValueChange instead.
   *
   * Signature: (values: Array<string | number | null>) => void.
   * Called alongside `onValueChange` when a column value changes.
   */
  onValuesChange?: PickerValuesChangeHandler;
  /**
   * Text shown on the accept button.
   *
   * Type: string.
   * Default: localized default text. Has no effect when accept actions are not rendered.
   */
  acceptButtonText?: string;
  /**
   * Text style for the accept button label.
   *
   * Type: StyleProp<TextStyle>.
   * Default: default button style. Applied only to rendered accept actions.
   */
  acceptButtonTextStyle?: StyleProp<TextStyle>;
  /**
   * Position of the action buttons row.
   *
   * `"top"` renders both actions inside the modal, `"bottom"` renders the
   * accept action inside and the cancel action outside, `"cancel"` renders
   * only the cancel action outside, and `"none"` renders no action buttons.
   */
  actionButtonsPosition?: ActionButtonsPosition;
  /**
   * Border radius applied to action buttons when they are rendered outside the modal.
   * Integrated action buttons keep the modal container radius.
   *
   * Type: number.
   * Default: 10.
   */
  actionButtonsBorderRadius?: number;
  /**
   * Text shown on the cancel button.
   *
   * Type: string.
   * Default: localized default text. Has no effect when cancel actions are not rendered.
   */
  cancelButtonText?: string;
  /**
   * Text style for the cancel button label.
   *
   * Type: StyleProp<TextStyle>.
   * Default: default button style. Applied only to rendered cancel actions.
   */
  cancelButtonTextStyle?: StyleProp<TextStyle>;
  /**
   * Border radius applied to the modal container.
   *
   * Type: number.
   * Default: 10.
   */
  modalBorderRadius?: number;
  /**
   * @deprecated Use `columns` instead.
   * Used only when the corresponding slot in `columns` is undefined.
   */
  column1?: PickerColumn;
  /**
   * @deprecated Use `columns` instead.
   * Used only when the corresponding slot in `columns` is undefined.
   */
  column2?: PickerColumn;
  /**
   * @deprecated Use `columns` instead.
   * Used only when the corresponding slot in `columns` is undefined.
   */
  column3?: PickerColumn;
  /**
   * Full column set for the picker. Each tuple slot represents a column.
   * New column slots take precedence over the corresponding legacy column props.
   */
  columns?: readonly [PickerColumn, PickerColumn?, PickerColumn?];
  /**
   * Horizontal padding applied around the picker content.
   * Applied only when its value is defined; otherwise `hPadding` is used as a legacy fallback.
   */
  horizontalPadding?: number;
  /**
   * Text style applied to each picker item label.
   * Applied only to rendered picker columns.
   */
  itemStyle?: StyleProp<TextStyle>;
  /**
   * @deprecated Use `itemStyle` instead.
   * Used only when `itemStyle` is not defined.
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
   * Default: undefined. The text is rendered only when a value is defined.
   */
  rightInfo?: string;
  /**
   * Text style for the right-side info text.
   *
   * Type: StyleProp<TextStyle>.
   * Default: default right-info style. Applied only when `rightInfo` is defined.
   */
  rightInfoTextStyle?: StyleProp<TextStyle>;
  /**
   * Border radius applied to the selected-item overlay.
   *
   * Type: number.
   * Default: 10.
   */
  selectionHighlightBorderRadius?: number;
  /**
   * Enables the search input when only a single picker column is active.
   *
   * Type: boolean.
   * Default: false.
   */
  enableSearch?: boolean;
  /**
   * Called when the rendered search input receives focus.
   *
   * This callback has an effect only when `enableSearch` or the legacy
   * `searchBar` prop enables search and exactly one column is active. It is
   * ignored when the search bar is not rendered, including when multiple
   * columns are configured.
   *
   * Signature: () => void.
   * Default: none.
   */
  onSearchFocus?: () => void;
  /**
   * Called when the rendered search input loses focus.
   *
   * This callback has an effect only when `enableSearch` or the legacy
   * `searchBar` prop enables search and exactly one column is active. It is
   * ignored when the search bar is not rendered, including when multiple
   * columns are configured.
   *
   * Signature: () => void.
   * Default: none.
   */
  onSearchBlur?: () => void;
  /**
   * Border radius applied to the search bar.
   *
   * Type: number.
   * Default: 10.
   */
  searchBarBorderRadius?: number;
  /**
   * Border radius applied to the search clear button.
   *
   * Type: number.
   * Default: 10.
   */
  searchClearButtonBorderRadius?: number;
  /**
   * Style applied to the search input container.
   *
   * Type: StyleProp<ViewStyle>.
   * Default: default search box style. Applied only when the search bar is rendered.
   */
  searchBoxStyle?: StyleProp<ViewStyle>;
  /**
   * Placeholder text for the search input.
   *
   * Type: string.
   * Default: localized default text. Applied only when the search bar is rendered.
   */
  searchPlaceholder?: string;
  /**
   * Text style for the search input value.
   *
   * Type: StyleProp<TextStyle>.
   * Default: default input style. Applied only when the search bar is rendered.
   */
  searchTextStyle?: StyleProp<TextStyle>;
  /**
   * @deprecated Use `selectedValues` instead.
   * Used only when the corresponding slot in `selectedValues` is undefined.
   */
  selectedValue1?: PickerValue | null;
  /**
   * @deprecated Use `selectedValues` instead.
   * Used only when the corresponding slot in `selectedValues` is undefined.
   */
  selectedValue2?: PickerValue | null;
  /**
   * @deprecated Use `selectedValues` instead.
   * Used only when the corresponding slot in `selectedValues` is undefined.
   */
  selectedValue3?: PickerValue | null;
  /**
   * Selected values for all columns, aligned by column index.
   * New selected values take precedence over the corresponding legacy selected-value props.
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
   * Default: undefined. The title is rendered only when a value is defined.
   */
  title?: string;
  /**
   * Text style for the modal title.
   *
   * Type: StyleProp<TextStyle>.
   * Default: default title style. Applied only when `title` is defined.
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
   * When omitted, the active system color scheme selects the light or dark base palette.
   */
  theme?: PickerThemeName;
  /**
   * Custom color schemes keyed by theme name.
   *
   * This is the final color override layer. Any keys you omit keep the values from the selected base theme.
   * A custom entry takes effect only when its key matches `theme` or its active light/dark base palette.
   */
  customColorScheme?: Partial<Record<string, Partial<PickerPalette>>>;
  /**
   * Locale used for the built-in default texts.
   *
   * See `PickerLocale` for the supported values.
   * It affects only built-in accept, cancel, and search-placeholder text when
   * the corresponding explicit text prop is not defined.
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
   * The current picker layout does not render this prop.
   */
  children?: ReactNode;
};
