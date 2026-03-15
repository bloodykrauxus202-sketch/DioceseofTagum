import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react-native';

interface BottomNavBarProps {
  currentScreen?: string;
}

export default function BottomNavBar({ currentScreen }: BottomNavBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleHome = () => {
    router.replace('/(tabs)');
  };

  const handleNext = () => {
    // Next navigation - can be customized based on app flow
    console.log('Next pressed');
  };

  const isHome = currentScreen === 'home';

  return (
    <View
      className="md:hidden"
      style={{
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingBottom: insets.bottom > 0 ? insets.bottom + 4 : 16,
        paddingTop: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Home Button Only */}
      <Pressable
        onPress={handleHome}
        className="active:opacity-70"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 4,
          paddingHorizontal: 30,
        }}
      >
        <Home size={30} color={isHome ? '#1e3a5f' : '#6b7280'} strokeWidth={2} />
        <Text style={{ fontSize: 16, fontWeight: '600', color: isHome ? '#1e3a5f' : '#6b7280', marginTop: 2 }}>Home</Text>
      </Pressable>
    </View>
  );
}
