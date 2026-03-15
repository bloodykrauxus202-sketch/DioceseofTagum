import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getMinistryById } from '@/lib/data/ministries-data';

export default function MinistryEventsYearScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id, year } = useLocalSearchParams<{ id: string; year: string }>();

  const ministry = getMinistryById(id ?? '');
  const yearNum = parseInt(year ?? '2026', 10);
  const events = ministry?.scheduleOfEvents?.[yearNum] ?? [];

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
              {year} Events
            </Text>
            <Text className="text-base" style={{ color: '#6B5344' }} numberOfLines={1}>
              {ministry.name}
            </Text>
          </View>
        </View>
      </View>

      {/* Events List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24, paddingHorizontal: 16, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {events.length > 0 ? (
          events.map((event, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 100).duration(300)}
            >
              <View
                className="rounded-2xl p-5 mb-4"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  borderWidth: 1,
                  borderColor: 'rgba(196, 165, 116, 0.25)',
                }}
              >
                <Text className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: '#8B5A2B' }}>
                  {event.date}
                </Text>
                <Text className="text-lg font-semibold" style={{ color: '#3D2914' }}>
                  {event.title}
                </Text>
                {event.description && (
                  <Text className="text-base mt-2 leading-relaxed" style={{ color: '#6B5344' }}>
                    {event.description}
                  </Text>
                )}
              </View>
            </Animated.View>
          ))
        ) : (
          <Animated.View
            entering={FadeInDown.delay(100).duration(300)}
            className="rounded-2xl p-8 items-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              borderWidth: 1,
              borderColor: 'rgba(196, 165, 116, 0.25)',
            }}
          >
            <Calendar size={48} color="#C4A574" strokeWidth={1.5} />
            <Text className="text-lg mt-4 text-center" style={{ color: '#A08060' }}>
              Event details will be added here when available.
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}
