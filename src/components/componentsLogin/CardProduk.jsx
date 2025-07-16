import { onAuthStateChanged } from "firebase/auth";
import { LinkIcon, PlusCircle, Star, User2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebase/config";
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Input from "../form-components/Input";
import { FaNoteSticky } from "react-icons/fa6";
import { IoPricetag } from "react-icons/io5";
import Button from "../form-components/Button";
import { supabase } from "../../supabase/supabaseClient";

const MY_SUPABASE_BUCKET_NAME = "linkkk";

export default function CardProduk({ ratting }) {
  const [currentUser, setCurrentUser] = useState(null);
  const { displayName } = useParams();
  const [userOwn, setUserOwn] = useState(null);
  const [userUrl, setUserUrl] = useState(null);
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({
    namaProduk: "",
    deskripsi: "",
    harga: "",
    link: "",
    gambar: "",
  });

  const image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX7+/tZWVn///9OTk5VVVVaWlpRUVHv7+/y8vLp6elwcHD5+fmEhISPj4/Q0NCZmZlISEjW1tbGxsalpaVgYGDd3d1ra2tmZma+vr7j4+O6urqsrKyenp7Nzc1sbGyRkZF8fHyHh4dDQ0OIl/4pAAAE5ElEQVR4nO2c3XqyOhBGk8kPSKqiYlFbq/b+L/ILIBYUUfuQJuz9roOeVCmrk2QmE5ExAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwH8HM+KrP3cLZOLIFTEj/4q0/JLuSBbkXXD9zR0i9cS3Ih2kcqmoV94N3+xtqEJy4PFZ+iml5/4NJVdcCZUMTSbshXkQhsV9bBgNDdtpqxiIof4gB/dBHzqQGHKebl3cBk1kaVhkRPKX+yvDyMm1o8qQrb/l0V9eLFea1E3SivjZUNi8uHbxF57hHEOXhmQNuf70FcS/MpTTcRmap9aN0RoaY6qE94jxGjKKl6v5ahk/eNdoDZlZ8VRLLeSqf6zeGBaRN3+dF39hGL+L88ZBvMd9L7wypJlWHvLi64YmqfYNRV0tk76I3BgKKdM/z4svG9KH+Nn9SVvR3n9pbbi4GPqoU181NKa5v1VS9QSxrmmahvItdEM2E01Frmf33zpOw9YgLQx2Dw1pZIYr3RqmfRNxpIa7ZgyVFCOPoa0/I9bavJa321AUPQluDPOQFrlOWptHY/KGoOT5uNdSirKibx03W/O0S5sh3DzOhyEbxokuGnFvrTjRtOihVTWN6K2nR2A4reacbnuY0zmKUpx694nBG9LqUmG3WxC0zFMhRJov++82cENTTLj6SCP9aJ2SEW2Xu8320Sa4NpwFaWioVZ7dpL1yq/fg2mEb0lbx5qGU2Ldyhs0a1Y8+wjaMc9mqP3lfar9DXdOEaGjYsS2oFJfrV+8tZEM6CM6vTk5l9urpRrCG5maLdK6ys/i145XacB+cIW06BG1IZX/j6YZgDWkhr0doNRWVPt6NYVeLOExDU91YN+p+HbpK5jdHdKEamnfZo9jVKjNkpkKJ43UPPEhDm8OPWvV8/kR0fHqE1rlWksuvqyU5QMPizGWu7+uVirt2Y96uvLvzW2S+bVVyQRq22zBd41SJZbsKj0+X3CkzWxX8/LI2XAZkSPu0X7BQTGeNWUsLOz4vS6+UzfZpgIZsfX+RaWDrN3MWNNe1QVGh11EMz5Am2VOGPKvmm6HoeDOo9U/nJjxDljxYZS5BzMrEQHt+UxsoLi494sAMbVBOoquW6VTMraL5FJ0hL3seJjzDsi3z9Acx9ZuZJJ3FXVEWHKprB2VYtevV84riaOfsvdKg7D+asAwNWzxIhNf0rkniaCu5sAxp+9wq+rT/14QCMlRpFOfyhSH6GCXzCQVjqKSIjsOG0CLVNg7F0P7DT08mwhdQUi8zFYjhg2Xjt4pcqlBi6JLCcANDGMIQhjCE4f/bUAVgOHUcwxWV/VSPhovUpaLUW0Yn6dOQ0UYJd2T7apvo09BuxqOJM4jq2t6fYd2/HfwJy+qpEzIH7TmGlaVhsRO2u7zaevo2tGP1JLQDRN1S9W7oPGsEYPgpVHFUPzjnixbPH+69zkNad7foh0LYvPipfc5Dm/oTPfCXDvygi+/HiDPuc5QW6cLlxdn5/NynoVPsv696UMO/oXGR+hmLlkl1LuLfkObp8NWpFuklLwZg6Dgv+jdcDd/gbx756INvQ7YVTnr8FZJ/L3wLMrZInKVFKfO996//Kj9h4A7z989yAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDv+Qcu7Gg4cpN/MwAAAABJRU5ErkJggg==";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  });

  // handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [setModal]);

  // Handle click
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      let filename = null;
      let downloadURL = null;
      const isNewImageUploaded = form.gambar instanceof File;
      if (isNewImageUploaded) {
        const timeStampt = Date.now();
        filename = `products/${currentUser.uid}-${timeStampt}`;

        const { data, error: uploadError } = await supabase.storage
          .from(MY_SUPABASE_BUCKET_NAME)
          .upload(filename, form.gambar, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicURLData } = supabase.storage
          .from(MY_SUPABASE_BUCKET_NAME)
          .getPublicUrl(filename);

        downloadURL = publicURLData.publicUrl;
        alert("Gambar berhasil diunggah!");
      }

      const data = {
        uuid: currentUser.uid,
        nama: form.namaProduk,
        harga: form.harga,
        deskripsi: form.deskripsi,
        link: form.link,
        gambar: downloadURL || "",
        gambarPath: filename || "",
        createdAt: Timestamp.now(),
        updateAt: Timestamp.now(),
      };
      console.log(data);
      await addDoc(collection(db, "products"), data);
    } catch (error) {
      console.log("Gagal upload: ", error);
    }finally{
      setLoading(false);
      setModal(false);
      window.location.reload()
    }
  };

  // handle change gambar
  const handleChangeGambar = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("tidak ada gambar yang di pilih!");
    }

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Mohon pilih file gambar yang valid (JPEG, PNG, GIF, atau WebP)");
      return;
    }

    // Validate file size (max 5MB)
    const MAX_FILE_SIZE_MB = 5;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`Ukuran file harus kurang dari ${MAX_FILE_SIZE_MB}MB`);
      return;
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        gambar: file, // Simpan URL publik di sini
      }));
    }
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, form[name]);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "namaProduk") {
      if (!value) error = "Nama wajib diisi";
    }

    if (name === "deskripsi") {
      if (!value) error = "Deskripsi wajib diisi";
    }
    if (name === "harga") {
      if (!value) error = "Harga wajib diisi";
    }
    if (name === "link") {
      if (!value) error = "Link wajib diisi";
    }
    setErrors({ ...errors, [name]: error });
    return !error;
  };

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
        } else {
          // ambil dari users
          setUserOwn(currentUser.uid);
          uuidUser = currentUser.uid;
        }

        if (!uuidUrl && !uuidUser) {
          console.log("uuid kosong");
        }

        const userId = uuidUrl || uuidUser;

        // Ambil products
        const productsRef = collection(db, "products");
        const queryProducts = query(productsRef, where("uuid", "==", userId));

        const productsSnapshot = await getDocs(queryProducts);

        const products = productsSnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            ...data,
          };
        });

        setProducts(products);
      } catch (error) {
        console.log("gagal query: ", error);
      }
    };

    fetch();
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
          <div className="cursor-pointer" onClick={() => setModal(true)}>
            <PlusCircle className="w-10 h-10" />
          </div>
        </div>
      ) : (
        ""
      )}

      {modal && (
        <div className="bg-black/20 fixed top-0 w-screen min-h-screen flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            ref={modalRef}
            className="bg-white p-5 rounded-md w-[400px] max-h-[90vh] overflow-y-auto"
          >
            <Input
              icon={<User2 />}
              type="text"
              label="Nama"
              id="namaProduk"
              name="namaProduk"
              placeholder="Nama produk"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.namaProduk}
            />

            <label
              htmlFor="deskripsi"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Deskripsi
            </label>

            <div className="relative mb-2">
              <div className="absolute left-3 top-1/3 transform -translate-y-1/2 w-5 h-5 text-gray-900/20 z-50">
                <FaNoteSticky />
              </div>
              <textarea
                name="deskripsi"
                id="deskripsi"
                placeholder="Deskripsi.."
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12 pr-4 py-3 border rounded-md resize-none ${
                  errors.deskripsi ? "border-red-500" : "border-gray-300" 
                }`}
              ></textarea>
              <p className="text-red-500 text-xs mt-1">{errors.deskripsi}</p>
            </div>

            <Input
              icon={<IoPricetag />}
              label="Harga"
              id="harga"
              name="harga"
              type="number"
              placeholder="Harga"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.harga}
            />

            <Input
              icon={<LinkIcon />}
              label="Link(Opsional)"
              id="link"
              name="link"
              type="text"
              placeholder="Link Whatsapp, Shopee dll"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.link}
            />

            <input
              type="file"
              id="gambar"
              accept="image/*"
              className=" mb-4 w-full"
              onChange={handleChangeGambar}
            />

            <Button loading={loading} type="submit" variant="primary">
              Submit
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
