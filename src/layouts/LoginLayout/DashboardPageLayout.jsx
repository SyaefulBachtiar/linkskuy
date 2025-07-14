
import DashboardPage from "../../pages/login/DashboardPage";
import LinkList from "../../components/componentsLogin/LinkList";
import ProfilHeader from "../../components/componentsLogin/ProfilHeader";
import CardProduk from "../../components/componentsLogin/CardProduk";





export default function Dashboard() {
  const ratting = 5; // jumlah bintang yang ingin ditampilkan
    return (
      <>
        <DashboardPage>
          <div className="flow-root min-h-screen bg-blue-400/50">
            <div className="mt-20">
              {/* Content */}
              <div>
                {/* Profil */}
                <ProfilHeader />

                {/* Link list */}
                <LinkList />

                {/* Nav Kategori */}
                {/* <div className=" px-10 mt-10 bg-white/50 p-1 py-4 rounded-md">
                  <div className="flex flex-row gap-5 text-black font-montserrat">
                    <span>Makanan</span>
                    <span> | </span>
                    <span>Minuman</span>
                    <span> | </span>
                    <span>Pakaian</span>
                  </div>
                </div> */}
                {/* <div className="my-3 flex items-center">
                  <div className="flex-1 h-px bg-white/50"></div>
                </div> */}

                {/* Produk */}
                <div className="bg-white/50 p-5 rounded-md mt-10 flex flex-col">

                  {/* <div className="p-2 py-7 font-montserrat font-semibold">
                    <h1 className="text-2xl">Terlaris 🔥</h1>
                  </div> */}

                  

                   <CardProduk ratting={ratting}/>

                </div>
              </div>
            </div>
          </div>
        </DashboardPage>
      </>
    );
}