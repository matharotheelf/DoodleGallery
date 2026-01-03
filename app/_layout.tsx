import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, PaperProvider, configureFonts } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import { EBGaramond_700Bold, EBGaramond_400Regular, useFonts } from '@expo-google-fonts/eb-garamond';

const fontConfig = {
  web: {
    bodyMedium: {
      fontFamily: 'EBGaramond_400Regular',
      fontWeight: 'normal',
    },
    titleLarge: {
      fontFamily: 'EBGaramond_700Bold',
      fontWeight: 'bold',
    },
  },
  ios: {
    bodyMedium: {
      fontFamily: 'EBGaramond_400Regular',
      fontWeight: 'normal',
    },
    titleLarge: {
      fontFamily: 'EBGaramond_700Bold',
      fontWeight: 'bold',
    },
  },
  android: {
    bodyMedium: {
      fontFamily: 'EBGaramond_400Regular',
      fontWeight: 'normal',
    },
    titleLarge: {
      fontFamily: 'EBGaramond_700Bold',
      fontWeight: 'bold',
    },
  }
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#808081',
    secondary: '#3E3E3F',
    tertiary: '#A9A9A9',
  },
  fonts: configureFonts({config: fontConfig, isV3: false}),
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    EBGaramond_700Bold,
    EBGaramond_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }} />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
