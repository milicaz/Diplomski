import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";

export const FontContext = createContext();

const FontContextProvider = ({ children }) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-BoldItalic': require('../assets/fonts/Montserrat-BoldItalic.ttf'),
        'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Thin': require('../assets/fonts/Montserrat-Thin.ttf'),
    });

    const [isSplashVisible, setSplashVisible] = useState(true);

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
            setSplashVisible(false);
        }
    }, [fontsLoaded]);

    return (
        <FontContext.Provider value={{ fontsLoaded, isSplashVisible }}>
            {children}
        </FontContext.Provider>
    );

}

export default FontContextProvider;