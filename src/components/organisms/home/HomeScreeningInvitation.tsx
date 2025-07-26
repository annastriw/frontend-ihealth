"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function HomeScreeningInvitation() {
  return (
    <Card className="mt-24 border-0 shadow-2xl md:px-10 md:py-14 rounded-2xl bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <div className="order-2 md:order-1 space-y-6 px-6 md:px-0 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-paytone text-primary leading-tight text-balance">
              Cek Kesehatanmu, Mulai dari Sini!
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-balance">
              Cukup dengan beberapa klik, kamu bisa mengenali kondisi kesehatanmu. 
              Jawab pertanyaan ringan, dan dapatkan gambaran awal tentang kesejahteraan tubuhmu. 
              Praktis, cepat, dan bisa diakses di mana saja!
            </p>
            <Link href="/login">
              <Button className="w-full sm:w-auto px-6 py-2 text-base transition-transform duration-300 hover:scale-105">
                Mulai Sekarang
              </Button>
            </Link>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px] aspect-square transition-transform duration-300 hover:scale-105">
              <Image
                src="/images/assets/doctor.png"
                alt="Ilustrasi Dokter"
                fill
                priority
                className="object-contain"
              />
              {/* Optional Decorative Circle */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl hidden sm:block" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
