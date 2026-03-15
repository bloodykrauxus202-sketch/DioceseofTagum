import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, List, Map } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { dclaimGroups } from '@/lib/data/dclaim-data';
import BottomNavBar from '@/components/BottomNavBar';
import MapWebView from '@/components/MapWebView';

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

export default function DclaimListScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [view, setView] = useState<'list' | 'map'>('list');

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        className="bg-white border-b border-gray-200"
        style={{ paddingTop: insets.top }}
      >
        <View className="flex-row items-center px-3" style={{ paddingVertical: 8 }}>
          <Pressable
            onPress={() => router.back()}
            className="p-1.5 active:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={22} color="#4b5563" />
          </Pressable>
          <View className="flex-1 ml-2">
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 21, fontWeight: '700', color: '#111827' }}>
                DCLAIM
              </Text>
              <View style={{
                backgroundColor: '#1d4ed8',
                borderRadius: 10,
                paddingHorizontal: 9,
                paddingVertical: 3,
                marginLeft: 8,
                justifyContent: 'center',
              }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>
                  {dclaimGroups.length}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 15, color: '#6b7280' }} numberOfLines={1}>
              Diocesan Council of Lay Apostolates and Integrated Movements
            </Text>
          </View>
          {/* List/Map Toggle */}
          <View style={{ flexDirection: 'row', backgroundColor: '#f3f4f6', borderRadius: 10, padding: 3, gap: 2 }}>
            <Pressable
              onPress={() => setView('list')}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 5,
                paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8,
                backgroundColor: view === 'list' ? '#fff' : 'transparent',
              }}
            >
              <List size={16} color={view === 'list' ? '#1d4ed8' : '#9ca3af'} />
              <Text style={{ fontSize: 17, fontWeight: '600', color: view === 'list' ? '#1d4ed8' : '#9ca3af' }}>List</Text>
            </Pressable>
            <Pressable
              onPress={() => setView('map')}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 5,
                paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8,
                backgroundColor: view === 'map' ? '#fff' : 'transparent',
              }}
            >
              <Map size={16} color={view === 'map' ? '#1d4ed8' : '#9ca3af'} />
              <Text style={{ fontSize: 17, fontWeight: '600', color: view === 'map' ? '#1d4ed8' : '#9ca3af' }}>Map</Text>
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
          contentContainerStyle={{ paddingBottom: insets.bottom + 24, paddingHorizontal: 16, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {dclaimGroups.map((group, index) => (
            <Animated.View
              key={group.id}
              entering={FadeInDown.delay(index * 30).duration(300)}
            >
              <Pressable
                onPress={() => router.push(`/dclaim/${group.id}`)}
                className="bg-white rounded-xl p-4 mb-3 border border-gray-100 active:bg-gray-50"
              >
                <View className="flex-row items-center">
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-900 leading-tight">
                      {group.name}
                    </Text>
                    <Text className="text-base text-gray-500 mt-1">
                      {group.coordinator}
                    </Text>
                  </View>
                  <ChevronRight size={22} color="#9ca3af" />
                </View>
              </Pressable>
            </Animated.View>
          ))}

          {/* Footer */}
          <Text className="text-center text-gray-400 text-base mt-4">
            Diocese of Tagum
          </Text>
        </ScrollView>
      )}
      <BottomNavBar />
    </View>
  );
}
