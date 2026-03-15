import { useState, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Linking,
  FlatList,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronRight,
  MapPin,
  Users,
  Church,
  ChevronLeft,
  Folder,
  ChevronDown,
  ChevronUp,
  Calendar,
  Map,
  List,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { gkkData, type GKK } from '@/lib/data/gkk-data';
import { getParishById } from '@/lib/data/parish-directory';
import MapWebView from '@/components/MapWebView';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ─── Sorting helpers ─────────────────────────────────────────────────────────

function startsWithLetter(str: string): boolean {
  const s = str.trimStart();
  if (!s) return false;
  return /^[A-Za-z]/.test(s);
}

function gkkNameComparator(a: GKK, b: GKK): number {
  const aLetter = startsWithLetter(a.name);
  const bLetter = startsWithLetter(b.name);
  if (aLetter && !bLetter) return -1;
  if (!aLetter && bLetter) return 1;
  return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
}

// ─── Location / directions helpers ───────────────────────────────────────────

const INVALID_LOCATION_PHRASES = [
  'n/a', 'denied', 'added was denied', 'location denied',
  'no location', 'no data', 'none', 'unknown',
];

function isValidLocation(value: string): boolean {
  if (!value || !value.trim()) return false;
  const lower = value.toLowerCase().trim();
  return !INVALID_LOCATION_PHRASES.some(p => lower.includes(p));
}

function hasValidLocation(gkk: GKK): boolean {
  return isValidLocation(gkk.coordinates) || isValidLocation(gkk.address);
}

function getDirectionsUrl(gkk: GKK): string {
  const coords = (gkk.coordinates ?? '').trim();
  const addr = (gkk.address ?? '').trim();

  if (coords.includes('maps.app.goo.gl') || coords.includes('google.com/maps')) {
    return coords;
  }

  const coordMatch = coords
    .replace(/[()]/g, '')
    .match(/^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/);
  if (coordMatch) {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordMatch[1]},${coordMatch[2]}&travelmode=driving`;
  }

  if (coords && isValidLocation(coords)) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(coords)}&travelmode=driving`;
  }

  if (addr && isValidLocation(addr)) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}&travelmode=driving`;
  }

  return '';
}

function generateDirectionHint(gkk: GKK): string {
  const addr = (gkk.address ?? '').trim();
  if (!addr || !isValidLocation(addr)) return '';

  if (addr.length > 60) return addr;

  const parts = addr.split(',').map(p => p.trim()).filter(Boolean);

  if (parts.length >= 3) {
    const purok = parts[0];
    const barangay = parts[1];
    const municipality = parts.slice(2).join(', ');
    return `Located at ${purok}, Barangay ${barangay}, ${municipality}.`;
  }
  if (parts.length === 2) {
    return `Located at ${parts[0]}, ${parts[1]}.`;
  }
  return `Located in ${addr}.`;
}

// ─── Map HTML builder ─────────────────────────────────────────────────────────

function buildGkkMapHtml(gkkList: GKK[]): string {
  const data = gkkList.flatMap(g => {
    const coords = (g.coordinates ?? '').replace(/[()]/g, '').trim();
    const m = coords.match(/^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/);
    if (!m) return [];
    const lat = parseFloat(m[1]);
    const lon = parseFloat(m[2]);
    if (lat < 4 || lat > 22 || lon < 116 || lon > 128) return [];
    return [{
      id: g.id,
      name: g.name,
      patron: g.patronSaint,
      addr: g.address,
      zone: g.zone,
      parish: g.parish,
      lat,
      lon,
    }];
  });

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
.pop-title{font-size:17px;font-weight:800;color:#1e3a8a;margin-bottom:7px;padding-bottom:7px;border-bottom:2px solid #dbeafe;line-height:1.3;}
.pop-row{font-size:14px;color:#6b7280;margin-bottom:3px;line-height:18px;}
.pop-val{color:#1a1d23;font-weight:600;}
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-family:-apple-system,sans-serif;color:#9ca3af;font-size:18px;gap:10px;}
</style>
</head>
<body>
<div id="map"></div>
<script>
var data=\${dataJson};
var map=L.map('map',{zoomControl:true,attributionControl:false,minZoom:6});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

function makeIcon(){
  var sz=9,ringW=sz+14,total=ringW+4;
  var ring='<div style="position:absolute;border-radius:50%;background:rgba(29,78,216,0.4);width:'+ringW+'px;height:'+ringW+'px;top:50%;left:50%;transform:translate(-50%,-50%);"></div>';
  return L.divIcon({className:'',html:'<div style="width:'+total+'px;height:'+total+'px;display:flex;align-items:center;justify-content:center;position:relative;">'+ring+'<div style="width:'+sz+'px;height:'+sz+'px;border-radius:50%;background:#1d4ed8;z-index:1;"></div></div>',iconSize:[total,total],iconAnchor:[total/2,total/2],popupAnchor:[0,-(total/2+4)]});
}

if(data.length===0){
  document.getElementById('map').innerHTML='<div class="empty"><span style="font-size:40px">⛪</span><span>No mapped GKKs in this view</span></div>';
} else {
  var bounds=[];
  data.forEach(function(g){
    var m=L.marker([g.lat,g.lon],{icon:makeIcon()});
    var patronLine=g.patron?'<div class="pop-row">Patron: <span class="pop-val">'+g.patron+'</span></div>':'';
    var addrLine=g.addr?'<div class="pop-row">Address: <span class="pop-val">'+g.addr+'</span></div>':'';
    var parishLine=g.parish?'<div class="pop-row">Parish: <span class="pop-val">'+g.parish+'</span></div>':'';
    m.bindPopup('<div style="min-width:200px"><div class="pop-title">'+g.name+'</div>'+patronLine+addrLine+parishLine+'</div>',{maxWidth:280});
    m.addTo(map);
    bounds.push([g.lat,g.lon]);
  });
  if(bounds.length>0) map.fitBounds(bounds,{padding:[40,40]});
}
setTimeout(function(){map.invalidateSize();},100);
</script>
</body>
</html>`;
}

// ─── Events overlay ───────────────────────────────────────────────────────────

const EventsScreen = ({ gkkName, onClose }: { gkkName: string; onClose: () => void }) => {
  const insets = useSafeAreaInsets();
  const [openYear, setOpenYear] = useState<string | null>(null);
  const years = ['2026', '2027'];

  return (
    <View className="absolute inset-0 bg-gray-50 z-50">
      <View className="bg-white border-b border-gray-200" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center px-4 py-4">
          <Pressable onPress={onClose} className="p-2 active:bg-gray-100 rounded-full">
            <ChevronLeft size={28} color="#4b5563" />
          </Pressable>
          <View className="flex-1 ml-3">
            <Text className="text-3xl font-bold text-gray-900">Events</Text>
            <Text className="text-base text-gray-500 mt-0.5" numberOfLines={1}>{gkkName}</Text>
          </View>
        </View>
      </View>
      <ScrollView className="flex-1 p-4">
        {years.map((year) => (
          <View key={year} className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-3"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            <Pressable onPress={() => setOpenYear(openYear === year ? null : year)}
              className="flex-row items-center p-4 gap-3 active:bg-gray-50">
              <View className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center">
                <Folder size={20} color="#6b7280" />
              </View>
              <Text className="text-lg font-semibold text-gray-900 flex-1">{year}</Text>
              {openYear === year ? <ChevronUp size={20} color="#9ca3af" /> : <ChevronDown size={20} color="#9ca3af" />}
            </Pressable>
            {openYear === year && (
              <View className="px-4 pb-4 border-t border-gray-100">
                <Text className="text-gray-400 italic text-base mt-3">No events added yet</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// ─── Detail screen ────────────────────────────────────────────────────────────

const InfoRow = ({ label, value }: { label: string; value?: string | number }) => {
  if (!value || value === 'nan' || value === '' || value === 0) return null;
  return (
    <View className="py-2.5 border-b border-gray-100">
      <Text className="text-sm text-gray-400 uppercase tracking-widest font-medium">{label}</Text>
      <Text className="text-gray-800 mt-0.5 text-base font-medium">{String(value)}</Text>
    </View>
  );
};

const DetailScreen = ({ gkk, onClose }: { gkk: GKK; onClose: () => void }) => {
  const insets = useSafeAreaInsets();
  const [showEvents, setShowEvents] = useState(false);

  const directionsUrl = getDirectionsUrl(gkk);
  const validLocation = hasValidLocation(gkk);
  const directionHint = generateDirectionHint(gkk);

  const openDirections = () => {
    if (directionsUrl) {
      Linking.openURL(directionsUrl);
    }
  };

  return (
    <View className="absolute inset-0 bg-gray-50 z-40">
      {/* Header */}
      <View className="bg-white border-b border-gray-200" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center px-4 py-4">
          <Pressable onPress={onClose} className="p-2 active:bg-gray-100 rounded-full">
            <ChevronLeft size={28} color="#4b5563" />
          </Pressable>
          <Text className="flex-1 text-2xl font-bold text-gray-900 ml-3" numberOfLines={1}>
            {gkk.name}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>

        {/* GKK Icon Card */}
        <Animated.View entering={FadeInDown.delay(50).springify()}
          className="bg-white rounded-2xl border border-gray-100 items-center py-8 mb-4"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
          <View className="w-24 h-24 bg-blue-50 rounded-2xl items-center justify-center mb-3">
            <Church size={48} color="#3b82f6" strokeWidth={1.5} />
          </View>
          <Text className="text-2xl font-bold text-gray-900 text-center px-4">{gkk.name}</Text>
          {gkk.patronSaint ? (
            <Text className="text-base text-blue-600 mt-1 font-medium">{gkk.patronSaint}</Text>
          ) : null}
        </Animated.View>

        {/* Location / Directions */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          {validLocation ? (
            <View className="bg-white rounded-xl border border-gray-100 mb-3 overflow-hidden" 
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
              <Pressable onPress={openDirections}
                className="p-4 active:bg-gray-50 border-b border-gray-100"
              >
                <View className="flex-row items-start gap-3">
                  <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center flex-shrink-0">
                    <MapPin size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-1">Location</Text>
                    <Text className="text-gray-900 font-semibold text-base">{gkk.address}</Text>
                    {directionHint ? (
                      <Text className="text-sm text-gray-500 mt-1 leading-5">{directionHint}</Text>
                    ) : null}
                    <Text className="text-sm text-blue-500 mt-2 font-medium">Tap for directions</Text>
                  </View>
                </View>
              </Pressable>
            </View>
          ) : (
            <View className="bg-white rounded-xl border border-gray-100 p-4 mb-3 flex-row items-start gap-3"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
              <View className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center flex-shrink-0">
                <MapPin size={20} color="#d1d5db" />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-1">Location</Text>
                {gkk.address && isValidLocation(gkk.address) ? (
                  <Text className="text-gray-700 text-base">{gkk.address}</Text>
                ) : (
                  <Text className="text-gray-400 text-base">No location available</Text>
                )}
              </View>
            </View>
          )}
        </Animated.View>

        {/* Stats Row */}
        <Animated.View entering={FadeInDown.delay(150).springify()} className="flex-row gap-3 mb-3">
          <View className="flex-1 bg-white rounded-xl border border-gray-100 p-3 items-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            <Text className="text-xl font-bold text-gray-900">{gkk.yearEstablished || '—'}</Text>
            <Text className="text-sm text-gray-400 mt-0.5">Established</Text>
          </View>
          <View className="flex-1 bg-white rounded-xl border border-gray-100 p-3 items-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            <View className="flex-row items-center gap-1">
              <Users size={14} color="#6b7280" />
              <Text className="text-xl font-bold text-gray-900">{gkk.population || '—'}</Text>
            </View>
            <Text className="text-sm text-gray-400 mt-0.5">Population</Text>
          </View>
          <View className="flex-1 bg-white rounded-xl border border-gray-100 p-3 items-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            <Text className="text-base font-bold text-gray-900 text-center" numberOfLines={2}>{gkk.zone || '—'}</Text>
            <Text className="text-xs text-gray-400 mt-0.5 text-center">Zone / District</Text>
          </View>
        </Animated.View>

        {/* Details Card */}
        <Animated.View entering={FadeInDown.delay(200).springify()}
          className="bg-white rounded-xl border border-gray-100 px-4 mb-3"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
          <InfoRow label="Parish" value={gkk.parish} />
          <InfoRow label="Vicariate" value={gkk.vicariate} />
          <InfoRow label="Founding Anniversary" value={gkk.foundingAnniversary} />
          <InfoRow label="Fiesta" value={gkk.fiesta} />
          <InfoRow label="Year Established" value={gkk.yearEstablished ?? undefined} />
          <InfoRow label="GKK President" value={gkk.president} />
          <InfoRow label="Patron Saint" value={gkk.patronSaint} />
          {/* Events Row */}
          <Pressable onPress={() => setShowEvents(true)}
            className="py-2.5 active:bg-gray-50 flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-gray-400 uppercase tracking-widest font-medium">Events</Text>
              <View className="flex-row items-center gap-2 mt-0.5">
                <Calendar size={13} color="#6b7280" />
                <Text className="text-gray-800 text-base font-medium">View Events (2026 · 2027)</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#d1d5db" />
          </Pressable>
        </Animated.View>

        {/* History of the GKK */}
        <Animated.View entering={FadeInDown.delay(250).springify()}
          className="bg-white rounded-xl border border-gray-100 p-4 mb-3"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
          <Text className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-2">History of the GKK</Text>
          {gkk.history && gkk.history !== 'nan' && gkk.history.trim() !== '' ? (
            <Text className="text-gray-700 text-base leading-6">{gkk.history}</Text>
          ) : (
            <Text className="text-gray-400 italic text-base">History to be added.</Text>
          )}
        </Animated.View>
      </ScrollView>

      {showEvents && (
        <EventsScreen gkkName={gkk.name} onClose={() => setShowEvents(false)} />
      )}
    </View>
  );
};

// ─── GKK list card ────────────────────────────────────────────────────────────

const GKKCard = ({ gkk, onPress, index }: { gkk: GKK; onPress: () => void; index: number }) => (
  <AnimatedPressable
    entering={FadeInDown.delay(Math.min(index * 20, 400)).springify()}
    onPress={onPress}
    className="bg-white rounded-xl border border-gray-100 overflow-hidden active:bg-gray-50 mb-2"
    style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}
  >
    <View className="flex-row items-center p-3 gap-3">
      <View className="w-12 h-12 rounded-xl flex-shrink-0 bg-blue-50 items-center justify-center">
        <Church size={24} color="#3b82f6" strokeWidth={1.5} />
      </View>
      <View className="flex-1 min-w-0">
        <Text className="font-semibold text-gray-900 text-base leading-5" numberOfLines={2}>{gkk.name}</Text>
        {gkk.patronSaint ? (
          <Text className="text-xs text-blue-500 mt-0.5 font-medium" numberOfLines={1}>{gkk.patronSaint}</Text>
        ) : null}
        {gkk.address && isValidLocation(gkk.address) ? (
          <View className="flex-row items-center mt-0.5 gap-1">
            <MapPin size={9} color="#9ca3af" />
            <Text className="text-xs text-gray-400 flex-1" numberOfLines={1}>{gkk.address}</Text>
          </View>
        ) : null}
      </View>
      <ChevronRight size={16} color="#d1d5db" />
    </View>
  </AnimatedPressable>
);

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function ParishGKKsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const parish = getParishById(id ?? '');
  const [selectedGKK, setSelectedGKK] = useState<GKK | null>(null);
  const [view, setView] = useState<'list' | 'map'>('list');

  if (!parish) {
    return (
      <View className="flex-1 bg-white items-center justify-center" style={{ paddingTop: insets.top }}>
        <Text className="text-gray-400 text-xl font-medium">Parish not found</Text>
      </View>
    );
  }

  // Exact filtering based on canonical normalized match
  const parishGKKs = useMemo(() => {
    return gkkData.filter(g => g.parish === parish.name).sort(gkkNameComparator);
  }, [parish.name]);

  const mapHtml = useMemo(
    () => (view === 'map' ? buildGkkMapHtml(parishGKKs) : ''),
    [view, parishGKKs]
  );

  const mappedCount = useMemo(
    () =>
      parishGKKs.filter(g => {
        const coords = (g.coordinates ?? '').replace(/[()]/g, '').trim();
        return /^-?\d+\.?\d*\s*,\s*-?\d+\.?\d*$/.test(coords);
      }).length,
    [parishGKKs]
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingTop: insets.top }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12 }}>
          <Pressable onPress={() => router.back()} style={{ padding: 6, borderRadius: 99 }}>
            <ChevronLeft size={28} color="#4b5563" />
          </Pressable>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }} numberOfLines={1}>
              {parish.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Users size={14} color="#6b7280" />
              <Text style={{ fontSize: 13, color: '#6b7280', marginLeft: 4 }}>
                {parishGKKs.length} Local GKKs
              </Text>
            </View>
          </View>
        </View>

        {/* View Toggle */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#f3f4f6', borderRadius: 12, padding: 4 }}>
            <Pressable
              onPress={() => setView('list')}
              style={{
                flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
                paddingVertical: 10, borderRadius: 10,
                backgroundColor: view === 'list' ? '#fff' : 'transparent',
                elevation: view === 'list' ? 1 : 0,
              }}
            >
              <List size={18} color={view === 'list' ? '#1d4ed8' : '#6b7280'} strokeWidth={2.2} />
              <Text style={{ fontSize: 16, fontWeight: '600', color: view === 'list' ? '#1d4ed8' : '#6b7280' }}>List</Text>
            </Pressable>
            <Pressable
              onPress={() => setView('map')}
              style={{
                flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
                paddingVertical: 10, borderRadius: 10,
                backgroundColor: view === 'map' ? '#fff' : 'transparent',
                elevation: view === 'map' ? 1 : 0,
              }}
            >
              <Map size={18} color={view === 'map' ? '#1d4ed8' : '#6b7280'} strokeWidth={2.2} />
              <Text style={{ fontSize: 16, fontWeight: '600', color: view === 'map' ? '#1d4ed8' : '#6b7280' }}>Map</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* ── Map View ────────────────────────────────────────────────────────── */}
      {view === 'map' && (
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: '#eff6ff', borderBottomWidth: 1, borderBottomColor: '#bfdbfe', paddingHorizontal: 16, paddingVertical: 9 }}>
            <Text style={{ fontSize: 15, color: '#1d4ed8', textAlign: 'center', fontWeight: '600' }}>
              {mappedCount > 0
                ? `${mappedCount.toLocaleString()} GKKs mapped · Tap a dot to see details`
                : 'No GKKs found with map coordinates'}
            </Text>
          </View>
          <MapWebView html={mapHtml} />
        </View>
      )}

      {/* ── List View ───────────────────────────────────────────────────────── */}
      {view === 'list' && (
        <FlatList
          data={parishGKKs}
          keyExtractor={(item) => `gkk-${item.id}`}
          contentContainerStyle={{ padding: 12, paddingBottom: insets.bottom + 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <GKKCard
              gkk={item}
              onPress={() => setSelectedGKK(item)}
              index={index}
            />
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', paddingTop: 64 }}>
              <Church size={48} color="#d1d5db" strokeWidth={1.5} />
              <Text style={{ color: '#9ca3af', fontSize: 20, marginTop: 12 }}>No GKKs found for this parish</Text>
            </View>
          }
        />
      )}

      {selectedGKK && (
        <DetailScreen gkk={selectedGKK} onClose={() => setSelectedGKK(null)} />
      )}
    </View>
  );
}
