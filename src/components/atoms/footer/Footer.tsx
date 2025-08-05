"use client";

import { Instagram, Music2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative mt-20 w-full overflow-hidden text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/assets/bg-footer.png)" }}
      />
      {/* Overlay hijau seperti FAQ (sedikit lebih gelap) */}
      <div className="absolute inset-0 bg-[oklch(68%_0.138_146/0.88)]" />

      {/* Konten */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 w-full px-4 py-12 sm:px-10 md:px-14 lg:px-20"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Info KKN */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold sm:text-xl">
              KKN-T IBDU 26 UNDIP
            </h2>
            <p className="text-sm leading-relaxed text-white/90 sm:text-base">
              Kelurahan Pedalangan & Padangsari
              <br />
              Kecamatan Banyumanik
              <br />
              Kota Semarang, Jawa Tengah
            </p>
          </div>

          {/* Sosial Media */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold sm:text-xl">Ikuti Kami</h2>
            <ul className="space-y-3 text-sm text-white/90 sm:text-base">
              <li className="flex items-center gap-3 transition hover:scale-105 hover:text-white">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Instagram className="h-5 w-5" />
                </motion.div>
                <a
                  href="https://instagram.com/ihealthkkn26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  @ihealthkkn26
                </a>
              </li>
              <li className="flex items-center gap-3 transition hover:scale-105 hover:text-white">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Music2 className="h-5 w-5" />
                </motion.div>
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
          <div className="space-y-2">
            <h2 className="text-lg font-semibold sm:text-xl">Hak Cipta</h2>
            <p className="text-sm leading-relaxed text-white/90 sm:text-base">
              © {new Date().getFullYear()} KKN Tim 26 Universitas Diponegoro.
              <br />
              Seluruh hak cipta dilindungi undang-undang.
            </p>
          </div>
        </div>

        {/* Footer bawah */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 border-t border-white/30 pt-5 text-center text-xs text-white/70 sm:text-sm"
        >
          Dibuat oleh{" "}
          <span className="text-white">Tim IT KKN-T IBDU 26 UNDIP 💻</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
