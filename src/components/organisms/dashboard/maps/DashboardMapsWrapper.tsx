// src/components/organisms/dashboard/maps/DashboardMapsWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import L, { LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap, useMapEvents, GeoJSON } from 'react-leaflet';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DashboardTitle from '@/components/atoms/typography/DashboardTitle';
import { useAddPostMap } from '@/http/users/post-maps-user';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  locationSchema,
  LocationFormType,
} from '@/validators/maps/location-validator';

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
    map.flyTo([coords.lat, coords.lng], 15);
  }, [coords, map]);
  return null;
}

function MapClickHandler({
  setCoords,
  setLocationChosen,
  isInsidePolygon,
}: {
  setCoords: (coords: LatLngLiteral) => void;
  setLocationChosen: (val: boolean) => void;
  isInsidePolygon: (lat: number, lng: number) => boolean;
}) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const isInside = isInsidePolygon(lat, lng);
      setCoords({ lat, lng });
      setLocationChosen(isInside);
      if (!isInside) {
        toast.warning('Lokasi di luar Kecamatan Banyumanik. Geser ke dalam area.');
      }
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
  Pedalangan: Array.from({ length: 11 }, (_, i) => `RW ${i + 1}`),
  Padangsari: Array.from({ length: 17 }, (_, i) => `RW ${i + 1}`),
};

export default function DashboardMapsWrapper() {
  const [coords, setCoords] = useState<LatLngLiteral>({ lat: -7.071422, lng: 110.428874 });
  const [locationChosen, setLocationChosen] = useState(false);
  const [polygon, setPolygon] = useState<any | null>(null);
  const queryClient = useQueryClient();

  const isInsidePolygon = (lat: number, lng: number) => {
    if (!polygon?.features?.length) return false;
    return booleanPointInPolygon(point([lng, lat]), polygon.features[0]);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ lat: latitude, lng: longitude });
          const inside = isInsidePolygon(latitude, longitude);
          setLocationChosen(inside);
          if (!inside) {
            toast.warning('Lokasi Anda di luar Kecamatan Banyumanik. Silakan klik atau geser pada peta.');
          }
        },
        (err) => {
          console.error('Gagal mendapatkan lokasi:', err.message);
          alert('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.');
        }
      );
    }
  };

  useEffect(() => {
    fetch('/maps/banyumanik.geojson')
      .then((res) => res.json())
      .then((data) => setPolygon(data));
  }, []);

  useEffect(() => {
    if (polygon) getUserLocation();
  }, [polygon]);

  const form = useForm<LocationFormType>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      kelurahan: '',
      rw: '',
      alamatLengkap: '',
    },
  });

  const kelurahan = form.watch('kelurahan');

  const { mutate, isPending } = useAddPostMap({
    onSuccess: () => {
      toast.success('Lokasi berhasil disimpan!');
      queryClient.invalidateQueries({ queryKey: ['check-map-user'] });
    },
    onError: () => {
      toast.error('Gagal menyimpan lokasi, silakan coba lagi.');
    },
  });

  const onSubmit = (data: LocationFormType) => {
    if (!isInsidePolygon(coords.lat, coords.lng)) {
      toast.error('Lokasi harus berada di dalam Kecamatan Banyumanik.');
      return;
    }
    mutate({
      latitude: coords.lat.toString(),
      longitude: coords.lng.toString(),
      address: data.alamatLengkap,
      kelurahan: data.kelurahan,
      rw: data.rw,
    });
  };

  return (
    <div className="w-full h-screen overflow-y-auto flex flex-col gap-4 p-6 pt-20">
      <DashboardTitle head="Pilih Lokasi" body="Pilih lokasi terlebih dahulu untuk melanjutkan" />

      <div className="relative h-[80vh] w-full rounded-lg overflow-hidden">
        <MapContainer
          center={[coords.lat, coords.lng]}
          zoom={13}
          scrollWheelZoom
          className="h-full w-full z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {polygon && 
          <GeoJSON
  data={polygon}
  style={{
    color: '#166534',                      // Outline hijau tua
    fillColor: 'rgba(34, 197, 94, 0.2)',   // Isi hijau muda transparan
    fillOpacity: 1,
    weight: 2,
  }}
/>

          
          }
          {polygon && (
            <MapClickHandler
              setCoords={setCoords}
              setLocationChosen={setLocationChosen}
              isInsidePolygon={isInsidePolygon}
            />
          )}
          <Marker position={[coords.lat, coords.lng]} />
          <FlyToUser coords={coords} />
        </MapContainer>

        <RefreshLocationButton onRefresh={getUserLocation} />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="kelurahan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kelurahan</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Kelurahan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pedalangan">Pedalangan</SelectItem>
                      <SelectItem value="Padangsari">Padangsari</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {kelurahan && (
            <FormField
              control={form.control}
              name="rw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RW</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih RW" />
                      </SelectTrigger>
                      <SelectContent>
                        {kelurahanOptions[kelurahan as keyof typeof kelurahanOptions].map((rw) => (
                          <SelectItem key={rw} value={rw}>{rw}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="alamatLengkap"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan alamat lengkap" {...field} />
                </FormControl>
                <FormMessage />
                <p className="text-sm text-muted-foreground mt-1">
                  Contoh: Jl. Kenanga Barat No. 5 RT 02 RW 03, Kel. Pedalangan, Kec. Banyumanik
                </p>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Menyimpan...' : 'Pilih Lokasi'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
