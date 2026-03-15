import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Lock, LogIn, ClipboardList } from 'lucide-react-native';
import { useAuth } from '@/lib/auth-context';
import BottomNavBar from '@/components/BottomNavBar';

export default function SurveysScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  // Not logged in — show login prompt
  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        {/* Header */}
        <View
          style={{
            paddingTop: insets.top,
            backgroundColor: '#1e3a5f',
            paddingHorizontal: 16,
            paddingBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: 'rgba(255,255,255,0.15)',
              alignItems: 'center', justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <ChevronLeft size={22} color="#fff" strokeWidth={2.5} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>Surveys</Text>
            <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, marginTop: 1 }}>Diocese of Tagum</Text>
          </View>
          <ClipboardList size={24} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
        </View>

        {/* Login Required Body */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
          {/* Lock Icon */}
          <View
            style={{
              width: 88, height: 88, borderRadius: 44,
              backgroundColor: '#1e3a5f',
              alignItems: 'center', justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <Lock size={40} color="#fff" strokeWidth={1.5} />
          </View>

          <Text style={{ fontSize: 24, fontWeight: '800', color: '#111827', textAlign: 'center', marginBottom: 10 }}>
            Login Required
          </Text>
          <Text style={{ fontSize: 16, color: '#6b7280', textAlign: 'center', lineHeight: 24, marginBottom: 32 }}>
            You must be logged in to view and answer surveys. This helps us prevent spam and ensure that responses come from members of the Diocese of Tagum community.
          </Text>

          <Pressable
            onPress={() => router.push('/(tabs)/login')}
            style={({ pressed }) => ({
              backgroundColor: '#1e3a5f',
              borderRadius: 14,
              height: 54,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 32,
              gap: 10,
              opacity: pressed ? 0.85 : 1,
              width: '100%',
            })}
          >
            <LogIn size={20} color="#fff" strokeWidth={2} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Sign In</Text>
          </Pressable>

          <Text style={{ fontSize: 14, color: '#9ca3af', textAlign: 'center', marginTop: 16 }}>
            Sign in with Google or Facebook
          </Text>
        </View>

        <BottomNavBar />
      </View>
    );
  }

  // Logged in — show surveys list (placeholder for now)
  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top,
          backgroundColor: '#1e3a5f',
          paddingHorizontal: 16,
          paddingBottom: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: 'rgba(255,255,255,0.15)',
            alignItems: 'center', justifyContent: 'center',
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <ChevronLeft size={22} color="#fff" strokeWidth={2.5} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>Surveys</Text>
          <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, marginTop: 1 }}>
            Welcome, {user?.displayName?.split(' ')[0] || 'User'}
          </Text>
        </View>
        <ClipboardList size={24} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Coming Soon Placeholder */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 32,
            alignItems: 'center',
            marginTop: 24,
            borderWidth: 1,
            borderColor: '#e5e7eb',
          }}
        >
          <ClipboardList size={48} color="#d1d5db" strokeWidth={1} />
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginTop: 16, textAlign: 'center' }}>
            No Active Surveys
          </Text>
          <Text style={{ fontSize: 15, color: '#9ca3af', textAlign: 'center', marginTop: 8, lineHeight: 22 }}>
            There are no surveys available at the moment. Check back later for surveys from the Diocese of Tagum.
          </Text>
        </View>
      </ScrollView>

      <BottomNavBar />
    </View>
  );
}
