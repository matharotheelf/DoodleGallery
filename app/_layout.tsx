import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#808081',
    secondary: '#3E3E3F',
    tertiary: '#A9A9A9',
  },
};

export default function RootLayout() {
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
