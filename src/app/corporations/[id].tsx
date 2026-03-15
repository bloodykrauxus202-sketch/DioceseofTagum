import { View, Text, Pressable, ScrollView, Linking, Alert, useWindowDimensions, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  MapPin,
  Phone,
  Globe,
  ImageOff,
  Calendar,
  BookOpen,
  ExternalLink,
  Building2,
  Landmark,
  Printer,
  Stethoscope,
  Briefcase,
  HeartHandshake,
  Cross,
  Target,
  Church,
  Camera,
  X,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getCorporationById, Corporation } from '@/lib/data/corporations-data';

const getIconComponent = (iconType: Corporation['iconType'], color: string, size: number) => {
  switch (iconType) {
    case 'landmark':
      return <Landmark size={size} color={color} />;
    case 'printer':
      return <Printer size={size} color={color} />;
    case 'building':
      return <Building2 size={size} color={color} />;
    case 'stethoscope':
      return <Stethoscope size={size} color={color} />;
    case 'briefcase':
      return <Briefcase size={size} color={color} />;
    case 'heart':
      return <HeartHandshake size={size} color={color} />;
    case 'cross':
      return <Cross size={size} color={color} />;
    default:
      return <Building2 size={size} color={color} />;
  }
};

export default function CorporationDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { height: screenHeight } = useWindowDimensions();

  const corporation = getCorporationById(id ?? '');

  if (!corporation) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <ImageOff size={56} color="#d1d5db" />
        <Text className="text-gray-400 text-2xl mt-4">Corporation not found</Text>
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
    if (corporation.coordinates?.lat && corporation.coordinates?.lng) {
      query = `${corporation.coordinates.lat},${corporation.coordinates.lng}`;
    } else {
      query = corporation.location && corporation.location.includes('none, ') 
        ? corporation.name + ', ' + corporation.location.replace('none, ', '') 
        : corporation.location || corporation.name;
    }
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`);
  };

  const handleCall = (phone: string) => {
    // Extract phone number if it contains extra text
    const phoneMatch = phone.match(/[\d\-\(\)\s]+/);
    if (phoneMatch) {
      const cleanPhone = phoneMatch[0].replace(/[^\d]/g, '');
      if (cleanPhone.length >= 7) {
        Linking.openURL(`tel:${cleanPhone}`);
      }
    }
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsite = (url: string) => {
    if (url.includes('@')) {
      handleEmail(url);
      return;
    }
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    Linking.openURL(fullUrl);
  };

  const isContactCallable = !corporation.contact.toLowerCase().includes('internal');
  const isWebsiteAvailable = corporation.website && corporation.website.toLowerCase() !== 'none (internal)';

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
              style={{ color: corporation.color }}
            >
              {corporation.abbreviation}
            </Text>
            <Text className="text-xl font-bold text-gray-900" numberOfLines={1}>
              {corporation.name}
            </Text>
          </View>
        </View>
      </View>

      {/* Image Section */}
      <View
        className="bg-white border-b border-gray-200 items-center justify-center"
        style={{ height: screenHeight * 0.25 }}
      >
        {corporation.image ? (
          <Animated.Image
            source={{ uri: corporation.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center">
            <View
              className="w-20 h-20 rounded-2xl items-center justify-center mb-3"
              style={{ backgroundColor: corporation.color + '15' }}
            >
              {getIconComponent(corporation.iconType, corporation.color, 40)}
            </View>
            <Text className="text-gray-400 text-lg">Image to be added</Text>
            <Text className="text-sm font-bold mt-1" style={{ color: corporation.color }}>
              {corporation.abbreviation}
            </Text>
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
          {/* Location - Tappable for directions */}
          <Animated.View
            entering={FadeInDown.delay(100)}
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
                    {corporation.location}
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
            entering={FadeInDown.delay(200)}
            className="bg-white rounded-2xl overflow-hidden mb-4"
          >
            {/* Contact */}
            <Pressable
              onPress={() => isContactCallable && handleCall(corporation.contact)}
              className="p-5 border-b border-gray-100 active:bg-gray-50"
              disabled={!isContactCallable}
            >
              <View className="flex-row">
                <Phone size={22} color={isContactCallable ? '#3b82f6' : '#9ca3af'} />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Contact
                  </Text>
                  <Text
                    className={`text-lg font-medium ${isContactCallable ? 'text-blue-600' : 'text-gray-600'}`}
                  >
                    {corporation.contact}
                  </Text>
                </View>
              </View>
            </Pressable>

            {/* Website */}
            {isWebsiteAvailable && (
              <Pressable
                onPress={() => handleWebsite(corporation.website!)}
                className="p-5 active:bg-gray-50"
              >
                <View className="flex-row">
                  <Globe size={22} color="#3b82f6" />
                  <View className="flex-1 ml-3">
                    <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                      Website / Email
                    </Text>
                    <Text className="text-lg text-blue-600 font-medium" numberOfLines={1}>
                      {corporation.website}
                    </Text>
                  </View>
                  <ExternalLink size={18} color="#9ca3af" />
                </View>
              </Pressable>
            )}
          </Animated.View>

          {/* Identity Section */}
          <Animated.View
            entering={FadeInDown.delay(300)}
            className="bg-white rounded-2xl p-5 mb-4"
            style={{ borderLeftWidth: 4, borderLeftColor: corporation.color }}
          >
            <View className="flex-row items-center mb-3">
              <View
                className="p-2 rounded-lg"
                style={{ backgroundColor: corporation.color + '15' }}
              >
                <Building2 size={20} color={corporation.color} />
              </View>
              <Text className="font-bold text-gray-800 ml-3">Corporate Identity</Text>
            </View>
            <View className="space-y-2">
              <View className="flex-row mt-2">
                <Text className="text-gray-500 text-base w-28">Patron:</Text>
                <Text className="text-gray-800 text-base font-medium flex-1">
                  {corporation.patron}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Founding Anniversary */}
          <Animated.View
            entering={FadeInDown.delay(400)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row">
              <Calendar size={22} color="#9ca3af" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Founding Anniversary
                </Text>
                <Text className="text-lg text-gray-900 font-medium">
                  {corporation.foundingAnniversary}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Mission */}
          <Animated.View
            entering={FadeInDown.delay(500)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row">
              <Target size={22} color="#9ca3af" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Mission
                </Text>
                <Text className="text-lg text-gray-700 leading-relaxed">
                  {corporation.mission}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* History */}
          <Animated.View
            entering={FadeInDown.delay(600)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row">
              <BookOpen size={22} color="#9ca3af" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  History
                </Text>
                <Text className="text-lg text-gray-700 leading-relaxed">
                  {corporation.history}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Photos */}
          <Animated.View
            entering={FadeInDown.delay(700)}
            className="bg-white rounded-2xl p-5 mb-4"
          >
            <View className="flex-row items-center mb-3">
              <Camera size={22} color="#9ca3af" />
              <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide ml-3">
                Photos
              </Text>
            </View>
            <View className="bg-gray-100 rounded-xl p-6 items-center justify-center border-2 border-dashed border-gray-300">
              <Camera size={32} color="#9ca3af" />
              <Text className="text-gray-500 text-sm mt-2 text-center">
                {corporation.photos}
              </Text>
            </View>
          </Animated.View>

          {/* Category Badge */}
          <Animated.View
            entering={FadeInDown.delay(800)}
            className="rounded-2xl p-5 border"
            style={{
              backgroundColor: corporation.color + '10',
              borderColor: corporation.color + '30',
            }}
          >
            <Text
              className="text-sm font-semibold uppercase tracking-wide mb-1"
              style={{ color: corporation.color + '80' }}
            >
              Entity Type
            </Text>
            <Text className="text-xl font-bold" style={{ color: corporation.color }}>
              Diocesan Corporation
            </Text>
            <Text className="text-base text-gray-600 mt-1">
              Under Episcopal Authority
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
