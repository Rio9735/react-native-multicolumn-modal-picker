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
    borderRadius: 100,
  },
  searchClearText: {
    fontSize: 14,
    fontWeight: "800",
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
