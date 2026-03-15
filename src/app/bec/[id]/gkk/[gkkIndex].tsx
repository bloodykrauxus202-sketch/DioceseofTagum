import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Users, MapPin, Home } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getBECParishById } from '@/lib/data/bec-data';

export default function GKKDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id, gkkIndex } = useLocalSearchParams<{ id: string; gkkIndex: string }>();

  const parish = getBECParishById(id ?? '');
  const gkk = parish?.gkks[Number(gkkIndex)];

  if (!parish || !gkk) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <Users size={56} color="#d1d5db" />
        <Text className="text-gray-400 text-xl mt-4">GKK not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-6 px-8 py-4 bg-gray-900 rounded-full"
        >
          <Text className="text-white font-bold text-lg">Go Back</Text>
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
          <Text className="flex-1 text-xl font-bold text-gray-900 ml-3">
            GKK Details
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* GKK Info */}
        <Animated.View
          entering={FadeInDown.delay(100)}
          className="bg-white rounded-2xl p-6 mb-4 items-center"
        >
          <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-4">
            <Users size={40} color="#16a34a" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 text-center">
            {gkk.name}
          </Text>
          <View className="bg-green-100 px-4 py-2 rounded-full mt-3">
            <Text className="text-lg text-green-700 font-semibold">
              {gkk.district}
            </Text>
          </View>
        </Animated.View>

        {/* Location */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          className="bg-white rounded-2xl p-5 mb-4"
        >
          <View className="flex-row">
            <MapPin size={24} color="#16a34a" className="mt-0.5 flex-shrink-0" />
            <View className="flex-1 ml-3">
              <Text className="text-lg text-gray-500 mb-1">Location</Text>
              <Text className="text-xl text-gray-900 font-semibold">{gkk.location}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Parish */}
        <Animated.View
          entering={FadeInDown.delay(300)}
          className="bg-white rounded-2xl p-5 mb-4"
        >
          <View className="flex-row">
            <Home size={24} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
            <View className="flex-1 ml-3">
              <Text className="text-lg text-gray-500 mb-1">Parish</Text>
              <Text className="text-xl text-gray-900 font-semibold">{parish.name}</Text>
              <Text className="text-lg text-gray-500 mt-1">{parish.location}</Text>
            </View>
          </View>
        </Animated.View>

        {/* More Details Coming Soon */}
        <Animated.View
          entering={FadeInDown.delay(400)}
          className="bg-gray-100 rounded-2xl p-6 items-center"
        >
          <Text className="text-lg text-gray-500 text-center italic">
            More details will be added soon.
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
