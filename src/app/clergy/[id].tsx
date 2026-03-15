import { View, Text, Pressable, ScrollView, Share, Alert, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  User,
  MapPin,
  Share2,
  Church,
  History,
  ChevronRight,
} from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import {
  getClergyById,
  parishes,
  type Clergy,
} from '@/lib/data/parish-directory';
import { getPriestImageUrl } from '@/lib/data/priest-images';

// Get category label for display - checks title for special cases
const getCategoryLabel = (category: Clergy['category'], title?: string) => {
  // If there's a specific title, use it instead of generic category label
  if (title) {
    return title;
  }

  const labels: Record<Clergy['category'], string> = {
    'parishes': 'Parish Priest',
    'quasi-parishes': 'Quasi-Parish Priest',
    'chaplains': 'Chaplain',
    'diocesan-schools': 'Diocesan Schools',
    'qacs-formators': 'QACS Formator',
    'priests-outside-diocese': 'Outside Diocese',
    'retired-priests': 'Retired Priest',
  };
  return labels[category];
};

// Get category color
const getCategoryColor = (category: Clergy['category']) => {
  const colors: Record<Clergy['category'], string> = {
    'parishes': '#3b82f6',
    'quasi-parishes': '#22c55e',
    'chaplains': '#a855f7',
    'diocesan-schools': '#eab308',
    'qacs-formators': '#6366f1',
    'priests-outside-diocese': '#f97316',
    'retired-priests': '#6b7280',
  };
  return colors[category];
};

export default function ClergyDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width: screenWidth } = useWindowDimensions();

  // Calculate photo size - about 50% of screen width for a large circular photo
  const photoSize = screenWidth * 0.55;

  const clergyMember = getClergyById(id ?? '');

  if (!clergyMember) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <User size={56} color="#d1d5db" />
        <Text className="text-gray-400 text-2xl mt-4">Clergy not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-6 px-8 py-4 bg-gray-900 rounded-full"
        >
          <Text className="text-white font-bold text-xl">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        title: clergyMember.name,
        message: `${clergyMember.name}\n${clergyMember.title || ''}\n\n${clergyMember.parish ? `Assignment: ${clergyMember.parish}\n` : ''}${clergyMember.location ? `Location: ${clergyMember.location}` : ''}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share clergy information');
    }
  };

  const categoryColor = getCategoryColor(clergyMember.category);
  const priestImageUrl = getPriestImageUrl(clergyMember.name);

  // Find matching parish by name to make it clickable
  const matchingParish = parishes.find(p =>
    p.name.toLowerCase().includes(clergyMember.parish?.toLowerCase() || '') ||
    clergyMember.parish?.toLowerCase().includes(p.name.toLowerCase())
  );

  const handleParishPress = () => {
    if (matchingParish) {
      router.push(`/parishes/${matchingParish.id}`);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        className="bg-white"
        style={{
          paddingTop: insets.top,
          borderBottomWidth: 4,
          borderBottomColor: categoryColor,
        }}
      >
        {/* Back button and share */}
        <View className="flex-row items-center justify-between px-4 py-4">
          <Pressable
            onPress={() => router.back()}
            className="p-2 active:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={44} color="#4b5563" />
          </Pressable>
          <Text className="text-2xl font-bold text-gray-900">
            Clergy Details
          </Text>
          <Pressable
            onPress={handleShare}
            className="p-2 active:bg-gray-100 rounded-full"
          >
            <Share2 size={28} color="#4b5563" />
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <Animated.View
          entering={FadeIn.duration(400)}
          className="items-center pt-8 pb-6 bg-white"
        >
          {/* Photo - Large circular image covering ~50% of screen */}
          {priestImageUrl ? (
            <Image
              source={{ uri: priestImageUrl }}
              style={{
                width: photoSize,
                height: photoSize,
                borderRadius: photoSize / 2,
                borderWidth: 6,
                borderColor: categoryColor,
              }}
              contentFit="cover"
              cachePolicy="disk"
              transition={150}
            />
          ) : (
            <View
              className="bg-gray-100 items-center justify-center"
              style={{
                width: photoSize,
                height: photoSize,
                borderRadius: photoSize / 2,
                borderWidth: 6,
                borderColor: categoryColor,
              }}
            >
              <User size={photoSize * 0.4} color={categoryColor} />
            </View>
          )}

          <Text className="text-3xl font-bold text-gray-900 text-center px-6 mt-6">
            {clergyMember.name}
          </Text>

          {/* Category Badge - shows title like Parochial Vicar or Parish Priest */}
          <View
            className="mt-3 px-5 py-2 rounded-full"
            style={{ backgroundColor: `${categoryColor}20` }}
          >
            <Text className="text-lg font-semibold" style={{ color: categoryColor }}>
              {getCategoryLabel(clergyMember.category, clergyMember.title)}
            </Text>
          </View>
        </Animated.View>

        {/* Assignment Section */}
        {clergyMember.parish && (
          <Animated.View
            entering={FadeInDown.delay(200)}
            className="mx-4 mt-4 bg-white rounded-2xl p-5"
            style={{ elevation: 1 }}
          >
            <View className="flex-row items-center mb-3">
              <Church size={22} color={categoryColor} />
              <Text className="text-xl font-bold text-gray-900 ml-2">
                Current Assignment
              </Text>
            </View>

            <Pressable
              onPress={matchingParish ? handleParishPress : undefined}
              className={`bg-gray-50 rounded-xl p-5 ${matchingParish ? 'active:bg-gray-100' : ''}`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-xl font-bold text-gray-900 mb-2">
                    {clergyMember.parish}
                  </Text>
                  {clergyMember.location && (
                    <View className="flex-row items-center">
                      <MapPin size={18} color="#9ca3af" />
                      <Text className="text-lg text-gray-500 ml-1">
                        {clergyMember.location}
                      </Text>
                    </View>
                  )}
                  {matchingParish && (
                    <Text className="text-lg text-blue-500 mt-2">Tap to view parish details</Text>
                  )}
                </View>
                {matchingParish && (
                  <ChevronRight size={24} color="#9ca3af" />
                )}
              </View>
            </Pressable>
          </Animated.View>
        )}

        {/* Location Only (if no parish) */}
        {!clergyMember.parish && clergyMember.location && (
          <Animated.View
            entering={FadeInDown.delay(200)}
            className="mx-4 mt-4 bg-white rounded-2xl p-5"
            style={{ elevation: 1 }}
          >
            <View className="flex-row items-center mb-3">
              <MapPin size={22} color={categoryColor} />
              <Text className="text-xl font-bold text-gray-900 ml-2">
                Location
              </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-5">
              <Text className="text-xl text-gray-700">
                {clergyMember.location}
              </Text>
            </View>
          </Animated.View>
        )}

        {/* Previous Assignments Section - for future use */}
        <Animated.View
          entering={FadeInDown.delay(250)}
          className="mx-4 mt-4 bg-white rounded-2xl p-5"
          style={{ elevation: 1 }}
        >
          <View className="flex-row items-center mb-3">
            <History size={22} color={categoryColor} />
            <Text className="text-xl font-bold text-gray-900 ml-2">
              Previous Assignments
            </Text>
          </View>

          <View className="bg-gray-50 rounded-xl p-5">
            <Text className="text-lg text-gray-400 italic">
              To be added
            </Text>
          </View>
        </Animated.View>

        {/* Category Info Section */}
        <Animated.View
          entering={FadeInDown.delay(300)}
          className="mx-4 mt-4 bg-white rounded-2xl p-5"
          style={{ elevation: 1 }}
        >
          <Text className="text-xl font-bold text-gray-900 mb-3">
            About
          </Text>
          <Text className="text-xl text-gray-600 leading-7">
            {clergyMember.category === 'parishes' &&
              `${clergyMember.name} serves as a priest in the Diocese of Tagum, dedicated to the spiritual guidance and pastoral care of the faithful.`
            }
            {clergyMember.category === 'quasi-parishes' &&
              `${clergyMember.name} serves a quasi-parish in the Diocese of Tagum, working to establish and grow the faith community.`
            }
            {clergyMember.category === 'chaplains' &&
              `${clergyMember.name} serves as a chaplain in the Diocese of Tagum, providing spiritual support and sacramental ministry.`
            }
            {clergyMember.category === 'diocesan-schools' &&
              `${clergyMember.name} serves in the educational apostolate of the Diocese of Tagum, forming young minds in faith and knowledge.`
            }
            {clergyMember.category === 'qacs-formators' &&
              `${clergyMember.name} serves at Queen of Apostles College Seminary, forming future priests for the Diocese of Tagum.`
            }
            {clergyMember.category === 'priests-outside-diocese' &&
              `${clergyMember.name} is a priest of the Diocese of Tagum currently serving outside the diocese or on special assignment.`
            }
            {clergyMember.category === 'retired-priests' &&
              `${clergyMember.name} has faithfully served the Diocese of Tagum and is now in retirement, continuing to offer prayers and spiritual support.`
            }
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
