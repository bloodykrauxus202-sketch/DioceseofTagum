import { Text, View, Image, Pressable, ScrollView, useWindowDimensions, Alert, Modal } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, User, Church, LogOut } from 'lucide-react-native';
import BottomNavBar from '@/components/BottomNavBar';
import { useAuth } from '@/lib/auth-context';

// Diocese of Tagum logo
const DIOCESE_LOGO = 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/diocese_of_tagum_1770014167005_019c1d10-cfdd-7029-ad3a-c72fae1501ab.png';

// Directory icons in order: Parishes, BECs, Clergy, Vicariates, DCLAIM, Ministries, Schools, Congregations, Corporations, Documents, Surveys, Daily Readings, Rites, Diocesan Events, Daditama Events, Pastoral, Disaster Management
const DIRECTORY_ITEMS = [
  // Row 1
  { id: 1, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/parish_1770014167055_019c1d10-d00f-743e-a987-237debd39276.png', label: 'Parishes' },
  { id: 2, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/bec_1770014166604_019c1d10-ce4c-73ec-8b14-ec53d8ae6ec8.png', label: 'BECs/GKKs' },
  { id: 3, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/priest_1770014167003_019c1d10-cfdb-719a-b148-69972e03d671.png', label: 'Clergy' },
  // Row 2
  { id: 4, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/vicariate_1770014167009_019c1d10-cfe1-7288-9416-914e3b6e55aa.png', label: 'Vicariates' },
  { id: 5, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/dclaim_1770014166994_019c1d10-cfd2-772d-981c-517adc3d0e45.png', label: 'DCLAIM' },
  { id: 6, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/ministry_1770014167002_019c1d10-cfda-72db-b606-9deae6c8ee12.png', label: 'Apostolates & Ministries' },
  // Row 3
  { id: 7, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/schools_1770014167026_019c1d10-cff2-7388-8bf0-16ec28cf5e5e.png', label: 'Schools' },
  { id: 8, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/congregation_1770014166641_019c1d10-ce71-70ab-8535-493aa862c385.png', label: 'Congregations' },
  { id: 9, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/corporations_1770014166668_019c1d10-ce8c-75b1-b04f-5e8b0c50bfe9.png', label: 'Corporations' },
  // Row 4
  { id: 10, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/circular_letter_1770014166649_019c1d10-ce79-71bf-b7c4-3ae777b9167e.png', label: 'Documents' },
  { id: 11, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/survey_1770014167138_019c1d10-d062-769f-a684-64aeb6ea4c34.png', label: 'Surveys' },
  { id: 12, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/daily_readings_1770014166845_019c1d10-cf3d-769d-8b64-eccdce6f999e.png', label: 'Daily Readings' },
  // Row 5
  { id: 13, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/rites_1770968311158_019c55ef-e576-735e-9ca7-ca9b54428fd7.png', label: 'Rites' },
  { id: 14, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/diocesan_events_1770968311161_019c55ef-e579-751d-bfe3-4f80fb82267b.png', label: 'Diocesan Events' },
  { id: 15, uri: 'https://images.composerapi.com/019c1d10-9a1d-732f-93cc-606c5e55b508/assets/images/daditama_events_1770968311155_019c55ef-e573-720d-a64e-b7ab1db2fbc1.png', label: 'Daditama Events' },
  // Row 6
  { id: 16, uri: require('@/assets/images/pastoral.jpg'), label: 'Pastoral' },
  { id: 17, uri: require('@/assets/images/disaster_management.jpg'), label: 'Disaster Management' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const { isAuthenticated, user, signOut } = useAuth();
  const [showAboutUs, setShowAboutUs] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(Math.min(screenWidth, 1280));

  const topPadding = insets.top + 4;
  const logoSize = Math.min(screenWidth * 0.44, 176);

  const handleDirectoryPress = (item: typeof DIRECTORY_ITEMS[0]) => {
    console.log(`Pressed: ${item.label}`);
    if (item.label === 'Parishes') {
      router.push('/parishes');
    } else if (item.label === 'Clergy') {
      router.push('/clergy');
    } else if (item.label === 'Vicariates') {
      router.push('/vicariates');
    } else if (item.label === 'BECs/GKKs') {
      router.push('/bec');
    } else if (item.label === 'Apostolates & Ministries') {
      router.push('/ministries');
    } else if (item.label === 'Congregations') {
      router.push('/congregations');
    } else if (item.label === 'DCLAIM') {
      router.push('/dclaim');
    } else if (item.label === 'Schools') {
      router.push('/schools');
    } else if (item.label === 'Corporations') {
      router.push('/corporations');
    } else if (item.label === 'Documents') {
      router.push('/documents');
    } else if (item.label === 'Pastoral') {
      router.push('/pastoral');
    } else if (item.label === 'Surveys') {
      if (!isAuthenticated) {
        Alert.alert(
          'Login Required',
          'You must be logged in to answer surveys. Please sign in with Google or Facebook to continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log In', onPress: () => router.push('/(tabs)/login') },
          ]
        );
      } else {
        router.push('/surveys');
      }
    } else if (item.label === 'Disaster Management') {
      router.push('/disaster-management');
    }
  };

  const handleSearchPress = () => {
    router.push('/(tabs)/search');
  };

  const handleLoginPress = () => {
    router.push('/(tabs)/login');
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Sign Out',
      `Sign out as ${user?.displayName || user?.email || 'user'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => signOut() },
      ]
    );
  };

  // Direct rendering of items using flex row wrap
  const items = DIRECTORY_ITEMS;

  return (
    <View className="flex-1 bg-white">
      {/* Top Header Bar - Search (left) and Login (right) - hidden on desktop */}
      <View
        className="md:hidden"
        style={{
          paddingTop: topPadding,
          paddingHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 4,
        }}
      >
        {/* Search Button - Upper Left */}
        <Pressable
          onPress={handleSearchPress}
          className="active:opacity-70"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f3f4f6',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 14,
            gap: 5,
          }}
        >
          <Search size={16} color="#6b7280" strokeWidth={2} />
          <Text style={{ color: '#6b7280', fontSize: 17, fontWeight: '500' }}>Search</Text>
        </Pressable>

        {/* Login/Logout Button - Upper Right */}
        {isAuthenticated && user ? (
          <Pressable
            onPress={handleLogoutPress}
            className="active:opacity-70"
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#1e3a5f',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 14,
              gap: 6,
            }}
          >
            {user.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={{ width: 22, height: 22, borderRadius: 11 }}
              />
            ) : (
              <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>
                  {(user.displayName || user.email || '?').charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '600' }} numberOfLines={1}>
              {(user.displayName || user.email || '').split(' ')[0]}
            </Text>
            <LogOut size={13} color="rgba(255,255,255,0.7)" strokeWidth={2} />
          </Pressable>
        ) : (
          <Pressable
            onPress={handleLoginPress}
            className="active:opacity-70"
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#1e3a5f',
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 14,
              gap: 5,
            }}
          >
            <User size={15} color="#ffffff" strokeWidth={2} />
            <Text style={{ color: '#ffffff', fontSize: 17, fontWeight: '600' }}>Log In</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 12,
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Diocese Logo */}
        <View className="items-center" style={{ paddingTop: 4, paddingBottom: 6 }}>
          <Pressable onPress={() => setShowAboutUs(true)} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
            <Image
              source={{ uri: DIOCESE_LOGO }}
              style={{ width: logoSize, height: logoSize }}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={{ color: '#6b7280', fontSize: 14, fontWeight: '500', marginTop: 2, textAlign: 'center' }}>
            The Roman Catholic
          </Text>
          <Text style={{ color: '#111827', fontSize: 17, fontWeight: '800', textAlign: 'center', letterSpacing: 0.3 }}>
            DIOCESE OF TAGUM
          </Text>
        </View>

        {/* Directory Grid */}
        <View 
          className="flex-row flex-wrap justify-center mt-4"
          onLayout={(e) => {
            setContainerWidth(e.nativeEvent.layout.width);
          }}
        >
          {items.map((item) => {
            // Determine column count and exact pixel sizing
            // On Mobile: 3 columns. On Tablet: 4 columns. On Large Desktop: 6 columns.
            const columns = screenWidth >= 1024 ? 6 : screenWidth >= 768 ? 4 : 3;
            const itemWidth = containerWidth > 0 ? (containerWidth / columns) - 16 : 100;
            // Cap the image size so it isn't ridiculously huge on desktop, and compress it carefully on mobile
            const imageSize = Math.min(itemWidth * 0.8, screenWidth < 768 ? 72 : 110);
            
            return (
              <Pressable
                key={item.id}
                onPress={() => handleDirectoryPress(item)}
                className="active:opacity-70 active:scale-95 items-center justify-start p-2 mb-4"
                style={{ width: containerWidth > 0 ? containerWidth / columns : '33.33%' }}
              >
                {item.uri ? (
                  <Image
                    source={typeof item.uri === 'string' ? { uri: item.uri } : item.uri}
                    style={{ width: imageSize, height: imageSize, marginBottom: 8 }}
                    resizeMode="contain"
                  />
                ) : (
                  <View 
                    style={{ width: imageSize, height: imageSize, marginBottom: 8 }}
                    className="bg-gray-100 rounded-2xl items-center justify-center border-2 border-gray-200 border-dashed"
                  >
                    <Church size={imageSize * 0.4} color="#9ca3af" strokeWidth={1.5} />
                  </View>
                )}
                <Text
                  className="text-gray-700 font-semibold text-center leading-tight"
                  style={{ fontSize: screenWidth < 768 ? 12 : 14.5, width: '100%' }}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* About Us Modal */}
      <Modal
        visible={showAboutUs}
        animationType="slide"
        transparent
        onRequestClose={() => setShowAboutUs(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '92%' }}>
            {/* Modal Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 26, fontWeight: '800', color: '#111827' }}>About Us</Text>
                <Text style={{ fontSize: 15, color: '#6b7280', marginTop: 2 }}>Diocese of Tagum</Text>
              </View>
              <Pressable
                onPress={() => setShowAboutUs(false)}
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontSize: 18, color: '#6b7280', fontWeight: '600' }}>✕</Text>
              </Pressable>
            </View>

            <ScrollView
              contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Diocese Logo */}
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Image
                  source={{ uri: DIOCESE_LOGO }}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
              </View>

              {/* Description */}
              <Text style={{ fontSize: 16, color: '#374151', lineHeight: 24, marginBottom: 20 }}>
                The Diocese of Tagum is a Roman Catholic diocese serving the faithful in Davao del Norte and Davao de Oro. Established as the Territorial Prelature of Tagum on January 13, 1962, and elevated as a diocese on October 11, 1980, it continues its mission of evangelization, pastoral care, and Christian formation in the local Church.
              </Text>

              {/* Info Card */}
              <View style={{ backgroundColor: '#f8faff', borderRadius: 16, padding: 18, borderWidth: 1, borderColor: '#e0e7ff', marginBottom: 16 }}>
                {[
                  { label: 'Current Bishop', value: 'Most Rev. Medil Sacay Aseo, D.D.' },
                  { label: "Bishop's Residence", value: 'Clergy Development Center, Seminary Drive, Tagum City' },
                  { label: 'Contact Numbers', value: '(084) 308-0648 / (084) 655-6499' },
                  { label: 'Cathedral', value: 'Christ the King Cathedral, Tagum City' },
                  { label: 'Territory', value: 'Davao del Norte and Davao de Oro' },
                  { label: 'Official Website', value: 'dioceseoftagum.com' },
                ].map((item, i, arr) => (
                  <View key={item.label} style={{ paddingVertical: 10, borderBottomWidth: i < arr.length - 1 ? 1 : 0, borderBottomColor: '#e0e7ff' }}>
                    <Text style={{ fontSize: 13, fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>{item.label}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1e3a5f' }}>{item.value}</Text>
                  </View>
                ))}
              </View>

              {/* Stats Row */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                {[
                  { count: '37', label: 'Parishes' },
                  { count: '18', label: 'Quasi-Parishes' },
                  { count: '2', label: 'Chaplaincies' },
                  { count: '1', label: 'Shrine' },
                  { count: '2,322', label: 'GKKs' },
                ].map(stat => (
                  <View key={stat.label} style={{ backgroundColor: '#1e3a5f', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, alignItems: 'center', minWidth: 80 }}>
                    <Text style={{ fontSize: 22, fontWeight: '800', color: '#fff' }}>{stat.count}</Text>
                    <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>{stat.label}</Text>
                  </View>
                ))}
              </View>

              {/* Episcopal Succession */}
              <View style={{ backgroundColor: '#fffbf0', borderRadius: 16, padding: 18, borderWidth: 1, borderColor: '#fde68a' }}>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#92400e', marginBottom: 12, letterSpacing: 0.3 }}>Episcopal Succession</Text>
                {[
                  { name: 'Most Rev. Medil Sacay Aseo, D.D.', years: '2018–Present' },
                  { name: 'Most Rev. Wilfredo Dasco Manlapaz, D.D.', years: '1986–2018' },
                  { name: 'Most Rev. Pedro Rosales Dean, D.D.', years: '1980–1985' },
                  { name: 'Most Rev. Joseph William Regan, M.M.', years: '1962–1980' },
                ].map((bishop, i, arr) => (
                  <View key={bishop.name} style={{ flexDirection: 'row', paddingVertical: 10, borderBottomWidth: i < arr.length - 1 ? 1 : 0, borderBottomColor: '#fde68a', alignItems: 'flex-start', gap: 12 }}>
                    <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#fde68a', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <Text style={{ fontSize: 14, fontWeight: '700', color: '#92400e' }}>{i + 1}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: '#1a1d23' }}>{bishop.name}</Text>
                      <Text style={{ fontSize: 14, color: '#92400e', marginTop: 2 }}>{bishop.years}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Bar */}
      <BottomNavBar currentScreen="home" />
    </View>
  );
}
