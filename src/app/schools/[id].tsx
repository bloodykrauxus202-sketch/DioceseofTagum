import { View, Text, Pressable, ScrollView, Linking, Alert, useWindowDimensions, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Globe,
  ImageOff,
  BookOpen,
  ExternalLink,
  Users,
  Church,
  Target,
  Phone,
  GraduationCap,
  Calendar,
  PartyPopper,
  X,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getSchoolById } from '@/lib/data/schools-data';

export default function SchoolDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { height: screenHeight } = useWindowDimensions();

  const school = getSchoolById(id ?? '');

  if (!school) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <ImageOff size={56} color="#d1d5db" />
        <Text className="text-gray-400 text-2xl mt-4">School not found</Text>
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
    if (school.coordinates?.lat && school.coordinates?.lng) {
      query = `${school.coordinates.lat},${school.coordinates.lng}`;
    } else {
      query = school.location && school.location.includes('none, ') 
        ? school.name + ', ' + school.location.replace('none, ', '') 
        : school.location || school.name;
    }
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsite = (url: string) => {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    Linking.openURL(fullUrl);
  };

  const handleSchedulePress = () => {
    router.push(`/schools/${school.id}/schedule`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with Back */}
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
          <View className="flex-1 ml-3">
            <Text
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color: school.color }}
            >
              {school.abbreviation}
            </Text>
            <Text className="text-xl font-bold text-gray-900" numberOfLines={1}>
              {school.name}
            </Text>
          </View>
        </View>
      </View>

      {/* Desktop Responsive Split Container */}
      <View className="flex-1 lg:flex-row lg:max-w-7xl lg:mx-auto w-full">
        {/* School Image Placeholder - 100% width on Mobile, 40% Width on Desktop */}
        <View
          className="bg-white border-b lg:border-r border-gray-200 items-center justify-center lg:w-2/5"
          style={{ height: screenHeight * 0.33, ...(screenHeight > 768 ? { height: '100%'} : {}) }}
        >
          {school.image ? (
            <Animated.Image
              source={{ uri: school.image }}
              className="w-full h-full lg:rounded-l-2xl"
              resizeMode="cover"
            />
          ) : (
             <View className="items-center">
               <GraduationCap size={72} color="#d1d5db" strokeWidth={1.5} />
               <Text className="text-gray-400 text-lg mt-3">School Image</Text>
             </View>
          )}
        </View>

        {/* Scrollable Content - Full width on mobile, 60% on desktop */}
        <ScrollView
          className="flex-1 lg:w-3/5"
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 py-6">
            {/* School Name & Level */}
            <Animated.View
              entering={FadeInDown.delay(100)}
              className="bg-white rounded-2xl p-6 mb-4"
            >
              <Text className="text-3xl font-bold text-gray-900 text-center mb-3">
                {school.name}
              </Text>
              <View className="items-center">
                <View className="bg-gray-100 px-4 py-2 rounded-full">
                  <Text className="text-lg text-gray-600">
                    {school.category}
                  </Text>
                </View>
              </View>
            </Animated.View>          {/* Administration Section */}
          <Animated.View
            entering={FadeInDown.delay(100)}
            className="bg-white rounded-2xl p-5 mb-4"
            style={{ borderLeftWidth: 4, borderLeftColor: school.color }}
          >
            <View className="flex-row items-center mb-3">
              <View
                className="p-2 rounded-lg"
                style={{ backgroundColor: school.color + '15' }}
              >
                <Users size={20} color={school.color} />
              </View>
              <Text className="font-bold text-gray-800 ml-3">Administration</Text>
            </View>
            <View className="space-y-2">
              <View className="flex-row">
                <Text className="text-gray-500 text-base w-28">Religious Order:</Text>
                <Text className="text-gray-800 text-base font-medium flex-1">
                  {school.administration}
                </Text>
              </View>
              <View className="flex-row mt-2">
                <Text className="text-gray-500 text-base w-28">Current Head:</Text>
                <Text className="text-gray-800 text-base font-medium flex-1">
                  {school.currentHead}
                </Text>
              </View>
              {school.charism && (
                <View className="flex-row mt-2">
                  <Text className="text-gray-500 text-base w-28">Charism:</Text>
                  <Text className="text-gray-800 text-base font-medium flex-1">
                    {school.charism}
                  </Text>
                </View>
              )}
            </View>
          </Animated.View>

          {/* Location - Tappable for directions */}
          <Animated.View
            entering={FadeInDown.delay(200)}
            className="bg-white rounded-2xl overflow-hidden mb-4"
          >
            <Pressable
              onPress={handleDirections}
              className={`p-5 active:bg-gray-50 border-b border-gray-100`}
            >
              <View className="flex-row">
                <MapPin size={22} color="#3b82f6" />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Location
                  </Text>
                  <Text className="text-lg text-gray-900 font-medium">
                    {school.location}
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <ExternalLink size={14} color="#3b82f6" />
                    <Text className="text-base text-blue-500 ml-1">Tap for directions</Text>
                  </View>
                </View>
              </View>
            </Pressable>
            

          </Animated.View>

          {/* Contact Card */}
          <Animated.View
            entering={FadeInDown.delay(300)}
            className="bg-white rounded-2xl overflow-hidden mb-4"
          >
            {/* Email */}
            <Pressable
              onPress={() => handleEmail(school.contact)}
              className="p-5 border-b border-gray-100 active:bg-gray-50"
            >
              <View className="flex-row">
                <Mail size={22} color="#9ca3af" />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Contact
                  </Text>
                  <Text className="text-lg text-blue-600 font-medium">
                    {school.contact}
                  </Text>
                </View>
              </View>
            </Pressable>

            {/* Website */}
            {school.website && (
              <Pressable
                onPress={() => handleWebsite(school.website!)}
                className="p-5 active:bg-gray-50"
              >
                <View className="flex-row">
                  <Globe size={22} color="#3b82f6" />
                  <View className="flex-1 ml-3">
                    <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                      Website
                    </Text>
                    <Text className="text-lg text-blue-600 font-medium" numberOfLines={1}>
                      {school.website.replace(/^https?:\/\//, '')}
                    </Text>
                  </View>
                  <ExternalLink size={18} color="#9ca3af" />
                </View>
              </Pressable>
            )}
          </Animated.View>

          {/* Schedule of Events - Clickable */}
          <Animated.View entering={FadeInDown.delay(400)}>
            <Pressable
              onPress={handleSchedulePress}
              className="bg-white rounded-2xl p-5 mb-4 active:bg-gray-50"
            >
              <View className="flex-row items-center">
                <Calendar size={22} color="#3b82f6" />
                <View className="flex-1 ml-3">
                  <Text className="text-lg font-semibold text-gray-900">
                    Schedule of Events
                  </Text>
                  <Text className="text-base text-gray-500 mt-0.5">
                    View 2026 & 2027 events
                  </Text>
                </View>
                <ChevronRight size={22} color="#9ca3af" />
              </View>
            </Pressable>
          </Animated.View>

          {/* Founding Anniversary */}
          <Animated.View
            entering={FadeInDown.delay(500)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row">
              <Calendar size={22} color="#9ca3af" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Founding Anniversary
                </Text>
                <Text className="text-lg text-gray-900 font-medium">
                  {school.foundingAnniversary}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Patron Saint */}
          <Animated.View
            entering={FadeInDown.delay(600)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row">
              <Church size={22} color="#9ca3af" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Patron Saint
                </Text>
                <Text className="text-lg text-gray-900 font-medium">
                  {school.patronSaint}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Mission */}
          <Animated.View
            entering={FadeInDown.delay(700)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row">
              <Target size={22} color="#9ca3af" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Mission
                </Text>
                <Text className="text-lg text-gray-700 leading-relaxed">
                  {school.mission}
                </Text>
                {school.motto && (
                  <Text className="text-base text-gray-500 italic mt-3">
                    Motto: "{school.motto}"
                  </Text>
                )}
              </View>
            </View>
          </Animated.View>

          {/* History */}
          <Animated.View
            entering={FadeInDown.delay(800)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row">
              <BookOpen size={22} color="#9ca3af" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Brief History
                </Text>
                <Text className="text-lg text-gray-700 leading-relaxed">
                  {school.history}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Category Badge */}
          <Animated.View
            entering={FadeInDown.delay(900)}
            className="rounded-2xl p-5 border"
            style={{
              backgroundColor: school.color + '10',
              borderColor: school.color + '30',
            }}
          >
            <Text
              className="text-sm font-semibold uppercase tracking-wide mb-1"
              style={{ color: school.color + '80' }}
            >
              Category
            </Text>
            <Text className="text-xl font-bold" style={{ color: school.color }}>
              {school.category}
            </Text>
            <Text className="text-base text-gray-600 mt-1">
              Est. {school.foundingYear}
            </Text>
          </Animated.View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
