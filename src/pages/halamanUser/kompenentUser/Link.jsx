import Loading from "../../../components/form-components/Loading";

export default function Link ({link, loading}) {
    // Preset images
  const imageOptions = [
    {
      id: "tiktokshop",
      name: "TikTok Shop",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKDk0O548Kz2wS-TvjKBOnEqwH7ePdxD0pxg&s",
      color: "bg-black",
    },
    {
      id: "shopee",
      name: "Shopee",
      url: "https://play-lh.googleusercontent.com/kvAK3tQp9S-QyXrBOEQ8owaw9YL6ri4Dr0jntUqgPOGkNiM4ERNaJheiTRq_xV2ePbXv",
      color: "bg-orange-500",
    },
    {
      id: "tokopedia",
      name: "Tokopedia",
      url: "https://play-lh.googleusercontent.com/BVfL-z6kQFdkg7-8J7Krscp7m6sYv7BuVT1U3wjggB2SXjJeo-IIUbBnAvUzNkjdzqk",
      color: "bg-green-500",
    },
    {
      id: "custom",
      name: "Upload Custom",
      url: null,
      color: "bg-blue-500",
    },
  ];

  console.log(loading);

    return (
      <>
        <div className="h-[300px] px-5 flex justify-center items-center flex-col gap-4">
          {loading ? (
            <Loading />
          ) : (
            link.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="p-6 bg-white shadow-md w-full rounded-md flex items-center gap-4"
              >
                {item.image === "custom" && item.customImage ? (
                  <img
                    src={item.customImage}
                    alt="Image"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src={imageOptions.find((opt) => opt.id === item.image)?.url}
                    alt={item.image}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <h1>{item.nama}</h1>
              </a>
            ))
          )}
        </div>
      </>
    );
}