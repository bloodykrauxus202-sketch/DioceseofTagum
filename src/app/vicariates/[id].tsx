import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Church,
  User,
  MapPin,
  Calendar,
  PartyPopper,
  Users,
  FileText,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';
import { getVicariateById, VicariateParish } from '@/lib/data/vicariates-data';
import { parishes, clergy } from '@/lib/data/parish-directory';

export default function VicariateDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [expandedParishes, setExpandedParishes] = useState<Set<number>>(new Set());

  const vicariate = getVicariateById(Number(id) || 0);

  if (!vicariate) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <Church size={56} color="#d1d5db" />
        <Text className="text-gray-400 text-2xl mt-4">Vicariate not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-6 px-8 py-4 bg-gray-900 rounded-full"
        >
          <Text className="text-white font-bold text-xl">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const toggleParish = (index: number) => {
    setExpandedParishes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Find matching parish in parish directory for navigation
  const findMatchingParish = (parishName: string) => {
    return parishes.find(p =>
      p.name.toLowerCase().includes(parishName.toLowerCase()) ||
      parishName.toLowerCase().includes(p.name.toLowerCase())
    );
  };

  const handleParishPress = (parish: VicariateParish) => {
    const matchingParish = findMatchingParish(parish.name);
    if (matchingParish) {
      router.push(`/parishes/${matchingParish.id}`);
    }
  };

  // Find matching clergy by priest name
  const findMatchingClergy = (priestName: string) => {
    return clergy.find(c =>
      c.name.toLowerCase().includes(priestName.toLowerCase()) ||
      priestName.toLowerCase().includes(c.name.toLowerCase())
    );
  };

  const handlePriestPress = (priestName: string) => {
    const matchingClergy = findMatchingClergy(priestName);
    if (matchingClergy) {
      router.push(`/clergy/${matchingClergy.id}`);
    }
  };

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
            {vicariate.shortName}
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Vicariate Name & Icon */}
        <Animated.View
          entering={FadeInDown.delay(100)}
          className="bg-white rounded-2xl p-6 mb-4 items-center"
        >
          <View className="w-24 h-24 rounded-full bg-amber-100 items-center justify-center mb-4">
            <Church size={48} color="#d97706" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 text-center">
            {vicariate.name}
          </Text>
        </Animated.View>

        {/* Vicar Forane */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          className="bg-white rounded-2xl p-5 mb-4"
        >
          <View className="flex-row">
            <User size={24} color="#3b82f6" className="mt-0.5 flex-shrink-0" />
            <View className="flex-1 ml-3">
              <Text className="text-lg text-gray-500 mb-1">Vicar Forane</Text>
              <Text className="text-2xl text-gray-900 font-bold">{vicariate.vicarForane}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Parishes Section */}
        <Animated.View
          entering={FadeInDown.delay(300)}
          className="bg-white rounded-2xl overflow-hidden mb-4"
        >
          <View className="p-5 border-b border-gray-100">
            <View className="flex-row items-center">
              <Church size={24} color="#9ca3af" />
              <Text className="text-2xl font-bold text-gray-900 ml-3">
                Parishes ({vicariate.parishes.length})
              </Text>
            </View>
          </View>

          {vicariate.parishes.map((parish, index) => {
            const isExpanded = expandedParishes.has(index);
            const matchingParish = findMatchingParish(parish.name);

            return (
              <View key={index} className="border-b border-gray-100 last:border-b-0">
                <Pressable
                  onPress={() => toggleParish(index)}
                  className="p-5 flex-row items-center justify-between active:bg-gray-50"
                >
                  <View className="flex-1 mr-3">
                    <Text className="text-2xl text-gray-900 font-bold">{parish.name}</Text>
                    <Text className="text-xl text-gray-500 mt-1">{parish.location}</Text>
                  </View>
                  {isExpanded ? (
                    <ChevronUp size={24} color="#9ca3af" />
                  ) : (
                    <ChevronDown size={24} color="#9ca3af" />
                  )}
                </Pressable>

                {/* Expanded Parish Details */}
                {isExpanded && (
                  <View className="px-5 pb-5 bg-gray-50">
                    {/* Parish Priest - Clickable */}
                    {(() => {
                      const priestClergy = findMatchingClergy(parish.priest);
                      return (
                        <Pressable
                          onPress={priestClergy ? () => handlePriestPress(parish.priest) : undefined}
                          className={`flex-row items-start mb-3 ${priestClergy ? 'active:opacity-70' : ''}`}
                        >
                          <User size={20} color={priestClergy ? "#3b82f6" : "#6b7280"} className="mt-0.5" />
                          <View className="ml-3 flex-1">
                            <Text className="text-xl text-gray-500">Parish Priest</Text>
                            <Text className="text-2xl text-gray-900 font-semibold">{parish.priest}</Text>
                            {priestClergy && (
                              <Text className="text-xl text-blue-500 mt-1">Tap to view priest details</Text>
                            )}
                          </View>
                        </Pressable>
                      );
                    })()}
                    <View className="flex-row items-start mb-4">
                      <Calendar size={20} color="#6b7280" className="mt-0.5" />
                      <View className="ml-3 flex-1">
                        <Text className="text-xl text-gray-500">Feast Day</Text>
                        <Text className="text-2xl text-gray-900 font-semibold">{parish.fiesta}</Text>
                      </View>
                    </View>

                    {/* Link to Parish Detail */}
                    {matchingParish && (
                      <Pressable
                        onPress={() => handleParishPress(parish)}
                        className="bg-blue-500 rounded-xl py-4 px-6 items-center active:bg-blue-600"
                      >
                        <Text className="text-white font-bold text-xl">View Parish Details</Text>
                      </Pressable>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </Animated.View>

        {/* Vicariate Events */}
        <Animated.View
          entering={FadeInDown.delay(400)}
          className="bg-white rounded-2xl p-5 mb-4"
        >
          <View className="flex-row">
            <PartyPopper size={24} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
            <View className="flex-1 ml-3">
              <Text className="text-lg text-gray-500 mb-1">Vicariate Events</Text>
              <Text className="text-gray-400 text-xl italic">Events to be added</Text>
            </View>
          </View>
        </Animated.View>

        {/* Vicariate Meetings */}
        <Animated.View
          entering={FadeInDown.delay(500)}
          className="bg-white rounded-2xl p-5 mb-4"
        >
          <View className="flex-row">
            <Users size={24} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
            <View className="flex-1 ml-3">
              <Text className="text-lg text-gray-500 mb-1">Vicariate Meetings</Text>
              <Text className="text-gray-400 text-xl italic">Meeting schedule to be added</Text>
            </View>
          </View>
        </Animated.View>

        {/* Vicariate History */}
        <Animated.View
          entering={FadeInDown.delay(600)}
          className="bg-white rounded-2xl p-5"
        >
          <View className="flex-row mb-3">
            <FileText size={24} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
            <Text className="text-lg text-gray-500 ml-3">Vicariate History</Text>
          </View>
          <Text className="text-xl text-gray-700 leading-relaxed">
            {vicariate.history}
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
