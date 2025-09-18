import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { scale, verticalScale } from "react-native-size-matters";
import COLORS from "../constants/colors";
//import { getFontSize, scaleSize } from "./responsive";

export const globalStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
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
    // borderWidth: scaleSize(1),
    borderWidth: scale(1),
    // height: scaleSize(50),
    height: verticalScale(45),
    justifyContent: "center",
    // paddingHorizontal: scaleSize(20),
    paddingHorizontal: scale(10),
  },
  input: {
    height: verticalScale(45),
    color: COLORS.black,
    fontFamily: "Montserrat-Regular",
    fontSize: RFValue(12),
  },
  errorText: {
    color: COLORS.red,
    fontFamily: "Montserrat-SemiBold",
    fontSize: RFValue(12),
    marginBottom: verticalScale(8),
  },
  visibilityToggle: {
    position: "absolute",
    right: scale(10),
  },
  buttonContainer: {
    width: "80%",
    margin: scale(10),
  },
  button: {
    borderColor: COLORS.blue,
    borderWidth: scale(2),
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(12),
  },
  buttonText: {
    fontSize: RFValue(15),
    fontFamily: "Montserrat-Bold",
    color: COLORS.white,
  },
});
