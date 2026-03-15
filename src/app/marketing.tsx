import React from 'react';
import { View, Text, ScrollView, Platform, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Download, MapPin, Search, Users } from 'lucide-react-native';

export default function MarketingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: Platform.OS !== 'web' ? insets.top : 0 }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shadow-sm z-10 md:hidden">
        <View className="w-10">
          <ChevronLeft 
            color="#3D2914" 
            size={44} 
            onPress={handleBack}
            className="hidden md:flex" 
          />
        </View>
        <Text className="text-xl font-bold text-gray-800 text-center flex-1">Diocese of Tagum</Text>
        <View className="w-10 text-right pr-2">
            <Text className="text-sm font-semibold text-[#8B5E34]" onPress={handleBack}>Home</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="bg-[#1e3a5f] px-6 py-16 items-center justify-center">
          <Text className="text-4xl md:text-5xl font-bold text-white text-center mb-4 tracking-tight">
            The Roman Catholic Diocese of Tagum
          </Text>
          <Text className="text-lg md:text-xl text-blue-100 text-center max-w-2xl mb-8 leading-relaxed">
            Your comprehensive digital directory for parishes, clergy, schools, and ministries across the Diocese of Tagum.
          </Text>
          
          <Pressable 
            onPress={() => router.replace('/welcome')}
            className="bg-white px-8 py-4 rounded-full flex-row items-center shadow-lg active:scale-95 duration-150"
          >
            <Text className="text-[#1e3a5f] font-bold text-lg mr-2">Open Web App</Text>
          </Pressable>
        </View>

        {/* Features Grid */}
        <View className="px-6 py-16 md:max-w-6xl md:mx-auto">
          <Text className="text-3xl font-bold text-[#3D2914] text-center mb-12">Discover Our Network</Text>
          
          <View className="flex-col md:flex-row flex-wrap md:justify-center gap-8">
            {/* Feature 1 */}
            <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 min-w-[300px] max-w-[400px]">
              <View className="bg-blue-50 w-16 h-16 rounded-full items-center justify-center mb-4">
                <Search size={32} color="#1e3a5f" />
              </View>
              <Text className="text-xl font-bold text-gray-800 mb-2">Complete Directory</Text>
              <Text className="text-gray-600 leading-relaxed">
                Easily search and browse through all parishes, Catholic schools, congregations, and clergy members in the diocese.
              </Text>
            </View>

            {/* Feature 2 */}
            <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 min-w-[300px] max-w-[400px]">
              <View className="bg-amber-50 w-16 h-16 rounded-full items-center justify-center mb-4">
                <MapPin size={32} color="#8B5E34" />
              </View>
              <Text className="text-xl font-bold text-gray-800 mb-2">GPS Routing</Text>
              <Text className="text-gray-600 leading-relaxed">
                Get accurate turn-by-turn directions directly to any parish or facility with our smart mapping integration.
              </Text>
            </View>

            {/* Feature 3 */}
            <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 min-w-[300px] max-w-[400px]">
              <View className="bg-green-50 w-16 h-16 rounded-full items-center justify-center mb-4">
                <Users size={32} color="#166534" />
              </View>
              <Text className="text-xl font-bold text-gray-800 mb-2">Connect & Engage</Text>
              <Text className="text-gray-600 leading-relaxed">
                Stay updated with Basic Ecclesial Communities (BEC) and official pastoral documents right from your device.
              </Text>
            </View>
          </View>
        </View>

        {/* Support Section */}
        <View className="bg-white px-6 py-16 border-t border-gray-200">
          <View className="md:max-w-4xl md:mx-auto items-center text-center">
            <Text className="text-2xl font-bold text-gray-800 mb-4">Need Assistance?</Text>
            <Text className="text-gray-600 mb-6 text-center leading-relaxed">
              If you have any questions or require support regarding the application, please reach out via our official channels.
            </Text>
            <View className="flex-row items-center justify-center gap-4">
              <Pressable onPress={() => router.push('/privacy')}>
                <Text className="text-[#1e3a5f] font-medium hover:underline">Privacy Policy</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View className="p-8 pb-12 bg-gray-50 items-center">
          <Text className="text-gray-400 text-sm">© 2026 The Roman Catholic Diocese of Tagum. All rights reserved.</Text>
        </View>

      </ScrollView>
    </View>
  );
}
