import { onAuthStateChanged } from "firebase/auth";
import { PlusCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";

export default function CardProduk({ ratting }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  });
  return (
    <>
      {/* Card produk */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:[200px_minmax(900px,_1fr)_100px] gap-5">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, voluptatem?
              </p>

              {/* Ratting */}
              <div className="flex mt-2">
                {Array.from({ length: ratting }, (_, index) => (
                  <Star
                    key={index}
                    className="text-yellow-300 h-4 w-4"
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
      </div>
      {currentUser ? (
        <div className="flex justify-center items-center py-10">
          <div>
            <PlusCircle />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
