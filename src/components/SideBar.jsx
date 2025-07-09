
import { Link } from "react-router-dom";

export default function SideBar({isLayanan, isTemplate, isDashboard, currentUser, handleLogout, menuActive}) {
    
    return (
      <div className="block sm:block md:hidden lg:hidden xl:hidden h-screen bg-gray-700">
        <div
          className={`absolute top-[70px] right-0 flex justify-end transition-transform duration-300 ease-in-out transform ${
            menuActive ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className={`side-bar relative transition-transform duration-300 ease-in-out transform overflow-hidden shadow-lg`}
          >
            <div className="w-[300px] bg-cyan-100/50 blur-xl h-screen sidebar-background"></div>
            <ul className="font-montserrat flex flex-col justify-items-end gap-3 h-screen w-[300px] text-white absolute top-0 -left-0 p-10">
              {currentUser ? (
                <>
                  <li className={`${isDashboard ? "scale-125" : ""}`}>
                    <Link to="/dahsboard">Dashboard</Link>
                  </li>
                  <li className={`${isTemplate ? "scale-110" : ""}`}>
                    <Link to="/template">Template</Link>
                  </li>
                  <li className="font-bold">
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
                  <li className={`${isLayanan ? "scale-125" : ""}`}>
                    <Link to="/layanan">Layanan</Link>
                  </li>
                  <li className={`${isTemplate ? "scale-110" : ""}`}>
                    <Link to="/template">Template</Link>
                  </li>
                  <li>
                    <Link to="/login">Masuk</Link>
                  </li>
                  <li className="font-bold">
                    <Link to="/daftar">Daftar</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
}