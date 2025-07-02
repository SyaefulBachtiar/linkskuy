export default function Halaman1(){
    return (
      <div className="h-screen w-full bg-gradient-to-r from-[rgb(152,156,230)] via-[#A1A4CE] to-[#4A94AE] inline-block relative -z-20">
        <div className="mt-20 h-full flex flex-wrap gap-10 sm:gap-10">
          <div className="w-full sm:w-[50%] h-[150px] sm:h-auto">
            <div className="font-montserrat my-[100px] sm:my-[150px] mx-4 sm:mx-10 flex flex-col gap-4">
              <h1 className="text-4xl text-white font-montserrat">
                Buat Link Profil untuk semua produk digital mu.
              </h1>
              <p className="text-gray-200">
                Simpan link produk afiliate, tiktok shop, shopee dan produk
                digital kamu yang lainnya
              </p>
            </div>
          </div>
          <div className="w-full h-[300px] sm:h-auto sm:w-[40%] flex items-center justify-center">
            <div className="sm:w-[230px] sm:h-[300px] -rotate-6 sm:-rotate-12">
              <img
                src="/images/Halaman1Image.png"
                alt="handphone"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    );
}