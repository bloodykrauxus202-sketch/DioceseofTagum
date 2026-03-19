import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, User, LogOut } from 'lucide-react-native';
import { useAuth } from '@/lib/auth-context';

const DIOCESE_LOGO = 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/diocese_of_tagum_1770014167005_019c1d10-cfdd-7029-ad3a-c72fae1501ab.png';

export default function DesktopTopNav() {
  const router = useRouter();
  const { isAuthenticated, user, signOut } = useAuth();

  const handleHome = () => router.push('/(tabs)');
  const handleSearch = () => router.push('/search');
  const handleLoginPress = () => router.push('/login');

  const handleLogoutPress = () => {
    // We can use a simple confirm or just sign out directly on desktop if Alert is not fully supported on web
    if (window.confirm(`Sign out as ${user?.displayName || user?.email || 'user'}?`)) {
      signOut();
    }
  };

  return (
    <View className="hidden md:flex flex-row items-center justify-between px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
      <Pressable onPress={handleHome} className="flex-row items-center cursor-pointer hover:opacity-80">
        <Image
          source={{ uri: DIOCESE_LOGO }}
          style={{ width: 48, height: 48 }}
          resizeMode="contain"
        />
        <View className="ml-3">
          <Text className="text-gray-500 text-xs font-medium uppercase tracking-wider">The Roman Catholic</Text>
          <Text className="text-gray-900 text-lg font-bold tracking-tight">DIOCESE OF TAGUM</Text>
        </View>
      </Pressable>

      <View className="flex-row items-center space-x-6">
        <Pressable onPress={handleHome} className="cursor-pointer hover:text-blue-800">
          <Text className="text-gray-700 text-base font-medium">Home</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/parishes')} className="cursor-pointer hover:text-blue-800">
          <Text className="text-gray-700 text-base font-medium">Parishes</Text>
        </Pressable>

        {/* Search */}
        <Pressable
          onPress={handleSearch}
          className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors ml-4"
        >
          <Search size={18} color="#4b5563" />
          <Text className="text-gray-600 font-medium ml-2">Search</Text>
        </Pressable>

        {/* Auth */}
        {isAuthenticated && user ? (
          <Pressable
            onPress={handleLogoutPress}
            className="flex-row items-center bg-[#1e3a5f] px-4 py-2 rounded-full cursor-pointer hover:bg-blue-900 transition-colors"
          >
            {user.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={{ width: 24, height: 24, borderRadius: 12 }} />
            ) : (
              <View className="w-6 h-6 rounded-full bg-white/20 items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {(user.displayName || user.email || '?').charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text className="text-white font-semibold mx-2">
              {(user.displayName || user.email || '').split(' ')[0]}
            </Text>
            <LogOut size={16} color="rgba(255,255,255,0.8)" />
          </Pressable>
        ) : (
          <Pressable
            onPress={handleLoginPress}
            className="flex-row items-center bg-[#1e3a5f] px-5 py-2 rounded-full cursor-pointer hover:bg-blue-900 transition-colors"
          >
            <User size={18} color="#ffffff" />
            <Text className="text-white font-semibold ml-2">Log In</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
