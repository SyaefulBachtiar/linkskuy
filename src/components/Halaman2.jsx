export default function Halaman2(){
    const contents = [
      {
        gambar: "/images/image1.png",
        judul: "Template Website Produk Digital",
        text: "Dengan Desain Template yang menarik dan Interaktif.",
      },
      {
        gambar: "/images/image2.png",
        judul: "Tentunya Gratis...",
        text: "Kamu bisa Desain Website Online kamu denga template menarik yang sudah kami sediakan.",
      },
      {
        gambar: "/images/image3.png",
        judul: "Di Integrasikan dengan WhatsApp",
        text: "Pesan langsung dikirim melalui WhatsApp mu.",
      },
    ];
    return (
      <div className=" flow-root bg-slate-300">
        <div className="mt-[150px] font-montserrat">
          <div className="px-10">
                <h1 className="text-4xl">Kami Menyediakan</h1>
          </div>
          <div className="flex gap-10 flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap xl:flex-nowrap">
                {contents.map((content, i) => (
                    <div
                    key={i}
                    className="flex flex-col justify-center mt-20 p-10"
                    >
                        <div className="">
                            <img src={content.gambar} alt={`gambar ${i}`} className="object-center p-5" />
                        </div>
                        <div className="w-[80%]">
                            <h1 className="text-3xl">{content.judul}</h1>
                            <p>{content.text}</p>
                        </div>
                    </div>
                ))}
          </div>
        </div>
      </div>
    );
}