import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export const globalStyles = StyleSheet.create({
    scrollView: {
        backgroundColor: COLORS.white
      },
      container: {
        flex: 1,
        backgroundColor: COLORS.white
      },
      image: (windowHeight) => ({
        height: windowHeight * 0.47,
        width: "100%",
        position: "absolute",
      }),
      form: (windowHeight) => ({
        justifyContent: 'center',
        alignItems: 'center',
        top: windowHeight * 0.20,
        width: '100%',
        height: windowHeight
      }),
      inputContainer: {
        width: '80%',
        borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        padding: 20
      },
      input: {
        height: 50,
        color: COLORS.black,
        fontFamily: 'Montserrat-Regular'
      },
      errorText: {
        color: COLORS.red,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 10
      },
      visibilityToggle: {
        position: 'absolute',
        right: 10
      },
      buttonContainer: {
        width: '80%',
        margin: 10
      },
      button: {
        borderColor: COLORS.blue,
        borderWidth: 2,
        backgroundColor: COLORS.blue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 13
      },
      buttonText: {
        fontSize: 18,
        fontFamily: "Montserrat-Bold",
        color: COLORS.white
      }
});