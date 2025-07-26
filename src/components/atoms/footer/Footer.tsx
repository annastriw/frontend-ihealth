"use client";

import { Instagram, Music2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 w-full overflow-hidden bg-black text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/assets/bg-footer.png)" }}
      />
      <div className="absolute inset-0 bg-[#0bb79acc]" />

      {/* Konten */}
      <div className="relative z-10 w-full px-6 py-12 sm:px-10 md:px-14 lg:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Info KKN */}
          <div>
            <h2 className="mb-2 text-lg font-semibold sm:text-xl">KKN-T IBDU 26 UNDIP</h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Kelurahan Pedalangan & Padangsari
              <br />
              Kecamatan Banyumanik
              <br />
              Kota Semarang, Jawa Tengah
            </p>
          </div>

          {/* Sosial Media */}
          <div>
            <h2 className="mb-2 text-lg font-semibold sm:text-xl">Ikuti Kami</h2>
            <ul className="space-y-3 text-white/90 text-sm sm:text-base">
              <li className="flex items-center gap-2 hover:text-white transition">
                <Instagram className="h-5 w-5" />
                <a
                  href="https://instagram.com/ihealthkkn26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  @ihealthkkn26
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition">
                <Music2 className="h-5 w-5" />
                <a
                  href="https://www.tiktok.com/@kknt.sehatademsari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  @kknt.sehatademsari
                </a>
              </li>
            </ul>
          </div>

          {/* Hak Cipta */}
          <div>
            <h2 className="mb-2 text-lg font-semibold sm:text-xl">Hak Cipta</h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              © {new Date().getFullYear()} KKN Tim 26 Universitas Diponegoro.
              <br />
              Seluruh hak cipta dilindungi undang-undang.
            </p>
          </div>
        </div>

        {/* Bawah */}
        <div className="mt-12 border-t border-white/30 pt-4 text-center text-xs sm:text-sm text-white/70">
          Dibuat oleh Tim IT KKN-T IBDU 26 UNDIP 💻
        </div>
      </div>
    </footer>
  );
}
