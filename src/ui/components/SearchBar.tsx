import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import type {
  TextInput as TextInputComponent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import type { ComponentRef, RefObject } from "react";
import { styles } from "../../styles";

type SearchBarProps = {
  backgroundColor: string;
  clearButtonColor: string;
  clearTextColor: string;
  inputColor: string;
  placeholder: string;
  placeholderTextColor: string;
  searchValue: string;
  searchBarBorderRadius: number;
  searchClearButtonBorderRadius: number;
  searchBoxStyle?: StyleProp<ViewStyle>;
  searchTextStyle?: StyleProp<TextStyle>;
  inputRef: RefObject<ComponentRef<typeof TextInputComponent> | null>;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur: () => void;
};

export const SearchBar = ({
  backgroundColor,
  clearButtonColor,
  clearTextColor,
  inputColor,
  placeholder,
  placeholderTextColor,
  searchValue,
  searchBoxStyle,
  searchTextStyle,
  inputRef,
  searchBarBorderRadius,
  searchClearButtonBorderRadius,
  onChangeText,
  onFocus,
  onBlur,
}: SearchBarProps) => (
  <View style={styles.searchBarWrapper}>
    <View
      style={[
        styles.searchBar,
        { backgroundColor, borderRadius: searchBarBorderRadius },
        searchBoxStyle,
      ]}
    >
      <TextInput
        style={[styles.searchInput, { color: inputColor }, searchTextStyle]}
        ref={inputRef}
        maxLength={30}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        onFocus={onFocus}
        spellCheck={false}
        value={searchValue}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
      {searchValue.length > 0 && (
        <TouchableOpacity
          style={[
            styles.searchClearBtn,
            {
              backgroundColor: clearButtonColor,
              borderRadius: searchClearButtonBorderRadius,
            },
          ]}
          onPress={() => onChangeText("")}
        >
          <Text style={[styles.searchClearText, { color: clearTextColor }]}>
            X
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);
