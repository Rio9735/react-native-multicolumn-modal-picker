import type { PickerPalette, PickerThemeName } from "../types";

type BasePalette = Omit<PickerPalette, "searchElements" | "cancelText">;

type ThemePalette = BasePalette &
  Pick<PickerPalette, "searchElements" | "cancelText">;

export const Colors: Readonly<{
  light: BasePalette;
  dark: BasePalette;
}> &
  Pick<PickerPalette, "searchElements" | "cancelText"> = {
  light: {
    modalBackground: "#F6F6F6",
    overlay: "rgba(0, 0, 0, 0.42)",
    border: "#BBBBBB",
    buttonText: "#444444",
    cancelButtonText: "#555555",
    secondaryText: "#888888",
    rightInfoText: "#444444",
    inputText: "#222222",
    pickerItemText: "#222222",
    selectionHighlight: "#999999",
    searchBackground: "rgba(1,1,1,0.1)",
    searchClearBackground: "rgba(1,1,1,0.5)",
    searchClearText: "rgba(255,255,255,0.3)",
  },
  dark: {
    modalBackground: "#333333",
    overlay: "rgba(0, 0, 0, 0.58)",
    border: "#717171",
    buttonText: "#FFFFFF",
    cancelButtonText: "#FFFFFF",
    secondaryText: "#B2B2B2",
    rightInfoText: "#B2B2B2",
    inputText: "#FFFFFF",
    pickerItemText: "#FFFFFF",
    selectionHighlight: "#555555",
    searchBackground: "rgba(222,222,222,0.1)",
    searchClearBackground: "rgba(255,255,255,0.5)",
    searchClearText: "rgba(1,1,1,0.3)",
  },
  searchElements: "#B7B7B7",
  cancelText: "#FF4D4F",
} as const;

const omitUndefined = <T extends object>(value: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  ) as Partial<T>;

export const resolvePalette = ({
  theme,
  customColorScheme,
  colorScheme,
  legacyColorOverrides,
}: {
  theme?: PickerThemeName;
  customColorScheme?: Partial<Record<string, Partial<PickerPalette>>>;
  colorScheme?: "light" | "dark" | null;
  legacyColorOverrides?: Partial<PickerPalette>;
}): PickerPalette => {
  const resolvedThemeName: string =
    theme === "auto"
      ? colorScheme === "dark"
        ? "dark"
        : "light"
      : (theme ?? (colorScheme === "dark" ? "dark" : "light"));

  const basePaletteName: "light" | "dark" =
    resolvedThemeName === "dark" || resolvedThemeName === "light"
      ? resolvedThemeName
      : colorScheme === "dark"
        ? "dark"
        : "light";

  const selectedThemeOverrides =
    customColorScheme?.[resolvedThemeName] ??
    customColorScheme?.[basePaletteName] ??
    {};

  const basePalette: BasePalette = Colors[basePaletteName];

  return {
    ...basePalette,
    searchElements: Colors.searchElements,
    cancelText: Colors.cancelText,
    ...omitUndefined(legacyColorOverrides ?? {}),
    ...omitUndefined(selectedThemeOverrides),
  } satisfies ThemePalette;
};
