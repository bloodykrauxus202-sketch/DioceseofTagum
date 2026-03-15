import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ChevronRight, Folder, Users } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getDclaimGroupById } from '@/lib/data/dclaim-data';

export default function DclaimScheduleScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const group = getDclaimGroupById(id ?? '');
  const years = [2026, 2027];

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
              Schedule of Events
            </Text>
            <Text className="text-base text-gray-500" numberOfLines={1}>
              {group.name}
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
              onPress={() => router.push(`/dclaim/${group.id}/events/${year}`)}
              className="bg-white rounded-2xl p-5 mb-4 active:bg-gray-50"
            >
              <View className="flex-row items-center">
                <View className="w-14 h-14 bg-blue-100 rounded-xl items-center justify-center">
                  <Folder size={28} color="#3b82f6" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-3xl font-bold text-gray-900">{year}</Text>
                  <Text className="text-base text-gray-500 mt-0.5">View events</Text>
                </View>
                <ChevronRight size={24} color="#9ca3af" />
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}
