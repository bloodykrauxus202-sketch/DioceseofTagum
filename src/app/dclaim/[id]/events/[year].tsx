import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Calendar, Users } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getDclaimGroupById } from '@/lib/data/dclaim-data';

export default function DclaimEventsYearScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id, year } = useLocalSearchParams<{ id: string; year: string }>();

  const group = getDclaimGroupById(id ?? '');
  const yearNum = parseInt(year ?? '2026', 10);
  const events = group?.scheduleOfEvents?.[yearNum] ?? [];

  if (!group) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <Users size={56} color="#d1d5db" />
        <Text className="text-gray-400 text-2xl mt-4">Group not found</Text>
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
            <Text className="text-xl font-bold text-gray-900">
              {year} Events
            </Text>
            <Text className="text-base text-gray-500" numberOfLines={1}>
              {group.name}
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
              <View className="bg-white rounded-2xl p-5 mb-4">
                <Text className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  {event.date}
                </Text>
                <Text className="text-lg font-semibold text-gray-900">
                  {event.title}
                </Text>
                {event.description && (
                  <Text className="text-base text-gray-600 mt-2 leading-relaxed">
                    {event.description}
                  </Text>
                )}
              </View>
            </Animated.View>
          ))
        ) : (
          <Animated.View
            entering={FadeInDown.delay(100).duration(300)}
            className="bg-white rounded-2xl p-8 items-center"
          >
            <Calendar size={48} color="#d1d5db" strokeWidth={1.5} />
            <Text className="text-gray-400 text-lg mt-4 text-center">
              Event details will be added here when available.
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}
