import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainText: {
    fontSize: 18,
  },
  titleText: {
    textAlign: "center",
    fontSize: 15,
  },
  rightInfoContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    minWidth: 100,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 30,
  },
  rightInfoText: {
    fontSize: 18,
  },
  modalMainContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFill,
  },
  pickerWrapperStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonsContainer: {
    minHeight: 55,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  acceptBtn: {
    flex: 1,
    paddingRight: 20,
    alignItems: "flex-end",
  },
  topCancelButton: {
    flex: 1,
    paddingLeft: 20,
  },
  buttonAltView: {
    minHeight: 55,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  buttonAlt: {
    alignSelf: "stretch",
    minHeight: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptBtnAlt: {
    minHeight: 55,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  titleView: {
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pickerContentRow: {
    position: "relative",
    flexDirection: "row",
    height: 216,
    alignItems: "center",
  },
  pickerColumnsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  selectionHighlight: {
    position: "absolute",
    top: "50%",
    marginTop: -20,
    left: "5%",
    width: "90%",
    height: 40,
    opacity: 0.3,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
    paddingHorizontal: 15,
  },
  searchBarWrapper: {
    alignItems: "center",
    justifyContent: "center",
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
  },
  searchClearText: {
    fontSize: 14,
    fontWeight: "800",
  },
});
