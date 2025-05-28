import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { getFontSize, scaleSize } from "./responsive";

export const globalStyles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  image: (windowHeight) => ({
    height: windowHeight * 0.47,
    width: "100%",
    position: "absolute",
  }),
  form: (windowHeight) => ({
    justifyContent: "center",
    alignItems: "center",
    top: windowHeight * 0.2,
    width: "100%",
    height: windowHeight,
  }),
  inputContainer: {
    width: "80%",
    borderWidth: scaleSize(1),
    height: scaleSize(50),
    justifyContent: "center",
    paddingHorizontal: scaleSize(20),
  },
  input: {
    height: scaleSize(50),
    color: COLORS.black,
    fontFamily: "Montserrat-Regular",
    fontSize: getFontSize(12),
  },
  errorText: {
    color: COLORS.red,
    fontFamily: "Montserrat-SemiBold",
    fontSize: getFontSize(12),
    marginBottom: scaleSize(10),
  },
  visibilityToggle: {
    position: "absolute",
    right: scaleSize(10),
  },
  buttonContainer: {
    width: "80%",
    margin: scaleSize(10),
  },
  button: {
    borderColor: COLORS.blue,
    borderWidth: scaleSize(2),
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scaleSize(13),
  },
  buttonText: {
    fontSize: getFontSize(15),
    fontFamily: "Montserrat-Bold",
    color: COLORS.white,
  },
});
