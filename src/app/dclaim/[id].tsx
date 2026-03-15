import { View, Text, Pressable, ScrollView, Linking, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  ImageOff,
  Calendar,
  BookOpen,
  ExternalLink,
  Link as LinkIcon,
  Users,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getDclaimGroupById } from '@/lib/data/dclaim-data';

export default function DclaimDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { height: screenHeight } = useWindowDimensions();

  const group = getDclaimGroupById(id ?? '');

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
    router.push(`/dclaim/${group.id}/schedule`);
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
            <Text className="text-xl font-bold text-gray-900" numberOfLines={2}>
              {group.name}
            </Text>
            <Text className="text-base text-gray-500">
              Coordinator: {group.coordinator}
            </Text>
          </View>
        </View>
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
            <Text className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
              Mission
            </Text>
            <Text className="text-lg text-gray-700 leading-relaxed">
              {group.mission || "To be added"}
            </Text>
          </Animated.View>

          {/* Contact Card */}
          <Animated.View
            entering={FadeInDown.delay(200)}
            className="bg-white rounded-2xl overflow-hidden mb-4"
          >
            {/* Phone */}
            <View className="p-5 border-b border-gray-100">
              <View className="flex-row">
                <Phone size={22} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Contact Numbers
                  </Text>
                  {group.contacts.phones.length > 0 ? (
                    group.contacts.phones.map((phone, index) => (
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
            <View className="p-5">
              <View className="flex-row">
                <Mail size={22} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Email
                  </Text>
                  {group.contacts.email ? (
                    <Pressable
                      onPress={() => handleEmail(group.contacts.email!)}
                      className="active:opacity-70"
                    >
                      <Text className="text-lg text-blue-600 font-medium">
                        {group.contacts.email}
                      </Text>
                    </Pressable>
                  ) : (
                    <Text className="text-gray-400 text-lg italic">To be added</Text>
                  )}
                </View>
              </View>
            </View>
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
                    View event schedules
                  </Text>
                </View>
                <ChevronRight size={22} color="#9ca3af" />
              </View>
            </Pressable>
          </Animated.View>

          {/* Website / Social Media Links */}
          <Animated.View
            entering={FadeInDown.delay(400)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <Text className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
              Website / Social Media Links
            </Text>
            {group.website || group.socialMedia.length > 0 ? (
              <View>
                {group.website && (
                  <Pressable
                    onPress={() => handleWebsite(group.website!)}
                    className="flex-row items-center py-2 active:opacity-70"
                  >
                    <Globe size={18} color="#3b82f6" />
                    <Text className="text-lg text-blue-600 ml-2 flex-1" numberOfLines={1}>
                      {group.website.replace(/^https?:\/\//, '')}
                    </Text>
                    <ExternalLink size={16} color="#9ca3af" />
                  </Pressable>
                )}
                {group.socialMedia.map((link, index) => (
                  <View key={index} className="flex-row items-center py-2">
                    <LinkIcon size={18} color="#6b7280" />
                    <Text className="text-lg text-gray-700 ml-2 flex-1">{link}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-gray-400 text-lg italic">Links will be added soon</Text>
            )}
          </Animated.View>

          {/* History */}
          <Animated.View
            entering={FadeInDown.delay(600)}
            className="bg-white rounded-2xl p-5"
          >
            <View className="flex-row">
              <BookOpen size={22} color="#9ca3af" className="mt-0.5 flex-shrink-0" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                  History
                </Text>
                <Text className="text-lg text-gray-700 leading-relaxed">
                  {group.history || "To be added"}
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
