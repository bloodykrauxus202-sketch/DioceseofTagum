import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getSchoolById } from '@/lib/data/schools-data';

export default function SchoolEventsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id, year } = useLocalSearchParams<{ id: string; year: string }>();

  const school = getSchoolById(id ?? '');
  const yearNum = parseInt(year ?? '2026', 10);
  const events = school?.scheduleOfEvents?.[yearNum] || [];

  if (!school) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <Text className="text-gray-400 text-2xl">School not found</Text>
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
            <Text
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color: school.color }}
            >
              {school.abbreviation}
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
              className="bg-white rounded-2xl p-5 mb-4 border-l-4"
              style={{ borderLeftColor: school.color }}
            >
              <Text
                className="text-sm font-semibold uppercase tracking-wide"
                style={{ color: school.color }}
              >
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
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: school.color + '15' }}
            >
              <Calendar size={40} color={school.color} />
            </View>
            <Text className="text-gray-800 font-semibold text-xl mb-2">
              No Events Yet
            </Text>
            <Text className="text-gray-500 text-base text-center">
              Events for {year} will be displayed here once available.
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}
