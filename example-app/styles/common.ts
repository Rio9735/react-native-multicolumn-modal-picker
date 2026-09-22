import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F3EF",
  },
  homeContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  homeHeader: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  homeTitle: {
    color: "#17212B",
    fontSize: 28,
    fontWeight: "800",
  },
  homeSubtitle: {
    maxWidth: 290,
    marginTop: 5,
    color: "#687178",
    fontSize: 16,
  },
  buttonGroup: {
    gap: 20,
  },
  exampleItem: {
    minHeight: 126,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderColor: "#E8E5DF",
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#17212B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  exampleLabel: {
    marginBottom: 12,
    color: "#9A9B98",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
  },
});
