import { Link, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config"; 
import IconNavbar from "./IconNavbar";


export default function Navbar(){
   const lokasi = useLocation();

   const isLayananPageActive = location.pathname === "/layanan";
   const isTemplatePageActive = location.pathname === "/template";
   const isDashboardActive = location.pathname === "/dashboard";

   const [currentUser, setCurrentUser] = useState(null);
   const navigate = useNavigate();

   const [menuActive, setMenuActive] = useState(false);

   const clicIconkMenu = () => {
     setMenuActive((prev) => !prev);
   };

   useEffect(() => {
      const login = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
      });
      return () => login();
   });

   const handleLogout = async () => {
      try{
        await signOut(auth);
        navigate("/");
      }catch (error) {
        console.log("Error signing out:", error);
      }
   }

    return (
      <>
        <nav className=" fixed top-0 w-screen flex justify-between items-center h-[66px] bg-white/20 backdrop-blur-2xl z-50 shadow-sm">
          <div className="relative h-[50px]">
            <div className="">
              <Link to="/">
                <h1 className="font-montserrat text-4xl p-2 text-transparent bg-clip-text bg-gradient-to-r from-[#383c8a] via-[#686fcc] to-[#4A94AE] inline-block">
                  LinkSkuy
                </h1>
              </Link>
            </div>
          </div>
          <IconNavbar menuActive={menuActive} clicIconkMenu={clicIconkMenu} />
          <div className="nav w-[40%] mx-14 items-center hidden sm:hidden md:flex lg:flex xl:flex">
            <ul className=" font-montserrat flex w-full justify-center gap-10 text-white items-center">
              {currentUser ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className={`${
                        isDashboardActive ? "bg-white" : ""
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/template"
                      className={` ${
                        isTemplatePageActive ? "bg-white" : ""
                      }`}
                    >
                      Template
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="font-bold bg-white text-red-700 p-2 rounded-xl"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/layanan"
                      className={`${isLayananPageActive ? "bg-white" : ""}`}
                    >
                      Layanan
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/template"
                      className={`${isTemplatePageActive ? "bg-white" : ""}`}
                    >
                      Template
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">Masuk</Link>
                  </li>
                  <li>
                    <Link
                      to="/daftar"
                      className="font-bold bg-white text-cyan-400"
                    >
                      Daftar
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* sidebar */}

          <SideBar
            isLayanan={isLayananPageActive}
            isTemplate={isTemplatePageActive}
            isDashboard={isDashboardActive}
            currentUser={currentUser}
            menuActive={menuActive}
            handleLogout={handleLogout}
          />
        </nav>
      </>
    );
}

{/* <button onClick={handleLogout} className="font-bold bg-white text-red-700">
  Logout
</button>; */}