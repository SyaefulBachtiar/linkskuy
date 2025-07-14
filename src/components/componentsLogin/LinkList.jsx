import { BarChart3, Link, Plus, Image, Upload, Pen, Trash2 } from "lucide-react";
import { useState, useEffect} from "react";
import Input from "../form-components/Input";
import Button from "../form-components/Button";
import { collection, addDoc, Timestamp, query, where, getDocs, deleteDoc,updateDoc , doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../form-components/Loading";
import { replace, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";




const MY_SUPABASE_BUCKET_NAME = "linkkk"; 

export default function LinkList() {
  const [tambahLink, setTambahLink] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    link: "",
    nama: "",
    image: "",
    customImage: null,
    customImagePath: null
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [linkList, setLinkList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const { displayName } = useParams();
  const navigate = useNavigate();

  
  // Preset images
  const imageOptions = [
    {
      id: "tiktokshop",
      name: "TikTok Shop",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKDk0O548Kz2wS-TvjKBOnEqwH7ePdxD0pxg&s",
      color: "bg-black",
    },
    {
      id: "shopee",
      name: "Shopee",
      url: "https://play-lh.googleusercontent.com/kvAK3tQp9S-QyXrBOEQ8owaw9YL6ri4Dr0jntUqgPOGkNiM4ERNaJheiTRq_xV2ePbXv",
      color: "bg-orange-500",
    },
    {
      id: "tokopedia",
      name: "Tokopedia",
      url: "https://play-lh.googleusercontent.com/BVfL-z6kQFdkg7-8J7Krscp7m6sYv7BuVT1U3wjggB2SXjJeo-IIUbBnAvUzNkjdzqk",
      color: "bg-green-500",
    },
    {
      id: "custom",
      name: "Upload Custom",
      url: null,
      color: "bg-blue-500",
    },
  ];

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

  const handleImageSelect = (imageId) => {
    setForm((prevForm) => ({
      ...prevForm,
      image: imageId,
    }));

    // Reset custom image if selecting preset
    if (imageId !== "custom") {
      setForm((prevForm) => ({
        ...prevForm,
        customImage: null,
      }));
    }
  };

  // FUNGSI UPLOAD GAMBAR KE SUPABASE STORAGE
  const handleCustomImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Tidak ada file yang dipilih.");
      return;
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

    setUploadingImage(true); // Mulai loading untuk upload gambar

    // Validate file size (max 5MB)
    const MAX_FILE_SIZE_MB = 5;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`Ukuran file harus kurang dari ${MAX_FILE_SIZE_MB}MB`);
      return;
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        image: "custom",
        customImage: file, // Simpan URL publik di sini
      }));
      setUploadingImage(false);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, form[name]);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "link") {
      if (!value) error = "Link wajib diisi";
    }

    if (name === "nama") {
      if (!value) error = "Nama link wajib diisi";
    }

    setErrors({ ...errors, [name]: error });
    return !error;
  };

  useEffect(() => {
    const login = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoadingUser(false);
      setIsLoading(false);
    });
    return () => login();
  }, []);

  // read data
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);
        let userId = null;

        // 🔍 Jika belum login (pengunjung), ambil userId dari Firestore
        if (!currentUser) {
          const usersRef = collection(db, "users");
          const qUsers = query(
            usersRef,
            where("displayName", "==", displayName)
          );
          const userSnapshot = await getDocs(qUsers);

          if (userSnapshot.empty) {
            console.log("User with displayName not found:", displayName);
            return;
          }

          const userData = userSnapshot.docs[0].data();
          userId = userData.uuid;
        } else {
          // 👤 Jika login, ambil userId dari Firebase Auth
          userId = currentUser.uid;
        }

        // Ambil data links berdasarkan userId
        const linksRef = collection(db, "links");
        const qLinks = query(linksRef, where("userId", "==", userId));
        const linksSnapshot = await getDocs(qLinks);

       
        const linksData = linksSnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            ...data,
          };
        });

        setLinkList(linksData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        alert("Gagal mengambil data: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoadingUser) {
      fetchLinks();
    }
  }, [currentUser, displayName, isLoadingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    // Validate all fields
    const isNamaValid = validateField("nama", form.nama);
    const isLinkValid = validateField("link", form.link);

    // Upload gambar
    if (isNamaValid && isLinkValid) {
      let downloadURL = null;
      let filename = null;
      let imageUpload = form.customImage;
      let imageLama = null;
      let imageLamaCustom = null;
      // upload semua
      try {
        if (typeof form.image === "string" && editId && editMode) {
          // Ambil image links berdasarkan userId
          const docRef = doc(db, "links", editId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const imageUrlLama = data.customImagePath;
            const customImageLama = data.customImage;
            imageLamaCustom = customImageLama;
            imageLama = imageUrlLama;
            console.log("Image lama: ", imageLama, "Image upload: ", imageUpload);
        }
        }
        if (typeof form.image === "string") {
          
          try {
            if (form.image === "custom") {
              // cek image lama ada atau tidak
              if (editMode && imageLama === null) {
                // debug
                console.log("diisi filename baru");

                // 1. Buat nama file yang unik (penting!)
                const timeStampt = Date.now();
                filename = `uploads/${currentUser.uid}-${timeStampt}`;

                // 2. Unggah file ke Supabase Storage
                const { data, error: uploadError } = await supabase.storage
                  .from(MY_SUPABASE_BUCKET_NAME)
                  .upload(filename, imageUpload, {
                    cacheControl: "3600",
                    upsert: false,
                    metadata: {
                      user_id: currentUser.uid, // pastikan ini bukan undefined/null
                    },
                  });

                if (uploadError) {
                  throw uploadError;
                }

                // 3. Dapatkan URL publik dari file yang baru diunggah
                const { data: publicURLData } = supabase.storage
                  .from(MY_SUPABASE_BUCKET_NAME)
                  .getPublicUrl(filename);

                downloadURL = publicURLData.publicUrl;
                alert("Gambar kustom berhasil diunggah!");
              } else {
                // filename lama
                downloadURL = imageLamaCustom;
                filename = imageLama;
                alert("Gambar kostum tetap");
              }

              if (imageLama !== null && imageLamaCustom !== downloadURL && !editMode) {
                const { error: deleteError } = await supabase.storage
                  .from(MY_SUPABASE_BUCKET_NAME)
                  .remove([imageLama]);
                if (deleteError) {
                  console.error(
                    "Gagal hapus gambar lama:",
                    deleteError.message
                  );
                } else {
                  console.log("Gambar lama berhasil dihapus");
                }
              }
      
            }else{
              if(imageLama){
                const { error: deleteError } = await supabase.storage
                  .from(MY_SUPABASE_BUCKET_NAME)
                  .remove([imageLama]);
                if (deleteError) {
                  console.error(
                    "Gagal hapus gambar lama:",
                    deleteError.message
                  );
                } else {
                  console.log("Gambar lama berhasil dihapus");
                }
              }
            }
          } catch (err) {
            console.error("Error mengunggah gambar kustom:", err);
            alert("Gagal mengunggah gambar kustom: " + err.message);
            // Reset customImage jika gagal
            setForm((prevForm) => ({ ...prevForm, customImage: null }));
          }
        }
        const newData = {
          nama: form.nama,
          link: form.link,
          image: form.image,
          customImage: form.image === "custom" ? downloadURL : null,
          customImagePath: form.image === "custom" ? filename : null,
          userId: currentUser.uid,
          ...(editMode
            ? { updatedAt: Timestamp.now() }
            : { createdAt: Timestamp.now() }),
        };

        // Refresh list
        const q = query(
          collection(db, "links"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const linksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setLinkList(linksData);

        if (editMode && editId) {
          await updateDoc(doc(db, "links", editId), newData);
          navigate("/dashboard", { replace: true });
        } else {
          await addDoc(collection(db, "links"), newData);
          navigate("/dashboard", { replace: true });
        }
      
     } catch (error) {
        console.error("Error adding link: ", error);
        alert("Gagal menambahkan link: " + error.message);
      } finally {
        setLoading(false);
        setTambahLink(false);
        setForm({ link: "", nama: "", image: "", customImage: null });
        setErrors({});
        setTouched({});
      }
  }
  };


  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Apakah Anda yakin ingin menghapus link ini?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "links", id));
      setLinkList((prevList) => prevList.filter((item) => item.id !== id));
      alert("Link berhasil dihapus!");
      navigate('/dashboard', {replace: true});
    } catch (error) {
      console.error("Error deleting link: ", error);
      alert("Gagal menghapus link: " + error.message);
      navigate("/dashboard", {replace:true});
    }
  };

  return (
    <>
      {/* Link list */}
      <div className="p-10">
        {/* List */}
        <div className="flex flex-col gap-5 font-montserrat text-3xl">
          {/* Read firebase disini */}
          {isLoading ? (
            <Loading />
          ) : linkList.length > 0 ? (
            linkList.map((item) => (
              <div
                key={item.id}
                className="bg-white border shadow-lg rounded-xl p-5 gap-2 flex items-center text-sm sm:text-sm md:text-base lg:text-lg xl:text-4xl"
              >
                {/* Gambar */}
                <a
                  href={`${item.link}`}
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-4"
                >
                  {item.image === "custom" && item.customImage ? (
                    <>
                      {/* <p>{item.customImage}</p> */}
                      <img
                        src={item.customImage}
                        alt="custom"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </>
                  ) : (
                    <img
                      src={
                        imageOptions.find((opt) => opt.id === item.image)?.url
                      }
                      alt={item.image}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}

                  <p>{item.nama}</p>
                </a>
                {/* Aksi */}
                {currentUser ? (
                  <div className="w-[10%] flex justify-end items-center">
                    <button
                      className="p-4"
                      onClick={() => {
                        setForm({
                          nama: item.nama,
                          link: item.link,
                          image: item.image,
                          customImage: item.customImage || null,
                          customImagePath: item.customImagePath || null
                        });
                        setTambahLink(true);
                        setEditMode(true);
                        setEditId(item.id);
                        setTouched({ nama: true, link: true });
                      }}
                    >
                      <Pen />
                    </button>
                    <button
                      className="p-4"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="text-red-600" />
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))
          ) : ""}
        </div>

        {/* Button tambah link */}
        {currentUser ? (
          <>
            <div className="font-montserrat text-4xl my-12 flex justify-center items-center flex-col ">
              <h1 className="text-center">Tambahkan Link</h1>
              <button
                onClick={() => setTambahLink(true)}
                className="bg-blue-500 w-[50px] h-[50px] flex justify-center items-center rounded-[50%] text-white mt-5"
              >
                <Plus />
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {/* Modal */}
      {tambahLink && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-md w-[400px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-montserrat mb-4">Tambah Link</h2>
            <form onSubmit={handleSubmit}>
              <Input
                icon={<BarChart3 />}
                label="Masukan Nama Link"
                id="nama"
                name="nama"
                type="text"
                placeholder="Masukan Nama Link"
                value={form.nama}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={errors.nama}
              />
              <Input
                icon={<Link />}
                label="Masukan Link Produk Anda"
                id="link"
                name="link"
                type="text"
                placeholder="https://produkdigital.com"
                value={form.link}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={errors.link}
              />

              {/* Image Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Image className="inline w-4 h-4 mr-2" />
                  Pilih Gambar Platform
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {imageOptions.map((option) => (
                    <div key={option.id}>
                      {option.id === "custom" ? (
                        <div className="space-y-2">
                          <label
                            htmlFor="customImage"
                            className="cursor-pointer"
                          >
                            <div
                              className={`
                              cursor-pointer p-3 rounded-lg border-2 transition-all duration-200
                              ${
                                form.image === option.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }
                            `}
                            >
                              <div className="flex flex-col items-center space-y-2">
                                <div
                                  className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center overflow-hidden`}
                                >
                                  {form.customImage ? (
                                    <img
                                      src={form.customImage}
                                      alt="Custom"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Upload className="w-6 h-6 text-white" />
                                  )}
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                  {option.name}
                                </span>
                                {uploadingImage && form.image === option.id && (
                                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                )}
                                {form.image === option.id &&
                                  !uploadingImage && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                              </div>
                            </div>
                          </label>
                          <input
                            id="customImage"
                            type="file"
                            accept="image/*"
                            onChange={handleCustomImageUpload}
                            className="hidden"
                          />
                        </div>
                      ) : (
                        <div
                          onClick={() => handleImageSelect(option.id)}
                          className={`
                            cursor-pointer p-3 rounded-lg border-2 transition-all duration-200
                            ${
                              form.image === option.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }
                          `}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div
                              className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center overflow-hidden`}
                            >
                              <img
                                src={option.url}
                                alt={option.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {option.name}
                            </span>
                            {form.image === option.id && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  loading={loading || uploadingImage}
                  type="submit"
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={
                    !form.link || !form.nama || !form.image

                    // link: "",
                    // nama: "",
                    // image: "",
                    // customImage: null,
                  }
                >
                  Tambah
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setTambahLink(false);
                    setForm({ link: "", nama: "", image: "default" });
                    setErrors({});
                    setTouched({});
                  }}
                  className="px-4 border py-2 text-red-500 rounded hover:bg-red-50 transition-colors"
                >
                  Tutup
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}