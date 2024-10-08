import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Text, View } from 'react-native';
import COLORS from "../constants/colors";
import httpCommon from '../http-common';

export default function Dostupnost() {
    const { t } = useTranslation();

    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-BoldItalic': require('../assets/fonts/Montserrat-BoldItalic.ttf')
    });
    
    const [spaceCount, setSpaceCount] = useState("")
    const [laptopCount, setLaptopCount] = useState("")
    const [mouseCount, setMouseCount] = useState("")
    const [headphoneCount, setHeadphoneCount] = useState("")
    const [sonyOccupied, setSonyOccupied] = useState(false)

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
        const fetchData = async () => {
            try {
                const response = await httpCommon.get('/dostupnostView');
                const responseData = response.data; // Assuming response.data is an array

                // Process the array
                responseData.forEach(item => {
                    switch (item.naziv_opreme) {
                        // case 'igrice':
                        //     setSpaceCount(item.ukupno_opreme)
                        //     break;
                        case 'laptop i punjač':
                            setLaptopCount(item.ukupno_opreme)
                            break;
                        case 'miš':
                            setMouseCount(item.ukupno_opreme)
                            break;
                        case 'slušalice':
                            setHeadphoneCount(item.ukupno_opreme)
                            break;
                        default:
                            // console.log(`Unknown equipment: ${item.naziv_opreme}`);
                            break;
                    }
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                Alert.alert('Error', 'Failed to fetch data');
            }
            try {
                const response = await httpCommon.get('/dostupnostMestoView');
                setSpaceCount(response.data[0].slobodna_mesta)
            } catch (error) {
                console.error('Error fetching mesto:', error);
                Alert.alert('Error', 'Failed to fetch mesto');
            }
        };

        fetchData(); // Fetch data initially
        // Set up interval to fetch data every 10 seconds
        const intervalId = setInterval(fetchData, 10000); // 10000 milliseconds = 10 seconds
        // Cleanup on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this runs once on mount


    if (!fontsLoaded) {
        return null;
    } else {
        SplashScreen.hideAsync();
    }

    const getSpaceTranslationKey = (count) => {
        const language = i18next.language;
        if (language === 'sr') {
            if (count % 10 === 1 && count % 100 !== 11) {
                return 'dostupnost-page.text.space_one';
            } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)) {
                return 'dostupnost-page.text.space_few';
            } else {
                return 'dostupnost-page.text.space_other';
            }
        } else if (language === 'en') {
            if (count === 1) {
                return 'dostupnost-page.text.space_one';
            } else {
                return 'dostupnost-page.text.space_other';
            }
        }
    };

    const getLaptopTranslationKey = (count) => {
        const language = i18next.language;
        if (language === 'sr') {
            if (count % 10 === 1 && count % 100 !== 11) {
                return 'dostupnost-page.text.laptop_one';
            } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)) {
                return 'dostupnost-page.text.laptop_few';
            } else {
                return 'dostupnost-page.text.laptop_other';
            }
        } else if (language === 'en') {
            if (count === 1) {
                return 'dostupnost-page.text.laptop_one';
            } else {
                return 'dostupnost-page.text.laptop_other';
            }
        }
    };

    const getMouseTranslationKey = (count) => {
        const language = i18next.language;
        if (language === 'sr') {
            if (count % 10 === 1 && count % 100 !== 11) {
                return 'dostupnost-page.text.mouse_one';
            } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)) {
                return 'dostupnost-page.text.mouse_few';
            } else {
                return 'dostupnost-page.text.mouse_other';
            }
        } else if (language === 'en') {
            if (count === 1) {
                return 'dostupnost-page.text.mouse_one';
            } else {
                return 'dostupnost-page.text.mouse_other';
            }
        }
    };

    const getHeadphoneTranslationKey = (count) => {
        const language = i18next.language
        if (language === 'sr') {
            if (count % 10 === 1 && count % 100 !== 11) {
                return 'dostupnost-page.text.headphone_one';
            } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)) {
                return 'dostupnost-page.text.headphone_few';
            } else {
                return 'dostupnost-page.text.headphone_other';
            }
        } else if (language === 'en') {
            if (count === 1) {
                return 'dostupnost-page.text.headphone_one';
            } else {
                return 'dostupnost-page.text.headphone_other';
            }
        }
    };

    // Get translations
    const spaceTranslation = t(getSpaceTranslationKey(spaceCount), { count: spaceCount });
    const laptopTranslation = t(getLaptopTranslationKey(laptopCount), { count: laptopCount });
    const mouseTranslation = t(getMouseTranslationKey(mouseCount), { count: mouseCount });
    const headphoneTranslation = t(getHeadphoneTranslationKey(headphoneCount), { count: headphoneCount });

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white }}>
            <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 50, marginBottom: 40 }}>
                {t('dostupnost-page.text.availability')}
            </Text>
            <View style={{ flexDirection: "row", width: "90%", marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    <Image source={require("../assets/stolica.png")} style={{ height: 55, width: 55 }} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={{ fontFamily: "Montserrat-Regular", backgroundColor: '#A3C57B', padding: 18 }}>
                        {spaceTranslation}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", width: "90%", marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    <Image source={require("../assets/laptop.png")} style={{ height: 55, width: 55 }} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={{ fontFamily: "Montserrat-Regular", backgroundColor: '#F56F66', padding: 18 }}>
                        {laptopTranslation}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", width: "90%", marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    <Image source={require("../assets/mis.png")} style={{ height: 55, width: 55 }} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={{ fontFamily: "Montserrat-Regular", backgroundColor: '#FBB537', padding: 18 }}>
                        {mouseTranslation}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", width: "90%", marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    <Image source={require("../assets/slusalice.png")} style={{ height: 55, width: 55 }} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={{ fontFamily: "Montserrat-Regular", backgroundColor: '#61CDCD', padding: 18 }}>
                        {headphoneTranslation}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", width: "90%", marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    <Image source={require("../assets/sony.png")} style={{ height: 55, width: 55 }} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={{ fontFamily: "Montserrat-Regular", backgroundColor: '#A18BBD', padding: 18 }}>
                        {sonyOccupied ? t('dostupnost-page.text.sony_negative') : t('dostupnost-page.text.sony')}
                    </Text>
                </View>
            </View>
        </View>
    );
}