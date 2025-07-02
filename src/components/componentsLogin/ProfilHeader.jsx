import { useEffect, useState } from "react";
import { auth } from "../../firebase/config"; // pastikan path sesuai
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "lucide-react";
import { useParams } from "react-router-dom";

export default function ProfilHeader() {
  const [currentUser, setCurrentUser] = useState(null);
  const { displayName } = useParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-center flex-col gap-5 items-center">
      <div className="w-[100px] h-[100px] rounded-[50%] bg-gray-600"></div>
      <div className="font-montserrat text-center">
        <h1 className="text-2xl">{currentUser?.displayName || displayName}</h1>
        <div className="flex justify-center">
          {currentUser ? (
            <p className="flex items-center gap-4 mt-10 text-sm text-gray-500">
              <Link /> <span>https://linkskuy/{currentUser?.displayName}</span>
            </p>
          ) : (
            ""
          )}
        </div>
        {/* Optional: tampilkan email */}
        {/* <p className="text-gray-600">{currentUser?.email}</p> */}
      </div>
    </div>
  );
}
