import { View, Text, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react-native';
import BottomNavBar from '@/components/BottomNavBar';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View className="flex-1 bg-white">
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        {/* Search Header */}
        <Text className="text-gray-900 text-4xl font-bold mb-5">Search</Text>

        {/* Search Input */}
        <View
          className="bg-gray-100 rounded-xl flex-row items-center px-4"
          style={{ height: 56 }}
        >
          <SearchIcon size={24} color="#9ca3af" strokeWidth={2} />
          <TextInput
            className="flex-1 ml-3 text-xl text-gray-900"
            placeholder="Search directories..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>

        {/* Search Results Area */}
        <View className="flex-1 items-center justify-center">
          {searchQuery.length === 0 ? (
            <Text className="text-gray-400 text-xl text-center leading-7">
              Enter a keyword to search{'\n'}parishes, clergy, schools, and more
            </Text>
          ) : (
            <Text className="text-gray-500 text-xl text-center">
              Searching for "{searchQuery}"...
            </Text>
          )}
        </View>
      </View>

      {/* Bottom Navigation Bar */}
      <BottomNavBar currentScreen="search" />
    </View>
  );
}
