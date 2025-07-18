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
import Produks from "../Produks";

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
      <Produks produk={products} />

      {currentUser ? (
        <div className="flex justify-center items-center py-10">
          <div className="cursor-pointer" onClick={() => setModal(true)}>
            <PlusCircle className="w-10 h-10" />
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Modal */}
      {modal && (
        <div className="bg-black/20 fixed left-0 w-full top-0 min-w-screen min-h-screen flex justify-center items-center z-50">
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
