import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaSnapchat, FaTelegram, FaTiktok, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function ProfilUser({dataProfil, loading, sosmed}) {
    const defaul =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKwAAACUCAMAAAA5xjIqAAAATlBMVEXa2tpVVVVQUFDf39/j4+PU1NShoaF5eXlJSUnOzs6mpqZlZWWFhYW0tLTDw8PIyMiZmZlDQ0NcXFyLi4uTk5NxcXFqamq6urrp6emsrKwGtndHAAABxUlEQVR4nO3Z246CMBRAUdpTpIhyFZH//9FRUAYZMgM80DrZ65FostPYHsAgAAAAAAAAAAAAAAAAADBPtts9NT1sdt67Vs5Wb2RPZvdYrTbSxP632GSda+kwNknjVYKTdhark3jdKWQql7HZum+5jFULYiWMw2H5PY+Vc3St81ed37FysN3Meq6t37Gh7k44/bwd8DpWmqKfAzmxS01jJb3OnrlJP5VTr2KDi63naltttS0Ofm2w7B4RhTO16SmJzuJVrImsUraeqRVzu/k1FCTtNpKNgt/vFbyINVG/j+xp+EA696PwIVaOrzvxoVYSq7MftT7ExvXw2PCcrKYtlC6baa0HsdLa74cW253/YfIYBaqdZHkQG6rx85i93C9V/ZUif19b97EmHy1sN1tNU77Kq7dt5jxW4lK9s4dqWOr3SeE+ttKTWKVHV3Q5msKuY6WZLuy0fHQoOI6VYPKLnas9evJYI/JnrNLWk7uuBSurHqOi32bOYy/FgrecRZ15EHuftekisRexazh9fXSNzSo3lytb5sdV2shhrLIrPb7Em+//FPtJfy01dbRVvnfs/flgu91bAQAAAAAAAAAAAAAAgA/xBSfzJoT4s8VWAAAAAElFTkSuQmCC";

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

    return (
      <>
        <div className="w-screen h-[300px]">
          <div className="min-h-full flex justify-center flex-col gap-4 items-center font-montserrat">
            {/* Poto Profil */}
            {loading ? (
              <div className="animate-pulse flex justify-center items-center flex-col gap-4">
                <div className="w-[100px] h-[100px] rounded-[50%] bg-gray-200"></div>

                  <div className="w-full h-[20px] bg-gray-200 rounded-md "></div>
                
                <div className="flex gap-4 mt-4">
                  <div className="w-[40px] h-[40px] bg-gray-200 rounded-md"></div>
                  <div className="w-[40px] h-[40px] bg-gray-200 rounded-md"></div>
                  <div className="w-[40px] h-[40px] bg-gray-200 rounded-md"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="w-[100px] h-[100px] rounded-[50%]">
                  <img
                    src={
                      !dataProfil[0]?.profilImg || dataProfil.length === 0
                        ? defaul // default image path
                        : dataProfil[0].profilImg
                    }
                    alt="Profil"
                    className="object-cover rounded-[50%] h-full w-full shadow-lg"
                  />
                </div>

                <div>
                  <h1 className="text-2xl text-center">
                    {dataProfil[0]?.displayName}
                  </h1>
                </div>

                <div className="flex gap-4 mt-4">
                  {sosmed.length > 0 && sosmed[0].sosialmedia
                    ? sosmed.map((item) => (
                        <a
                          key={item.id}
                          href={item.link}
                          className="bg-cyan-200 p-3 rounded-md hover:scale-110 transition-transform ease-in-out transform"
                        >
                          {
                            sosmedICon.find(
                              (opt) => opt.id === item.sosialmedia
                            )?.icon
                          }
                        </a>
                      ))
                    : null}
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
}