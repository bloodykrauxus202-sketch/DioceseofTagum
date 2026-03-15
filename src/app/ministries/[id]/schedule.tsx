import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ChevronRight, Folder } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getMinistryById } from '@/lib/data/ministries-data';

export default function MinistryScheduleScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const ministry = getMinistryById(id ?? '');
  const years = [2026, 2027];

  if (!ministry) {
    return (
      <View className="flex-1 items-center justify-center" style={{ paddingTop: insets.top, backgroundColor: '#F5F1EB' }}>
        <Text style={{ fontSize: 52, color: '#8B5A2B', opacity: 0.3 }}>✝</Text>
        <Text style={{ color: '#8B7355', fontSize: 24, marginTop: 16 }}>Ministry not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-6 px-8 py-4 rounded-full"
          style={{ backgroundColor: '#3D2914' }}
        >
          <Text className="text-white font-bold text-xl">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: '#F5F1EB' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#F5F1EB',
          paddingTop: insets.top,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(139, 90, 43, 0.15)',
        }}
      >
        <View className="flex-row items-center px-4 py-4">
          <Pressable
            onPress={() => router.back()}
            className="p-2 active:opacity-70 rounded-full"
          >
            <ChevronLeft size={28} color="#3D2914" />
          </Pressable>
          <View className="flex-1 ml-3">
            <Text className="text-xl font-bold" style={{ color: '#3D2914' }}>
              Schedule of Events
            </Text>
            <Text className="text-base" style={{ color: '#6B5344' }} numberOfLines={1}>
              {ministry.name}
            </Text>
          </View>
        </View>
      </View>

      {/* Year Folders */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24, paddingHorizontal: 16, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {years.map((year, index) => (
          <Animated.View
            key={year}
            entering={FadeInDown.delay(index * 100).duration(300)}
          >
            <Pressable
              onPress={() => router.push(`/ministries/${ministry.id}/events/${year}`)}
              className="rounded-2xl p-5 mb-4 active:opacity-80"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderWidth: 1,
                borderColor: 'rgba(196, 165, 116, 0.25)',
              }}
            >
              <View className="flex-row items-center">
                <View
                  className="w-14 h-14 rounded-xl items-center justify-center"
                  style={{ backgroundColor: 'rgba(139, 90, 43, 0.1)' }}
                >
                  <Folder size={28} color="#8B5A2B" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-3xl font-bold" style={{ color: '#3D2914' }}>{year}</Text>
                  <Text className="text-base mt-0.5" style={{ color: '#8B7355' }}>View events</Text>
                </View>
                <ChevronRight size={24} color="#C4A574" />
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}
