import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/lib/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { AuthProvider } from '@/lib/auth-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { usePathname } from 'expo-router';
import DesktopTopNav from '@/components/DesktopTopNav';
import { View } from 'react-native';
import { useFonts, GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';
import { DancingScript_400Regular, DancingScript_700Bold } from '@expo-google-fonts/dancing-script';

export const unstable_settings = {
  initialRouteName: 'welcome',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav({ colorScheme }: { colorScheme: 'light' | 'dark' | null | undefined }) {
  const pathname = usePathname();
  const isWelcomeScreen = pathname === '/welcome' || pathname === '/';

  useEffect(() => {
    // Hide splash screen after component mounts
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className="flex-1 bg-white">
        {!isWelcomeScreen && <DesktopTopNav />}
        <View className={`flex-1 ${!isWelcomeScreen ? 'md:max-w-7xl md:mx-auto md:w-full' : ''}`}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </View>
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    GreatVibes_400Regular,
    DancingScript_400Regular,
    DancingScript_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <StatusBar style="dark" />
            <RootLayoutNav colorScheme={colorScheme} />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryClientProvider>
  );
}
