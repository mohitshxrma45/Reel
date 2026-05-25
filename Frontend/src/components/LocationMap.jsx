
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to handle marker position changes
function DraggableMarker({ position, setPosition }) {
    const map = useMap();
    const markerRef = useRef(null);

    const eventHandlers = useRef({
        dragend() {
            const marker = markerRef.current;
            if (marker != null) {
                const newPos = marker.getLatLng();
                setPosition([newPos.lat, newPos.lng]);
            }
        },
    });

    useEffect(() => {
        if (position[0] && position[1]) {
            map.setView(position, map.getZoom());
        }
    }, [position, map]);

    return (
        <Marker
            ref={markerRef}
            position={position}
            draggable={true}
            eventHandlers={eventHandlers.current}
        />
    );
}

const LocationMap = ({ latitude, longitude, onLocationChange, height = "300px" }) => {
    const [position, setPosition] = React.useState([latitude || 28.6139, longitude || 77.2090]);
    
    React.useEffect(() => {
        if (latitude && longitude) {
            setPosition([latitude, longitude]);
        }
    }, [latitude, longitude]);

    const handlePositionChange = (newPos) => {
        setPosition(newPos);
        if (onLocationChange) {
            onLocationChange({
                latitude: newPos[0],
                longitude: newPos[1]
            });
        }
    };

    if (!position[0] || !position[1]) {
        return (
            <div 
                className="flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-xl"
                style={{ height }}
            >
                <p className="text-slate-500 dark:text-slate-400">Select a location on the map</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600">
            <MapContainer
                center={position}
                zoom={15}
                style={{ height, width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DraggableMarker 
                    position={position} 
                    setPosition={handlePositionChange}
                />
            </MapContainer>
        </div>
    );
};

export default LocationMap;