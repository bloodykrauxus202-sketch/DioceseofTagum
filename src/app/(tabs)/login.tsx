import { View, Text, Pressable, Image, ActivityIndicator, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/lib/auth-context';
import BottomNavBar from '@/components/BottomNavBar';
import { AlertCircle, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';

const DIOCESE_LOGO = 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/diocese_of_tagum_1770014167005_019c1d10-cfdd-7029-ad3a-c72fae1501ab.png';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { user, isLoading, isAuthenticated, error, signInWithGoogle, signInWithFacebook, clearError } = useAuth();

  // Logo: 65% of screen width — big on all devices
  const logoSize = screenWidth * 0.65;
  // Top section height
  const topHeight = screenHeight * 0.44 + insets.top;
  // Button width: fixed padding on all screen sizes
  const btnWidth = screenWidth - 48;

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace('/(tabs)/');
    }
  }, [isAuthenticated, user]);

  const handleGoogleLogin = async () => {
    try { await signInWithGoogle(); } catch (err) { console.error(err); }
  };

  const handleFacebookLogin = async () => {
    try { await signInWithFacebook(); } catch (err) { console.error(err); }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(59,130,246,0.25)', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1e3a5f" />
        <Text style={{ color: '#1e3a5f', marginTop: 16, fontSize: 17 }}>Signing in...</Text>
      </View>
    );
  }

  if (isAuthenticated && user) {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(59,130,246,0.25)', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1e3a5f" />
        <Text style={{ color: '#1e3a5f', marginTop: 16, fontSize: 17 }}>Redirecting...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* TOP: light transparent blue, very big logo */}
      <View style={[styles.topSection, { height: topHeight, paddingTop: insets.top + 16 }]}>
        <Image
          source={{ uri: DIOCESE_LOGO }}
          style={{ width: logoSize, height: logoSize }}
          resizeMode="contain"
        />
        <Text style={styles.welcomeTitle}>Welcome to DATOS</Text>
        <Text style={styles.welcomeSub}>Diocese of Tagum Directory</Text>
      </View>

      {/* Curved white cap */}
      <View style={styles.curvedCap} />

      {/* BOTTOM: sign in buttons */}
      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.signInTitle}>Sign in to continue</Text>
        <Text style={styles.signInSub}>Choose your preferred sign-in method</Text>

        {/* Error */}
        {error && (
          <View style={[styles.errorBox, { width: btnWidth }]}>
            <AlertCircle size={20} color="#dc2626" strokeWidth={2} />
            <Text style={styles.errorText}>{error}</Text>
            <Pressable onPress={clearError} hitSlop={10}>
              <X size={18} color="#dc2626" strokeWidth={2} />
            </Pressable>
          </View>
        )}

        {/* Google Button */}
        <GoogleButton width={btnWidth} onPress={handleGoogleLogin} disabled={isLoading} />

        <View style={{ height: 18 }} />

        {/* Facebook Button */}
        <FacebookButton width={btnWidth} onPress={handleFacebookLogin} disabled={isLoading} />

        {/* Terms */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>

      <BottomNavBar currentScreen="login" />
    </View>
  );
}

// ── Separate stateless button components avoid style-function issues on iPad ──

function GoogleButton({ width, onPress, disabled }: { width: number; onPress: () => void; disabled: boolean }) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.googleBtn,
        { width, backgroundColor: pressed ? '#f3f4f6' : '#ffffff', opacity: disabled ? 0.6 : 1 },
      ]}
    >
      <View style={styles.gIconCircle}>
        <Text style={styles.gIconText}>G</Text>
      </View>
      <Text style={styles.googleBtnText}>Continue with Google</Text>
    </Pressable>
  );
}

function FacebookButton({ width, onPress, disabled }: { width: number; onPress: () => void; disabled: boolean }) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.facebookBtn,
        { width, backgroundColor: pressed ? '#1565c0' : '#1877F2', opacity: disabled ? 0.6 : 1 },
      ]}
    >
      <View style={styles.fIconCircle}>
        <Text style={styles.fIconText}>f</Text>
      </View>
      <Text style={styles.facebookBtnText}>Continue with Facebook</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(59,130,246,0.22)',
  },
  curvedCap: {
    marginTop: -26,
    height: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  welcomeTitle: {
    color: '#1e3a5f',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 14,
    letterSpacing: 0.3,
  },
  welcomeSub: {
    color: '#374151',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 6,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  signInTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  signInSub: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    flex: 1,
    marginLeft: 10,
  },
  // Google button — all layout in StyleSheet (not callback)
  googleBtn: {
    height: 62,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#d1d5db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  gIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  gIconText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4285F4',
  },
  googleBtnText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
  },
  // Facebook button — all layout in StyleSheet (not callback)
  facebookBtn: {
    height: 62,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1251a3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1877F2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  fIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  fIconText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1877F2',
    lineHeight: 28,
  },
  facebookBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  termsText: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 28,
    paddingHorizontal: 32,
  },
  termsLink: {
    color: '#2563eb',
  },
});
