import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import BottomNavBar from '@/components/BottomNavBar';

const PASTORAL_IMAGE = require('@/assets/images/pastoral.jpg');

export default function PastoralScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 16,
          paddingBottom: 12,
          backgroundColor: '#1e3a5f',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          className="active:opacity-70"
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: 'rgba(255,255,255,0.15)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronLeft size={22} color="#ffffff" strokeWidth={2.5} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '700' }}>
            Pastoral
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 1 }}>
            Diocese of Tagum
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, alignItems: 'center' }}>
        <View
          style={{
            marginTop: 40,
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Image
            source={PASTORAL_IMAGE}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#111827', textAlign: 'center' }}>
            Pastoral
          </Text>
          <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22 }}>
            Pastoral programs and initiatives of the Diocese of Tagum will be listed here.
          </Text>
        </View>
      </ScrollView>

      <BottomNavBar currentScreen="home" />
    </View>
  );
}
