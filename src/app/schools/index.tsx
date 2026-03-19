import { useState, useMemo } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, GraduationCap, List, Map } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { schoolsData, School } from '@/lib/data/schools-data';
import BottomNavBar from '@/components/BottomNavBar';
import MapWebView from '@/components/MapWebView';

type FilterType = 'all' | 'DOTES Member' | 'Congregational';

function buildMapHtml(items: typeof schoolsData): string {
  const data = items
    .filter(s => s.coordinates)
    .map(s => ({
      id: s.id,
      name: s.name,
      abbreviation: s.abbreviation,
      location: s.location,
      category: s.category,
      lat: s.coordinates!.lat,
      lon: s.coordinates!.lng,
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
.leaflet-popup-content-wrapper{background:#fff!important;border:2px solid #fef9c3!important;border-radius:14px!important;box-shadow:0 6px 24px rgba(0,0,0,.15)!important;}
.leaflet-popup-content{margin:14px 16px!important;font-family:-apple-system,sans-serif;}
.pop-title{font-size:18px;font-weight:800;color:#854d0e;margin-bottom:8px;padding-bottom:8px;border-bottom:2px solid #fef9c3;line-height:1.3;}
.pop-row{font-size:15px;color:#6b7280;margin-bottom:4px;line-height:17px;}
.pop-val{color:#1a1d23;font-weight:600;}
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
data.forEach(function(s){
  var m = L.marker([s.lat, s.lon], {icon: makeIcon()});
  m.bindPopup(
    '<div style="min-width:200px">'+
      '<div class="pop-title">'+s.name+'</div>'+
      '<div class="pop-row">Location: <span class="pop-val">'+s.location+'</span></div>'+
      '<div class="pop-row">Category: <span class="pop-val">'+s.category+'</span></div>'+
    '</div>',
    {maxWidth: 280}
  );
  m.addTo(map);
  bounds.push([s.lat, s.lon]);
});

if(bounds.length > 0) map.fitBounds(bounds, {padding:[40,40]});
else map.setView([7.4478, 125.8078], 10);
setTimeout(function(){ map.invalidateSize(); }, 100);
</script>
</body>
</html>`;
}

export default function SchoolsListScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('all');
  const [view, setView] = useState<'list' | 'map'>('list');

  const filteredSchools = useMemo(() =>
    filter === 'all' ? schoolsData : schoolsData.filter(s => s.category === filter),
    [filter]
  );

  const mapHtml = useMemo(() => buildMapHtml(filteredSchools), [filteredSchools]);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All Schools' },
    { key: 'DOTES Member', label: 'DOTES Member' },
    { key: 'Congregational', label: 'Congregational' },
  ];

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
                Catholic Schools
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
                  {schoolsData.length}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 15, color: '#6b7280' }}>
              Diocese of Tagum Educational System
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

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 10, gap: 6 }}
        >
          {filters.map((f) => (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
                backgroundColor: filter === f.key ? '#eab308' : '#f3f4f6',
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: '600', color: filter === f.key ? '#fff' : '#4b5563' }}>
                {f.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Map View */}
      {view === 'map' && (
        <MapWebView html={mapHtml} />
      )}

      {/* List View */}
      {view === 'list' && (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom + 24, paddingHorizontal: 16, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-gray-500 text-base mb-4">
            {filteredSchools.length} schools found
          </Text>

          {filteredSchools.map((school, index) => (
            <View
              key={school.id}
              className="mb-3"
            >
              <Pressable
                onPress={() => router.push(`/schools/${school.id}`)}
                className="bg-white rounded-xl p-4 mb-3 border border-gray-100 active:bg-gray-50"
              >
                <View className="flex-row items-center">
                  <View
                    className="w-12 h-12 rounded-xl items-center justify-center"
                    style={{ backgroundColor: school.color + '15' }}
                  >
                    <Text
                      className="text-base font-bold"
                      style={{ color: school.color }}
                    >
                      {school.abbreviation.slice(0, 3)}
                    </Text>
                  </View>
                  <View className="flex-1 ml-3">
                    <Text className="text-lg font-semibold text-gray-900 leading-tight">
                      {school.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Text className="text-sm text-gray-500">
                        {school.location.split(',')[0]}
                      </Text>
                      <View
                        className="ml-2 px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: school.color + '15' }}
                      >
                        <Text
                          className="text-sm font-medium"
                          style={{ color: school.color }}
                        >
                          {school.category === 'DOTES Member' ? 'DOTES' : 'Congregational'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <ChevronRight size={22} color="#9ca3af" />
                </View>
              </Pressable>
            </View>
          ))}

          {/* Footer */}
          <View className="mt-4 items-center">
            <Text className="text-center text-gray-400 text-sm">
              Diocese of Tagum Educational System
            </Text>
            <Text className="text-center text-gray-400 text-sm mt-1">
              Under the superintendency of Rev. Fr. Tomas P. Avila Jr.
            </Text>
          </View>
        </ScrollView>
      )}
      <BottomNavBar />
    </View>
  );
}
