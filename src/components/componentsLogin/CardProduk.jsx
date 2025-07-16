import { onAuthStateChanged } from "firebase/auth";
import {
  LinkIcon,
  PlusCircle,
  Star,
  User2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
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
    gambar: [], // Changed to array for multiple images
  });
  const [imagePreview, setImagePreview] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX7+/tZWVn///9OTk5VVVVaWlpRUVHv7+/y8vLp6elwcHD5+fmEhISPj4/Q0NCZmZlISEjW1tbGxsalpaVgYGDd3d1ra2tmZma+vr7j4+O6urqsrKyenp7Nzc1sbGyRkZF8fHyHh4dDQ0OIl/4pAAAE5ElEQVR4nO2c3XqyOhBGk8kPSKqiYlFbq/b+L/ILIBYUUfuQJuz9roOeVCmrk2QmE5ExAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwH8HM+KrP3cLZOLIFTEj/4q0/JLuSBbkXXD9zR0i9cS3Ih2kcqmoV94N3+xtqEJy4PFZ+iml5/4NJVdcCZUMTSbshXkQhsV9bBgNDdtpqxiIof4gB/dBHzqQGHKebl3cBk1kaVhkRPKX+yvDyMm1o8qQrb/l0V9eLFea1E3SivjZUNi8uHbxF57hHEOXhmQNuf70FcS/MpTTcRmap9aN0RoaY6qE94jxGjKKl6v5ahk/eNdoDZlZ8VRLLeSqf6zeGBaRN3+dF39hGL+L88ZBvMd9L7wypJlWHvLi64YmqfYNRV0tk76I3BgKKdM/z4svG9KH+Nn9SVvR3n9pbbi4GPqoU181NKa5v1VS9QSxrmmahvItdEM2E01Frmf33zpOw9YgLQx2Dw1pZIYr3RqmfRNxpIa7ZgyVFCOPoa0/I9bavJa321AUPQluDPOQFrlOWptHY/KGoOT5uNdSirKibx03W/O0S5sh3DzOhyEbxokuGnFvrTjRtOihVTWN6K2nR2A4reacbnuY0zmKUpx594nBG9LqUmG3WxC0zFMhRJov++82cENTTLj6SCP9aJ2SEW2Xu8320Sa4NpwFaWioVZ7dpL1yq/fg2mEb0lbx5qGU2Ldyhs0a1Y8+wjaMc9mqP3lfar9DXdOEaGjYsS2oFJfrV+8tZEM6CM6vTk5l9urpRrCG5maLdK6ys/i145XacB+cIW06BG1IZX/j6YZgDWkhr0doNRWVPt6NYVeLOExDU91YN+p+HbpK5jdHdKEamnfZo9jVKjNkpkKJ43UPPEhDm8OPWvV8/kR0fHqE1rlWksuvqyU5QMPizGWu7+uVirt2Y96uvLvzW2S+bVVyQRq22zBd41SJZbsKj0+X3CkzWxX8/LI2XAZkSPu0X7BQTGeNWUsLOz4vS6+UzfZpgIZsfX+RaWDrN3MWNNe1QVGh11EMz5Am2VOGPKvmm6HoeDOo9U/nJjxDljxYZS5BzMrEQHt+UxsoLi494sAMbVBOoquW6VTMraL5FJ0hL3seJjzDsi3z9Acx9ZuZJJ3FXVEWHKprB2VYtevV84riaOfsvdKg7D+asAwNWzxIhNf0rkniaCu5sAxp+9wq+rT/14QCMlRpFOfyhSH6GCXzCQVjqKSIjsOG0CLVNg7F0P7DT08mwhdQUi8zFYjhg2Xjt4pcqlBi6JLCcANDGMIQhjCE4f/bUAVgOHUcwxWV/VSPhovUpaLUW0Yn6dOQ0UYJd2T7apvo09BuxqOJM4jq2t6fYd2/HfwJy+qpEzIH7TmGlaVhsRO2u7zaevo2tGP1JLQDRN1S9W7oPGsEYPgpVHFUPzjnixbPH+69zkNad7foh0LYvPipfc5Dm/oTPfCXDvygi+/HiDPuc5QW6cLlxdn5/NynoVPsv696UMO/oXGR+hmLlkl1LuLfkObp8NWpFuklLwZg6Dgv+jdcDd/gbx756INvQ7YVTnr8FZJ/L3wLMrZInKVFKfO996//Kj9h4A7z989yAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDv+Qcu7Gg4cpN/MwAAAABJRU5ErkJggg==";

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
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setModal]);

  // Handle submit with multiple images
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let downloadURLs = [];
      let gambarPaths = [];

      // Upload multiple images
      if (form.gambar.length > 0) {
        for (let i = 0; i < form.gambar.length; i++) {
          const file = form.gambar[i];
          const timeStamp = Date.now();
          const filename = `products/${currentUser.uid}-${timeStamp}-${i}`;

          const { data, error: uploadError } = await supabase.storage
            .from(MY_SUPABASE_BUCKET_NAME)
            .upload(filename, file, {
              cacheControl: "3600",
              upsert: false,
            });

          if (uploadError) {
            throw uploadError;
          }

          const { data: publicURLData } = supabase.storage
            .from(MY_SUPABASE_BUCKET_NAME)
            .getPublicUrl(filename);

          downloadURLs.push(publicURLData.publicUrl);
          gambarPaths.push(filename);
        }
      }

      const data = {
        uuid: currentUser.uid,
        nama: form.namaProduk,
        harga: form.harga,
        deskripsi: form.deskripsi,
        link: form.link,
        gambar: downloadURLs, // Array of URLs
        gambarPath: gambarPaths, // Array of paths
        createdAt: Timestamp.now(),
        updateAt: Timestamp.now(),
      };

      await addDoc(collection(db, "products"), data);
      alert("Produk berhasil ditambahkan!");

      // Reset form
      setForm({
        namaProduk: "",
        deskripsi: "",
        harga: "",
        link: "",
        gambar: [],
      });
      setImagePreview([]);
    } catch (error) {
      console.log("Gagal upload: ", error);
      alert("Gagal menambahkan produk");
    } finally {
      setLoading(false);
      setModal(false);
      window.location.reload();
    }
  };

  // Handle multiple image changes
  const handleChangeGambar = async (e) => {
    const files = Array.from(e.target.files);
    const currentImages = form.gambar || [];

    // Check if adding new files would exceed the limit
    if (currentImages.length + files.length > 5) {
      alert("Maksimal 5 gambar yang dapat diunggah!");
      return;
    }

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    const MAX_FILE_SIZE_MB = 5;
    const validFiles = [];
    const newPreviews = [];

    for (const file of files) {
      // Validate file type
      if (!validTypes.includes(file.type)) {
        alert(`${file.name} bukan file gambar yang valid`);
        continue;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`${file.name} melebihi batas ukuran ${MAX_FILE_SIZE_MB}MB`);
        continue;
      }

      validFiles.push(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        if (newPreviews.length === validFiles.length) {
          setImagePreview((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    }

    if (validFiles.length > 0) {
      setForm((prevForm) => ({
        ...prevForm,
        gambar: [...currentImages, ...validFiles],
      }));
    }
  };

  // Remove image from preview and form
  const removeImage = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      gambar: prevForm.gambar.filter((_, i) => i !== index),
    }));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle change for other inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
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

  // Image carousel component for products
  const ImageCarousel = ({ images, productName }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
      return (
        <img
          src={image}
          alt={productName}
          className="w-full h-full object-cover"
        />
      );
    }

    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <div className="relative w-full h-full">
        <img
          src={Array.isArray(images) ? images[currentIndex] : images}
          alt={productName}
          className="w-full h-full object-cover"
        />

        {Array.isArray(images) && images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
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
          setUserUrl(userData.uuid);
          uuidUrl = userData.uuid;
        } else {
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
                {/* Gambar with carousel */}
                <div className="h-[180px] w-full rounded-md overflow-hidden flex items-center justify-center">
                  <ImageCarousel
                    images={produk.gambar}
                    productName={produk.nama}
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
        <div className="bg-black/20 fixed left-0 w-full top-0 min-w-screen min-h-screen flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            ref={modalRef}
            className="bg-white p-5 rounded-md  max-h-[90vh] overflow-y-auto"
          >
            <Input
              icon={<User2 />}
              type="text"
              label="Nama"
              id="namaProduk"
              name="namaProduk"
              placeholder="Nama produk"
              required={true}
              value={form.namaProduk}
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
              <div className="absolute left-3 top-3 w-5 h-5 text-gray-900/20 z-10">
                <FaNoteSticky />
              </div>
              <textarea
                name="deskripsi"
                id="deskripsi"
                placeholder="Deskripsi.."
                value={form.deskripsi}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12 pr-4 py-3 border rounded-md resize-none ${
                  errors.deskripsi ? "border-red-500" : "border-gray-300"
                }`}
                rows="4"
              />
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
              value={form.harga}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.harga}
            />

            <Input
              icon={<LinkIcon />}
              label="Link (Opsional)"
              id="link"
              name="link"
              type="text"
              placeholder="Link Whatsapp, Shopee dll"
              value={form.link}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.link}
            />

            {/* Multiple Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Produk (Maksimal 5)
              </label>
              <input
                type="file"
                id="gambar"
                multiple
                accept="image/*"
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={handleChangeGambar}
                disabled={form.gambar.length >= 5}
              />
              <p className="text-sm text-gray-500 mt-1">
                {form.gambar.length}/5 gambar dipilih
              </p>
            </div>

            {/* Image Preview */}
            {imagePreview.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview Gambar
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {imagePreview.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button loading={loading} type="submit" variant="primary">
                Submit
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setModal(false);
                  setImagePreview([]);
                  setForm({
                    namaProduk: "",
                    deskripsi: "",
                    harga: "",
                    link: "",
                    gambar: [],
                  });
                }}
                className="px-4 border py-2 text-red-500 rounded hover:bg-red-50 transition-colors"
              >
                Tutup
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
