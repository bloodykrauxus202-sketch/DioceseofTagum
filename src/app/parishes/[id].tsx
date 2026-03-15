import { View, Text, Pressable, ScrollView, Image, Linking, useWindowDimensions, Alert, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  ChevronRight,
  Church,
  MapPin,
  User,
  Calendar,
  Phone,
  Clock,
  Users,
  FileText,
  PartyPopper,
  X,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getParishById, clergy } from '@/lib/data/parish-directory';

export default function ParishDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { height: screenHeight } = useWindowDimensions();

  const parish = getParishById(id ?? '');

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

  const handleDirections = () => {
    let query = '';
    if (parish.lat && parish.lon) {
      query = `${parish.lat},${parish.lon}`;
    } else {
      query = parish.location && parish.location.includes('none, ') 
        ? parish.name + ', ' + parish.location.replace('none, ', '') 
        : parish.location || parish.name;
    }
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`);
  };

  const handleCall = () => {
    const phoneNumber = parish.mobile || parish.phone;
    if (phoneNumber) {
      // Clean the phone number for dialing
      const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
      Linking.openURL(`tel:${cleanNumber}`);
    }
  };

  const handleParishEvents = () => {
    router.push(`/parishes/${parish.id}/events`);
  };

  // Find matching clergy by name to make priest clickable
  const matchingClergy = clergy.find(c =>
    c.name.toLowerCase().includes(parish.priestName?.toLowerCase() || '') ||
    parish.priestName?.toLowerCase().includes(c.name.toLowerCase())
  );

  const handlePriestPress = () => {
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
            Parish Details
          </Text>
        </View>
      </View>

      {/* Parish Image Placeholder - 33% of screen height */}
      <View
        className="bg-white border-b border-gray-200 items-center justify-center"
        style={{ height: screenHeight * 0.33 }}
      >
        {parish.image ? (
          <Image
            source={{ uri: parish.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center">
            <Church size={72} color="#d1d5db" strokeWidth={1.5} />
            <Text className="text-gray-400 text-lg mt-3">Parish Image</Text>
          </View>
        )}
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 py-6">
          {/* Parish Name & Vicariate */}
          <Animated.View
            entering={FadeInDown.delay(100)}
            className="bg-white rounded-2xl p-6 mb-4"
          >
            <Text className="text-3xl font-bold text-gray-900 text-center mb-3">
              {parish.name}
            </Text>
            <View className="items-center">
              <View className="bg-gray-100 px-4 py-2 rounded-full">
                <Text className="text-lg text-gray-600">
                  {parish.vicariate}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Main Info Card */}
          <Animated.View
            entering={FadeInDown.delay(200)}
            className="bg-white rounded-2xl overflow-hidden mb-4"
          >
            {/* Location - Tappable for directions */}
            <Pressable
              onPress={handleDirections}
              className={`p-5 active:bg-gray-50 border-b border-gray-100`}
            >
              <View className="flex-row">
                <MapPin size={24} color="#3b82f6" className="mt-0.5 flex-shrink-0" />
                <View className="flex-1 ml-3">
                  <Text className="text-lg text-gray-500 mb-1">Location</Text>
                  <Text className="text-xl text-gray-900 font-semibold">{parish.location}</Text>
                  <Text className="text-lg text-blue-500 mt-2">Tap for directions</Text>
                </View>
              </View>
            </Pressable>



            {/* Parish Priest - Tappable to view clergy details */}
            <Pressable
              onPress={matchingClergy ? handlePriestPress : undefined}
              className={`p-5 border-b border-gray-100 ${matchingClergy ? 'active:bg-gray-50' : ''}`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row flex-1">
                  <User size={24} color={matchingClergy ? "#3b82f6" : "#9ca3af"} className="mt-0.5 flex-shrink-0" />
                  <View className="flex-1 ml-3">
                    <Text className="text-lg text-gray-500 mb-1">Parish Priest</Text>
                    <Text className="text-xl text-gray-900 font-semibold">{parish.priestName}</Text>
                    {matchingClergy && (
                      <Text className="text-lg text-blue-500 mt-1">Tap to view priest details</Text>
                    )}
                  </View>
                </View>
                {matchingClergy && (
                  <ChevronRight size={24} color="#9ca3af" />
                )}
              </View>
            </Pressable>

            {/* Contact Number */}
            <Pressable
              onPress={parish.phone || parish.mobile ? handleCall : undefined}
              className={`p-5 border-b border-gray-100 ${parish.phone || parish.mobile ? 'active:bg-gray-50' : ''}`}
            >
              <View className="flex-row">
                <Phone size={24} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
                <View className="flex-1 ml-3">
                  <Text className="text-lg text-gray-500 mb-1">Contact Number</Text>
                  {parish.phone || parish.mobile ? (
                    <>
                      {parish.phone && <Text className="text-xl text-gray-900 font-semibold">{parish.phone}</Text>}
                      {parish.mobile && <Text className="text-xl text-gray-900 font-semibold">{parish.mobile}</Text>}
                    </>
                  ) : (
                    <Text className="text-gray-400 text-lg italic">To be added</Text>
                  )}
                </View>
              </View>
            </Pressable>

            {/* Feast Day */}
            <View className="p-5">
              <View className="flex-row">
                <Calendar size={24} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
                <View className="flex-1 ml-3">
                  <Text className="text-lg text-gray-500 mb-1">Feast Day</Text>
                  <Text className="text-xl text-gray-900 font-semibold">{parish.fiesta}</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Mass Schedule */}
          <Animated.View
            entering={FadeInDown.delay(300)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row">
              <Clock size={24} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
              <View className="flex-1 ml-3">
                <Text className="text-lg text-gray-500 mb-2">Mass Schedule</Text>
                {parish.massSchedule && parish.massSchedule.length > 0 ? (
                  parish.massSchedule.map((schedule, index) => (
                    <Text key={index} className="text-xl text-gray-900 mb-1">{schedule}</Text>
                  ))
                ) : (
                  <Text className="text-gray-400 text-lg italic">Mass schedule to be added</Text>
                )}
              </View>
            </View>
          </Animated.View>

          {/* GKKs */}
          <Animated.View entering={FadeInDown.delay(400)}>
            <Pressable
              onPress={() => router.push(`/parish-gkks/${parish.id}`)}
              className="bg-white rounded-2xl p-5 mb-4 active:bg-gray-50 flex-row items-center border border-gray-100"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}
            >
              <View className="flex-row flex-1">
                <Users size={24} color="#3b82f6" className="mt-0.5 flex-shrink-0" />
                <View className="flex-1 ml-3">
                  <Text className="text-lg text-gray-500 mb-1">GKKs</Text>
                  {parish.gkkCount ? (
                    <Text className="text-xl text-gray-900 font-semibold">{parish.gkkCount} GKKs</Text>
                  ) : (
                    <Text className="text-gray-400 text-lg italic">To be added</Text>
                  )}
                  <Text className="text-lg text-blue-500 mt-2">Tap to view GKK directory</Text>
                </View>
              </View>
              <ChevronRight size={24} color="#9ca3af" />
            </Pressable>
          </Animated.View>

          {/* Blueprint */}
          <Animated.View
            entering={FadeInDown.delay(500)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row">
              <FileText size={24} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
              <View className="flex-1 ml-3">
                <Text className="text-lg text-gray-500 mb-1">Blueprint</Text>
                <Text className="text-gray-400 text-lg italic">To be added</Text>
              </View>
            </View>
          </Animated.View>

          {/* Parish Events Button */}
          <Animated.View entering={FadeInDown.delay(600)}>
            <Pressable
              onPress={handleParishEvents}
              className="bg-white rounded-2xl p-5 mb-4 active:bg-gray-50"
            >
              <View className="flex-row items-center">
                <PartyPopper size={24} color="#3b82f6" className="flex-shrink-0" />
                <View className="flex-1 ml-3">
                  <Text className="text-lg text-gray-500 mb-1">Parish Events</Text>
                  <Text className="text-xl text-gray-900 font-semibold">View upcoming events</Text>
                </View>
                <ChevronRight size={24} color="#9ca3af" />
              </View>
            </Pressable>
          </Animated.View>

          {/* Parish History */}
          <Animated.View
            entering={FadeInDown.delay(700)}
            className="bg-white rounded-2xl p-5"
          >
            <Text className="text-lg text-gray-500 mb-3">Parish History</Text>
            <Text className="text-xl text-gray-700 leading-relaxed">
              {parish.history}
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
