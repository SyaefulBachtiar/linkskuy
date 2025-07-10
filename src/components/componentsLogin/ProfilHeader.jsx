import { useEffect, useState } from "react";
import { auth } from "../../firebase/config"; // pastikan path sesuai
import { onAuthStateChanged } from "firebase/auth";
import { Link, LucideFacebook, LucideInstagram, LucideTwitter } from "lucide-react";
import { useParams } from "react-router-dom";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function ProfilHeader() {
  const [currentUser, setCurrentUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const [userStatus, setUserStatus] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const [profil, setProfile] = useState(null);
  const { displayName } = useParams();
  const linkText = `https://linkskuy.vercel.app/${currentUser?.displayName}`;

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

  // handle user
  useEffect(() => {
   const fetch = async() => {
    try {
      setLoadingUser(true);
      // User Id
      let userId = null;

      // debug
      // ✅ Hentikan kalau displayName belum tersedia (dari URL)
      if (!currentUser && !displayName) {
        return;
      }

      // Jika user tidak ada maka isi dengan params yang ada di url
      if (!currentUser) {
        const userRef = collection(db, "users");
        const queryUser = query(
          userRef,
          where("displayName", "==", displayName)
        );

        const userSnapshot = await getDocs(queryUser);

        // Jika Nama tidak sesuai
        if (userSnapshot.empty) {
          console.log("Data tidak sesuai")
          return;
        }

        // Ambil uuid berdasarkan params yang ada di url
        const data = userSnapshot.docs[0].data();
        userId = data.uuid;

        // Jika currentUser true
      } else {
        // isi User Id dengan currentUser Id
        userId = currentUser.uid;
      }

      const userLoginRef = collection(db, "users");
      const queryUserLogin = query(userLoginRef, where("uuid", "==", userId));

      const userLoginSnapshot = await getDocs(queryUserLogin);
      const userLoginData = userLoginSnapshot.docs[0].data().profilImg;

      setProfile(userLoginData);
    } catch (error) {
      console.log("Gagal manampilkan data: ", error);
      setUserStatus(false);
    }finally{
      setLoadingUser(false);
    }
   }

   if(!loadingUser){
    fetch();
   }
  }, [currentUser, displayName]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <div className="flex justify-center flex-col gap-5 items-center">
      <div className="w-[100px] h-[100px] rounded-[50%]">
        {loadingUser ? (
          <p>Loading...</p>
        ) : userStatus ? (
          <img
            src={profil ? profil : defaul}
            alt="Profil"
            className="object-cover rounded-[50%] h-full w-full"
          />
        ) : (
          <p>User tidak di temukan</p>
        )}
      </div>
      <div className="font-montserrat text-center">
        <h1 className="text-2xl">{currentUser?.displayName || displayName}</h1>
        <div className="flex justify-center">
          {currentUser ? (
            <p
              className="flex gap-4 mt-10 text-sm w-[80%] text-center text-gray-500 cursor-pointer"
              onClick={handleCopy}
              title="Salin"
            >
              <Link /> <span>{linkText}</span>
              {copied && <span className="text-green-500 ml-2">Disalin!</span>}
            </p>
          ) : (
            ""
          )}
        </div>
        {/* Optional: tampilkan email */}
        {/* <p className="text-gray-600">{currentUser?.email}</p> */}
      </div>
      <div className="my-10 flex flex-col items-center space-y-8">
        <h1>Social Media</h1>
        <div className="flex gap-10">
          <a href="">
            <LucideFacebook className="w-8 h-8" />
          </a>
          <a href="">
            <LucideTwitter className="w-8 h-8" />
          </a>
          <a href="">
            <LucideInstagram className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  );
}
