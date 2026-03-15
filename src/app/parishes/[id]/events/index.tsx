import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getParishById } from '@/lib/data/parish-directory';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ParishEventsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const parish = getParishById(id ?? '');

  if (!parish) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <Calendar size={56} color="#d1d5db" />
        <Text className="text-gray-400 text-2xl mt-4">Parish not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-6 px-8 py-4 bg-gray-900 rounded-full"
        >
          <Text className="text-white font-bold text-xl">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  // Available years for events
  const years = ['2026', '2027'];

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
          <Text className="flex-1 text-2xl font-bold text-gray-900 ml-3">
            Parish Events
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Parish Name */}
        <Animated.View
          entering={FadeInDown.delay(100)}
          className="bg-white rounded-2xl p-5 mb-4"
        >
          <Text className="text-2xl font-bold text-gray-900 text-center">
            {parish.name}
          </Text>
          <Text className="text-lg text-gray-500 text-center mt-2">
            Select a year to view events
          </Text>
        </Animated.View>

        {/* Year Selection */}
        {years.map((year, index) => (
          <AnimatedPressable
            key={year}
            entering={FadeInDown.delay(200 + index * 100)}
            onPress={() => router.push(`/parishes/${id}/events/${year}`)}
            className="bg-white rounded-2xl p-5 mb-3 active:bg-gray-50 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="w-14 h-14 rounded-full bg-blue-100 items-center justify-center mr-4">
                <Calendar size={28} color="#3b82f6" />
              </View>
              <Text className="text-3xl font-bold text-gray-900">{year}</Text>
            </View>
            <Text className="text-lg text-blue-500 font-semibold">View Events</Text>
          </AnimatedPressable>
        ))}

        {/* Coming Soon Note */}
        <Animated.View
          entering={FadeInDown.delay(400)}
          className="bg-gray-100 rounded-2xl p-5 mt-4"
        >
          <Text className="text-lg text-gray-500 text-center italic">
            Events data will be updated regularly
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
