import { Star } from "lucide-react";

export default function CardProduk({ ratting }) {
  return (
    <>
      {/* Card produk */}
      <div className="border border-white p-5 rounded-xl">
        {/* gambar */}
        <div className="">
          <div className=" h-[180px] bg-gray-500 rounded-md"></div>
        </div>

        {/* Informasi Produk */}
        <div className="my-4">
          {/* teks */}
          <div className="font-montserrat w-[250px]">
            <h1 className="text-xl">Lorem, ipsum.</h1>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
              voluptatem?
            </p>

            {/* Ratting */}
            <div className="flex mt-2">
              {Array.from({ length: ratting }, (_, index) => (
                <Star
                  key={index}
                  className="text-yellow-300 h-5 w-5"
                  fill="yellow"
                />
              ))}
            </div>
          </div>

          {/* button */}
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
              Beli
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
