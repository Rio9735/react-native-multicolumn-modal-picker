import React, { useEffect, useRef, useState } from "react";
import type { ComponentRef } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Animated,
  TextInput,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import type { LayoutChangeEvent } from "react-native";
import type {
  MultiColumnModalPickerProps,
  PickerColumn,
  PickerValue,
} from "../../types";
import { PickerColumns } from "../../ui/components/PickerColumns";
import { SearchBar } from "../../ui/components/SearchBar";
import { comparePickerItems, matchesPickerItem } from "../../utils/search";
import { styles } from "../../styles";
import { resolvePalette } from "../../constants/colors";
import { resolveLocale } from "../../i18n/locale";
import { translations } from "../../i18n/translations";

const IOSMultiColumnModalPicker = ({
  actionButtons,
  bgColor,
  cancelButtonBgColor,
  hPadding,
  onValuesChange: legacyOnValuesChange,
  onValueChange1: modernOnValueChange1,
  onValueChange2: modernOnValueChange2,
  onValueChange3: modernOnValueChange3,
  searchBar,
  actionButtonsBorderColor,
  searchElementsColor,
  selectionHighlightColor,
  acceptButtonText,
  acceptButtonTextStyle,
  actionButtonsPosition,
  cancelButtonText,
  cancelButtonTextStyle,
  column1: modernColumn1,
  column2: modernColumn2,
  column3: modernColumn3,
  columns: legacyColumns,
  horizontalPadding,
  itemStyle,
  locale,
  onAccept,
  onCancel,
  onClose,
  onValueChange: modernOnValueChange,
  rightInfo,
  rightInfoTextStyle,
  enableSearch = false,
  searchBoxStyle,
  searchPlaceholder,
  searchTextStyle,
  selectedValue1: modernSelectedValue1,
  selectedValue2: modernSelectedValue2,
  selectedValue3: modernSelectedValue3,
  selectedValues: legacySelectedValues,
  title,
  titleStyle,
  theme,
  customColorScheme,
  visible,
}: MultiColumnModalPickerProps) => {
  const searchRef = useRef<ComponentRef<typeof TextInput>>(null);
  const { height: windowHeight } = useWindowDimensions();
  const hasMeasuredLayout = useRef(false);
  const colorScheme = useColorScheme();
  const legacyColorOverrides = {
    modalBackground: bgColor,
    border: actionButtonsBorderColor,
    searchElements: searchElementsColor,
    selectionHighlight: selectionHighlightColor,
  };
  const colors = resolvePalette({
    theme,
    customColorScheme,
    colorScheme,
    legacyColorOverrides,
  });
  const resolvedLocale = resolveLocale(locale);
  const localizedTexts = translations[resolvedLocale];
  const resolvedAcceptButtonText = acceptButtonText ?? localizedTexts.accept;
  const resolvedCancelButtonText = cancelButtonText ?? localizedTexts.cancel;
  const resolvedSearchPlaceholder =
    searchPlaceholder ?? localizedTexts.searchPlaceholder;
  const column1 = modernColumn1 ?? legacyColumns?.[0] ?? [];
  const column2 = modernColumn2 ?? legacyColumns?.[1];
  const column3 = modernColumn3 ?? legacyColumns?.[2];
  const selectedValue1 =
    modernSelectedValue1 ?? legacySelectedValues?.[0] ?? null;
  const selectedValue2 =
    modernSelectedValue2 ?? legacySelectedValues?.[1] ?? null;
  const selectedValue3 =
    modernSelectedValue3 ?? legacySelectedValues?.[2] ?? null;
  const resolvedHPadding = horizontalPadding ?? hPadding;
  const resolvedActionButtons =
    actionButtonsPosition ?? actionButtons ?? "none";
  const showSearchBar = (enableSearch || searchBar) && !column2 && !column3;
  const animation = useRef(new Animated.Value(windowHeight)).current;
  const [pickerHeight, setPickerHeight] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const columns: [PickerColumn, PickerColumn?, PickerColumn?] = [
    column1,
    column2,
    column3,
  ];
  const onValueChange1 = modernOnValueChange1 ?? (() => undefined);
  const onValueChange2 = modernOnValueChange2 ?? (() => undefined);
  const onValueChange3 = modernOnValueChange3 ?? (() => undefined);
  const selectedValues: [
    PickerValue | null,
    (PickerValue | null)?,
    (PickerValue | null)?,
  ] = [selectedValue1, selectedValue2, selectedValue3];
  const previousValues = useRef<Array<PickerValue | null>>([null, null, null]);

  const emitValueChange = (
    columnIndex: number,
    value: PickerValue | null,
    index?: number,
    legacyValuesSnapshot?: [
      PickerValue | null,
      PickerValue | null,
      PickerValue | null,
    ],
  ) => {
    modernOnValueChange?.(value, columnIndex, index);
    if (columnIndex === 0) {
      onValueChange1(value, index);
    }
    if (columnIndex === 1) {
      onValueChange2(value, index);
    }
    if (columnIndex === 2) {
      onValueChange3(value, index);
    }
    legacyOnValuesChange?.(
      legacyValuesSnapshot ?? [selectedValue1, selectedValue2, selectedValue3],
    );
  };

  useEffect(() => {
    if (visible) {
      previousValues.current = [
        selectedValue1 ?? null,
        selectedValue2 ?? null,
        selectedValue3 ?? null,
      ];
    }
  }, [visible]);

  const handleCancel = () => {
    if (showSearchBar) closeSearch();
    const restoredValues: [
      PickerValue | null,
      PickerValue | null,
      PickerValue | null,
    ] = [
      previousValues.current[0] ?? null,
      previousValues.current[1] ?? null,
      previousValues.current[2] ?? null,
    ];
    emitValueChange(0, restoredValues[0], undefined, restoredValues);
    emitValueChange(1, restoredValues[1], undefined, restoredValues);
    emitValueChange(2, restoredValues[2], undefined, restoredValues);
    onClose();
    onCancel?.();
  };

  const handleAccept = () => {
    if (showSearchBar) closeSearch();
    onAccept?.();
    onClose();
  };

  useEffect(() => {
    hasMeasuredLayout.current = false;
    if (isSearchBarFocused) {
      searchRef.current?.blur();
    }
  }, [title, searchBar, actionButtons]);

  const handleLayout = (event: LayoutChangeEvent) => {
    if (pickerHeight === 0 || !hasMeasuredLayout.current) {
      const { height: newHeight } = event.nativeEvent.layout;
      setPickerHeight(newHeight);
      hasMeasuredLayout.current = true;
    }
  };
  useEffect(() => {
    StatusBar.setHidden(isSearchBarFocused, "fade");
    return () => {
      if (isSearchBarFocused) {
        StatusBar.setHidden(false, "fade");
      }
    };
  }, [isSearchBarFocused]);

  useEffect(() => {
    const timing = Animated.timing(animation, {
      toValue: isSearchBarFocused ? 10 : windowHeight - pickerHeight - 10,
      duration: isSearchBarFocused ? 250 : 350,
      useNativeDriver: true,
    });
    timing.start();
    return () => timing.stop();
  }, [animation, isSearchBarFocused, pickerHeight, windowHeight]);

  const handleSearch = (text: string) => {
    setSearchValue(text);
    if (text === "") {
      emitValueChange(0, previousValues.current[0]);
      return;
    }

    const exactMatch = column1.find((item) => String(item.value) === text);
    if (exactMatch) {
      emitValueChange(0, exactMatch.value);
      return;
    }

    const filteredData = column1.filter((item) =>
      matchesPickerItem(item, text),
    );
    if (filteredData.length > 0) {
      filteredData.sort((a, b) => comparePickerItems(a, b, text));
      emitValueChange(0, filteredData[0].value);
      return;
    }

    emitValueChange(0, previousValues.current[0]);
  };

  const closeSearch = () => {
    searchRef.current?.blur();
    setIsSearchBarFocused(false);
    setSearchValue("");
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={handleCancel}
    >
      <Pressable style={{ flex: 1 }} onPress={handleAccept} />
      <Animated.View
        onLayout={handleLayout}
        style={[
          styles.modalMainContainer,
          {
            transform: [
              {
                translateY: animation,
              },
            ],
          },
        ]}
      >
        <View
          style={[
            styles.pickerWrapperStyle,
            {
              backgroundColor: colors.modalBackground,
            },
          ]}
        >
          <View
            style={[
              {
                borderRadius: 10,
                backgroundColor: colors.modalBackground,
              },
            ]}
          >
            {resolvedActionButtons === "top" && (
              <View
                style={[
                  styles.buttonsContainer,
                  {
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <TouchableOpacity
                  style={{ flex: 1, paddingLeft: 20 }}
                  onPress={handleCancel}
                >
                  <Text
                    style={[
                      styles.mainText,
                      {
                        color: colors.cancelButtonText,
                      },
                      cancelButtonTextStyle,
                    ]}
                  >
                    {resolvedCancelButtonText}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.acceptBtn}
                  onPress={handleAccept}
                >
                  <Text
                    style={[
                      styles.mainText,
                      {
                        color: colors.buttonText,
                      },
                      acceptButtonTextStyle,
                    ]}
                  >
                    {resolvedAcceptButtonText}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {title && (
              <View
                style={[
                  styles.titleView,
                  {
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.titleText,
                    { color: colors.secondaryText },
                    titleStyle,
                  ]}
                >
                  {title}
                </Text>
              </View>
            )}
            {showSearchBar && (
              <SearchBar
                backgroundColor={colors.searchBackground}
                clearButtonColor={colors.searchClearBackground}
                clearTextColor={colors.searchClearText}
                inputColor={colors.inputText}
                inputRef={searchRef}
                onBlur={closeSearch}
                onChangeText={handleSearch}
                onFocus={() => setIsSearchBarFocused(true)}
                placeholder={resolvedSearchPlaceholder}
                placeholderTextColor={colors.searchElements}
                searchBoxStyle={searchBoxStyle}
                searchTextStyle={searchTextStyle}
                searchValue={searchValue}
              />
            )}
            <View style={{ flexDirection: "row" }}>
              <View
                style={[
                  styles.selectionHighlight,
                  { backgroundColor: colors.selectionHighlight },
                ]}
              />
              {(resolvedHPadding || rightInfo) && (
                <View
                  style={
                    rightInfo
                      ? resolvedHPadding !== undefined && resolvedHPadding > 0
                        ? { minWidth: resolvedHPadding }
                        : { flex: 1 }
                      : { minWidth: resolvedHPadding }
                  }
                />
              )}
              <PickerColumns
                columns={columns}
                selectedValues={selectedValues}
                itemStyle={itemStyle}
                itemTextColor={colors.pickerItemText}
                onValueChanges={[
                  (value, index) => emitValueChange(0, value, index),
                  (value, index) => emitValueChange(1, value, index),
                  (value, index) => emitValueChange(2, value, index),
                ]}
              />
              {rightInfo && (
                <View style={styles.rightInfoContainer}>
                  <Text
                    style={[
                      styles.rightInfoText,
                      {
                        color: colors.rightInfoText,
                      },
                      rightInfoTextStyle,
                    ]}
                  >
                    {rightInfo}
                  </Text>
                </View>
              )}
              {resolvedHPadding !== undefined && resolvedHPadding > 0 && (
                <View style={{ minWidth: resolvedHPadding }} />
              )}
            </View>
            {resolvedActionButtons === "bottom" && (
              <TouchableOpacity
                style={[
                  styles.buttonAlt,
                  styles.acceptBtnAlt,
                  {
                    borderTopColor: colors.border,
                  },
                ]}
                onPress={handleAccept}
              >
                <Text
                  style={[
                    styles.mainText,
                    {
                      color: colors.buttonText,
                    },
                    acceptButtonTextStyle,
                  ]}
                >
                  {resolvedAcceptButtonText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {(resolvedActionButtons === "cancel" ||
          resolvedActionButtons === "bottom") && (
          <View
            style={[
              styles.buttonAltView,
              {
                backgroundColor: cancelButtonBgColor ?? colors.modalBackground,
              },
            ]}
          >
            <TouchableOpacity style={styles.buttonAlt} onPress={handleCancel}>
              <Text
                style={[
                  styles.mainText,
                  {
                    color: colors.cancelText,
                  },
                  cancelButtonTextStyle,
                ]}
              >
                {resolvedCancelButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </Modal>
  );
};

export default IOSMultiColumnModalPicker;
