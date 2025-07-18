import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import ProfilUser from "./kompenentUser/UserProfil";
import Link from "./kompenentUser/Link";
import ProduksUser from "./kompenentUser/ProduksUser";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import UndifinedUsers from "./kompenentUser/UndifinedUser";

export default function User(){

    const { displayName } = useParams();
    const [loading, setLoading] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);
    const [profil, setProfil] = useState([]);
    const [sosmed, setSosmed] = useState([]);
    const [links, setLinks] = useState([]);
    const [produks, setProduks] = useState([]);

    // Read data 
    useEffect(() => {
       const fetch = async () => {
        try {
            // Loading data users
            setLoading(true);
            let userId = null;

        //   Read data users
          const usersRef = collection(db, "users");
          const queryRef = query(
            usersRef,
            where("displayName", "==", displayName)
          );

          const usersSnapshot = await getDocs(queryRef);

          if(usersSnapshot.empty){
            setUserNotFound(true);
            return;
          }

          const usersUUid = usersSnapshot.docs[0].data();
          userId = usersUUid.uuid;

        //   read data profil users
        const usersData = usersSnapshot.docs.map((doc) => {
            const dataUser = doc.data();

            return {
                id: doc.id,
                ...dataUser,
            }
        });

        setProfil(usersData)


        // read data sosmed
        const sosmedRef = collection(db, "sosmed");
        const querySosmed = query(sosmedRef, where("uuid", "==", userId));

        const sosmedSnapshot = await getDocs(querySosmed);
        const sosmedData = sosmedSnapshot.docs.map((doc) => {
            const dataSosmed = doc.data();

            return {
                id: doc.id,
                ...dataSosmed,
            }
        });

        setSosmed(sosmedData);

        // read data link
        const linkRef = collection(db, "links");
        const queryLinks = query(linkRef, where("uuid", "==", userId));

        const linksSnapshot = await getDocs(queryLinks);
        const linksData = linksSnapshot.docs.map((doc) => {
            const dataLink = doc.data();

            return{
                id: doc.id,
                ...dataLink,
            }
        });

        setLinks(linksData);

        const produkRef = collection(db, "products");
        const produkQuery = query(produkRef, where("uuid", "==", userId));

        const produkSnapshot = await getDocs(produkQuery);
        const produkData = produkSnapshot.docs.map((doc) => {
            const dataProduk = doc.data();
            return{
                id: doc.id,
                ...dataProduk,
            }
        });

        setProduks(produkData);
        
        } catch (err) {
          console.log("gagal read data: ", err);
        }finally{

            // selesai loading data users
            setLoading(false);
        }
       }

       fetch();
    }, [displayName]);

    if(userNotFound) return <UndifinedUsers /> ;
    return (
      <>
        <div className="min-h-screen">
          <ProfilUser dataProfil={profil} loading={loading} sosmed={sosmed} />
          <Link link={links} loading={loading} />
        </div>
        <ProduksUser produks={produks} />
      </>
    );
}