import React from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

export default function PrivacyPolicyScreen() {
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
    <View className="flex-1 bg-white" style={{ paddingTop: Platform.OS !== 'web' ? insets.top : 0 }}>
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
        <Text className="text-xl font-bold text-gray-800 text-center flex-1">Privacy Policy</Text>
        <View className="w-10 text-right pr-2">
            <Text className="text-sm font-semibold text-[#8B5E34]" onPress={handleBack}>Done</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6 md:max-w-4xl md:mx-auto md:px-8 shadow-sm rounded-lg my-4 md:bg-white md:border md:border-gray-200">
        <Text className="text-3xl font-bold text-[#3D2914] mb-6 md:mt-4">Privacy Policy</Text>
        
        <Text className="text-gray-600 mb-6 leading-relaxed text-base">
          Last Updated: March 2026
        </Text>

        <Text className="text-gray-700 mb-6 leading-relaxed text-base">
          The Roman Catholic Diocese of Tagum ("we," "us," or "our") operates the Diocese of Tagum mobile application and website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </Text>

        <Text className="text-xl font-semibold text-[#1e3a5f] mt-4 mb-3">1. Information Collection and Use</Text>
        <Text className="text-gray-700 mb-6 leading-relaxed text-base">
          We collect several different types of information for various purposes to provide and improve our Service to you. The Diocese of Tagum app does not require you to create an account for general directory browsing. We only collect data that is strictly necessary for core functionality and map directions.
        </Text>

        <Text className="text-xl font-semibold text-[#1e3a5f] mt-4 mb-3">2. Location Data</Text>
        <Text className="text-gray-700 mb-6 leading-relaxed text-base">
          We may use and store information about your location if you give us permission to do so ("Location Data"). We use this data to provide features of our Service, specifically to provide accurate external map routes and directions to parishes, schools, and offices. You can enable or disable location services when you use our Service at any time, through your device settings.
        </Text>

        <Text className="text-xl font-semibold text-[#1e3a5f] mt-4 mb-3">3. Service Providers</Text>
        <Text className="text-gray-700 mb-6 leading-relaxed text-base">
          We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </Text>

        <Text className="text-xl font-semibold text-[#1e3a5f] mt-4 mb-3">4. Security of Data</Text>
        <Text className="text-gray-700 mb-6 leading-relaxed text-base">
          The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </Text>

        <Text className="text-xl font-semibold text-[#1e3a5f] mt-4 mb-3">5. Changes to This Privacy Policy</Text>
        <Text className="text-gray-700 mb-6 leading-relaxed text-base">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </Text>

        <Text className="text-xl font-semibold text-[#1e3a5f] mt-4 mb-3">6. Contact Us</Text>
        <Text className="text-gray-700 mb-12 leading-relaxed text-base">
          If you have any questions about this Privacy Policy, please contact us by visiting our official directory.
        </Text>
      </ScrollView>
    </View>
  );
}
