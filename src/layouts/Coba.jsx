import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";

export default function Coba() {
    const {displayName} = useParams();
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try{
          // 1. Cari userId dari collection 'users' berdasarkan displayName
          const users = collection(db, "users");
          const qUsers = query(users, where("displayName", "==", displayName));
          const userSnapshot = await getDocs(qUsers);

          if (userSnapshot.empty) {
            console.log("User not found");
            return;
          }

          const userData = userSnapshot.docs[0].data();
          console.log("User data:", userData);
          const userId = userData.uuid;

          // 2. Ambil links berdasarkan userId
          const linksRef = collection(db, "links");
          const qLinks = query(linksRef, where("userId", "==", userId));
          const linksSnapshot = await getDocs(qLinks);

          const linksData = linksSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
          }));

          setLinks(linksData);
        }catch(error){
            console.error("Error fetching links:", error);
        }
    }
        fetch();
    }, [displayName]);

    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">{displayName}</h1>
          {links.length > 0 ? (
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.id} className="bg-gray-100 p-4 rounded shadow">
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    <p className="font-semibold">{link.nama}</p>
                    <p className="text-sm text-blue-600">{link.link}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">
              Tidak ada link ditemukan.
            </p>
          )
          }
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
            Klik Saya
          </button>
        </div>
      </div>
    );
}