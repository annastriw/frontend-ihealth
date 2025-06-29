'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGetAllUserMap } from '@/http/admin/map/get-user-map';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';

// Dynamic imports
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Custom icons
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


// Kelurahan dan RW
const rwByKelurahan = {
  pedalangan: Array.from({ length: 11 }, (_, i) => `RW ${i + 1}`),
  padangsari: Array.from({ length: 17 }, (_, i) => `RW ${i + 1}`),
};

// Kelurahan type
type KelurahanType = keyof typeof rwByKelurahan;

export default function DashboardAdminUsersMapsWrapper() {
  const { data: session, status } = useSession();

  const { data: userMapData, isPending } = useGetAllUserMap(
    session?.access_token as string,
    {
      enabled: status === 'authenticated',
    }
  );

  const defaultPosition = { lat: -7.0562, lng: 110.4381 };

  if (isPending) return <div className="p-6">Loading data pengguna...</div>;

  // Init grouped RW data
  const grouped: Record<KelurahanType, Record<string, { DM: number; HT: number, ALL: number }>> = {
    pedalangan: {},
    padangsari: {},
  };

  Object.entries(rwByKelurahan).forEach(([kelurahan, rwList]) => {
    rwList.forEach(rw => {
      grouped[kelurahan as KelurahanType][rw] = { DM: 0, HT: 0, ALL: 0 };
    });
  });

  userMapData?.data?.forEach((user: any) => {
    const kel = user.kelurahan?.toLowerCase();
    const rw = user.rw;
    const disease = user.disease_type?.toUpperCase();

    if ((kel === 'pedalangan' || kel === 'padangsari') && rw && grouped[kel as KelurahanType]?.[rw]) {
  if (disease === 'DM') grouped[kel as KelurahanType][rw].DM++;
  else if (disease === 'HT') grouped[kel as KelurahanType][rw].HT++;
  else if (disease === 'ALL') {
    grouped[kel as KelurahanType][rw].DM++;
    grouped[kel as KelurahanType][rw].HT++;
     grouped[kel as KelurahanType][rw].ALL++;
  }
}

  });

  return (
    <div className='space-y-8'>

      <MapContainer
        center={[defaultPosition.lat, defaultPosition.lng]}
        zoom={13}
        scrollWheelZoom
        className="h-[80vh] w-full rounded-lg z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userMapData?.data?.map((user: any) => {
          const lat = parseFloat(user.latitude);
          const lng = parseFloat(user.longitude);
          if (isNaN(lat) || isNaN(lng)) return null;

          const disease = user.disease_type?.toUpperCase();
const markerIcon = disease === 'HT'
  ? redIcon
  : disease === 'ALL'
  ? yellowIcon
  : blueIcon;


          return (
            <Marker key={user.id} position={[lat, lng]} icon={markerIcon}>
              <Popup>
                <div className="text-sm">
                  <p><strong>{user.name}</strong></p>
                  <p>Email: {user.email}</p>
                  <p>Kelurahan: {user.kelurahan}</p>
                  <p>RW: {user.rw}</p>
                  <p>Alamat: {user.address}</p>
                  <p>
  Penyakit:{' '}
  {disease === 'HT'
    ? 'Hipertensi'
    : disease === 'DM'
    ? 'Diabetes Melitus'
    : 'Diabetes Melitus dan Hipertensi'}
</p>

                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Statistik RW per kelurahan */}
      <div className="grid md:grid-cols-2 gap-6">
        {(['pedalangan', 'padangsari'] as KelurahanType[]).map(kelurahan => (
          <Card key={kelurahan} className="p-4">
            <h3 className="text-lg font-bold capitalize mb-2">{kelurahan}</h3>
            <div className="space-y-1">
              {rwByKelurahan[kelurahan].map(rw => {
                const count = grouped[kelurahan][rw];
                return (
                  <div key={rw} className="text-sm flex justify-between border-b pb-1">
                    <span>{rw}</span>
                    <span>
                      Hipertensi: {count.HT} | Diabetes Melitus: {count.DM} | Diabetes Melitus dan Hipertensi: {count.ALL}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
