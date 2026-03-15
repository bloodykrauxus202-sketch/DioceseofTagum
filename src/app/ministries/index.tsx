import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, List, Map } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ministriesData } from '@/lib/data/ministries-data';
import BottomNavBar from '@/components/BottomNavBar';
import MapWebView from '@/components/MapWebView';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const EMPTY_MAP_HTML = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:100%;height:100%;overflow:hidden;}
#map{width:100%;height:100%;}
.info-box{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,0.95);border-radius:12px;padding:10px 18px;font-family:-apple-system,sans-serif;font-size:17px;color:#6b7280;z-index:1000;white-space:nowrap;box-shadow:0 2px 12px rgba(0,0,0,0.12);}
</style>
</head>
<body>
<div id="map"></div>
<div class="info-box">No locations available yet</div>
<script>
var philippinesBounds = L.latLngBounds(L.latLng(4.5,116.5),L.latLng(21.0,127.0));
var map = L.map('map',{zoomControl:true,attributionControl:false,minZoom:6,maxBounds:philippinesBounds,maxBoundsViscosity:0.9});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18}).addTo(map);
map.setView([7.4478, 125.8078], 10);
setTimeout(function(){ map.invalidateSize(); }, 100);
</script>
</body>
</html>`;

export default function MinistriesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [view, setView] = useState<'list' | 'map'>('list');

  return (
    <View className="flex-1" style={{ backgroundColor: '#F5F1EB' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#F5F1EB',
          paddingTop: insets.top,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(139, 90, 43, 0.15)',
        }}
      >
        <View className="flex-row items-center px-3" style={{ paddingVertical: 8 }}>
          <Pressable
            onPress={() => router.back()}
            className="p-1.5 active:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={22} color="#3D2914" />
          </Pressable>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
            <Text
              style={{ fontSize: 21, fontWeight: '700', color: '#3D2914' }}
            >
              Ministries
            </Text>
            <View style={{
              backgroundColor: '#8B5A2B',
              borderRadius: 10,
              paddingHorizontal: 9,
              paddingVertical: 3,
              marginLeft: 8,
              justifyContent: 'center',
            }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>
                {ministriesData.length}
              </Text>
            </View>
          </View>
          {/* List/Map Toggle */}
          <View style={{ flexDirection: 'row', backgroundColor: 'rgba(139,90,43,0.1)', borderRadius: 10, padding: 3, gap: 2 }}>
            <Pressable
              onPress={() => setView('list')}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 5,
                paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8,
                backgroundColor: view === 'list' ? '#fff' : 'transparent',
              }}
            >
              <List size={16} color={view === 'list' ? '#8B5A2B' : '#C4A574'} />
              <Text style={{ fontSize: 17, fontWeight: '600', color: view === 'list' ? '#8B5A2B' : '#C4A574' }}>List</Text>
            </Pressable>
            <Pressable
              onPress={() => setView('map')}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 5,
                paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8,
                backgroundColor: view === 'map' ? '#fff' : 'transparent',
              }}
            >
              <Map size={16} color={view === 'map' ? '#8B5A2B' : '#C4A574'} />
              <Text style={{ fontSize: 17, fontWeight: '600', color: view === 'map' ? '#8B5A2B' : '#C4A574' }}>Map</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Map View */}
      {view === 'map' && (
        <MapWebView html={EMPTY_MAP_HTML} />
      )}

      {/* List View */}
      {view === 'list' && (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Banner */}
          <Animated.View
            entering={FadeInDown.delay(50)}
            className="items-center mb-6 py-6"
          >
            {/* Cross Icon */}
            <View className="flex-row items-center justify-center mb-4">
              <View style={{ width: 50, height: 1, backgroundColor: '#8B5A2B' }} />
              <View className="mx-4">
                <Text style={{ fontSize: 28, color: '#8B5A2B', opacity: 0.6 }}>✝</Text>
              </View>
              <View style={{ width: 50, height: 1, backgroundColor: '#8B5A2B' }} />
            </View>

            <Text
              className="font-bold text-center mb-2"
              style={{ color: '#3D2914', letterSpacing: 0.5, fontSize: 21 }}
            >
              Ministries & Apostolates
            </Text>
            <Text
              className="text-center italic"
              style={{ color: '#6B5344', fontSize: 17 }}
            >
              Diocese of Tagum
            </Text>
          </Animated.View>

          {/* Ministry Count */}
          <View className="flex-row items-center mb-4">
            <Text
              className="text-base uppercase tracking-widest"
              style={{ color: '#8B5A2B', fontWeight: '500' }}
            >
              {ministriesData.length} MINISTRIES
            </Text>
            <View
              className="flex-1 ml-3"
              style={{ height: 1, backgroundColor: 'rgba(139, 90, 43, 0.3)' }}
            />
          </View>

          {/* Ministry List */}
          {ministriesData.map((ministry, index) => (
            <AnimatedPressable
              key={ministry.id}
              entering={FadeInDown.delay(100 + index * 40)}
              onPress={() => router.push(`/ministries/${ministry.id}`)}
              className="mb-4 rounded-xl overflow-hidden active:opacity-90"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderWidth: 1,
                borderColor: 'rgba(196, 165, 116, 0.25)',
              }}
            >
              <View className="p-5">
                {/* Cross decoration */}
                <View
                  className="absolute top-4 right-4"
                  style={{ opacity: 0.15 }}
                >
                  <Text style={{ fontSize: 24, color: '#8B5A2B' }}>✝</Text>
                </View>

                {/* Ministry Name */}
                <Text
                  className="text-2xl font-bold pr-10 mb-3"
                  style={{ color: '#3D2914', lineHeight: 28 }}
                >
                  {ministry.name}
                </Text>

                {/* Coordinator */}
                <View className="flex-row items-center mb-2">
                  <Text
                    className="text-sm uppercase tracking-wider mr-2"
                    style={{ color: '#8B5A2B', fontWeight: '500' }}
                  >
                    Coordinator
                  </Text>
                  <View
                    style={{ width: 20, height: 1, backgroundColor: '#C4A574' }}
                  />
                  <Text
                    className="text-lg ml-2"
                    style={{ color: '#5D4930', fontWeight: '500' }}
                  >
                    {ministry.coordinator}
                  </Text>
                </View>

                {/* Arrow indicator */}
                <View className="absolute right-4 bottom-5">
                  <ChevronRight size={22} color="#C4A574" />
                </View>
              </View>
            </AnimatedPressable>
          ))}

          {/* Footer Quote */}
          <View
            className="mt-8 pt-6"
            style={{ borderTopWidth: 1, borderTopColor: 'rgba(139, 90, 43, 0.15)' }}
          >
            <Text
              className="text-lg text-center italic"
              style={{ color: '#8B7355' }}
            >
              "Go therefore and make disciples of all nations" — Matthew 28:19
            </Text>
          </View>
        </ScrollView>
      )}
      <BottomNavBar />
    </View>
  );
}
