import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createTrackingSocket } from "../../lib/socket";
import type { Socket } from "socket.io-client";

/* ── Leaflet icon fix ── */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ── Custom icons ── */
const driverIcon = L.divIcon({
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  html: `<div style="width:36px;height:36px;border-radius:50%;background:#1E40AF;border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,0.3),0 0 16px rgba(30,64,175,0.4);display:flex;align-items:center;justify-content:center;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
  </div>`,
});

const pickupIcon = L.divIcon({
  className: "",
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  html: `<svg width="24" height="32" viewBox="0 0 24 32"><path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20C24 5.37 18.63 0 12 0z" fill="#22c55e"/><circle cx="12" cy="12" r="5" fill="#fff"/></svg>`,
});

const dropoffIcon = L.divIcon({
  className: "",
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  html: `<svg width="24" height="32" viewBox="0 0 24 32"><path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20C24 5.37 18.63 0 12 0z" fill="#ef4444"/><circle cx="12" cy="12" r="5" fill="#fff"/></svg>`,
});

/* ── Auto-pan to driver ── */
function FlyToPosition({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 15, { duration: 1 });
  }, [map, lat, lng]);
  return null;
}

/* ── Types ── */
interface LiveTrackingMapProps {
  driverId: string | null;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
}

interface DriverPosition {
  lat: number;
  lng: number;
  speed: number | null;
  timestamp: number;
}

/* ── Lagos fallback center ── */
const LAGOS_CENTER: [number, number] = [6.5244, 3.3792];

export default function LiveTrackingMap({
  driverId,
  pickupLocation,
  dropoffLocation,
  status,
}: LiveTrackingMapProps) {
  const [driverPos, setDriverPos] = useState<DriverPosition | null>(null);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const isTracking = status === "IN_TRANSIT" && !!driverId;

  // Connect to socket and listen for driver location
  useEffect(() => {
    if (!isTracking) return;

    const s = createTrackingSocket();

    s.on("connect", () => {
      setConnected(true);
      // Join as a viewer for this specific shipment
      s.emit("admin:connect", {});
    });

    s.on("disconnect", () => setConnected(false));

    s.on("location:update", (data: {
      driverId: string;
      position: { lat: number; lng: number; speed: number | null; timestamp: number };
    }) => {
      if (data.driverId === driverId) {
        setDriverPos(data.position);
      }
    });

    socketRef.current = s;

    return () => {
      s.disconnect();
      socketRef.current = null;
    };
  }, [isTracking, driverId]);

  if (!isTracking) {
    return (
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid var(--border-soft, #e2e8f0)",
          background: "var(--bg-secondary, #f8fafc)",
          padding: "24px 16px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.3 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto" }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary, #64748b)" }}>
          Live tracking will appear here when your delivery is in transit
        </p>
      </div>
    );
  }

  const mapCenter: [number, number] = driverPos
    ? [driverPos.lat, driverPos.lng]
    : LAGOS_CENTER;

  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border-soft, #e2e8f0)", position: "relative" }}>
      {/* Connection status */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 10px",
          borderRadius: 8,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(4px)",
          fontSize: 11,
          fontWeight: 600,
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: connected ? "#22c55e" : "#ef4444",
            display: "inline-block",
          }}
        />
        {connected ? "Live Tracking" : "Connecting..."}
        {driverPos && driverPos.speed !== null && driverPos.speed > 0 && (
          <span style={{ color: "#64748b", marginLeft: 4 }}>
            {(driverPos.speed * 3.6).toFixed(0)} km/h
          </span>
        )}
      </div>

      <MapContainer
        center={mapCenter}
        zoom={14}
        style={{ height: 350, width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {driverPos && (
          <>
            <FlyToPosition lat={driverPos.lat} lng={driverPos.lng} />
            <Marker position={[driverPos.lat, driverPos.lng]} icon={driverIcon}>
              <Popup>
                <div style={{ fontFamily: "system-ui", minWidth: 120 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#1E3A8A" }}>Your Driver</div>
                  {driverPos.speed !== null && (
                    <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>
                      {(driverPos.speed * 3.6).toFixed(0)} km/h
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* Pickup marker — use Lagos center as placeholder since we don't have geocoded coords */}
        <Marker position={LAGOS_CENTER} icon={pickupIcon}>
          <Popup><b>Pickup:</b> {pickupLocation}</Popup>
        </Marker>

        <Marker position={[LAGOS_CENTER[0] - 0.02, LAGOS_CENTER[1] + 0.02]} icon={dropoffIcon}>
          <Popup><b>Dropoff:</b> {dropoffLocation}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
