import { View, Text, Pressable, ScrollView, Linking, Alert, useWindowDimensions, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Globe,
  ImageOff,
  Calendar,
  Star,
  BookOpen,
  ExternalLink,
  X,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getCongregationById } from '@/lib/data/congregations-data';

export default function CongregationDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { height: screenHeight } = useWindowDimensions();

  const congregation = getCongregationById(id ?? '');

  if (!congregation) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <ImageOff size={56} color="#d1d5db" />
        <Text className="text-gray-400 text-2xl mt-4">Congregation not found</Text>
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
    if (congregation.coordinates?.lat && congregation.coordinates?.lng) {
      query = `${congregation.coordinates.lat},${congregation.coordinates.lng}`;
    } else {
      query = congregation.location && congregation.location.includes('none, ') 
        ? congregation.name + ', ' + congregation.location.replace('none, ', '') 
        : congregation.location || congregation.name;
    }
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`);
  };

  const handleCall = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    Linking.openURL(`tel:${cleanNumber}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsite = (url: string) => {
    Linking.openURL(url);
  };

  const handleSchedulePress = () => {
    router.push(`/congregations/${congregation.id}/schedule`);
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
            <Text className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              {congregation.acronym}
            </Text>
            <Text className="text-xl font-bold text-gray-900" numberOfLines={1}>
              {congregation.name}
            </Text>
          </View>
        </View>
      </View>

      {/* Image Section */}
      <View
        className="bg-white border-b border-gray-200 items-center justify-center"
        style={{ height: screenHeight * 0.25 }}
      >
        {congregation.image ? (
          <Animated.Image
            source={{ uri: congregation.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center">
            <ImageOff size={56} color="#d1d5db" strokeWidth={1.5} />
            <Text className="text-gray-400 text-lg mt-3">Image to be added</Text>
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
          {/* Mission */}
          <Animated.View
            entering={FadeInDown.delay(100)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Mission
            </Text>
            <Text className="text-lg text-gray-700 leading-relaxed">
              {congregation.mission || "To be added"}
            </Text>
          </Animated.View>

          {/* Contact Card */}
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
                <MapPin size={22} color="#3b82f6" className="mt-0.5 flex-shrink-0" />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Location
                  </Text>
                  <Text className="text-lg text-gray-900 font-medium">
                    {congregation.location || "To be added"}
                  </Text>
                  {congregation.location && (
                    <View className="flex-row items-center mt-2">
                      <ExternalLink size={14} color="#3b82f6" />
                      <Text className="text-base text-blue-500 ml-1">Tap for directions</Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>



            {/* Phone */}
            <View className="p-5 border-b border-gray-100">
              <View className="flex-row">
                <Phone size={22} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Contact Numbers
                  </Text>
                  {congregation.contacts.phones.length > 0 ? (
                    congregation.contacts.phones.map((phone, index) => (
                      <Pressable
                        key={index}
                        onPress={() => handleCall(phone)}
                        className="py-1 active:opacity-70"
                      >
                        <Text className="text-lg text-blue-600 font-medium">{phone}</Text>
                      </Pressable>
                    ))
                  ) : (
                    <Text className="text-gray-400 text-lg italic">To be added</Text>
                  )}
                </View>
              </View>
            </View>

            {/* Email */}
            <View className="p-5 border-b border-gray-100">
              <View className="flex-row">
                <Mail size={22} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Email
                  </Text>
                  {congregation.contacts.email ? (
                    <Pressable
                      onPress={() => handleEmail(congregation.contacts.email!)}
                      className="active:opacity-70"
                    >
                      <Text className="text-lg text-blue-600 font-medium">
                        {congregation.contacts.email}
                      </Text>
                    </Pressable>
                  ) : (
                    <Text className="text-gray-400 text-lg italic">To be added</Text>
                  )}
                </View>
              </View>
            </View>

            {/* Website */}
            {congregation.website && (
              <Pressable
                onPress={() => handleWebsite(congregation.website!)}
                className="p-5 active:bg-gray-50"
              >
                <View className="flex-row">
                  <Globe size={22} color="#3b82f6" className="mt-0.5 flex-shrink-0" />
                  <View className="flex-1 ml-3">
                    <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                      Website
                    </Text>
                    <Text className="text-lg text-blue-600 font-medium" numberOfLines={1}>
                      {congregation.website.replace(/^https?:\/\//, '')}
                    </Text>
                  </View>
                  <ExternalLink size={18} color="#9ca3af" />
                </View>
              </Pressable>
            )}
          </Animated.View>

          {/* Schedule of Events - Clickable */}
          <Animated.View entering={FadeInDown.delay(300)}>
            <Pressable
              onPress={handleSchedulePress}
              className="bg-white rounded-2xl p-5 mb-4 active:bg-gray-50"
            >
              <View className="flex-row items-center">
                <Calendar size={22} color="#3b82f6" className="flex-shrink-0" />
                <View className="flex-1 ml-3">
                  <Text className="text-lg font-semibold text-gray-900">
                    Schedule of Events
                  </Text>
                  <Text className="text-base text-gray-500 mt-0.5">
                    View upcoming events
                  </Text>
                </View>
                <ChevronRight size={22} color="#9ca3af" />
              </View>
            </Pressable>
          </Animated.View>

          {/* Patron Saint */}
          <Animated.View
            entering={FadeInDown.delay(400)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row">
              <Star size={22} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Patron Saint
                </Text>
                <Text className="text-lg text-gray-900 font-medium">
                  {congregation.patronSaint || "To be added"}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* History */}
          <Animated.View
            entering={FadeInDown.delay(500)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row">
              <BookOpen size={22} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Brief History
                </Text>
                <Text className="text-lg text-gray-700 leading-relaxed">
                  {congregation.history || "To be added"}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Founding Anniversary */}
          <Animated.View
            entering={FadeInDown.delay(600)}
            className="bg-blue-50 rounded-2xl p-5 border border-blue-100"
          >
            <Text className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-1">
              Founding Anniversary
            </Text>
            <Text className="text-xl font-bold text-blue-700">
              {congregation.foundingAnniversary || "To be added"}
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
