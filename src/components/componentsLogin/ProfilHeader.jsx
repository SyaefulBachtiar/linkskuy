import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase/config"; // pastikan path sesuai
import { onAuthStateChanged } from "firebase/auth";
import {
  Link,
  Link2,
  PenSquare,
  User,
} from "lucide-react";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import Input from "../form-components/Input";
import Button from "../form-components/Button";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSnapchat,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient";

const MY_SUPABASE_BUCKET_NAME = "linkkk";

export default function ProfilHeader() {
  const [currentUser, setCurrentUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profil, setProfile] = useState([]);
  const [sosmed, setSosmed] = useState([]);
  const [profileOpsi, setProfileOpsi] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState({});

  // Inisialisasi form dengan default value yang proper
  const [form, setForm] = useState({
    profilImg: "",
    profilNama: "",
    socialMediaList: [
      {
        sosialMedia: "",
        link: "",
      },
    ],
  });


  const linkText = `https://linkskuy.vercel.app/${currentUser?.displayName}`;
  const modal = useRef(null);
  const opsi = useRef(null);

  // Array untuk dropdown media sosial
  const socialMediaOptions = [
    { value: "", label: "Pilih Media Sosial", disabled: true },
    { value: "instagram", label: "Instagram" },
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter/X" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "youtube", label: "YouTube" },
    { value: "tiktok", label: "TikTok" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "telegram", label: "Telegram" },
    { value: "snapchat", label: "Snapchat" },
    { value: "pinterest", label: "Pinterest" },
  ];

  // sosmed icon dan url
  const sosmedICon = [
    { id: "instagram", icon: <FaInstagram /> },
    { id: "facebook", icon: <FaFacebook /> },
    { id: "twitter", icon: <FaTwitter /> },
    { id: "linkedin", icon: <FaLinkedin /> },
    { id: "youtube", icon: <FaYoutube /> },
    { id: "tiktok", icon: <FaTiktok /> },
    { id: "whatsapp", icon: <FaWhatsapp /> },
    { id: "telegram", icon: <FaTelegram /> },
    { id: "snapchat", icon: <FaSnapchat /> },
    { id: "pinterest", icon: <FaPinterest /> },
  ];

  // Fungsi untuk menambah social media baru
  const addSocialMedia = () => {
    setForm((prev) => ({
      ...prev,
      socialMediaList: [
        ...prev.socialMediaList,
        {
          sosialMedia: "",
          link: "",
        },
      ],
    }));
  };

  // Fungsi untuk menghapus social media
  const removeSocialMedia = (index) => {
    setForm((prev) => ({
      ...prev,
      socialMediaList: prev.socialMediaList.filter((_, i) => i !== index),
    }));
  };

  // Fungsi untuk menangani perubahan pada social media
  const handleSocialMediaChange = (index, field, value) => {
    console.log(value);
    setForm((prev) => ({
      ...prev,
      socialMediaList: prev.socialMediaList.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Klik di luar modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modal.current && !modal.current.contains(event.target)) {
        setEditProfile(false);
      }
    };

    const handleClickOutsideOpsi = (event) => {
      if (opsi.current && !opsi.current.contains(event.target)) {
        setProfileOpsi(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideOpsi);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideOpsi);
    };
  }, [setEditProfile, setProfileOpsi]);

  // Image default
  const defaul =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKwAAACUCAMAAAA5xjIqAAAATlBMVEXa2tpVVVVQUFDf39/j4+PU1NShoaF5eXlJSUnOzs6mpqZlZWWFhYW0tLTDw8PIyMiZmZlDQ0NcXFyLi4uTk5NxcXFqamq6urrp6emsrKwGtndHAAABxUlEQVR4nO3Z246CMBRAUdpTpIhyFZH//9FRUAYZMgM80DrZ65FostPYHsAgAAAAAAAAAAAAAAAAADBPtts9NT1sdt67Vs5Wb2RPZvdYrTbSxP632GSda+kwNknjVYKTdhark3jdKWQql7HZum+5jFULYiWMw2H5PY+Vc3St81ed37FysN3Meq6t37Gh7k44/bwd8DpWmqKfAzmxS01jJb3OnrlJP5VTr2KDi63naltttS0Ofm2w7B4RhTO16SmJzuJVrImsUraeqRVzu/k1FCTtNpKNgt/vFbyINVG/j+xp+EA696PwIVaOrzvxoVYSq7MftT7ExvXw2PCcrKYtlC6baa0HsdLa74cW253/YfIYBaqdZHkQG6rx85i93C9V/ZUif19b97EmHy1sN1tNU77Kq7dt5jxW4lK9s4dqWOr3SeE+ttKTWKVHV3Q5msKuY6WZLuy0fHQoOI6VYPKLnas9evJYI/JnrNLWk7uuBSurHqOi32bOYy/FgrecRZ15EHuftekisRexazh9fXSNzSo3lytb5sdV2shhrLIrPb7Em+//FPtJfy01dbRVvnfs/flgu91bAQAAAAAAAAAAAAAAgA/xBSfzJoT4s8VWAAAAAElFTkSuQmCC";

  // copy text
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset pesan setelah 2 detik
    } catch (err) {
      console.error("Gagal menyalin:", err);
    }
  };

  // handle upload file
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
    // loading image
    console.log(uploadingImage);
    setUploadingImage(true);

    // Validate file size (max 5MB)
    const MAX_FILE_SIZE_MB = 5;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`Ukuran file harus kurang dari ${MAX_FILE_SIZE_MB}MB`);
      return;
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        profilImg: file, // Simpan URL publik di sini
      }));
      setUploadingImage(false);
      setPreview(file);
      setProfileOpsi(false);
    }
  };
  
  // handle submit - diperbaiki untuk menangani multiple social media
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validasi bahwa setiap social media memiliki platform dan link
    const isValid = form.socialMediaList.every(
      (item) =>
        item.sosialMedia &&
        item.sosialMedia !== "" &&
        item.link &&
        item.link !== ""
    );

    if (!isValid) {
      alert("Harap lengkapi semua field social media");
      setLoading(false);
      return;
    }

    // file name variabel
    let filename = null;
    let downloadURL = null;
    let imageLama = null;
    let imageProfil = null;


    // Upload image ke supabase
    try {
      if (editId) {
        const docRef = doc(db, "users", editId.dataProfil);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          imageLama = data.customImagePath;
          imageProfil = data.profilImg;
          console.log(imageLama);
        }
      }

      const isNewImageUploaded = form.profilImg instanceof File;
      // cek apakah image profil nya kosong atau tidak kosong
        // cek apakah image lama nya null
        if (isNewImageUploaded) {
          const timeStapm = Date.now();
          filename = `uploadpProfile/${currentUser.uid}-${timeStapm}`;

          const { data, error: uploadError } = await supabase.storage
            .from(MY_SUPABASE_BUCKET_NAME)
            .upload(filename, form.profilImg, {
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
          alert("Gambar b berhasil diunggah!");
        }  else {
          filename = imageLama;
          downloadURL = imageProfil;
          console.log("gambar tetap");
        }
        

      if (imageLama !== null && imageProfil !== downloadURL) {
        const { error: deleteError } = supabase.storage
          .from(MY_SUPABASE_BUCKET_NAME)
          .remove([imageLama]);
        if (deleteError) {
          console.error("Gagal hapus gambar lama:", deleteError.message);
        } else {
          console.log("Gambar lama berhasil dihapus");
        }
      }

      // upload ke firebase
      const newDataUser = {
        uuid: currentUser.uid,
        displayName: form.profilNama,
        profilImg: downloadURL || "",
        customImagePath: filename || "",
        createdAt: Timestamp.now(),
        updateAt: Timestamp.now(),
      };

      if (editId) {
        await updateDoc(doc(db, "users", editId.dataProfil), newDataUser);
        console.log("berhasil update");
      } else {
        await addDoc(collection(db, "users"), newDataUser);
        console.log("Berhasil menyimpan data user");
      }

     try{
       // Simpan social media ke collection sosmed
       // Hapus semua social media lama terlebih dahulu
       const sosmedRef = collection(db, "sosmed");
       const querySosmed = query(
         sosmedRef,
         where("uuid", "==", currentUser.uid)
       );
       const sosmedSnapshot = await getDocs(querySosmed);

       // Hapus data sosmed lama
       if (sosmedSnapshot.docs.length > 0) {
         const deletePromises = sosmedSnapshot.docs.map(
           (doc) => deleteDoc(doc.ref) // Hapus permanent
         );
         await Promise.all(deletePromises);
         console.log("Berhasil hapus data sosmed lama");
       }

       // Tunggu sebentar untuk memastikan operasi hapus selesai
       await new Promise((resolve) => setTimeout(resolve, 300));

       // Simpan social media baru
       const socialMediaPromises = form.socialMediaList.map((socialMedia) => {
         const newSocialMedia = {
           uuid: currentUser.uid,
           sosialmedia: socialMedia.sosialMedia,
           link: socialMedia.link,
           createdAt: Timestamp.now(),
           updateAt: Timestamp.now(),
         };
         return addDoc(collection(db, "sosmed"), newSocialMedia);
       });

       await Promise.all(socialMediaPromises);
       console.log("Berhasil menyimpan semua social media");
     }catch(error){
      console.log("gagal meyimpan sosial media: ", error);
     }
    } catch (error) {
      console.log("Gagal upload image: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
      setEditProfile(false);
      // Refresh data setelah submit
      window.location.reload();
    }
  };

  // handle read profile user
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoadingUser(true);
        
        // read user profil
        const userLoginRef = collection(db, "users");
        const queryUserLogin = query(userLoginRef, where("uuid", "==", currentUser.uid));

        const userLoginSnapshot = await getDocs(queryUserLogin);
        const userLoginData = userLoginSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProfile(userLoginData);

        // read user sosial media
        const sosmedRef = collection(db, "sosmed");
        const querySosmed = query(sosmedRef, where("uuid", "==", currentUser.uid));
        const sosmedSnapshot = await getDocs(querySosmed);
        const sosmedData = sosmedSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSosmed(sosmedData);
      } catch (error) {
        console.log("Gagal manampilkan data: ", error);
      } finally {
        setLoadingUser(false);
      }
    };

    if (!loadingUser) {
      fetch();
    }
  }, [currentUser]);

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

    if (name === "profilImg") {
      if (!value) error = "Link wajib diisi";
    }

    if (name === "profilNama") {
      if (!value) error = "Nama link wajib diisi";
    }

    setErrors({ ...errors, [name]: error });
    return !error;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="flex justify-center flex-col gap-5 items-center mt-[100px]">
        <div className="w-[100px] h-[100px] rounded-[50%] relative">
          
            <div className="absolute -top-[25px] -right-[15px] hover:scale-110 transition-transform ease-in-out transform">
              <button
                onClick={() => {
                  const data = profil[0];

                  // Siapkan socialMediaList dari data sosmed yang ada
                  let socialMediaList = [{ sosialMedia: "", link: "" }];

                  if (sosmed.length > 0) {
                    socialMediaList = sosmed.map((item) => ({
                      sosialMedia: item.sosialmedia || "",
                      link: item.link || "",
                    }));
                  }

                  const newForm = {
                    profilImg: data.profilImg || "",
                    profilNama: data.displayName || "",
                    socialMediaList: socialMediaList,
                  };

                  setEditId({
                    dataProfil: data.id,
                  });
                  setForm(newForm);
                  console.log(newForm);
                  setEditProfile(true);
                }}
                className="flex flex-col items-center"
              >
                <PenSquare className="text-gray-800" />
                <p className="text-xs">edit</p>
              </button>
            </div>
          {loadingUser ? (
            <p>Loading...</p>
          ) : profil.length > 0 ? (
            <img
              src={
                !profil[0]?.profilImg || profil.length === 0
                  ? defaul // default image path
                  : profil[0].profilImg
              }
              alt="Profil"
              className="object-cover rounded-[50%] h-full w-full shadow-lg"
            />
          ) : (
            <p>User tidak di temukan</p>
          )}
        </div>
        <div className="font-montserrat text-center">
          <h1 className="text-2xl">
            {currentUser?.displayName}
          </h1>
          <div className="flex justify-center items-center mt-2">
            
              <p
                className="flex gap-2 text-sm w-full text-center text-gray-500 cursor-pointer"
                onClick={handleCopy}
                title="Salin"
              >
                <Link /> <span>{linkText}</span>
                {copied && (
                  <span className="text-green-500 ml-2">Disalin!</span>
                )}
              </p>
            
          </div>
          {/* Optional: tampilkan email */}
          {/* <p className="text-gray-600">{currentUser?.email}</p> */}
        </div>
        <div className="my-10 flex flex-col items-center space-y-8">
          <div className="flex gap-10">
            {sosmed.length > 0 && sosmed[0].sosialmedia
              ? sosmed.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="bg-cyan-200 p-3 rounded-md hover:scale-110 transition-transform ease-in-out transform"
                  >
                    {
                      sosmedICon.find((opt) => opt.id === item.sosialmedia)
                        ?.icon
                    }
                  </a>
                ))
              : null}
          </div>
        </div>
      </div>

      {/* Modal edit profile */}
      {editProfile && (
        <div className="bg-black/20 fixed top-0 w-screen min-h-screen flex justify-center items-center z-50">
          <div
            ref={modal}
            className="bg-white p-5 rounded-md w-[400px] max-h-[90vh] overflow-y-auto"
          >
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center items-center my-10">
                {/* modal opsi */}
                {profileOpsi && (
                  <div className="absolute top-[70px]">
                    <ul ref={opsi}>
                      <label htmlFor="profilImg">
                        <li className="p-2 bg-white cursor-pointer hover:bg-gray-100 border-gray-100 border-[1px]">
                          Ganti Foto Profile
                        </li>
                      </label>
                      <li className="p-2 bg-white cursor-pointer hover:bg-gray-100 border-gray-100 border-[1px]">
                        Edit Profil
                      </li>
                    </ul>
                  </div>
                )}

                <div
                  className="w-[150px] h-[150px] cursor-pointer"
                  onClick={() => setProfileOpsi(true)}
                >
                  <img
                    src={
                      preview
                        ? form.profilImg
                        : !profil[0]?.profilImg || profil.length === 0
                        ? defaul // default image path
                        : profil[0].profilImg
                    }
                    alt="poto profil"
                    className="object-cover rounded-full w-full h-full"
                  />
                </div>
              </div>
              <input
                type="file"
                id="profilImg"
                accept="image/*"
                className="hidden mb-4 w-full"
                onChange={handleCustomImageUpload}
              />
              <Input
                icon={<User />}
                label="Nama"
                id="profilNama"
                name="profilNama"
                type="text"
                value={form.profilNama}
                required={true}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.profilNama}
              />

              {/* Social Media Fields */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media Sosial
                </label>

                {/* Pastikan socialMediaList ada sebelum di-map */}
                {form.socialMediaList &&
                  form.socialMediaList.length > 0 &&
                  form.socialMediaList.map((socialMedia, index) => (
                    <div
                      key={index}
                      className="mb-3 p-3 border border-gray-200 rounded-md"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Media Sosial {index + 1}
                        </span>
                        {form.socialMediaList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSocialMedia(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Hapus
                          </button>
                        )}
                      </div>

                      <div className="mb-2">
                        <select
                          name={`sosialMedia-${index}`}
                          value={socialMedia.sosialMedia}
                          onChange={(e) =>
                            handleSocialMediaChange(
                              index,
                              "sosialMedia",
                              e.target.value
                            )
                          }
                          onBlur={handleBlur}
                          className={`w-full px-3 py-2 border ${
                            errors[`sosialMedia-${index}`] &&
                            touched[`sosialMedia-${index}`]
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          required
                        >
                          {socialMediaOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              disabled={option.disabled}
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors[`sosialMedia-${index}`] &&
                          touched[`sosialMedia-${index}`] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[`sosialMedia-${index}`]}
                            </p>
                          )}
                      </div>

                      <div>
                        <Input
                          icon={<Link2 />}
                          label="Link"
                          id={`link-${index}`}
                          name={`link-${index}`}
                          type="text"
                          value={socialMedia.link}
                          required={true}
                          onChange={(e) =>
                            handleSocialMediaChange(
                              index,
                              "link",
                              e.target.value
                            )
                          }
                          onBlur={handleBlur}
                          error={errors[`link-${index}`]}
                        />
                      </div>
                    </div>
                  ))}

                {/* Add Social Media Button */}
                <button
                  type="button"
                  onClick={addSocialMedia}
                  className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Tambah Media Sosial
                </button>
              </div>
              <div className="mt-10 flex gap-2">
                <Button
                  loading={loading || uploadingImage}
                  type="submit"
                  variant="primary"
                >
                  Simpan
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setEditProfile(false);
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
