import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Church, Users, MapPin } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getBECParishById } from '@/lib/data/bec-data';
import BottomNavBar from '@/components/BottomNavBar';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function BECParishDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const parish = getBECParishById(id ?? '');

  if (!parish) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <Church size={56} color="#d1d5db" />
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

  const handleGKKPress = (gkkIndex: number) => {
    router.push(`/bec/${parish.id}/gkk/${gkkIndex}`);
  };

  // Group GKKs by district
  const gkksByDistrict: Record<string, typeof parish.gkks> = {};
  parish.gkks.forEach(gkk => {
    if (!gkksByDistrict[gkk.district]) {
      gkksByDistrict[gkk.district] = [];
    }
    gkksByDistrict[gkk.district].push(gkk);
  });

  const districts = Object.keys(gkksByDistrict).sort();

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
            <ChevronLeft size={44} color="#4b5563" />
          </Pressable>
          <Text className="flex-1 text-2xl font-bold text-gray-900 ml-3">
            BEC/GKK
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Parish Info */}
        <Animated.View
          entering={FadeInDown.delay(100)}
          className="bg-white rounded-2xl p-6 mb-4 items-center"
        >
          <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-4">
            <Church size={40} color="#16a34a" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 text-center">
            {parish.name}
          </Text>
          <Text className="text-xl text-gray-500 text-center mt-2">
            {parish.location}
          </Text>
        </Animated.View>

        {/* GKK Count */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          className="bg-green-50 rounded-2xl p-4 mb-4"
        >
          <View className="flex-row items-center justify-center">
            <Users size={24} color="#16a34a" />
            <Text className="text-2xl font-bold text-green-800 ml-3">
              {parish.gkks.length} BEC/GKK
            </Text>
          </View>
        </Animated.View>

        {/* GKK List */}
        {parish.gkks.length === 0 ? (
          <Animated.View
            entering={FadeInDown.delay(300)}
            className="bg-white rounded-2xl p-8 items-center"
          >
            <Users size={56} color="#d1d5db" />
            <Text className="text-2xl font-bold text-gray-400 mt-4 text-center">
              BEC/GKK Coming Soon
            </Text>
            <Text className="text-xl text-gray-400 text-center mt-2">
              BEC/GKK data will be added soon.
            </Text>
          </Animated.View>
        ) : (
          districts.map((district, districtIndex) => (
            <Animated.View
              key={district}
              entering={FadeInDown.delay(300 + districtIndex * 50)}
              className="bg-white rounded-2xl overflow-hidden mb-4"
            >
              {/* District Header */}
              <View className="bg-green-600 px-5 py-3">
                <Text className="text-2xl font-bold text-white">
                  {district}
                </Text>
                <Text className="text-xl text-green-100">
                  {gkksByDistrict[district].length} GKK{gkksByDistrict[district].length === 1 ? '' : 's'}
                </Text>
              </View>

              {/* GKKs in this district */}
              {gkksByDistrict[district].map((gkk, gkkIndex) => {
                const globalIndex = parish.gkks.findIndex(
                  g => g.name === gkk.name && g.location === gkk.location
                );
                return (
                  <Pressable
                    key={`${gkk.name}-${gkk.location}`}
                    onPress={() => handleGKKPress(globalIndex)}
                    className="p-5 border-b border-gray-100 last:border-b-0 active:bg-gray-50"
                  >
                    <Text className="text-2xl font-bold text-gray-900">
                      {gkk.name}
                    </Text>
                    <View className="flex-row items-center mt-2">
                      <MapPin size={18} color="#9ca3af" />
                      <Text className="text-xl text-gray-500 ml-2 flex-1">
                        {gkk.location}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </Animated.View>
          ))
        )}
      </ScrollView>
      <BottomNavBar />
    </View>
  );
}
