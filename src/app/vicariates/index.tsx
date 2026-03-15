import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Church, Map, List } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { vicariatesData, Vicariate } from '@/lib/data/vicariates-data';
import BottomNavBar from '@/components/BottomNavBar';
import { useState } from 'react';
import MapWebView from '@/components/MapWebView';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Build the offline Leaflet HTML for vicariates map
function buildVicariatesMapHtml(vicariates: Vicariate[]): string {
  const data = vicariates.map(v => ({
    id: v.id,
    name: v.name,
    shortName: v.shortName,
    vicarForane: v.vicarForane,
    lat: v.lat,
    lon: v.lon,
    parishes: v.parishes.map(p => ({
      name: p.name,
      location: p.location,
      priest: p.priest,
      lat: p.lat ?? v.lat,
      lon: p.lon ?? v.lon,
    })),
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
html,body{width:100%;height:100%;overflow:hidden;background:#e8f0fe;}
#map{width:100%;height:100%;}
.leaflet-popup-content-wrapper{background:#fff!important;border:2px solid #bfdbfe!important;border-radius:14px!important;box-shadow:0 6px 24px rgba(0,0,0,.15)!important;}
.leaflet-popup-content{margin:14px 16px!important;font-family:-apple-system,sans-serif;}
.pop-title{font-size:19px;font-weight:800;color:#1e3a8a;margin-bottom:8px;padding-bottom:8px;border-bottom:2px solid #dbeafe;}
.pop-row{font-size:16px;color:#6b7280;margin-bottom:4px;line-height:18px;}
.pop-val{color:#1a1d23;font-weight:600;}
.pop-hint{font-size:15px;color:#60a5fa;margin-top:8px;font-style:italic;}
.legend{position:absolute;bottom:20px;left:14px;z-index:600;background:#fff;border:2px solid #bfdbfe;border-radius:12px;padding:12px 16px;box-shadow:0 4px 16px rgba(0,0,0,.12);}
.leg-title{font-size:15px;font-weight:800;color:#1d4ed8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:9px;}
.leg-row{display:flex;align-items:center;gap:9px;margin-bottom:6px;font-size:15px;color:#374151;font-weight:500;}
.leg-big{width:10px;height:10px;border-radius:50%;background:#1d4ed8;flex-shrink:0;box-shadow:0 0 0 4px rgba(29,78,216,.5);}
.leg-small{width:7px;height:7px;border-radius:50%;background:#3b82f6;flex-shrink:0;box-shadow:0 0 0 3px rgba(59,130,246,.5);margin-left:4px;}
</style>
</head>
<body>
<div id="map"></div>
<div class="legend">
  <div class="leg-title">Map Guide</div>
  <div class="leg-row"><div class="leg-big"></div><span>Vicariate</span></div>
  <div class="leg-row"><div class="leg-small"></div><span>Parish</span></div>
</div>
<script>
var data = ${dataJson};
// Track which vicariates have parishes shown — independent per vicariate
var parishLayers = {};
var vicMarkers = {};

var philippinesBounds = L.latLngBounds(L.latLng(4.5,116.5),L.latLng(21.0,127.0));
var map = L.map('map',{zoomControl:true,attributionControl:false,minZoom:6,maxBounds:philippinesBounds,maxBoundsViscosity:0.9});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18}).addTo(map);

// Vicariate dot: small solid center + 50% opacity outer ring
function makeVicIcon(isExpanded){
  var sz = isExpanded ? 12 : 10;
  var color = isExpanded ? '#1e40af' : '#1d4ed8';
  var ringW = sz + 14;
  var total = ringW + 4;
  var ring = '<div style="position:absolute;border-radius:50%;background:rgba(29,78,216,0.5);width:'+ringW+'px;height:'+ringW+'px;top:50%;left:50%;transform:translate(-50%,-50%);"></div>';
  return L.divIcon({
    className:'',
    html:'<div style="width:'+total+'px;height:'+total+'px;display:flex;align-items:center;justify-content:center;position:relative;">'+ring+'<div style="width:'+sz+'px;height:'+sz+'px;border-radius:50%;background:'+color+';z-index:1;"></div></div>',
    iconSize:[total,total],
    iconAnchor:[total/2,total/2],
    popupAnchor:[0,-(total/2+4)]
  });
}

// Parish dot: small solid center + 50% opacity outer ring
function makeParishIcon(){
  var sz = 7;
  var ringW = sz + 10;
  var total = ringW + 4;
  var ring = '<div style="position:absolute;border-radius:50%;background:rgba(59,130,246,0.5);width:'+ringW+'px;height:'+ringW+'px;top:50%;left:50%;transform:translate(-50%,-50%);"></div>';
  return L.divIcon({
    className:'',
    html:'<div style="width:'+total+'px;height:'+total+'px;display:flex;align-items:center;justify-content:center;position:relative;">'+ring+'<div style="width:'+sz+'px;height:'+sz+'px;border-radius:50%;background:#3b82f6;z-index:1;"></div></div>',
    iconSize:[total,total],
    iconAnchor:[total/2,total/2],
    popupAnchor:[0,-(total/2+4)]
  });
}

function showParishes(v){
  if(!parishLayers[v.id]) parishLayers[v.id]=[];
  if(parishLayers[v.id].length>0) return; // already shown
  v.parishes.forEach(function(p){
    var m=L.marker([p.lat,p.lon],{icon:makeParishIcon(),zIndexOffset:-100});
    m.bindPopup(
      '<div style="min-width:200px">'+
        '<div class="pop-title">'+p.name+'</div>'+
        '<div class="pop-row">Location: <span class="pop-val">'+p.location+'</span></div>'+
        '<div class="pop-row">Parish Priest: <span class="pop-val">'+p.priest+'</span></div>'+
      '</div>',
      {maxWidth:270}
    );
    m.addTo(map);
    parishLayers[v.id].push(m);
  });
}

function hideParishes(id){
  if(parishLayers[id]){
    parishLayers[id].forEach(function(m){map.removeLayer(m);});
    parishLayers[id]=[];
  }
}

// Draw all vicariate markers
data.forEach(function(v){
  var m=L.marker([v.lat,v.lon],{icon:makeVicIcon(false),zIndexOffset:1000});
  m.bindPopup(
    '<div style="min-width:220px">'+
      '<div class="pop-title">'+v.name+'</div>'+
      '<div class="pop-row">Vicar Forane: <span class="pop-val">'+v.vicarForane+'</span></div>'+
      '<div class="pop-row">Parishes: <span class="pop-val">'+v.parishes.length+'</span></div>'+
      '<div class="pop-hint">Tap dot again to show/hide parishes</div>'+
    '</div>',
    {maxWidth:280}
  );

  m.on('click',function(){
    var open = parishLayers[v.id] && parishLayers[v.id].length>0;
    // NOTE: each vicariate toggles independently — others are NOT affected
    if(open){
      hideParishes(v.id);
      m.setIcon(makeVicIcon(false));
    } else {
      showParishes(v);
      m.setIcon(makeVicIcon(true));
    }
  });

  m.addTo(map);
  vicMarkers[v.id]=m;
});

// Fit to diocese area
var vicBounds=data.map(function(v){return [v.lat,v.lon];});
if(vicBounds.length>0) map.fitBounds(vicBounds,{padding:[50,50]});
setTimeout(function(){map.invalidateSize();},100);
</script>
</body>
</html>`;
}

export default function VicariatesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [view, setView] = useState<'list' | 'map'>('list');

  const mapHtml = buildVicariatesMapHtml(vicariatesData);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        className="bg-white border-b border-gray-200"
        style={{ paddingTop: insets.top }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10 }}>
          <Pressable
            onPress={() => router.back()}
            style={{ padding: 6, borderRadius: 999 }}
          >
            <ChevronLeft size={24} color="#4b5563" />
          </Pressable>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
            <Text style={{ fontSize: 22, fontWeight: '700', color: '#111827' }}>
              Vicariates
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
                {vicariatesData.length}
              </Text>
            </View>
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

      {/* LIST VIEW — unchanged grid */}
      {view === 'list' && (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 24 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            entering={FadeInDown.delay(50)}
            className="bg-blue-50 rounded-2xl p-5 mb-5"
          >
            <Text className="text-blue-800 text-center font-bold" style={{ fontSize: 19 }}>
              Diocese of Tagum
            </Text>
            <Text className="text-blue-600 text-center mt-1" style={{ fontSize: 17 }}>
              {vicariatesData.length} Vicariates
            </Text>
          </Animated.View>

          <View className="flex-row flex-wrap justify-between">
            {vicariatesData.map((vicariate, index) => (
              <AnimatedPressable
                key={vicariate.id}
                entering={FadeInDown.delay(100 + index * 50)}
                onPress={() => router.push(`/vicariates/${vicariate.id}`)}
                className="bg-white rounded-2xl p-5 mb-4 active:bg-gray-50 items-center"
                style={{ width: '48%' }}
              >
                <View className="w-16 h-16 rounded-full bg-amber-100 items-center justify-center mb-3">
                  <Church size={32} color="#d97706" />
                </View>
                <Text className="font-bold text-gray-900 text-center" style={{ fontSize: 18 }}>
                  {vicariate.shortName}
                </Text>
                <Text className="text-gray-500 text-center mt-1" style={{ fontSize: 16 }}>
                  {vicariate.parishes.length} {vicariate.parishes.length === 1 ? 'Parish' : 'Parishes'}
                </Text>
                <Text className="text-blue-500 text-center mt-1" numberOfLines={1} style={{ fontSize: 14 }}>
                  {vicariate.vicarForane.replace('Rev. Fr. ', '').replace('Msgr. ', '')}
                </Text>
              </AnimatedPressable>
            ))}
          </View>
        </ScrollView>
      )}

      {/* MAP VIEW */}
      {view === 'map' && (
        <View style={{ flex: 1 }}>
          <View style={{
            backgroundColor: '#eff6ff',
            borderBottomWidth: 1,
            borderBottomColor: '#bfdbfe',
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}>
            <Text style={{ fontSize: 17, color: '#1d4ed8', textAlign: 'center', fontWeight: '600' }}>
              Tap a vicariate dot to show/hide its parishes · Each toggles independently
            </Text>
          </View>

          <MapWebView html={mapHtml} />
        </View>
      )}

      <BottomNavBar />
    </View>
  );
}
