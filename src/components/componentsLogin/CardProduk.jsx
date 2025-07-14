import { onAuthStateChanged } from "firebase/auth";
import { PlusCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function CardProduk({ ratting }) {
  const [currentUser, setCurrentUser] = useState(null);
  const {displayName} = useParams();
  const [userOwn, setUserOwn] = useState(null);
  const [userUrl, setUserUrl] = useState(null);
  const [products, setProducts] = useState([]);


  const image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX7+/tZWVn///9OTk5VVVVaWlpRUVHv7+/y8vLp6elwcHD5+fmEhISPj4/Q0NCZmZlISEjW1tbGxsalpaVgYGDd3d1ra2tmZma+vr7j4+O6urqsrKyenp7Nzc1sbGyRkZF8fHyHh4dDQ0OIl/4pAAAE5ElEQVR4nO2c3XqyOhBGk8kPSKqiYlFbq/b+L/ILIBYUUfuQJuz9roOeVCmrk2QmE5ExAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwH8HM+KrP3cLZOLIFTEj/4q0/JLuSBbkXXD9zR0i9cS3Ih2kcqmoV94N3+xtqEJy4PFZ+iml5/4NJVdcCZUMTSbshXkQhsV9bBgNDdtpqxiIof4gB/dBHzqQGHKebl3cBk1kaVhkRPKX+yvDyMm1o8qQrb/l0V9eLFea1E3SivjZUNi8uHbxF57hHEOXhmQNuf70FcS/MpTTcRmap9aN0RoaY6qE94jxGjKKl6v5ahk/eNdoDZlZ8VRLLeSqf6zeGBaRN3+dF39hGL+L88ZBvMd9L7wypJlWHvLi64YmqfYNRV0tk76I3BgKKdM/z4svG9KH+Nn9SVvR3n9pbbi4GPqoU181NKa5v1VS9QSxrmmahvItdEM2E01Frmf33zpOw9YgLQx2Dw1pZIYr3RqmfRNxpIa7ZgyVFCOPoa0/I9bavJa321AUPQluDPOQFrlOWptHY/KGoOT5uNdSirKibx03W/O0S5sh3DzOhyEbxokuGnFvrTjRtOihVTWN6K2nR2A4reacbnuY0zmKUpx694nBG9LqUmG3WxC0zFMhRJov++82cENTTLj6SCP9aJ2SEW2Xu8320Sa4NpwFaWioVZ7dpL1yq/fg2mEb0lbx5qGU2Ldyhs0a1Y8+wjaMc9mqP3lfar9DXdOEaGjYsS2oFJfrV+8tZEM6CM6vTk5l9urpRrCG5maLdK6ys/i145XacB+cIW06BG1IZX/j6YZgDWkhr0doNRWVPt6NYVeLOExDU91YN+p+HbpK5jdHdKEamnfZo9jVKjNkpkKJ43UPPEhDm8OPWvV8/kR0fHqE1rlWksuvqyU5QMPizGWu7+uVirt2Y96uvLvzW2S+bVVyQRq22zBd41SJZbsKj0+X3CkzWxX8/LI2XAZkSPu0X7BQTGeNWUsLOz4vS6+UzfZpgIZsfX+RaWDrN3MWNNe1QVGh11EMz5Am2VOGPKvmm6HoeDOo9U/nJjxDljxYZS5BzMrEQHt+UxsoLi494sAMbVBOoquW6VTMraL5FJ0hL3seJjzDsi3z9Acx9ZuZJJ3FXVEWHKprB2VYtevV84riaOfsvdKg7D+asAwNWzxIhNf0rkniaCu5sAxp+9wq+rT/14QCMlRpFOfyhSH6GCXzCQVjqKSIjsOG0CLVNg7F0P7DT08mwhdQUi8zFYjhg2Xjt4pcqlBi6JLCcANDGMIQhjCE4f/bUAVgOHUcwxWV/VSPhovUpaLUW0Yn6dOQ0UYJd2T7apvo09BuxqOJM4jq2t6fYd2/HfwJy+qpEzIH7TmGlaVhsRO2u7zaevo2tGP1JLQDRN1S9W7oPGsEYPgpVHFUPzjnixbPH+69zkNad7foh0LYvPipfc5Dm/oTPfCXDvygi+/HiDPuc5QW6cLlxdn5/NynoVPsv696UMO/oXGR+hmLlkl1LuLfkObp8NWpFuklLwZg6Dgv+jdcDd/gbx756INvQ7YVTnr8FZJ/L3wLMrZInKVFKfO996//Kj9h4A7z989yAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDv+Qcu7Gg4cpN/MwAAAABJRU5ErkJggg==";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  });
  
  // read data
  useEffect(() => {
    const fetch = async () => {
      try {
        let uuidUrl = null;
        let uuidUser = null;

        if (!currentUser) {
          const useRef = collection(db, "users");
          const queryUser = query(
            useRef,
            where("displayName", "==", displayName)
          );

          const snapShot = await getDocs(queryUser);

          if (snapShot.empty) {
            console.log("User with displayName not found:", displayName);
            return;
          }

          const userData = snapShot.docs[0].data();
          
          // id yang di ambil dari url
          setUserUrl(userData.uuid);
          console.log(userUrl);

          uuidUrl = userData.uuid;
          
        }else{
          // ambil dari users
          setUserOwn(currentUser.uid);
          uuidUser = currentUser.uid;
        }

        if(!uuidUrl && !uuidUser){
          console.log("uuid kosong");
        }

        const userId = uuidUrl || uuidUser;
        
        // Ambil products
        const productsRef = collection(db, "products");
        const queryProducts = query(productsRef, where("uuid", "==", userId))

        const productsSnapshot = await getDocs(queryProducts);
        
        const products = productsSnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            ...data,
          }
        })

        setProducts(products);
      } catch (error) {
        console.log("gagal query: ", error);
      }
    };
    
    fetch()
  }, [currentUser, displayName, userOwn]);

  return (
    <>
      {/* Card produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userUrl || userOwn
          ? products.map((produk) => (
              <div
                key={produk.id}
                className="border border-white p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition duration-300"
              >
                {/* Gambar */}
                <div className="h-[180px] w-full rounded-md overflow-hidden flex items-center justify-center">
                  <img
                    src={produk.gambar || image}
                    alt="gambar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Informasi Produk */}
                <div className="my-4">
                  <h1 className="text-xl font-semibold">{produk.nama}</h1>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {produk.deskripsi}
                  </p>

                  {/* Rating */}
                  <div className="flex mt-2">
                    {Array.from({ length: ratting }, (_, index) => (
                      <Star
                        key={index}
                        className="text-yellow-300 h-4 w-4"
                        fill="yellow"
                      />
                    ))}
                  </div>

                  {/* Tombol */}
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-3 w-full hover:bg-blue-600 transition">
                    Beli
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
      {currentUser ? (
        <div className="flex justify-center items-center py-10">
          <div className="cursor-pointer">
            <PlusCircle className="w-10 h-10" />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
