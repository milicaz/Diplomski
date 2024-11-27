import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import COLORS from '../constants/colors';
import { FontContext } from '../contexts/FontContext';

const LoadingWrapper = ({ children }) => {
    const { fontsLoaded, isSplashVisible } = useContext(FontContext);

    if (isSplashVisible || !fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.blue} />
            </View>
        );
    }

    return <>{children}</>;
};

export default LoadingWrapper;
