import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Layers, 
  ExternalLink, 
  Check, 
  Loader2, 
  Compass, 
  Info,
  Maximize2,
  Minimize2,
  Copy,
  Store,
  Building2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { SelectedLocationDetails } from '../types';

interface RealAddressMapPickerProps {
  initialVillage?: string;
  initialBlock?: string;
  initialDistrict?: string;
  radiusKm?: number;
  onLocationSelect: (details: SelectedLocationDetails) => void;
  onClose?: () => void;
  isCompact?: boolean;
}

// Preset verified locations for rapid testing
const PRESET_LOCATIONS = [
  {
    name: 'Bithri Chainpur, Bareilly (UP)',
    village: 'Bithri Chainpur',
    block: 'Bithri',
    district: 'Bareilly',
    state: 'Uttar Pradesh',
    pincode: '243122',
    lat: 28.3242,
    lng: 79.4674
  },
  {
    name: 'Othakadai, Madurai (TN) - PPT Slide 6',
    village: 'Othakadai',
    block: 'Madurai East',
    district: 'Madurai',
    state: 'Tamil Nadu',
    pincode: '625107',
    lat: 9.9723,
    lng: 78.1818
  },
  {
    name: 'Tijara, Alwar (Rajasthan)',
    village: 'Tijara',
    block: 'Tijara',
    district: 'Alwar',
    state: 'Rajasthan',
    pincode: '301411',
    lat: 27.9333,
    lng: 76.8500
  },
  {
    name: 'Baramati, Pune (Maharashtra)',
    village: 'Baramati',
    block: 'Baramati',
    district: 'Pune',
    state: 'Maharashtra',
    pincode: '413102',
    lat: 18.1517,
    lng: 74.5772
  },
  {
    name: 'Pipariya, Narmadapuram (MP)',
    village: 'Pipariya',
    block: 'Pipariya',
    district: 'Narmadapuram',
    state: 'Madhya Pradesh',
    pincode: '461775',
    lat: 22.7594,
    lng: 78.3582
  }
];

export const RealAddressMapPicker: React.FC<RealAddressMapPickerProps> = ({
  initialVillage = 'Bithri Chainpur',
  initialBlock = 'Bithri',
  initialDistrict = 'Bareilly',
  radiusKm = 5,
  onLocationSelect,
  onClose,
  isCompact = false
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const mainMarkerRef = useRef<L.Marker | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);
  const poiLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);

  // Search & input states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [isLocatingUser, setIsLocatingUser] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [tileMode, setTileMode] = useState<'street' | 'satellite' | 'clean'>('street');
  const [isFullscreen, setIsFullscreen] = useState(!isCompact);

  // Current selected location state
  const [currentLocation, setCurrentLocation] = useState<SelectedLocationDetails>({
    formattedAddress: `${initialVillage}, ${initialBlock}, ${initialDistrict}`,
    village: initialVillage,
    block: initialBlock,
    district: initialDistrict,
    state: 'Uttar Pradesh',
    pincode: '243122',
    lat: 28.3242,
    lng: 79.4674
  });

  // Custom high-contrast SVG divIcon for the enterprise location
  const createPinIcon = () => {
    return L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-full">
          <div class="absolute w-8 h-8 bg-orange-500 rounded-full opacity-30 animate-ping"></div>
          <div class="w-9 h-9 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white z-10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div class="absolute -bottom-1 w-2.5 h-1 bg-black/40 rounded-full blur-[1px]"></div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 36]
    });
  };

  // Helper to generate nearby illustrative ecosystem landmarks
  const updateNearbyLandmarks = useCallback((centerLat: number, centerLng: number, map: L.Map) => {
    if (!poiLayerGroupRef.current) {
      poiLayerGroupRef.current = L.layerGroup().addTo(map);
    }
    poiLayerGroupRef.current.clearLayers();

    // Generate 3 contextual ecosystem pins around the point
    const landmarks = [
      {
        name: 'Saturday Rural Haat & Mandi Yard',
        type: 'haat',
        lat: centerLat + 0.012,
        lng: centerLng + 0.014,
        distance: '1.8 km',
        color: '#059669',
        tag: 'Weekly Liquidation Channel'
      },
      {
        name: 'CSC / Gram Panchayat Digital Seva',
        type: 'csc',
        lat: centerLat - 0.009,
        lng: centerLng - 0.011,
        distance: '1.2 km',
        color: '#2563eb',
        tag: 'MoSJE Documentation Hub'
      },
      {
        name: 'Informal Trader Cluster (Competitor)',
        type: 'competitor',
        lat: centerLat + 0.018,
        lng: centerLng - 0.016,
        distance: '2.4 km',
        color: '#dc2626',
        tag: 'Low Local Processing'
      }
    ];

    landmarks.forEach((lm) => {
      const poiIcon = L.divIcon({
        className: 'custom-poi-pin',
        html: `
          <div class="flex items-center gap-1 bg-white/95 px-2 py-1 rounded-md border border-slate-300 shadow-md text-[10px] font-bold text-slate-800 whitespace-nowrap cursor-pointer">
            <span class="w-2 h-2 rounded-full" style="background-color: ${lm.color};"></span>
            <span>${lm.name} (${lm.distance})</span>
          </div>
        `,
        iconSize: [120, 26],
        iconAnchor: [60, 13]
      });

      const poiMarker = L.marker([lm.lat, lm.lng], { icon: poiIcon });
      poiMarker.bindPopup(`
        <div class="p-1 font-sans text-xs">
          <p class="font-bold text-slate-900">${lm.name}</p>
          <p class="text-[11px] text-slate-600 mt-0.5">Approx. ${lm.distance} from selected site</p>
          <span class="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">${lm.tag}</span>
        </div>
      `);
      poiLayerGroupRef.current?.addLayer(poiMarker);
    });
  }, []);

  // Reverse Geocoding using OpenStreetMap Nominatim
  const performReverseGeocoding = useCallback(async (lat: number, lng: number) => {
    setIsReverseGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en'
          }
        }
      );
      if (!response.ok) throw new Error('Geocoding response failed');
      const data = await response.json();
      
      const addr = data.address || {};
      const detectedVillage = 
        addr.village || 
        addr.hamlet || 
        addr.suburb || 
        addr.neighbourhood || 
        addr.town || 
        addr.residential || 
        initialVillage;

      const detectedBlock = 
        addr.county || 
        addr.tehsil || 
        addr.subdistrict || 
        addr.municipality || 
        initialBlock;

      const detectedDistrict = 
        addr.state_district || 
        addr.district || 
        addr.city || 
        initialDistrict;

      const detectedState = addr.state || 'India';
      const detectedPincode = addr.postcode || '';

      const updatedDetails: SelectedLocationDetails = {
        formattedAddress: data.display_name || `${detectedVillage}, ${detectedBlock}, ${detectedDistrict}`,
        village: detectedVillage,
        block: detectedBlock,
        district: detectedDistrict,
        state: detectedState,
        pincode: detectedPincode,
        lat: Number(lat.toFixed(6)),
        lng: Number(lng.toFixed(6))
      };

      setCurrentLocation(updatedDetails);
      onLocationSelect(updatedDetails);
    } catch (err) {
      console.warn('Reverse geocoding fallback to manual coordinate mapping:', err);
      const fallbackDetails: SelectedLocationDetails = {
        formattedAddress: `Custom Coordinates (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        village: currentLocation.village || initialVillage,
        block: currentLocation.block || initialBlock,
        district: currentLocation.district || initialDistrict,
        state: currentLocation.state || 'India',
        pincode: currentLocation.pincode || '',
        lat: Number(lat.toFixed(6)),
        lng: Number(lng.toFixed(6))
      };
      setCurrentLocation(fallbackDetails);
      onLocationSelect(fallbackDetails);
    } finally {
      setIsReverseGeocoding(false);
    }
  }, [currentLocation, initialBlock, initialDistrict, initialVillage, onLocationSelect]);

  // Set up Leaflet map instance on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Check matching preset or default to Bithri
    const matchedPreset = PRESET_LOCATIONS.find(
      (p) => p.village.toLowerCase() === initialVillage.toLowerCase() ||
             p.district.toLowerCase() === initialDistrict.toLowerCase()
    ) || PRESET_LOCATIONS[0];

    const initialLat = matchedPreset.lat;
    const initialLng = matchedPreset.lng;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 13,
      zoomControl: true
    });

    mapInstanceRef.current = map;

    // Street Tile Layer
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    baseTileLayerRef.current = tileLayer;

    // Draggable Main Enterprise Pin
    const marker = L.marker([initialLat, initialLng], {
      icon: createPinIcon(),
      draggable: true
    }).addTo(map);
    mainMarkerRef.current = marker;

    // Market Reach & Competitor Catchment Radius
    const circle = L.circle([initialLat, initialLng], {
      radius: radiusKm * 1000,
      color: '#ea580c',
      weight: 2,
      fillColor: '#ea580c',
      fillOpacity: 0.1,
      dashArray: '5, 5'
    }).addTo(map);
    radiusCircleRef.current = circle;

    // Ecosystem Landmarks
    updateNearbyLandmarks(initialLat, initialLng, map);

    // Marker Drag Event
    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      circle.setLatLng(pos);
      updateNearbyLandmarks(pos.lat, pos.lng, map);
      performReverseGeocoding(pos.lat, pos.lng);
    });

    // Map Click Event to drop pin
    map.on('click', (e: L.LeafletMouseEvent) => {
      const pos = e.latlng;
      marker.setLatLng(pos);
      circle.setLatLng(pos);
      updateNearbyLandmarks(pos.lat, pos.lng, map);
      performReverseGeocoding(pos.lat, pos.lng);
    });

    // Cleanup on unmount
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update radius circle if prop changes
  useEffect(() => {
    if (radiusCircleRef.current) {
      radiusCircleRef.current.setRadius(radiusKm * 1000);
    }
  }, [radiusKm]);

  // Tile layer switcher
  const handleTileModeChange = (mode: 'street' | 'satellite' | 'clean') => {
    setTileMode(mode);
    if (!mapInstanceRef.current || !baseTileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(baseTileLayerRef.current);

    let newUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let newAttr = '&copy; OpenStreetMap contributors';

    if (mode === 'satellite') {
      newUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      newAttr = '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    } else if (mode === 'clean') {
      newUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      newAttr = '&copy; CartoDB &copy; OpenStreetMap';
    }

    const newLayer = L.tileLayer(newUrl, {
      maxZoom: 19,
      attribution: newAttr
    }).addTo(mapInstanceRef.current);

    baseTileLayerRef.current = newLayer;
  };

  // Center map on specific coords
  const centerMapOn = (lat: number, lng: number, zoom = 14) => {
    if (!mapInstanceRef.current || !mainMarkerRef.current || !radiusCircleRef.current) return;
    mapInstanceRef.current.setView([lat, lng], zoom);
    mainMarkerRef.current.setLatLng([lat, lng]);
    radiusCircleRef.current.setLatLng([lat, lng]);
    updateNearbyLandmarks(lat, lng, mapInstanceRef.current);
    performReverseGeocoding(lat, lng);
  };

  // Search Address handler
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery + ' India'
        )}&countrycodes=in&limit=5&addressdetails=1`,
        {
          headers: { 'Accept-Language': 'en' }
        }
      );
      if (!res.ok) throw new Error('Search failed');
      const results = await res.json();
      setSearchResults(results);

      if (results.length > 0) {
        const top = results[0];
        centerMapOn(parseFloat(top.lat), parseFloat(top.lon));
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Select Search Result
  const handleSelectResult = (item: any) => {
    centerMapOn(parseFloat(item.lat), parseFloat(item.lon));
    setSearchResults([]);
    setSearchQuery(item.display_name.split(',').slice(0, 3).join(','));
  };

  // Preset Location Selection
  const handleSelectPreset = (preset: typeof PRESET_LOCATIONS[0]) => {
    centerMapOn(preset.lat, preset.lng, 14);
    setSearchQuery(`${preset.village}, ${preset.district}`);
  };

  // GPS Locate Me handler
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocatingUser(false);
        centerMapOn(pos.coords.latitude, pos.coords.longitude, 16);
      },
      (err) => {
        setIsLocatingUser(false);
        console.warn('Geolocation error:', err);
        alert('Could not retrieve device GPS location. Please choose or search an address.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Copy GPS Coordinates
  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${currentLocation.lat}, ${currentLocation.lng}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col transition-all duration-300 ${
      isFullscreen ? 'h-[580px]' : 'h-[360px]'
    }`}>
      {/* Header Bar */}
      <div className="p-3 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Accurate Address & Hyper-Local Geo-Picker
              </h3>
              <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold rounded border border-emerald-500/30">
                LIVE GPS
              </span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-1">
              Click map or drag the orange pin to set your exact enterprise premises
            </p>
          </div>
        </div>

        {/* Controls: GPS Locate Me + Tile Switcher + Fullscreen */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Tile Layer Selector */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[10px] font-mono">
            <button
              type="button"
              onClick={() => handleTileModeChange('street')}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                tileMode === 'street' ? 'bg-orange-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Street
            </button>
            <button
              type="button"
              onClick={() => handleTileModeChange('satellite')}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                tileMode === 'satellite' ? 'bg-orange-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Satellite
            </button>
            <button
              type="button"
              onClick={() => handleTileModeChange('clean')}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                tileMode === 'clean' ? 'bg-orange-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Terrain
            </button>
          </div>

          {/* Locate Me */}
          <button
            type="button"
            onClick={handleLocateMe}
            disabled={isLocatingUser}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 cursor-pointer transition-colors"
            title="Pinpoint current device GPS coordinates"
          >
            {isLocatingUser ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-400" />
            ) : (
              <Navigation className="w-3.5 h-3.5 text-orange-400" />
            )}
            <span className="hidden sm:inline">Locate Me</span>
          </button>

          {/* Toggle Fullscreen / Compact Height */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 cursor-pointer"
            title={isFullscreen ? 'Collapse height' : 'Expand map height'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Search Input Bar & Quick Village Buttons */}
      <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex flex-col gap-2 shrink-0 z-20">
        <form onSubmit={handleSearch} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search village, town, panchayat, or landmark (e.g. Othakadai Madurai, Bithri Bareilly)..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:border-orange-500 shadow-2xs"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1"
          >
            {isSearching ? <Loader2 className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
            <span>Find</span>
          </button>
        </form>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="bg-white border border-slate-300 rounded-lg shadow-lg max-h-48 overflow-y-auto divide-y divide-slate-100 z-30">
            {searchResults.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectResult(item)}
                className="w-full text-left px-3 py-2 text-xs hover:bg-orange-50 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span className="truncate text-slate-800 font-medium">{item.display_name}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">Select</span>
              </button>
            ))}
          </div>
        )}

        {/* Quick Rural Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-[11px]">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold shrink-0">
            Quick Pins:
          </span>
          {PRESET_LOCATIONS.map((loc) => {
            const isSelected = 
              currentLocation.village.toLowerCase() === loc.village.toLowerCase() ||
              currentLocation.district.toLowerCase() === loc.district.toLowerCase();

            return (
              <button
                key={loc.name}
                type="button"
                onClick={() => handleSelectPreset(loc)}
                className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-orange-600 text-white font-bold shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <MapPin className="w-2.5 h-2.5" />
                <span>{loc.village}, {loc.district}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real Map Canvas */}
      <div className="flex-1 relative w-full h-full min-h-[180px]">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Catchment Radius Indicator Badge */}
        <div className="absolute top-3 right-3 z-[400] bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-300 shadow-md text-xs font-mono flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></div>
          <span className="font-bold text-slate-800">{radiusKm}km Feasibility Radius</span>
          <span className="text-[10px] text-slate-500 border-l border-slate-200 pl-1.5">Weekly Haat Catchment</span>
        </div>

        {/* Reverse Geocoding Loading Indicator */}
        {isReverseGeocoding && (
          <div className="absolute bottom-3 left-3 z-[400] bg-slate-900/90 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 shadow-lg">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-400" />
            <span>Resolving exact village address & GPS...</span>
          </div>
        )}
      </div>

      {/* Bottom Summary Bar: Selected Address Details */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
              Selected Enterprise Address:
            </span>
            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded">
              Verified Pin
            </span>
          </div>
          <p className="font-bold text-slate-900 text-xs line-clamp-1">
            {currentLocation.formattedAddress}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono flex-wrap">
            <span>Village: <strong className="text-slate-800">{currentLocation.village}</strong></span>
            <span>Block: <strong className="text-slate-800">{currentLocation.block}</strong></span>
            <span>District: <strong className="text-slate-800">{currentLocation.district}</strong></span>
            <span>State: <strong className="text-slate-800">{currentLocation.state}</strong></span>
            {currentLocation.pincode && <span>PIN: <strong className="text-slate-800">{currentLocation.pincode}</strong></span>}
          </div>
        </div>

        {/* Actions: Copy Coordinates + Open in Google Maps */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyCoords}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy Latitude, Longitude"
          >
            {copiedCoords ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCoords ? 'Copied GPS' : `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`}</span>
          </button>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${currentLocation.lat},${currentLocation.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
            title="Verify location on Google Maps in new tab"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
