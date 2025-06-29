'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import L, { LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap, useMapEvents } from 'react-leaflet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardTitle from '@/components/atoms/typography/DashboardTitle';
import { useAddPostMap } from '@/http/users/post-maps-user';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function FlyToUser({ coords }: { coords: LatLngLiteral }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 15);
    }
  }, [coords, map]);
  return null;
}

function MapClickHandler({ setCoords }: { setCoords: (coords: LatLngLiteral) => void }) {
  useMapEvents({
    click(e) {
      setCoords({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}

function RefreshLocationButton({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="absolute bottom-4 right-4 z-[9999]">
      <Button className="bg-green-600 hover:bg-green-700" onClick={onRefresh}>
        Refresh Lokasi
      </Button>
    </div>
  );
}

const kelurahanOptions = {
  pedalangan: Array.from({ length: 11 }, (_, i) => `RW ${i + 1}`),
  padangsari: Array.from({ length: 17 }, (_, i) => `RW ${i + 1}`),
};

export default function SimpleMapTest() {
  const [coords, setCoords] = useState<LatLngLiteral>({ lat: -6.2, lng: 106.816666 });
  const [locationChosen, setLocationChosen] = useState(false);

  const [kelurahan, setKelurahan] = useState('');
  const [rw, setRw] = useState('');
  const [alamatLengkap, setAlamatLengkap] = useState('');

  const queryClient = useQueryClient();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newCoords = { lat: latitude, lng: longitude };
          setCoords(newCoords);
          setLocationChosen(true);
        },
        (err) => {
          console.error('Gagal mendapatkan lokasi:', err.message);
          alert('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.');
        }
      );
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const { mutate, isPending } = useAddPostMap({
    onSuccess: () => {
      toast.success('Lokasi berhasil disimpan!');
      queryClient.invalidateQueries({ queryKey: ['check-map-user'] });
    },
    onError: () => {
      toast.error('Gagal menyimpan lokasi, silakan coba lagi.');
    },
  });

const fullAddress = alamatLengkap;

  return (
    <div className="w-full h-screen flex flex-col gap-4 p-6 pt-20">
      <DashboardTitle
        head="Pilih Lokasi"
        body="Pilih lokasi terlebih dahulu untuk melanjutkan"
      />

      <div className="relative h-[80vh] w-full rounded-lg overflow-hidden">
        <MapContainer
          center={[coords.lat, coords.lng]}
          zoom={13}
          scrollWheelZoom
          className="h-full w-full z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locationChosen && <FlyToUser coords={coords} />}
          <MapClickHandler
            setCoords={(newCoords) => {
              setCoords(newCoords);
              setLocationChosen(true);
            }}
          />
          {locationChosen && <Marker position={[coords.lat, coords.lng]} />}
        </MapContainer>

        <RefreshLocationButton onRefresh={getUserLocation} />
      </div>

      {/* Pilih Kelurahan */}
      <Select onValueChange={(val) => { setKelurahan(val); setRw(''); }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih Kelurahan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pedalangan">Pedalangan</SelectItem>
          <SelectItem value="padangsari">Padangsari</SelectItem>
        </SelectContent>
      </Select>

      {/* Pilih RW */}
      {kelurahan && (
        <Select onValueChange={setRw}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih RW" />
          </SelectTrigger>
          <SelectContent>
            {kelurahanOptions[kelurahan as keyof typeof kelurahanOptions].map((rwVal) => (
              <SelectItem key={rwVal} value={rwVal}>
                {rwVal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Input Alamat Manual */}
      <Input
        type="text"
        value={alamatLengkap}
        onChange={(e) => setAlamatLengkap(e.target.value)}
        placeholder="Masukkan alamat lengkap: Jalan, RT/RW, Kelurahan, Kecamatan, Kota atau Kabupaten"
        className="w-full"
      />

      {/* Submit */}
      <Button
  disabled={!locationChosen || !kelurahan || !rw || !alamatLengkap || isPending}
  onClick={() =>
    mutate({
      latitude: coords.lat.toString(),
      longitude: coords.lng.toString(),
      address: fullAddress,
      kelurahan,
      rw,
    })
  }
>
  {isPending ? 'Menyimpan...' : 'Pilih Lokasi'}
</Button>

    </div>
  );
}
