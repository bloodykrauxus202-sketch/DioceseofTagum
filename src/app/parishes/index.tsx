import { useState, useMemo, useCallback } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, useWindowDimensions, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, ChevronLeft, Church, MapPin, Map, List } from 'lucide-react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import BottomNavBar from '@/components/BottomNavBar';
import MapWebView from '@/components/MapWebView';
import {
  parishes,
  parishTabs,
  searchParishes,
} from '@/lib/data/parish-directory';
import { getParishIconUrl } from '@/lib/data/parish-icons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function buildParishMapHtml(parishList: typeof parishes): string {
  const data = parishList.map(p => ({
    id: p.id,
    name: p.name,
    location: p.location,
    priestName: p.priestName,
    fiesta: p.fiesta,
    gkkCount: p.gkkCount ?? null,
    lat: p.lat ?? null,
    lon: p.lon ?? null,
  }));
  const dataJson = JSON.stringify(data);

  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:100%;height:100%;overflow:hidden;}
#map{width:100%;height:100%;}
.leaflet-popup-content-wrapper{background:#fff!important;border:2px solid #bfdbfe!important;border-radius:14px!important;box-shadow:0 6px 24px rgba(0,0,0,.15)!important;}
.leaflet-popup-content{margin:14px 16px!important;font-family:-apple-system,sans-serif;}
.pop-title{font-size:18px;font-weight:800;color:#1e3a8a;margin-bottom:8px;padding-bottom:8px;border-bottom:2px solid #dbeafe;line-height:1.3;}
.pop-row{font-size:15px;color:#6b7280;margin-bottom:4px;line-height:17px;}
.pop-val{color:#1a1d23;font-weight:600;}
.pop-gkk{margin-top:8px;padding-top:8px;border-top:1px solid #e4e7ed;font-size:16px;color:#374151;font-weight:700;}
</style>
</head>
<body>
<div id="map"></div>
<script>
var data = ${dataJson};
var philippinesBounds = L.latLngBounds(L.latLng(4.5,116.5),L.latLng(21.0,127.0));
var map = L.map('map',{zoomControl:true,attributionControl:false,minZoom:6,maxBounds:philippinesBounds,maxBoundsViscosity:0.9});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18}).addTo(map);

function makeIcon(){
  var sz = 10;
  var ringW = sz + 12;
  var total = ringW + 4;
  var ring = '<div style="position:absolute;border-radius:50%;background:rgba(29,78,216,0.5);width:'+ringW+'px;height:'+ringW+'px;top:50%;left:50%;transform:translate(-50%,-50%);"></div>';
  return L.divIcon({
    className:'',
    html:'<div style="width:'+total+'px;height:'+total+'px;display:flex;align-items:center;justify-content:center;position:relative;">'+ring+'<div style="width:'+sz+'px;height:'+sz+'px;border-radius:50%;background:#1d4ed8;z-index:1;"></div></div>',
    iconSize:[total,total],
    iconAnchor:[total/2,total/2],
    popupAnchor:[0,-(total/2+4)]
  });
}

var bounds = [];
data.forEach(function(p){
  if(p.lat === null || p.lon === null) return;
  var m = L.marker([p.lat, p.lon], {icon: makeIcon()});
  var gkkLine = '<div class="pop-gkk">GKKs: '+(p.gkkCount !== null ? p.gkkCount : '—')+'</div>';
  m.bindPopup(
    '<div style="min-width:210px">'+
      '<div class="pop-title">'+p.name+'</div>'+
      '<div class="pop-row">Location: <span class="pop-val">'+p.location+'</span></div>'+
      '<div class="pop-row">Parish Priest: <span class="pop-val">'+p.priestName+'</span></div>'+
      '<div class="pop-row">Feast Day: <span class="pop-val">'+p.fiesta+'</span></div>'+
      gkkLine+
    '</div>',
    {maxWidth: 280}
  );
  m.addTo(map);
  bounds.push([p.lat, p.lon]);
});

if(bounds.length > 0) map.fitBounds(bounds, {padding:[40,40]});
setTimeout(function(){ map.invalidateSize(); }, 100);
</script>
</body>
</html>`;
}

export default function ParishListScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [view, setView] = useState<'list' | 'map'>('list');

  const horizontalPadding = 12;
  const gap = 8;
  const columns = 3;
  const gridItemWidth = (screenWidth - (horizontalPadding * 2) - (gap * (columns - 1))) / columns;

  const filteredParishes = useMemo(() => {
    let result = parishes;
    if (searchQuery.trim()) result = searchParishes(searchQuery);
    if (activeTab !== 'all') result = result.filter(p => p.type === activeTab);
    return result;
  }, [searchQuery, activeTab]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    parishTabs.forEach((tab) => {
      if (tab.key === 'all') return;
      counts[tab.key] = parishes.filter(p => p.type === tab.key).length;
    });
    return counts;
  }, []);

  const handleParishPress = useCallback((parishId: string) => {
    router.push(`/parishes/${parishId}`);
  }, [router]);

  const mapHtml = useMemo(() => buildParishMapHtml(filteredParishes), [filteredParishes]);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-200" style={{ paddingTop: insets.top }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10 }}>
          <Pressable onPress={() => router.back()} style={{ padding: 6, borderRadius: 999 }}>
            <ChevronLeft size={24} color="#4b5563" />
          </Pressable>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
            <Text style={{ fontSize: 22, fontWeight: '700', color: '#111827' }}>
              Parishes
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
                {parishes.length}
              </Text>
            </View>
          </View>
          {/* List / Map toggle */}
          <View style={{ flexDirection: 'row', backgroundColor: '#e0e7ff', borderRadius: 14, padding: 4, gap: 2 }}>
            <Pressable
              onPress={() => setView('list')}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 7,
                paddingHorizontal: 22, paddingVertical: 12, borderRadius: 10,
                backgroundColor: view === 'list' ? '#fff' : 'transparent',
                elevation: view === 'list' ? 2 : 0,
              }}
            >
              <List size={24} color={view === 'list' ? '#1d4ed8' : '#6b7280'} strokeWidth={2.2} />
              <Text style={{ fontSize: 21, fontWeight: '700', color: view === 'list' ? '#1d4ed8' : '#6b7280' }}>List</Text>
            </Pressable>
            <Pressable
              onPress={() => setView('map')}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 7,
                paddingHorizontal: 22, paddingVertical: 12, borderRadius: 10,
                backgroundColor: view === 'map' ? '#fff' : 'transparent',
                elevation: view === 'map' ? 2 : 0,
              }}
            >
              <Map size={24} color={view === 'map' ? '#1d4ed8' : '#6b7280'} strokeWidth={2.2} />
              <Text style={{ fontSize: 21, fontWeight: '700', color: view === 'map' ? '#1d4ed8' : '#6b7280' }}>Map</Text>
            </Pressable>
          </View>
        </View>

        {/* Search bar — only in list view */}
        {view === 'list' && (
          <View className="px-3" style={{ paddingBottom: 8 }}>
            <View className="flex-row items-center bg-gray-100 rounded-xl px-3" style={{ paddingVertical: 8 }}>
              <Search size={16} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-2 text-gray-900"
                style={{ fontSize: 18, fontWeight: '600' }}
                placeholder="Search parishes..."
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
            </View>
          </View>
        )}

        {/* Tabs — only in list view */}
        {view === 'list' && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 8, gap: 6, flexDirection: 'row' }}
          >
            {parishTabs.map((tab) => (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={{
                  flexDirection: 'row', alignItems: 'center', borderRadius: 99,
                  paddingHorizontal: 10, paddingVertical: 5,
                  backgroundColor: activeTab === tab.key ? '#111827' : '#f3f4f6',
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: '600', color: activeTab === tab.key ? '#fff' : '#4b5563' }}>
                  {tab.label}
                </Text>
                {tab.key !== 'all' && tabCounts[tab.key] !== undefined && (
                  <View style={{
                    marginLeft: 4, borderRadius: 99, paddingHorizontal: 5, paddingVertical: 1,
                    backgroundColor: activeTab === tab.key ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                  }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: activeTab === tab.key ? '#fff' : '#6b7280' }}>
                      {tabCounts[tab.key]}
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>

      {/* LIST VIEW */}
      {view === 'list' && (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: horizontalPadding, paddingBottom: insets.bottom + 16 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredParishes.length === 0 ? (
            <Animated.View entering={FadeIn} className="items-center justify-center py-20">
              <Church size={56} color="#d1d5db" />
              <Text className="text-gray-400 text-2xl mt-4">No parishes found</Text>
            </Animated.View>
          ) : (
            <View className="flex-row flex-wrap" style={{ gap }}>
              {filteredParishes.map((parish, index) => {
                const iconUrl = getParishIconUrl(parish.name, parish.location);
                const imageSize = gridItemWidth - 20;
                return (
                  <AnimatedPressable
                    key={parish.id}
                    entering={FadeInDown.delay(index * 20).springify()}
                    onPress={() => handleParishPress(parish.id)}
                    className="bg-white rounded-xl items-center justify-start active:bg-gray-50 border border-gray-100"
                    style={{ width: gridItemWidth, padding: 10 }}
                  >
                    {iconUrl ? (
                      <Image
                        source={{ uri: iconUrl }}
                        style={{ width: imageSize, height: imageSize, borderRadius: 10 }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={{ width: imageSize, height: imageSize, borderRadius: 10, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center' }}>
                        <Church size={imageSize * 0.5} color="#3b82f6" strokeWidth={1.5} />
                      </View>
                    )}
                    <Text className="text-sm text-gray-900 text-center mt-2 leading-tight font-bold" numberOfLines={3} style={{ width: '100%' }}>
                      {parish.name}
                    </Text>
                    <View className="flex-row items-center mt-1" style={{ width: '100%' }}>
                      <MapPin size={9} color="#9ca3af" style={{ flexShrink: 0 }} />
                      <Text className="text-sm text-gray-500 ml-1" numberOfLines={1} style={{ flex: 1 }}>
                        {parish.location}
                      </Text>
                    </View>
                  </AnimatedPressable>
                );
              })}
            </View>
          )}
        </ScrollView>
      )}

      {/* MAP VIEW */}
      {view === 'map' && (
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: '#eff6ff', borderBottomWidth: 1, borderBottomColor: '#bfdbfe', paddingHorizontal: 16, paddingVertical: 10 }}>
            <Text style={{ fontSize: 17, color: '#1d4ed8', textAlign: 'center', fontWeight: '600' }}>
              Tap a dot to see parish details
            </Text>
          </View>
          <MapWebView html={mapHtml} />
        </View>
      )}

      <BottomNavBar />
    </View>
  );
}
