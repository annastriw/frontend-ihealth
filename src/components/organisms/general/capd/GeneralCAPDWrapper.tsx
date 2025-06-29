import Image from "next/image";

export default function GeneralCAPDWrapper() {
  return (
    <div className="space-y-4 text-justify">
      <Image
        src={"/images/content/capd.jpeg"}
        alt="CAPD"
        width={1000}
        height={1000}
        loading="lazy"
        className="rounded-xl md:max-w-[700px]"
      />
      <div>
        Continuous Ambulatory Peritoneal Dialysis (CAPD) merupakan jenis
        dialisis yang menggunakan membran peritoneal sebagai membran
        semipermeabel.(18) Metode CAPD dilakukan dengan menggunakan permukaan
        peritoneum yang luasnya 22.000 cm2 sebagai permukaan difusi.
      </div>
      <div>
        Metode CAPD dilakukan dengan cara mengalirkan cairan pembersih melalui
        kateter ke bagian perut, kemudian lapisan perut (peritoneum) akan
        menyaring dan membuang sisa produk yang tidak digunakan kembali oleh
        darah. Kemudian, dalam beberapa saat cairan yang mengandung limbah yang
        telah disaring akan mengalir keluar dan dapat dibuang. Metode CAPD
        dilakukan dengan cara memasukkan cairan dialisis ke dalam tubuh pasien
        sebanyak 2 liter, melalui kateter yang telah dipasang permanen di dalam
        perut pasien. Zat sisa yang tersebar dalam tubuh seperti urea, vitamin
        K, serta elektrolit yang berlebih akan menuju cairan dialisis yang
        kemudian akan dialirkan dan keluar serta diganti beberapa kali dalam
        sehari.
      </div>
      <div>
        Metode CAPD sebagai salah satu terapi pengganti ginjal dapat diberikan
        dengan aman dan efektif dilakukan dimana saja dengan mekanisme
        memasukkan cairan dialisat ke dalam rongga peritoneal dengan melalui
        kateter serta kantung yang terbagi menjadi dua yaitu kantung untung
        cairan masuk (dialisat solution) dan kantong pembuangan (drainage bag)
        dari peritoneal. Proses pemasukan cairan dialisat biasanya berlangsung
        selama 20-30 menit, kemudian dibiarkan selama 4-6 jam (dwelling time)
        bergantung pada konsentrasi cairan untuk mencapai keseimbangan. Selama
        fase dwelling time akan terjadi proses pertukaran dari cairan dialisat
        kotor menjadi cairan dialisat yang bersih melalui difusi, osmosis, dan
        transpor aktif. Walaupun memiliki keunggulan dari aspek kemudahan jika
        dibandingkan dengan terapi gagal ginjal lainnya, penggunaan terapi CAPD
        harus tetap mengedepankan tempat yang bersih untuk menukar cairan
        dialisis karena rentan adanya kontaminasi bakteri yang dapat menimbulkan
        infeksi maupun komplikasi jika tidak ditangani dengan baik.
      </div>
    </div>
  );
}
