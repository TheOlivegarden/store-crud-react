import { MapContainer, TileLayer, Marker } from "react-leaflet";

function Mapa() {
  return (
    <MapContainer
    center={[42.43, 19.26]}
    zoom={13}
    style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Mapa;
