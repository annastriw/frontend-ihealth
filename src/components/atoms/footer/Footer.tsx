export default function Footer() {
  return (
    <footer className="relative mt-20 h-[300px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/assets/bg-footer.png)",
        }}
      />

      {/* Overlay untuk efek warna turquoise transparan */}
      <div className="absolute inset-0 bg-[#0bb79acc]" />

      {/* Konten Footer */}
      <div className="relative z-10 h-full px-8 py-10 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 text-sm md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="mb-2 text-lg font-semibold">KKN Tim 26 IDBU 2025</h2>
            <p className="text-white/90">
              Universitas Diponegoro
              <br />
              Desa Medini, Kec. Ungaran Barat
              <br />
              Kab. Semarang, Jawa Tengah
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold">Ikuti Kami</h2>
            <ul className="space-y-1 text-white/90">
              <li>
                <a
                  href="https://instagram.com/sehatademsari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white hover:underline"
                >
                  Instagram: @sehatademsari
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

          <div>
            <h2 className="mb-2 text-lg font-semibold">Hak Cipta</h2>
            <p className="text-white/90">
              © {new Date().getFullYear()} KKN Tim 26 Universitas Diponegoro.
              <br />
              Seluruh hak cipta dilindungi undang-undang.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/50 pt-4 text-center text-xs text-white/80">
          Dibuat oleh Tim IT KKN Sehat Ademsari 💻
        </div>
      </div>
    </footer>
  );
}
