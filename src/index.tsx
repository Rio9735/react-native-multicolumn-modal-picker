import React from "react";
import { Platform } from "react-native";
import type { MultiColumnModalPickerProps } from "./types";
import IOSMultiColumnModalPicker from "./platform/ios/IOSMultiColumnModalPicker";

export type {
  ActionButtonsPosition,
  MultiColumnModalPickerProps,
  PickerColumn,
  PickerItem,
  PickerLocale,
  PickerPalette,
  PickerThemeMode,
  PickerThemeName,
  PickerValue,
} from "./types";

const MultiColumnModalPicker = (props: MultiColumnModalPickerProps) => {
  if (Platform.OS !== "ios") {
    return null;
  }

  return <IOSMultiColumnModalPicker {...props} />;
};

export default MultiColumnModalPicker;
