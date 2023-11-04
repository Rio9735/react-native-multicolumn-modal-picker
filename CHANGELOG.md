# Changelog

## [1.0.9] - 2023-11-07

### Changes

* Adjustments were made to improve compatibility and performance.

### Notes

* Documentation was improved.

## [1.0.8] - 2023-11-04

### Added

* Added `postinstall` script to automatically install the peer dependency `@react-native-picker/picker` using `npm`, `expo`, or `yarn`, depending on the package manager the user is using to install `react-native-multicolumn-modal-picker`.

### Notes

* Documentation was improved.
  
## [1.0.7] - 2023-10-30

### Changes

* The dependency `@react-native-picker/picker` has been moved to peerDependencies to enhance the flexibility of the package, allowing compatibility with any version of `@react-native-picker/picker`. This gives users greater control over dependency versions. Additionally, if `npm v7` or higher is used, `@react-native-picker/picker` will automatically install if it is not present in the project, simplifying dependency management.

* Documentation was improved.

## [1.0.6] - 2023-10-26

### Notes

* Significant bug from version `1.0.5` has been fixed.

## [1.0.5] - 2023-10-26

### Changes

* Performance adjustments and minor corrections.

### Added

* New property `actionButtons` has been added. This property controls both the visibility and the position of the “Accept” and “Cancel” action buttons. It supports several values including `"none"`, `"cancel"`, `"top"`, and `"bottom"`. For more details, please refer to the [documentation](./README.md#general-properties).
* New property `actionButtonsBorderColor` has been added. This property allows you to set the border color of the action buttons.
* `prop-types` dependency for runtime prop type validation, enhancing error detection and code quality. It also eases component implementation by providing autocomplete with a brief description of each prop and its data type.

### Modified

* The property name `extraView` has been changed to `hPadding` for improved clarity and consistency in property naming.
* Property `searchPlaceholderTextColor` has been changed to `searchElementsColor`. The new property `searchElementsColor`, in addition to defining the color of the search bar placeholder, also defines the color of the clear button in the search bar.
* Improved the performance of the search bar focus and blur animations in the selector by using the native driver. This change provides a smoother animation experience.

### Removed

* The `showActionButtons` and `showCancelButton` properties have been removed. The functionality of these properties has been absorbed by the new `actionButtons` property.

### Package Experience Enhancements

* New `postinstall` message in `package.json`.
* New “Do you like our package?” section in the documentation.
* Changelog is now located in `CHANGELOG.md` and referenced in the package documentation.

### Notes

 These changes provide more flexibility in controlling the visibility and position of the action buttons, making it easier to customize the user interface according to your needs.

## [1.0.4] - 2023-10-22

### Changes

* Discontinued support for versions prior to `1.0.4`. Developers are encouraged to update to the latest version. Thanks for understanding.
* Limited package use to `iOS` only. This decision was made to prevent potential errors and dissatisfaction for developers using the package for `Android` applications. For more details see the [Compatibility](./README.md#compatibility) section in the documentation.
* Important performance adjustments and minor corrections.

### Added

* Implemented the search bar in the selector. [See Example 3](./README.md#3-single-column-picker-with-search-bar).
* New properties were added for the [search bar](./README.md#search-bar-related-properties-the-use-of-the-search-bar-is-completely-optional-it-can-only-be-used-in-conjunction-with-a-single-column-picker-the-search-bar-should-be-combined-with-column1) (`searchBar`, `searchBoxStyle`, `searchPlaceholder`, `searchPlaceholderTextColor`, `searchTextStyle`). In addition, the properties `acceptButtonTextStyle`, `cancelButtonBgColor`, `cancelButtonTextStyle`, `itemStyle`, `rightInfoTextStyle`, `showActionButtons`, `showCancelButton` and `titleStyle` were incorporated to provide greater flexibility in other aspects of the user interface.

### Modified

* The property name `highlightSelectionColor` has been changed to `selectionHighlightColor` for improved clarity and consistency in property naming.

### Removed

* Removed properties: `acceptButtonTextColor`, `allItemsColor`, `cancelButtonTextColor`, `col1ItemsColor`, `col2ItemsColor`, `col3ItemsColor`, `rightInfoSize`, `rightInfoTextColor`, `showOnTop`, `titleComponent`, `theme`.

## [1.0.3] - 2023-10-17

### Changes

* Minor bug fixes were made.
* Adjustments were made to improve compatibility and performance.
* Documentation was improved.

## [1.0.2] - 2023-10-17

### Changes

* Minor bug fixes were made.
* Adjustments were made to improve compatibility and performance.
* Documentation was improved.

## [1.0.1] - 2023-10-16

### Changes

* Minor bug fixes were made.
* Adjustments were made to improve compatibility and performance.
* Documentation was improved.

## [1.0.0] - 2023-10-15

### Added

* Creation of the package ‘react-native-multicolumn-modal-picker’, a highly customizable React Native component for the ‘iOS’ platform that allows you to configure up to 3 selection columns in the same picker.
* Inclusion of the dependency ‘@react-native-picker/picker’ which is automatically installed with my package.
* Compatibility with existing React Native projects, whether you’re using ‘Expo’ or pure ‘React Native’.

## Do you like this package?

Thank you for using my package! Your support is greatly appreciated and it motivates me to continue improving and adding new features. If you find my package useful, please consider giving it a :star: on GitHub. This lets me know that I’m on the right track and encourages me to keep going.

[Give it a star!](https://github.com/Rio9735/react-native-multicolumn-modal-picker)
