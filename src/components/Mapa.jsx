import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const selectedIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [32, 50],
  iconAnchor: [16, 50],
  popupAnchor: [1, -40],
  shadowSize: [41, 41],
  className: 'selected-marker'
});

function MapClickHandler({ onSelectCoords, editMode }) {
  const map = useMapEvents({
    click: (e) => {
      if (editMode) {
        const { lat, lng } = e.latlng;
        onSelectCoords({ lat: parseFloat(lat.toFixed(4)), lng: parseFloat(lng.toFixed(4)) });
      }
    }
  });
  return null;
}

function Mapa({ 
  selectedCoords = null, 
  onSelectCoords = () => {}, 
  editMode = false,
  prodavnice = [],
  onMarkerClick = null
}) {
  const [center, setCenter] = useState([42.43, 19.26]);

  useEffect(() => {
    if (selectedCoords?.lat && selectedCoords?.lng) {
      setCenter([selectedCoords.lat, selectedCoords.lng]);
    } else if (prodavnice.length > 0) {
      // Auto center on first store if no selection
      const firstStore = prodavnice[0];
      if (firstStore.koordinate?.lat && firstStore.koordinate?.lng) {
        setCenter([firstStore.koordinate.lat, firstStore.koordinate.lng]);
      }
    }
  }, [selectedCoords, prodavnice]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      className={editMode ? "border border-primary" : ""}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Show all store markers */}
      {prodavnice.map((prodavnica) => (
        prodavnica.koordinate?.lat && prodavnica.koordinate?.lng && (
          <Marker 
            key={prodavnica.id}
            position={[prodavnica.koordinate.lat, prodavnica.koordinate.lng]} 
            icon={
              selectedCoords?.lat === prodavnica.koordinate.lat && 
              selectedCoords?.lng === prodavnica.koordinate.lng 
                ? selectedIcon 
                : defaultIcon
            }
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(prodavnica);
                }
              }
            }}
          >
            <Popup>
              <div className="small" style={{minWidth: "200px"}}>
                <strong style={{color: "#2c3e50", fontSize: "1.1em"}}>{prodavnica.naziv}</strong><br/>
                <div style={{marginTop: "8px", color: "#34495e"}}>
                  <div><strong>Grad:</strong> {prodavnica.grad}</div>
                  <div><strong>Adresa:</strong> {prodavnica.adresa}</div>
                  <div style={{marginTop: "6px", paddingTop: "6px", borderTop: "1px solid #bdc3c7"}}>
                    <small><strong>Koordinate:</strong></small><br/>
                    <small>Lat: {prodavnica.koordinate.lat.toFixed(4)}</small><br/>
                    <small>Lng: {prodavnica.koordinate.lng.toFixed(4)}</small>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      ))}
      
      {/* Show selected coordinate marker during edit */}
      {editMode && selectedCoords?.lat && selectedCoords?.lng && !prodavnice.some(p => 
        p.koordinate?.lat === selectedCoords.lat && 
        p.koordinate?.lng === selectedCoords.lng
      ) && (
        <Marker position={[selectedCoords.lat, selectedCoords.lng]} icon={selectedIcon}>
          <Popup>
            <div className="small">
              <strong>Odabrane koordinate</strong><br/>
              Lat: {selectedCoords.lat.toFixed(4)}<br/>
              Lng: {selectedCoords.lng.toFixed(4)}
            </div>
          </Popup>
        </Marker>
      )}
      
      {editMode && <MapClickHandler onSelectCoords={onSelectCoords} editMode={editMode} />}
    </MapContainer>
  );
}

export default Mapa;
