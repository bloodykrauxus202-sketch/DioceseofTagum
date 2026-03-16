import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Lock } from 'lucide-react-native';

export default function RestrictedClergyDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white border-b border-gray-200" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center px-3" style={{ paddingVertical: 8 }}>
          <Pressable
            onPress={() => router.back()}
            className="p-1.5 active:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={22} color="#4b5563" />
          </Pressable>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
            <Text style={{ fontSize: 21, fontWeight: '700', color: '#111827' }}>Access Denied</Text>
          </View>
        </View>
      </View>

      <View className="flex-1 items-center justify-center p-8">
        <Lock size={64} color="#ef4444" />
        <Text className="text-2xl text-center text-red-600 font-bold mt-6 mb-3">
          Protected Area
        </Text>
        <Text className="text-lg text-center text-gray-700">
          You don't have enough credential to access.
        </Text>
      </View>
    </View>
  );
}
