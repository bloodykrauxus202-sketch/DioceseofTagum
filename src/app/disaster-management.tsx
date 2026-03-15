import { View, Text, Pressable, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, ArrowRight, Map, List, RefreshCw } from 'lucide-react-native';
import { useState, useEffect, useCallback } from 'react';
import MapWebView from '@/components/MapWebView';
import BottomNavBar from '@/components/BottomNavBar';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL ?? '';

type GkkEntry = {
  name: string;
  addr: string;
  status: 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN';
  lat: number | null;
  lon: number | null;
  approx: boolean;
};

// Flood fetches live; others have no data yet
type HazardKey = 'flood' | 'typhoon' | 'quake' | 'rain' | 'goods';

const META: Record<HazardKey, { icon: string; name: string; sub: string; stripe: string }> = {
  flood:   { icon: '🌊', name: 'Flood',                         sub: 'River overflow · Flash flood · Inundation', stripe: '#3b82f6' },
  typhoon: { icon: '🌀', name: 'Typhoon / Tropical Cyclone',    sub: 'Wind · Storm surge · Rainfall',            stripe: '#8b5cf6' },
  quake:   { icon: '🌋', name: 'Earthquake',                    sub: 'Ground shaking · Liquefaction',            stripe: '#f97316' },
  rain:    { icon: '🌧️', name: 'Heavy Rain / Extreme Rainfall', sub: 'Landslide trigger · Flash flood risk',     stripe: '#10b981' },
  goods:   { icon: '📦', name: 'Disaster Assistance Goods',     sub: 'Relief distribution · Community aid',      stripe: '#ec4899' },
};

// Live endpoints for hazard data
const LIVE_HAZARDS: Partial<Record<HazardKey, string>> = {
  flood:   `${BACKEND_URL}/api/gkk/flood`,
  typhoon: `${BACKEND_URL}/api/gkk/typhoon`,
  quake:   `${BACKEND_URL}/api/gkk/quake`,
  rain:    `${BACKEND_URL}/api/gkk/rain`,
  goods:   `${BACKEND_URL}/api/gkk/goods`,
};

function countStatuses(data: GkkEntry[]) {
  let safe = 0, warning = 0, elevated = 0, critical = 0;
  data.forEach(d => {
    if (d.status === 'RED') critical++;
    else if (d.status === 'ORANGE') elevated++;
    else if (d.status === 'YELLOW') warning++;
    else safe++; // GREEN
  });
  return { safe, warning, elevated, critical, total: data.length };
}

function buildMapHtml(data: GkkEntry[], meta: { icon: string; name: string }): string {
  const mappable = data.filter(e => e.lat !== null && e.lon !== null);
  const dataJson = JSON.stringify(
    mappable.map(e => ({ name: e.name, addr: e.addr, status: e.status, lat: e.lat, lon: e.lon, approx: e.approx }))
  );

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
.dot{border-radius:50%;display:block;}
.d-ok  {background:#f59e0b;box-shadow:0 0 0 2px rgba(245,158,11,.25),0 0 8px rgba(245,158,11,.6);}
.d-warn{background:#f97316;box-shadow:0 0 0 2px rgba(249,115,22,.3),0 0 12px rgba(249,115,22,.7);}
.d-crit{background:#ef4444;box-shadow:0 0 0 2px rgba(239,68,68,.35),0 0 16px rgba(239,68,68,.8);}
.d-safe{background:#22c55e;box-shadow:0 0 0 2px rgba(34,197,94,.25),0 0 8px rgba(34,197,94,.5);}
.d-ring{position:absolute;border-radius:50%;border:2px solid #ef4444;top:50%;left:50%;transform:translate(-50%,-50%);width:28px;height:28px;animation:re 1.1s ease-out infinite;opacity:0;}
@keyframes re{0%{transform:translate(-50%,-50%) scale(.3);opacity:.8;}100%{transform:translate(-50%,-50%) scale(2.4);opacity:0;}}
.leaflet-popup-content-wrapper{background:#fff!important;border:1px solid #e4e7ed!important;border-radius:10px!important;box-shadow:0 4px 20px rgba(0,0,0,.12)!important;}
.leaflet-popup-content{margin:12px 14px!important;font-family:-apple-system,sans-serif;}
.pop-name{font-size:17px;font-weight:700;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #e4e7ed;color:#1a1d23;}
.pop-row{display:flex;gap:8px;font-size:15px;margin-bottom:3px;color:#6b7280;}
.pop-val{color:#1a1d23;font-weight:500;flex:1;}
.pop-status{margin-top:8px;padding-top:8px;border-top:1px solid #e4e7ed;display:flex;align-items:center;gap:6px;font-size:15px;font-weight:600;}
.pop-dot{width:8px;height:8px;border-radius:50%;}
.pop-approx{font-size:14px;color:#9ca3af;margin-top:4px;}
.legend{position:absolute;bottom:16px;left:12px;z-index:600;background:#fff;border:1px solid #e4e7ed;border-radius:10px;padding:12px 14px;box-shadow:0 4px 16px rgba(0,0,0,.1);}
.leg-title{font-size:14px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #e4e7ed;}
.leg-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:5px;}
.leg-lbl{display:flex;align-items:center;gap:6px;font-size:15px;color:#6b7280;}
.leg-pip{width:8px;height:8px;border-radius:50%;}
.leg-val{font-size:17px;font-weight:700;}
.leg-total{font-size:14px;color:#9ca3af;padding-top:6px;border-top:1px solid #e4e7ed;margin-top:2px;display:flex;justify-content:space-between;}
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-family:-apple-system,sans-serif;color:#9ca3af;font-size:18px;gap:8px;}
</style>
</head>
<body>
<div id="map"></div>
<div class="legend" id="legend" style="display:none"></div>
<script>
var data=${dataJson};
var map=L.map('map',{zoomControl:true,attributionControl:false});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
function styleOf(s){var v=String(s).toUpperCase().trim();if(v==='RED')return'crit';if(v==='ORANGE')return'high';if(v==='YELLOW')return'warn';return'safe';}
function colorOf(s){return s==='crit'?'#ef4444':s==='high'?'#f97316':s==='warn'?'#f59e0b':'#22c55e';}
function labelOf(s){return s==='crit'?'Critical':s==='high'?'High Risk':s==='warn'?'Warning':'Safe';}
function makeIcon(s){
  var ring=s==='crit'?'<div class="d-ring"></div>':'';
  var sz=s==='crit'?14:s==='warn'?12:10;var w=sz+18;
  return L.divIcon({className:'',html:'<div style="width:'+w+'px;height:'+w+'px;display:flex;align-items:center;justify-content:center;position:relative">'+ring+'<div class="dot d-'+s+'" style="width:'+sz+'px;height:'+sz+'px"></div></div>',iconSize:[w,w],iconAnchor:[w/2,w/2],popupAnchor:[0,-(w/2+4)]});
}
if(data.length===0){
  document.getElementById('map').innerHTML='<div class="empty"><span style="font-size:32px">${meta.icon}</span><span>No data available yet</span></div>';
} else {
  var safe=0,warn=0,high=0,crit=0,bounds=[];
  data.sort(function(a,b){var o={crit:0,high:1,warn:2,safe:3};return (o[styleOf(a.status)]??3)-(o[styleOf(b.status)]??3);});
  data.forEach(function(d){
    var s=styleOf(d.status);
    if(s==='crit')crit++;else if(s==='high')high++;else if(s==='warn')warn++;else safe++;
    bounds.push([d.lat,d.lon]);
    var m=L.marker([d.lat,d.lon],{icon:makeIcon(s)});
    var note=d.approx?'<div class="pop-approx">⚠ Approximate location</div>':'';
    m.bindPopup('<div style="min-width:200px"><div class="pop-name">'+d.name+'</div><div class="pop-row"><span>Address</span><span class="pop-val">'+d.addr+'</span></div><div class="pop-row"><span>Lat / Lon</span><span class="pop-val">'+d.lat.toFixed(5)+'°N, '+d.lon.toFixed(5)+'°E</span></div><div class="pop-status"><div class="pop-dot" style="background:'+colorOf(s)+'"></div><span style="color:'+colorOf(s)+'">'+labelOf(s)+'</span></div>'+note+'</div>',{maxWidth:260});
    m.addTo(map);
  });
  var legend=document.getElementById('legend');
  legend.style.display='block';
  legend.innerHTML='<div class="leg-title">Alert summary</div><div class="leg-row"><span class="leg-lbl"><span class="leg-pip" style="background:#22c55e"></span>Safe</span><span class="leg-val" style="color:#16a34a">'+safe+'</span></div><div class="leg-row"><span class="leg-lbl"><span class="leg-pip" style="background:#f59e0b"></span>Warning</span><span class="leg-val" style="color:#d97706">'+warn+'</span></div><div class="leg-row"><span class="leg-lbl"><span class="leg-pip" style="background:#f97316"></span>High Risk</span><span class="leg-val" style="color:#ea580c">'+high+'</span></div><div class="leg-row"><span class="leg-lbl"><span class="leg-pip" style="background:#ef4444"></span>Critical</span><span class="leg-val" style="color:#ef4444">'+crit+'</span></div><div class="leg-total"><span>Total mapped</span><span style="color:#1a1d23;font-weight:700">'+data.length+'</span></div>';
  if(bounds.length>0)map.fitBounds(bounds,{padding:[50,50]});
}
setTimeout(function(){map.invalidateSize();},100);
</script>
</body>
</html>`;
}

// Hook: fetch live data for a hazard key (manual refresh only)
function useHazardData(key: HazardKey) {
  const [data, setData] = useState<GkkEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const endpoint = LIVE_HAZARDS[key];

  const load = useCallback(async () => {
    if (!endpoint) { setData([]); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      if (json.ok) {
        setData(json.data);
        setLastUpdated(new Date());
      } else {
        setError(json.error ?? 'Unknown error');
      }
    } catch (e: any) {
      setError(e.message ?? 'Network error');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, lastUpdated, reload: load };
}

// Home screen
function HomeView({ onSelect }: { onSelect: (key: HazardKey) => void }) {
  const hazards: HazardKey[] = ['flood', 'typhoon', 'quake', 'rain', 'goods'];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' }} />
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#3b82f6', letterSpacing: 0.3 }}>
            Disaster Risk Reduction &amp; Management
          </Text>
        </View>
        <Text style={{ fontSize: 21, fontWeight: '700', color: '#1a1d23', marginBottom: 6, lineHeight: 24 }}>
          GKK Community Alert Monitoring
        </Text>
        <Text style={{ fontSize: 17, color: '#6b7280', lineHeight: 20 }}>
          Real-time situational awareness across GKK communities in the Diocese of Tagum.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 14, fontWeight: '700', letterSpacing: 1, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 10 }}>
          Hazard Categories
        </Text>
        <View style={{ gap: 6 }}>
          {hazards.map(key => {
            const meta = META[key];
            const hasLive = !!LIVE_HAZARDS[key];
            return (
              <Pressable
                key={key}
                onPress={() => onSelect(key)}
                style={({ pressed }) => ({
                  flexDirection: 'row', alignItems: 'center', gap: 14,
                  backgroundColor: '#fff', borderWidth: 1,
                  borderColor: pressed ? '#d1d5db' : '#e4e7ed',
                  borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16,
                  overflow: 'hidden', opacity: pressed ? 0.9 : 1,
                })}
              >
                <View style={{ position: 'absolute', left: 0, top: 10, bottom: 10, width: 3, backgroundColor: meta.stripe, borderRadius: 3, opacity: 0.8 }} />
                <Text style={{ fontSize: 26, width: 32, textAlign: 'center' }}>{meta.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1d23', marginBottom: 2 }}>{meta.name}</Text>
                  <Text style={{ fontSize: 15, color: '#9ca3af' }}>{meta.sub}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', marginRight: 6 }}>
                  {hasLive ? (
                    <View style={{ backgroundColor: '#f0fdf4', borderWidth: 1, borderColor: '#bbf7d0', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#16a34a' }}>LIVE</Text>
                    </View>
                  ) : (
                    <View style={{ backgroundColor: '#f3f4f6', borderWidth: 1, borderColor: '#e4e7ed', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 }}>
                      <Text style={{ fontSize: 14, color: '#9ca3af' }}>No data</Text>
                    </View>
                  )}
                </View>
                <ArrowRight size={15} color="#9ca3af" strokeWidth={2} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

// Detail view for a hazard
function DetailView({ hazardKey, onBack }: { hazardKey: HazardKey; onBack: () => void }) {
  const meta = META[hazardKey];
  const { data, loading, error, lastUpdated, reload } = useHazardData(hazardKey);
  const counts = countStatuses(data);
  const mappableCount = data.filter(e => e.lat !== null).length;

  const [view, setView] = useState<'map' | 'list'>('map');
  const [search, setSearch] = useState('');

  const filtered = data.filter(e => {
    const q = search.toLowerCase().trim();
    return !q || e.name.toLowerCase().includes(q) || e.addr.toLowerCase().includes(q);
  });

  const html = buildMapHtml(data, meta);

  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <View style={{ flex: 1 }}>
      {/* Sub-header */}
      <View style={{ paddingHorizontal: 14, paddingVertical: 10, backgroundColor: '#f0f2f5', borderBottomWidth: 1, borderBottomColor: '#e4e7ed', gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Pressable
            onPress={onBack}
            style={({ pressed }) => ({
              flexDirection: 'row', alignItems: 'center', gap: 5,
              backgroundColor: '#fff', borderWidth: 1, borderColor: '#e4e7ed',
              paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <ChevronLeft size={13} color="#6b7280" strokeWidth={2.5} />
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#6b7280' }}>Back</Text>
          </Pressable>
          <View style={{ width: 1, height: 18, backgroundColor: '#e4e7ed' }} />
          <Text style={{ fontSize: 20 }}>{meta.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#1a1d23' }}>{meta.name}</Text>
            <Text style={{ fontSize: 14, color: '#9ca3af' }}>
              {loading ? 'Loading...' : counts.total > 0 ? `${mappableCount} mapped · ${counts.total} total${timeStr ? ` · ${timeStr}` : ''}` : 'No data yet'}
            </Text>
          </View>
          {/* Refresh */}
          {LIVE_HAZARDS[hazardKey] && (
            <Pressable
              onPress={reload}
              disabled={loading}
              style={({ pressed }) => ({
                flexDirection: 'row', alignItems: 'center', gap: 3,
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#e4e7ed',
                paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8,
                opacity: pressed || loading ? 0.6 : 1,
              })}
            >
              <RefreshCw size={12} color={loading ? '#3b82f6' : '#6b7280'} strokeWidth={2} />
              <Text style={{ fontSize: 15, fontWeight: '600', color: loading ? '#3b82f6' : '#6b7280' }}>
                {loading ? '…' : 'Refresh'}
              </Text>
            </Pressable>
          )}
          {/* Map / List toggle */}
          <View style={{ flexDirection: 'row', backgroundColor: '#e4e7ed', borderRadius: 8, padding: 2 }}>
            <Pressable
              onPress={() => setView('map')}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, backgroundColor: view === 'map' ? '#fff' : 'transparent' }}
            >
              <Map size={12} color={view === 'map' ? '#1a1d23' : '#9ca3af'} strokeWidth={2} />
              <Text style={{ fontSize: 15, fontWeight: '600', color: view === 'map' ? '#1a1d23' : '#9ca3af' }}>Map</Text>
            </Pressable>
            <Pressable
              onPress={() => setView('list')}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, backgroundColor: view === 'list' ? '#fff' : 'transparent' }}
            >
              <List size={12} color={view === 'list' ? '#1a1d23' : '#9ca3af'} strokeWidth={2} />
              <Text style={{ fontSize: 15, fontWeight: '600', color: view === 'list' ? '#1a1d23' : '#9ca3af' }}>List</Text>
            </Pressable>
          </View>
        </View>

        {counts.total > 0 && (
          <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
            {[
              { label: 'Safe',      count: counts.safe,     color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
              { label: 'Warning',   count: counts.warning,  color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
              { label: 'High Risk', count: counts.elevated, color: '#f97316', bg: '#fff7ed', border: '#fed7aa', text: '#9a3412' },
              { label: 'Critical',  count: counts.critical, color: '#ef4444', bg: '#fef2f2', border: '#fecaca', text: '#991b1b' },
            ].map(item => (
              <View key={item.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: item.bg, borderWidth: 1, borderColor: item.border, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99 }}>
                <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: item.color }} />
                <Text style={{ fontSize: 15, fontWeight: '500', color: item.text }}>{item.label}</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: item.text }}>{item.count}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Loading overlay */}
      {loading && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.7)' }}>
          <ActivityIndicator size="large" color="#B91C1C" />
          <Text style={{ marginTop: 10, fontSize: 17, color: '#6b7280' }}>Loading live data…</Text>
        </View>
      )}

      {/* Error banner */}
      {error && !loading && (
        <View style={{ backgroundColor: '#fef2f2', borderBottomWidth: 1, borderColor: '#fecaca', paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 16, color: '#ef4444', flex: 1 }}>Failed to load: {error}</Text>
          <Pressable onPress={reload}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#B91C1C' }}>Retry</Text>
          </Pressable>
        </View>
      )}

      {/* Map view */}
      {view === 'map' && (
        <WebView
          style={{ flex: 1 }}
          source={{ html }}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          mixedContentMode="always"
          allowUniversalAccessFromFileURLs
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* List view */}
      {view === 'list' && (
        <View style={{ flex: 1 }}>
          {counts.total === 0 && !loading ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Text style={{ fontSize: 32 }}>{meta.icon}</Text>
              <Text style={{ fontSize: 19, fontWeight: '600', color: '#1a1d23' }}>No data yet</Text>
              <Text style={{ fontSize: 17, color: '#9ca3af', textAlign: 'center', paddingHorizontal: 40 }}>
                Data for {meta.name} will appear here once available.
              </Text>
            </View>
          ) : (
            <>
              <View style={{ paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e4e7ed' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, gap: 8 }}>
                  <Text style={{ fontSize: 17, color: '#9ca3af' }}>🔍</Text>
                  <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search GKK name or address..."
                    placeholderTextColor="#9ca3af"
                    style={{ flex: 1, fontSize: 17, color: '#1a1d23' }}
                  />
                </View>
              </View>
              <View style={{ paddingHorizontal: 16, paddingTop: 6, paddingBottom: 2 }}>
                <Text style={{ fontSize: 15, color: '#9ca3af' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</Text>
              </View>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, paddingTop: 6, gap: 6 }}>
                {filtered.map((entry, idx) => {
                  const statusColor = entry.status === 'RED' ? '#ef4444' : entry.status === 'ORANGE' ? '#f97316' : entry.status === 'YELLOW' ? '#f59e0b' : '#22c55e';
                  const statusBg = entry.status === 'RED' ? '#fef2f2' : entry.status === 'ORANGE' ? '#fff7ed' : entry.status === 'YELLOW' ? '#fffbeb' : '#f0fdf4';
                  const statusBorder = entry.status === 'RED' ? '#fecaca' : entry.status === 'ORANGE' ? '#fed7aa' : entry.status === 'YELLOW' ? '#fde68a' : '#bbf7d0';
                  const statusLabel = entry.status === 'RED' ? 'Critical' : entry.status === 'ORANGE' ? 'High Risk' : entry.status === 'YELLOW' ? 'Warning' : 'Safe';
                  return (
                    <View key={idx} style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#e4e7ed', borderRadius: 10, paddingVertical: 11, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                      <View style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, backgroundColor: statusColor, marginTop: 2 }} />
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 17, fontWeight: '600', color: '#1a1d23', lineHeight: 18, marginBottom: 2 }}>{entry.name}</Text>
                        <Text style={{ fontSize: 15, color: '#6b7280', lineHeight: 16 }}>{entry.addr}</Text>
                        {entry.lat !== null && (
                          <Text style={{ fontSize: 14, color: '#9ca3af', marginTop: 3 }}>{entry.lat.toFixed(5)}°N, {entry.lon!.toFixed(5)}°E</Text>
                        )}
                      </View>
                      <View style={{ paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6, backgroundColor: statusBg, borderWidth: 1, borderColor: statusBorder }}>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: statusColor }}>{statusLabel}</Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </>
          )}
        </View>
      )}
    </View>
  );
}

export default function DisasterManagementScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeHazard, setActiveHazard] = useState<HazardKey | null>(null);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: '#B91C1C', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Pressable
          onPress={() => { if (activeHazard) setActiveHazard(null); else router.back(); }}
          style={({ pressed }) => ({ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.7 : 1 })}
        >
          <ChevronLeft size={22} color="#ffffff" strokeWidth={2.5} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: '700' }}>
            {activeHazard ? META[activeHazard].name : 'Disaster Management'}
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, marginTop: 1 }}>
            {activeHazard ? 'DRRM Alert · Diocese of Tagum' : 'Diocese of Tagum'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#4ade80' }} />
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: '500' }}>LIVE</Text>
        </View>
      </View>

      {activeHazard ? (
        <DetailView hazardKey={activeHazard} onBack={() => setActiveHazard(null)} />
      ) : (
        <HomeView onSelect={key => setActiveHazard(key)} />
      )}

      <BottomNavBar currentScreen="home" />
    </View>
  );
}
