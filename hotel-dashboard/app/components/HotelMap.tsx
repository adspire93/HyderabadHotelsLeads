'use client';

import { useEffect, useState } from 'react';
import { Hotel } from '../lib/types';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface HotelMapProps {
  hotels: Hotel[];
}

export default function HotelMap({ hotels }: HotelMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 h-[500px] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading map...</div>
      </div>
    );
  }

  // Center of Hyderabad
  const center: [number, number] = [17.385044, 78.486671];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hotel Locations</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Click on markers to view hotel details</p>
      </div>
      <div className="h-[500px]">
        <MapContainer
          center={center}
          zoom={11}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hotels.map((hotel) => (
            <Marker
              key={hotel.google_place_id}
              position={[hotel.latitude, hotel.longitude]}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h4 className="font-semibold text-sm mb-2">{hotel.hotel_name}</h4>
                  <div className="text-xs space-y-1">
                    {hotel.star_segment && (
                      <p className="text-gray-600">
                        <span className="font-medium">Segment:</span> {hotel.star_segment}
                      </p>
                    )}
                    {hotel.google_rating && (
                      <p className="text-gray-600">
                        <span className="font-medium">Rating:</span> ⭐ {hotel.google_rating.toFixed(1)}
                      </p>
                    )}
                    {hotel.primary_phone && (
                      <p className="text-gray-600">
                        <span className="font-medium">Phone:</span> {hotel.primary_phone}
                      </p>
                    )}
                    {hotel.website && (
                      <a
                        href={hotel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline block mt-2"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
