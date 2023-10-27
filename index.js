import React, { useEffect, useMemo, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  Platform,
  TextInput,
  Appearance,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";

/**
 * @param {Object} props
 * - Required Props:
 * - visible
 * - column1
 * - selectedValue1
 * - onValueChange1
 * - onClose
 * @param {string} [props.acceptButtonText = 'Accept']
 * - Text for the `“Accept”` button.
 * - The default value is `'Accept'`.
 * @param {object} [props.acceptButtonTextStyle]
 * - Style of the `“Accept”` button text.
 * - Accepts standard React Native style properties.
 * @param {('top'|'bottom'|'cancel'|'none')} [props.actionButtons = 'none']
 * - Visibility and position of the `“Accept”` and `“Cancel”` action buttons.
 * - The default value is `'none'`.
 * @param {string} [props.actionButtonsBorderColor]
 * - Border color of the action buttons.
 * - It is only applicable when `actionButtons` is set to `'top` or `'bottom'`.
 * - Accepts standard React Native color values.
 * @param {string} [props.bgColor]
 * - Background color of modal.
 * - Accepts standard React Native color values.
 * @param {string} [props.cancelButtonBgColor]
 * - Background color of the `“Cancel”` button that appears at the bottom of the picker.
 * - Accepts standard React Native color values.
 * @param {string} [props.cancelButtonText = 'Cancel']
 * - Text for the cancel button.
 * - The default value is `'Cancel'`.
 * @param {object} [props.cancelButtonTextStyle]
 * - Style of the `“Cancel”` button text.
 * - Accepts standard React Native style properties.
 * @param {Array} [props.column1]
 * - Data for the first column.
 * - `This is required.`
 * @param {Array} [props.column2]
 * - Data for the second column.
 * @param {Array} [props.column3]
 * - Data for the third column.
 * @param {number} [props.hPadding]
 * - Provides extra space around the picker, compensates horizontal space around selector columns.
 * @param {object} [props.itemStyle]
 * - Style of the picker items.
 * - Accepts standard React Native style properties.
 * @param {function} [props.onAccept]
 * - Callback function when `“Accept”` button is pressed.
 * @param {function} [props.onCancel]
 * - Callback function when `“Cancel”` button is pressed.
 * @param {function} props.onClose
 * - Callback function when modal is closed.
 * - `This is required.`
 * @param {function} props.onValueChange1
 * - Callback function when value in first column changes.
 * - `This is required.`
 * @param {function} [props.onValueChange2]
 * - Callback function when value in second column changes.
 * @param {function} [props.onValueChange3]
 * - Callback function when value in third column changes.
 * @param {string} [props.rightInfo]
 * - Additional information to right side of modal.
 * @param {object} [props.rightInfoTextStyle]
 * - Style of text for additional information to right side of modal.
 * - Accepts standard React Native style properties.
 * @param {boolean} [props.searchBar = false]
 * - Whether to show search bar or not.
 * - The default value is `false`.
 * @param {object} [props.searchBoxStyle]
 * - Style of search box.
 * - Accepts standard React Native style properties.
 * @param {string} [props.searchPlaceholder = 'Search here']
 * - Placeholder text for search box.
 * - The default value is `'Search here'`.
 * @param {string} [props.searchElementsColor = '#B7B7B7']
 * - Color of placeholder text and clear button in the search box.
 * - Accepts standard React Native color values.
 * - The default value is `'#B7B7B7'`.
 * @param {object} [props.searchTextStyle]
 * - Style of search text.
 * - Accepts standard React Native style properties.
 * @param {(string|number)} props.selectedValue1
 * - Selected value in first column.
 * - `This is required.`
 * @param {(string|number)} [props.selectedValue2]
 * - Selected value in second column.
 * - Can be a string or a number.
 * @param {(string|number)} [props.selectedValue3]
 * - Selected value in third column.
 * - Can be a string or a number.
 * @param {string} [props.selectionHighlightColor = '#555555']
 * - Color of the selection highlight.
 * - Accepts standard React Native color values.
 * - The default value is `'#555555'`.
 * @param {string} [props.title]
 * - Title text for modal picker.
 * @param {object} [props.titleStyle]
 * - Style of the title text.
 * - Accepts standard React Native style properties.
 * @param {boolean} props.visible
 * - Whether modal picker is visible or not.
 * - `This is required.`
 */

const MultiColumnModalPicker = ({
  acceptButtonText = "Accept",
  acceptButtonTextStyle,
  actionButtons = "none",
  actionButtonsBorderColor,
  bgColor,
  cancelButtonBgColor,
  cancelButtonText = "Cancel",
  cancelButtonTextStyle,
  column1,
  column2,
  column3,
  hPadding,
  itemStyle,
  onAccept,
  onCancel,
  onClose,
  onValueChange1,
  onValueChange2,
  onValueChange3,
  rightInfo,
  rightInfoTextStyle,
  searchBar = false,
  searchBoxStyle,
  searchElementsColor = "#B7B7B7",
  searchPlaceholder = "Search here",
  searchTextStyle,
  selectedValue1,
  selectedValue2,
  selectedValue3,
  selectionHighlightColor = "#555555",
  title,
  titleStyle,
  visible,
  ...rest
}) => {
  if (Platform.OS === "ios") {
    const searchRef = useRef();
    const windowHeight = Dimensions.get("window").height;
    const [onLayoutCalled, setOnLayoutCalled] = useState(false);
    const themeMode = Appearance.getColorScheme();
    const animation = useRef(new Animated.Value(windowHeight)).current;
    const [pickerHeight, setPickerHeight] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [isSearchBarFocus, setIsSearchBarFocus] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(searchBar);
    let columns = [column1, column2, column3];
    let selectedValues = [selectedValue1, selectedValue2, selectedValue3];
    const [previousValue, setPreviousValue] = useState([null, null, null]);

    const unrecognizedProps = useMemo(() => {
      const props = Object.keys(rest);
      return props;
    }, [JSON.stringify(rest)]);

    useEffect(() => {
      if (__DEV__ && unrecognizedProps.length > 0) {
        const isPlural = unrecognizedProps.length > 1;
        console.warn(
          `The propert${isPlural ? "ies" : "y"} "${unrecognizedProps.join(
            ", "
          )}" ${
            isPlural ? "are" : "is"
          } not recognized by MultiColumnModalPicker. \nTips: \n1. Check the spelling of the propert${
            isPlural ? "ies" : "y"
          }. \n2. The following properties were removed in version 1.0.4 of react-native-multicolumn-modal-picker: \n ['acceptButtonTextColor', 'allItemsColor', 'cancelButtonTextColor', 'col1ItemsColor', 'col2ItemsColor', 'col3ItemsColor','rightInfoSize', 'rightInfoTextColor', 'showOnTop', 'titleComponent', 'theme'] \n3. For more information, check the documentation at: https://github.com/Rio9735/react-native-multicolumn-modal-picker`
        );
      }
    }, [unrecognizedProps]);

    useEffect(() => {
      if (selectedValue1 === undefined) {
        console.warn('The prop "selectedValue1" is required');
      }
    }, [selectedValue1]);

    useEffect(() => {
      if (
        !searchBar ||
        (column1 && column2) ||
        (column2 && column3) ||
        (column1 && column3)
      ) {
        setShowSearchBar(false);
      } else setShowSearchBar(true);
    }, [searchBar, column2, column3]);

    useEffect(() => {
      if (visible) {
        setPreviousValue([
          selectedValue1 || null,
          selectedValue2 || null,
          selectedValue3 || null,
        ]);
      }
    }, [visible]);

    const onCloseHandle = () => {
      try {
        onClose();
      } catch (e) {
        __DEV__ &&
          console.error(
            "The onClose property is required in the react-native-multicolumn-modal-picker component. For more details, please refer to the documentation of react-native-multicolumn-modal-picker: https://github.com/Rio9735/react-native-multicolumn-modal-picker",
            e
          );
      }
    };

    const handleCancel = () => {
      showSearchBar && closeSearch();
      onValueChange1(previousValue[0]);
      onValueChange2 && onValueChange2(previousValue[1]);
      onValueChange3 && onValueChange3(previousValue[2]);
      onCloseHandle();
      onCancel && onCancel();
    };

    const handleAccept = () => {
      showSearchBar && closeSearch();
      onAccept && onAccept();
      onCloseHandle();
    };

    const renderPicker = () => {
      let onValueChanges = [onValueChange1, onValueChange2, onValueChange3];
      return columns.map((column, index) => {
        if (!column) {
          return null;
        }
        return (
          <Picker
            key={index}
            style={{ flex: 1 }}
            itemStyle={[
              styles.itemText,
              { color: themeMode === "light" ? "#222222" : "#FFFFFF" },
              itemStyle && itemStyle,
            ]}
            selectionColor="rgba(255,255,255,0)"
            selectedValue={selectedValues[index]}
            onValueChange={onValueChanges[index]}
          >
            {column.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        );
      });
    };

    useEffect(() => {
      setOnLayoutCalled(false);
      if (isSearchBarFocus) {
        searchRef.current.blur();
      }
    }, [title, searchBar, actionButtons]);

    const handleLayout = (event) => {
      if (pickerHeight === 0 || !onLayoutCalled) {
        const { height: newHeight } = event.nativeEvent.layout;
        setPickerHeight(newHeight);
        setOnLayoutCalled(true);
      }
    };
    useEffect(() => {
      StatusBar.setHidden(isSearchBarFocus, "fade");
      Animated.timing(animation, {
        toValue: isSearchBarFocus ? 10 : windowHeight - pickerHeight - 10,
        duration: isSearchBarFocus ? 250 : 350,
        useNativeDriver: true,
      }).start();
    }, [isSearchBarFocus, pickerHeight]);

    const ignoreSpecialChars = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const isMatch = (item, text) => {
      return (
        ignoreSpecialChars(item.label.toLowerCase()).includes(
          ignoreSpecialChars(text.toLowerCase())
        ) || item.value.includes(text)
      );
    };

    const sortResults = (a, b, text) => {
      return (
        ignoreSpecialChars(a.label.toLowerCase()).indexOf(
          ignoreSpecialChars(text.toLowerCase())
        ) -
        ignoreSpecialChars(b.label.toLowerCase()).indexOf(
          ignoreSpecialChars(text.toLowerCase())
        )
      );
    };

    const handleSearch = (text) => {
      try {
        setSearchValue(text);
        if (text === "") {
          onValueChange1(previousValue[0]);
        } else {
          const exactMatch = column1.find((item) => item.value === text);
          if (exactMatch) {
            onValueChange1(exactMatch.value);
          } else {
            const filteredData = column1.filter((item) => isMatch(item, text));
            if (filteredData.length > 0) {
              filteredData.sort((a, b) => sortResults(a, b, text));
              onValueChange1(filteredData[0].value);
            } else {
              onValueChange1(previousValue[0]);
            }
          }
        }
      } catch (error) {
        __DEV__ &&
          console.error("An error occurred during the search: ", error);
      }
    };

    const closeSearch = () => {
      searchRef.current?.blur && searchRef.current.blur();
      setIsSearchBarFocus(false);
      setSearchValue("");
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
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
                backgroundColor: themeMode === "light" ? "#F6F6F6" : "#333333",
              },
            ]}
          >
            <View
              style={[
                {
                  borderRadius: 10,
                  backgroundColor: bgColor
                    ? bgColor
                    : themeMode === "light"
                    ? "#F6F6F6"
                    : "#333333",
                },
              ]}
            >
              {actionButtons === "top" && (
                <View
                  style={[
                    styles.buttonsContainer,
                    {
                      borderBottomColor: actionButtonsBorderColor
                        ? actionButtonsBorderColor
                        : themeMode === "light"
                        ? "#BBBBBB"
                        : "#717171",
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
                          color: themeMode === "light" ? "#555555" : "#FFFFFF",
                        },
                        cancelButtonTextStyle && cancelButtonTextStyle,
                      ]}
                    >
                      {cancelButtonText}
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
                          color: themeMode === "light" ? "#444444" : "#FFFFFF",
                        },
                        acceptButtonTextStyle && acceptButtonTextStyle,
                      ]}
                    >
                      {acceptButtonText}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {title && (
                <View
                  style={[
                    styles.titleView,
                    {
                      borderBottomColor: actionButtonsBorderColor
                        ? actionButtonsBorderColor
                        : themeMode === "light"
                        ? "#BBBBBB"
                        : "#717171",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.titleText,
                      { color: themeMode === "light" ? "#888888" : "#B2B2B2" },
                      titleStyle && titleStyle,
                    ]}
                  >
                    {title}
                  </Text>
                </View>
              )}
              {showSearchBar && (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={[
                      styles.searchBar,
                      {
                        backgroundColor:
                          themeMode === "dark"
                            ? "rgba(222,222,222,0.1)"
                            : "rgba(1,1,1,0.1)",
                      },
                      searchBoxStyle && searchBoxStyle,
                    ]}
                  >
                    <TextInput
                      style={[
                        styles.searchInput,
                        {
                          color: themeMode === "dark" ? "#FFFFFF" : "#222222",
                        },
                        searchTextStyle && searchTextStyle,
                      ]}
                      ref={searchRef}
                      maxLength={30}
                      placeholderTextColor={searchElementsColor}
                      placeholder={searchPlaceholder}
                      onFocus={() => setIsSearchBarFocus(true)}
                      spellCheck={false}
                      value={searchValue}
                      onChangeText={handleSearch}
                      onBlur={closeSearch}
                    />
                    {searchValue.length > 0 && (
                      <TouchableOpacity
                        style={[
                          styles.searchClearBtn,
                          {
                            backgroundColor:
                              searchElementsColor !== "#B7B7B7"
                                ? searchElementsColor
                                : themeMode === "dark"
                                ? "rgba(255,255,255,0.5)"
                                : "rgba(1,1,1,0.5)",
                          },
                        ]}
                        onPress={() => {
                          setSearchValue("");
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "800",
                            color: bgColor
                              ? bgColor
                              : themeMode === "dark"
                              ? "rgba(1,1,1,0.3)"
                              : "rgba(255,255,255,0.3)",
                          }}
                        >
                          X
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
              <View style={{ flexDirection: "row" }}>
                <View
                  style={[
                    styles.selectionHighlight,
                    { backgroundColor: selectionHighlightColor },
                  ]}
                />
                {(hPadding || rightInfo) && (
                  <View
                    style={
                      rightInfo
                        ? hPadding !== null && rightInfo > 0
                          ? { minWidth: hPadding }
                          : { flex: 1 }
                        : { minWidth: hPadding }
                    }
                  />
                )}
                {renderPicker()}
                {rightInfo && (
                  <View style={styles.rightInfoContainer}>
                    <Text
                      style={[
                        styles.rightInfoText,
                        {
                          color: themeMode === "light" ? "#444444" : "#B2B2B2",
                        },
                        rightInfoTextStyle && rightInfoTextStyle,
                      ]}
                    >
                      {rightInfo}
                    </Text>
                  </View>
                )}
                {hPadding > 0 && <View style={{ minWidth: hPadding }} />}
              </View>
              {actionButtons === "bottom" && (
                <TouchableOpacity
                  style={[
                    styles.buttonAlt,
                    styles.acceptBtnAlt,
                    {
                      borderTopColor: actionButtonsBorderColor
                        ? actionButtonsBorderColor
                        : themeMode === "light"
                        ? "#BBBBBB"
                        : "#717171",
                    },
                  ]}
                  onPress={handleAccept}
                >
                  <Text
                    style={[
                      styles.mainText,
                      {
                        color: themeMode === "light" ? "#444444" : "#FFFFFF",
                      },
                      acceptButtonTextStyle && acceptButtonTextStyle,
                    ]}
                  >
                    {acceptButtonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {(actionButtons === "cancel" || actionButtons === "bottom") && (
            <View
              style={[
                styles.buttonAltView,
                {
                  backgroundColor: cancelButtonBgColor
                    ? cancelButtonBgColor
                    : themeMode === "light"
                    ? "#F6F6F6"
                    : "#333333",
                },
              ]}
            >
              <TouchableOpacity style={styles.buttonAlt} onPress={handleCancel}>
                <Text
                  style={[
                    styles.mainText,
                    {
                      color: "#D84D46",
                    },
                    cancelButtonTextStyle && cancelButtonTextStyle,
                  ]}
                >
                  {cancelButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </Modal>
    );
  } else if (__DEV__) {
    console.warn(
      "Thank you for using react-native-multicolumn-modal-picker! Please note that it is currently only available for iOS. I am considering making it compatible with Android as well. Your opinion is important to me! If you find it useful and would like to see Android optimization, please vote here: [https://docs.google.com/forms/d/e/1FAIpQLSd3CWTSYT7DJcdCAMP_pE5IG8DrHc0QE2q42jden6JhgyP2PA/viewform?usp=sf_link]. Stay tuned for upcoming updates!"
    );
  }
};

MultiColumnModalPicker.propTypes = {
  acceptButtonText: PropTypes.string,
  acceptButtonTextStyle: PropTypes.object,
  actionButtons: PropTypes.oneOf(["top", "bottom", "cancel", "none"]),
  actionButtonsBorderColor: PropTypes.string,
  bgColor: PropTypes.string,
  cancelButtonBgColor: PropTypes.string,
  cancelButtonText: PropTypes.string,
  cancelButtonTextStyle: PropTypes.object,
  column1: PropTypes.array.isRequired,
  column2: PropTypes.array,
  column3: PropTypes.array,
  hPadding: PropTypes.number,
  itemStyle: PropTypes.object,
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  onValueChange1: PropTypes.func.isRequired,
  onValueChange2: PropTypes.func,
  onValueChange3: PropTypes.func,
  rightInfo: PropTypes.string,
  rightInfoTextStyle: PropTypes.object,
  searchBar: PropTypes.bool,
  searchBoxStyle: PropTypes.object,
  searchPlaceholder: PropTypes.string,
  searchElementsColor: PropTypes.string,
  searchTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedValue1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedValue2: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedValue3: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectionHighlightColor: PropTypes.string,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  visible: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: 18,
  },
  titleText: {
    textAlign: "center",
    fontSize: 15,
  },
  itemText: {
    fontSize: 18,
  },
  rightInfoContainer: {
    minWidth: 100,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 30,
  },
  rightInfoText: {
    fontSize: 18,
  },
  modalMainContainer: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 10,
  },
  pickerWrapperStyle: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  buttonsContainer: {
    minHeight: 55,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
  },
  acceptBtn: {
    flex: 1,
    paddingRight: 20,
    alignItems: "flex-end",
  },
  buttonAltView: {
    minHeight: 55,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  buttonAlt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptBtnAlt: {
    minHeight: 55,
    borderTopWidth: 0.5,
  },
  titleView: {
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    minHeight: 40,
    fontSize: 18,
  },
  searchClearBtn: {
    marginLeft: 5,
    minHeight: 20,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  selectionHighlight: {
    width: "94%",
    opacity: 0.3,
    minHeight: 40,
    top: "50%",
    left: "3%",
    transform: [{ translateY: -20 }],
    borderRadius: 10,
    position: "absolute",
  },
});

export default MultiColumnModalPicker;
