import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, FileText } from 'lucide-react-native';
import BottomNavBar from '@/components/BottomNavBar';

export default function VaticanDocumentsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 16,
          paddingBottom: 12,
          backgroundColor: '#B8860B',
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
          <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: '700' }}>
            Vatican Documents
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, marginTop: 1 }}>
            Holy See & Vatican
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, alignItems: 'center' }}>
        <View
          style={{
            marginTop: 60,
            alignItems: 'center',
            gap: 16,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              backgroundColor: '#FEF9C3',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileText size={40} color="#B8860B" strokeWidth={1.5} />
          </View>
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827', textAlign: 'center' }}>
            Vatican Documents
          </Text>
          <Text style={{ fontSize: 19, color: '#6B7280', textAlign: 'center', lineHeight: 22 }}>
            Official documents from the Holy See and Vatican will be listed here.
          </Text>
        </View>
      </ScrollView>

      <BottomNavBar currentScreen="home" />
    </View>
  );
}
