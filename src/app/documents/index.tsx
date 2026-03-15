import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, FileText } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import BottomNavBar from '@/components/BottomNavBar';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DOCUMENT_CATEGORIES = [
  {
    id: 'vatican',
    title: 'Vatican Documents',
    description: 'Official documents from the Holy See and Vatican',
    color: '#FFD700',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    route: '/documents/vatican',
  },
  {
    id: 'cbcp',
    title: 'CBCP Documents',
    description: 'Catholic Bishops Conference of the Philippines documents',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    route: '/documents/cbcp',
  },
  {
    id: 'diocese',
    title: 'Diocese of Tagum Pastoral & Circular Letters',
    description: 'Pastoral letters and circulars from the Diocese of Tagum',
    color: '#1e3a5f',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    route: '/documents/diocese',
  },
  {
    id: 'parish',
    title: 'Parish Circulars & Announcements',
    description: 'Circulars and announcements from parishes within the diocese',
    color: '#10B981',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    route: '/documents/parish',
  },
];

export default function DocumentsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
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
          <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: '700' }}>
            Documents
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, marginTop: 1 }}>
            Diocese of Tagum
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 24,
          gap: 14,
        }}
        showsVerticalScrollIndicator={false}
      >
        {DOCUMENT_CATEGORIES.map((category, index) => (
          <AnimatedPressable
            key={category.id}
            entering={FadeInDown.delay(index * 80).springify()}
            onPress={() => router.push(category.route as any)}
            className="active:opacity-75 active:scale-98"
            style={{
              backgroundColor: category.bgColor,
              borderRadius: 16,
              borderWidth: 1.5,
              borderColor: category.borderColor,
              padding: 18,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: category.color,
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FileText size={26} color="#ffffff" strokeWidth={1.8} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#111827',
                  lineHeight: 22,
                }}
              >
                {category.title}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: '#6B7280',
                  marginTop: 4,
                  lineHeight: 18,
                }}
              >
                {category.description}
              </Text>
            </View>
            <ChevronLeft
              size={20}
              color="#9CA3AF"
              strokeWidth={2}
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </AnimatedPressable>
        ))}
      </ScrollView>

      <BottomNavBar currentScreen="home" />
    </View>
  );
}
