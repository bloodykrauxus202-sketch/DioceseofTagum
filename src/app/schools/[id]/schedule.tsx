import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ChevronRight, Folder } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getSchoolById } from '@/lib/data/schools-data';

export default function SchoolScheduleScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const school = getSchoolById(id ?? '');
  const years = [2026, 2027];

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
              Schedule of Events
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
        <Text className="text-gray-500 text-base mb-4">
          Select a year to view events
        </Text>

        {years.map((year, index) => {
          const events = school.scheduleOfEvents?.[year] || [];
          return (
            <Animated.View
              key={year}
              entering={FadeInDown.delay(index * 100).duration(300)}
            >
              <Pressable
                onPress={() => router.push(`/schools/${school.id}/events/${year}`)}
                className="bg-white rounded-2xl p-5 mb-4 active:bg-gray-50"
              >
                <View className="flex-row items-center">
                  <View
                    className="w-14 h-14 rounded-xl items-center justify-center"
                    style={{ backgroundColor: school.color + '15' }}
                  >
                    <Folder size={28} color={school.color} />
                  </View>
                  <View className="flex-1 ml-4">
                    <Text className="text-3xl font-bold text-gray-900">{year}</Text>
                    <Text className="text-base text-gray-500 mt-0.5">
                      {events.length > 0
                        ? `${events.length} events`
                        : 'No events yet'}
                    </Text>
                  </View>
                  <ChevronRight size={24} color="#9ca3af" />
                </View>
              </Pressable>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}
