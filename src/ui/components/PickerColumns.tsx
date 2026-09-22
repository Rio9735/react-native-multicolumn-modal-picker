import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import type { StyleProp, TextStyle } from "react-native";
import type { PickerColumn, PickerValue } from "../../types";

type PickerChangeHandler = (value: PickerValue | null, index?: number) => void;

type PickerColumnsProps = {
  columns: [PickerColumn, PickerColumn?, PickerColumn?];
  selectedValues: [
    PickerValue | null,
    (PickerValue | null)?,
    (PickerValue | null)?,
  ];
  itemStyle?: StyleProp<TextStyle>;
  itemTextColor: string;
  onValueChanges: [
    PickerChangeHandler | undefined,
    PickerChangeHandler | undefined,
    PickerChangeHandler | undefined,
  ];
};

export const PickerColumns = React.memo(
  ({
    columns,
    selectedValues,
    itemStyle,
    itemTextColor,
    onValueChanges,
  }: PickerColumnsProps) => {
    return (
      <>
        {columns.map((column, columnIndex) => {
          if (!column || column.length === 0) {
            return null;
          }

          return (
            <Picker
              key={`picker-wrapper-${columnIndex}`}
              style={styles.picker}
              itemStyle={[
                styles.itemText,
                {
                  color: itemTextColor,
                },
                itemStyle,
              ]}
              selectedValue={selectedValues[columnIndex]}
              onValueChange={onValueChanges[columnIndex]}
            >
              {column.map((item, itemIndex) => (
                <Picker.Item
                  key={`${item.value}-${itemIndex}`}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          );
        })}
      </>
    );
  },
);

const styles = StyleSheet.create({
  picker: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
  },
});
