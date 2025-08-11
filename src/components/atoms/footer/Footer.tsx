export default function Footer() {
  return (
    <footer className="relative mt-20 w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/assets/bg-footer.png)",
        }}
      />

      {/* Overlay turquoise transparan */}
      <div className="absolute inset-0 bg-[#0bb79acc]" />

      {/* Konten Footer */}
      <div className="relative z-10 w-full px-6 py-10 text-white sm:px-10 md:px-12 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-10 gap-x-6 text-sm md:grid-cols-2 lg:grid-cols-3">
          {/* Kolom 1 */}
          <div className="break-words">
            <h2 className="mb-2 text-base font-semibold sm:text-lg">KKN-T IBDU 26 UNDIP</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Kelurahan Pedalangan & Padangsari
              <br />
              Kecamatan Banyumanik
              <br />
              Kota Semarang, Jawa Tengah
            </p>
          </div>

          {/* Kolom 2 */}
          <div className="break-words">
            <h2 className="mb-2 text-base font-semibold sm:text-lg">Ikuti Kami</h2>
            <ul className="space-y-1 text-white/90 text-sm sm:text-base">
              <li>
                <a
                  href="https://instagram.com/ihealthkkn26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white hover:underline"
                >
                  Instagram: @ihealthkkn26
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@kknt.sehatademsari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white hover:underline"
                >
                  TikTok: @kknt.sehatademsari
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3 */}
          <div className="break-words">
            <h2 className="mb-2 text-base font-semibold sm:text-lg">Hak Cipta</h2>
            <p className="text-white/90 text-sm sm:text-base">
              © {new Date().getFullYear()} KKN Tim 26 Universitas Diponegoro.
              <br />
              Seluruh hak cipta dilindungi undang-undang.
            </p>
          </div>
        </div>

        {/* Footer bawah */}
        <div className="mt-10 border-t border-white/50 pt-4 text-center text-xs text-white/80 sm:text-sm">
          Dibuat oleh Tim IT KKN-T IBDU 26 UNDIP 💻
        </div>
      </div>
    </footer>
  );
}
