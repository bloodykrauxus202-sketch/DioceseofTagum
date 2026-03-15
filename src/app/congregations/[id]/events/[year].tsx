import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getCongregationById } from '@/lib/data/congregations-data';

export default function CongregationEventsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id, year } = useLocalSearchParams<{ id: string; year: string }>();

  const congregation = getCongregationById(id ?? '');
  const yearNum = parseInt(year ?? '2026', 10);
  const events = congregation?.scheduleOfEvents?.[yearNum] || [];

  if (!congregation) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <Text className="text-gray-400 text-2xl">Congregation not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-6 px-8 py-4 bg-gray-900 rounded-full"
        >
          <Text className="text-white font-bold text-xl">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        className="bg-white border-b border-gray-200"
        style={{ paddingTop: insets.top }}
      >
        <View className="flex-row items-center px-4 py-4">
          <Pressable
            onPress={() => router.back()}
            className="p-2 active:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={28} color="#4b5563" />
          </Pressable>
          <View className="flex-1 ml-3">
            <Text className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              {congregation.acronym}
            </Text>
            <Text className="text-xl font-bold text-gray-900">
              {year} Events
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
              className="bg-white rounded-2xl p-5 mb-4 border border-gray-100"
            >
              <Text className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                {event.date}
              </Text>
              <Text className="text-xl font-bold text-gray-900 mt-2">
                {event.title}
              </Text>
              {event.description && (
                <Text className="text-lg text-gray-600 mt-2 leading-relaxed">
                  {event.description}
                </Text>
              )}
            </Animated.View>
          ))
        ) : (
          <Animated.View
            entering={FadeInDown.duration(300)}
            className="bg-white rounded-2xl p-8 items-center border border-gray-100"
          >
            <Calendar size={56} color="#d1d5db" strokeWidth={1.5} />
            <Text className="text-gray-500 text-lg mt-4 text-center">
              No events scheduled yet
            </Text>
            <Text className="text-gray-400 text-base mt-1 text-center">
              Details will be added when available
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}
