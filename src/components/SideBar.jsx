
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
            <div className="w-[300px] bg-white/50 backdrop-blur-3xl h-screen sidebar-background"></div>
            <ul className="font-montserrat flex flex-col justify-items-end gap-8 h-screen w-[300px] text-white absolute top-0 -left-0 p-10">
              {currentUser ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className={`block p-5 text-black rounded-xl ${
                        isDashboard
                          ? "bg-white"
                          : "bg-white/20 backdrop-blur-lg"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/template"
                      className={`block p-5 text-black rounded-xl ${
                        isTemplate ? "bg-white" : "bg-white/20 backdrop-blur-lg"
                      }`}
                    >
                      Template
                    </Link>
                  </li>
                  <li className="font-bold bg-white/20 backdrop-blur-lg p-5 rounded-xl">
                    <button
                      onClick={handleLogout}
                      className="font-bold text-red-500 rounded-xl"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className={`${isLayanan ? "bg-white" : ""}`}>
                    <Link to="/layanan">Layanan</Link>
                  </li>
                  <li className={`${isTemplate ? "bg-white" : ""}`}>
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