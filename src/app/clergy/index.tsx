import { useState, useMemo } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, ChevronLeft, User } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { clergy, type Clergy } from '@/lib/data/parish-directory';
import { getPriestImageUrl } from '@/lib/data/priest-images';
import BottomNavBar from '@/components/BottomNavBar';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ClergyListScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Sort clergy alphabetically by name and filter by search
  const sortedClergy = useMemo(() => {
    const sorted = [...clergy].sort((a, b) => {
      // Extract last name for sorting (assuming format "Rev. Fr. FirstName LastName")
      const getLastName = (name: string) => {
        const parts = name.split(' ');
        return parts[parts.length - 1].toLowerCase();
      };
      return getLastName(a.name).localeCompare(getLastName(b.name));
    });

    if (!searchQuery.trim()) return sorted;

    const q = searchQuery.toLowerCase().trim();
    return sorted.filter((priest) => {
      const haystack = [priest.name, priest.title, priest.parish, priest.location]
        .filter(Boolean)
        .map((s) => s?.toLowerCase())
        .join(' ');
      return haystack.includes(q);
    });
  }, [searchQuery]);

  // Group by first letter of last name
  const groupedByLetter = useMemo(() => {
    const groups: Record<string, Clergy[]> = {};
    sortedClergy.forEach((priest) => {
      const parts = priest.name.split(' ');
      const lastName = parts[parts.length - 1];
      const letter = lastName.charAt(0).toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(priest);
    });
    return groups;
  }, [sortedClergy]);

  const letters = Object.keys(groupedByLetter).sort();

  // Priest Card Component
  const PriestCard = ({ priest, index }: { priest: Clergy; index: number }) => {
    const imageUrl = getPriestImageUrl(priest.name);

    return (
      <AnimatedPressable
        entering={FadeInDown.delay(index * 20).springify()}
        onPress={() => router.push(`/clergy/${priest.id}`)}
        className="bg-white rounded-2xl p-4 mb-3 active:bg-gray-50 flex-row items-center"
        style={{ elevation: 1 }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 56, height: 56, borderRadius: 28, marginRight: 12 }}
            contentFit="cover"
            cachePolicy="disk"
            transition={100}
          />
        ) : (
          <View className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center mr-3">
            <User size={28} color="#9ca3af" />
          </View>
        )}
        <View className="flex-1 min-w-0">
          <Text className="text-xl font-bold text-gray-900 mb-0.5" numberOfLines={1}>
            {priest.name}
          </Text>
          {priest.title && (
            <Text className="text-base text-gray-600 mb-0.5" numberOfLines={1}>
              {priest.title}
            </Text>
          )}
          {priest.parish && (
            <Text className="text-base text-gray-500" numberOfLines={1}>
              {priest.parish}
            </Text>
          )}
        </View>
      </AnimatedPressable>
    );
  };

  let cardIndex = 0;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-200" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center px-3" style={{ paddingVertical: 8 }}>
          <Pressable
            onPress={() => router.back()}
            className="p-1.5 active:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={22} color="#4b5563" />
          </Pressable>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
            <Text style={{ fontSize: 21, fontWeight: '700', color: '#111827' }}>Clergy</Text>
            <View style={{
              backgroundColor: '#1d4ed8',
              borderRadius: 10,
              paddingHorizontal: 9,
              paddingVertical: 3,
              marginLeft: 8,
              justifyContent: 'center',
            }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>
                {clergy.length}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View className="bg-white rounded-xl mb-3 border border-gray-100" style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
          <View className="flex-row items-center">
            <Search size={16} color="#9ca3af" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search priest, parish, title..."
              placeholderTextColor="#9ca3af"
              style={{ flex: 1, marginLeft: 8, fontSize: 18, color: '#111827' }}
            />
          </View>
        </View>

        {/* Count */}
        <Text className="text-gray-500 text-base mb-4">
          {sortedClergy.length} priest{sortedClergy.length === 1 ? '' : 's'} found
        </Text>

        {/* Alphabetical List */}
        {letters.map((letter) => (
          <View key={letter} className="mb-4">
            {/* Letter Header */}
            <View className="flex-row items-center mb-2">
              <View className="w-10 h-10 rounded-full bg-blue-600 items-center justify-center">
                <Text className="text-white font-bold text-xl">{letter}</Text>
              </View>
              <View className="flex-1 h-px bg-gray-200 ml-3" />
            </View>

            {/* Priests in this letter group */}
            {groupedByLetter[letter].map((priest) => {
              const currentIndex = cardIndex++;
              return <PriestCard key={priest.id} priest={priest} index={currentIndex} />;
            })}
          </View>
        ))}

        {sortedClergy.length === 0 && (
          <View className="bg-white rounded-2xl p-8 items-center">
            <User size={48} color="#d1d5db" />
            <Text className="text-gray-500 text-xl mt-4">No priests found</Text>
          </View>
        )}
      </ScrollView>
      <BottomNavBar />
    </View>
  );
}
