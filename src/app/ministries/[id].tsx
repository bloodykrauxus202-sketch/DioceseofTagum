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
  Radio,
  Youtube,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getMinistryById } from '@/lib/data/ministries-data';

export default function MinistryDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { height: screenHeight } = useWindowDimensions();

  const ministry = getMinistryById(id ?? '');

  if (!ministry) {
    return (
      <View className="flex-1 items-center justify-center" style={{ paddingTop: insets.top, backgroundColor: '#F5F1EB' }}>
        <Text style={{ fontSize: 52, color: '#8B5A2B', opacity: 0.3 }}>✝</Text>
        <Text style={{ color: '#8B7355', fontSize: 24, marginTop: 16 }}>Ministry not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-6 px-8 py-4 rounded-full"
          style={{ backgroundColor: '#3D2914' }}
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
    router.push(`/ministries/${ministry.id}/schedule`);
  };

  const hasLinks = ministry.links?.website || ministry.links?.youtube || ministry.links?.facebook || ministry.links?.radio;

  return (
    <View className="flex-1" style={{ backgroundColor: '#F5F1EB' }}>
      {/* Header with Back */}
      <View
        style={{
          backgroundColor: '#F5F1EB',
          paddingTop: insets.top,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(139, 90, 43, 0.15)',
        }}
      >
        <View className="flex-row items-center px-4 py-4">
          <Pressable
            onPress={() => router.back()}
            className="p-2 active:opacity-70 rounded-full"
          >
            <ChevronLeft size={44} color="#3D2914" />
          </Pressable>
          <View className="flex-1 ml-3">
            <Text className="text-xl font-bold" style={{ color: '#3D2914' }} numberOfLines={2}>
              {ministry.name}
            </Text>
            <Text className="text-base" style={{ color: '#6B5344' }}>
              Coordinator: {ministry.coordinator}
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
            className="rounded-2xl p-5 mb-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              borderWidth: 1,
              borderColor: 'rgba(196, 165, 116, 0.25)',
            }}
          >
            <Text className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: '#8B5A2B' }}>
              Mission
            </Text>
            <Text className="text-lg leading-relaxed" style={{ color: '#5D4930' }}>
              {ministry.mission || "To be added"}
            </Text>
          </Animated.View>

          {/* Contact Card */}
          <Animated.View
            entering={FadeInDown.delay(200)}
            className="rounded-2xl overflow-hidden mb-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              borderWidth: 1,
              borderColor: 'rgba(196, 165, 116, 0.25)',
            }}
          >
            {/* Phone */}
            <View className="p-5" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(196, 165, 116, 0.2)' }}>
              <View className="flex-row">
                <Phone size={22} color="#8B5A2B" style={{ marginTop: 2 }} />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: '#8B5A2B' }}>
                    Contact Numbers
                  </Text>
                  {ministry.contacts?.phones && ministry.contacts.phones.length > 0 ? (
                    ministry.contacts.phones.map((phone, index) => (
                      <Pressable
                        key={index}
                        onPress={() => handleCall(phone)}
                        className="py-1 active:opacity-70"
                      >
                        <Text className="text-lg font-medium" style={{ color: '#5D4930' }}>{phone}</Text>
                      </Pressable>
                    ))
                  ) : (
                    <Text className="text-lg italic" style={{ color: '#A08060' }}>To be added</Text>
                  )}
                </View>
              </View>
            </View>

            {/* Email */}
            <View className="p-5">
              <View className="flex-row">
                <Mail size={22} color="#8B5A2B" style={{ marginTop: 2 }} />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: '#8B5A2B' }}>
                    Email
                  </Text>
                  {ministry.contacts?.email ? (
                    <Pressable
                      onPress={() => handleEmail(ministry.contacts.email!)}
                      className="active:opacity-70"
                    >
                      <Text className="text-lg font-medium" style={{ color: '#5D4930' }}>
                        {ministry.contacts.email}
                      </Text>
                    </Pressable>
                  ) : (
                    <Text className="text-lg italic" style={{ color: '#A08060' }}>To be added</Text>
                  )}
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Schedule of Events - Clickable */}
          <Animated.View entering={FadeInDown.delay(300)}>
            <Pressable
              onPress={handleSchedulePress}
              className="rounded-2xl p-5 mb-4 active:opacity-80"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderWidth: 1,
                borderColor: 'rgba(196, 165, 116, 0.25)',
              }}
            >
              <View className="flex-row items-center">
                <Calendar size={22} color="#8B5A2B" />
                <View className="flex-1 ml-3">
                  <Text className="text-lg font-semibold" style={{ color: '#3D2914' }}>
                    Schedule of Events
                  </Text>
                  <Text className="text-base mt-0.5" style={{ color: '#8B7355' }}>
                    View event schedules
                  </Text>
                </View>
                <ChevronRight size={22} color="#C4A574" />
              </View>
            </Pressable>
          </Animated.View>

          {/* Website / Social Media Links */}
          <Animated.View
            entering={FadeInDown.delay(400)}
            className="rounded-2xl p-5 mb-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              borderWidth: 1,
              borderColor: 'rgba(196, 165, 116, 0.25)',
            }}
          >
            <Text className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: '#8B5A2B' }}>
              Website / Social Media Links
            </Text>
            {hasLinks ? (
              <View>
                {ministry.links?.website && (
                  <Pressable
                    onPress={() => handleWebsite(ministry.links.website!)}
                    className="flex-row items-center py-2 active:opacity-70"
                  >
                    <Globe size={18} color="#8B5A2B" />
                    <Text className="text-lg ml-2 flex-1" style={{ color: '#5D4930' }} numberOfLines={1}>
                      {ministry.links.website.replace(/^https?:\/\//, '')}
                    </Text>
                    <ExternalLink size={16} color="#C4A574" />
                  </Pressable>
                )}
                {ministry.links?.youtube && (
                  <Pressable
                    onPress={() => handleWebsite(ministry.links.youtube!)}
                    className="flex-row items-center py-2 active:opacity-70"
                  >
                    <Youtube size={18} color="#8B5A2B" />
                    <Text className="text-lg ml-2 flex-1" style={{ color: '#5D4930' }}>YouTube Channel</Text>
                    <ExternalLink size={16} color="#C4A574" />
                  </Pressable>
                )}
                {ministry.links?.radio && (
                  <View className="flex-row items-center py-2">
                    <Radio size={18} color="#8B5A2B" />
                    <Text className="text-lg ml-2 flex-1" style={{ color: '#5D4930' }}>{ministry.links.radio}</Text>
                  </View>
                )}
                {ministry.links?.facebook && (
                  <Pressable
                    onPress={() => handleWebsite(ministry.links.facebook!)}
                    className="flex-row items-center py-2 active:opacity-70"
                  >
                    <Globe size={18} color="#8B5A2B" />
                    <Text className="text-lg ml-2 flex-1" style={{ color: '#5D4930' }}>Facebook Page</Text>
                    <ExternalLink size={16} color="#C4A574" />
                  </Pressable>
                )}
              </View>
            ) : (
              <Text className="text-lg italic" style={{ color: '#A08060' }}>Links will be added soon</Text>
            )}
          </Animated.View>

          {/* History */}
          <Animated.View
            entering={FadeInDown.delay(600)}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              borderWidth: 1,
              borderColor: 'rgba(196, 165, 116, 0.25)',
            }}
          >
            <View className="flex-row">
              <BookOpen size={22} color="#8B5A2B" style={{ marginTop: 2 }} />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: '#8B5A2B' }}>
                  History
                </Text>
                <Text className="text-lg leading-relaxed" style={{ color: '#5D4930' }}>
                  {ministry.history || "To be added"}
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
