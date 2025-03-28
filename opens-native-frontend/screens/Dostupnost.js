import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import COLORS from "../constants/colors";
import useHttpProtected from '../hooks/useHttpProtected';
import Toast from 'react-native-toast-message';

export default function Dostupnost() {
    const { t } = useTranslation();
    const httpProtected = useHttpProtected();

    const [spaceCount, setSpaceCount] = useState("")
    const [laptopCount, setLaptopCount] = useState("")
    const [mouseCount, setMouseCount] = useState("")
    const [headphoneCount, setHeadphoneCount] = useState("")
    const [dzojstici, setDzojstici] = useState("")
    const [sonyOccupied, setSonyOccupied] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requests = [
                    httpProtected.get('/dostupnostView'),
                    httpProtected.get('/dostupnostMestoView'),
                    httpProtected.get('/oprema/dzojstik/zauzet')
                ];
                const [uredjajiData, mestaData, dzojstikZauzetData] = await Promise.all(requests);

                setSonyOccupied(dzojstikZauzetData.data);

                uredjajiData.data.forEach(item => {
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

                setSpaceCount(mestaData.data[0].slobodna_mesta);
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 400) {
                        eventEmitter.emit('LOGOUT');
                        Toast.show({
                            type: 'error',
                            text1: t('http-common.error.session.header'),
                            text2: t('http-common.error.session.text'),
                            duration: 7000
                        });
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: t('http-common.error.server.header'),
                            text2: t('http-common.error.server.text'),
                            duration: 7000
                        });
                    }
                } else {
                    Toast.show({
                        type: 'error',
                        text1: t('http-common.error.network.header'),
                        text2: t('http-common.error.network.text'),
                        duration: 7000
                    });
                }
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 10000); // 10000 milliseconds = 10 seconds
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this runs once on mount

    const getTranslationKey = (count, key) => {
        const language = i18next.language;
    
        if (language === 'sr') {
            if (count === 0) {
                return `${key}_negative`;
            } else if (count % 10 === 1 && count % 100 !== 11) {
                return `${key}_one`;
            } else if (
                count % 10 >= 2 &&
                count % 10 <= 4 &&
                (count % 100 < 12 || count % 100 > 14)
            ) {
                return `${key}_few`;
            } else {
                return `${key}_other`;
            }
        } else if (language === 'en') {
            return count === 0
                ? `${key}_negative`
                : count === 1
                ? `${key}_one`
                : `${key}_other`;
        }
    
        // fallback ako jezik nije podržan
        return `${key}_other`;
    };

    const spaceTranslation = t(getTranslationKey(spaceCount, 'dostupnost-page.text.space'), { count: spaceCount });
    const laptopTranslation = t(getTranslationKey(laptopCount, 'dostupnost-page.text.laptop'), { count: laptopCount });
    const mouseTranslation = t(getTranslationKey(mouseCount, 'dostupnost-page.text.mouse'), { count: mouseCount });
    const headphoneTranslation = t(getTranslationKey(headphoneCount, 'dostupnost-page.text.headphone'), { count: headphoneCount });

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}> {t('dostupnost-page.text.availability')} </Text>
            <View style={styles.itemContainer}>
                <View style={{ flex: 1 }}>
                    <Image source={require("../assets/images/stolica.png")} style={{ height: 55, width: 55 }} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={[styles.itemText, { backgroundColor: COLORS.green }]}>{spaceTranslation}</Text>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <View style={{ flex: 1 }}>
                    <Image source={require("../assets/images/laptop.png")} style={styles.icon} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={[styles.itemText, { backgroundColor: COLORS.red }]}>{laptopTranslation}</Text>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <View style={{ flex: 1 }}>
                    <Image source={require("../assets/images/mis.png")} style={styles.icon} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={[styles.itemText, { backgroundColor: COLORS.yellow }]}>{mouseTranslation}</Text>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <View style={{ flex: 1 }}>
                    <Image source={require("../assets/images/slusalice.png")} style={styles.icon} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={[styles.itemText, { backgroundColor: COLORS.blue }]}>{headphoneTranslation}</Text>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <View style={{ flex: 1 }}>
                    <Image source={require("../assets/images/sony.png")} style={styles.icon} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={[styles.itemText, { backgroundColor: COLORS.purple }]}>
                        {sonyOccupied ? t('dostupnost-page.text.sony_negative') : t('dostupnost-page.text.sony')}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingTop: 40,
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 50,
        marginBottom: 40,
    },
    itemContainer: {
        flexDirection: 'row',
        width: '90%',
        marginBottom: 20,
    },
    icon: {
        height: 55,
        width: 55,
    },
    itemText: {
        fontFamily: 'Montserrat-Regular',
        padding: 18,
    }
});