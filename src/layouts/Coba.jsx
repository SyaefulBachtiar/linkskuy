import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { supabase } from "../supabase/supabaseClient";

export default function Coba() {
  const [currentUser, setCurrentUser] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // useEffect(() => {
  //   const user = onAuthStateChanged(auth, async (user) => {
  //     setCurrentUser(user);

  //     if (user) {
  //       if (error) {
  //         console.error("Error setting auth token:", error.message);
  //       } else {
  //         console.log("Auth token set successfully");
  //       }
  //     }
  //   });
  //   return () => user();
  // }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    if (!currentUser) {
      alert("You must be logged in to upload a file.");
      return;
    }

    setUploading(true);

    try {
      const filename = `uploads/${Date.now()}_${file.name}`;

      const { data, error } = await supabase.storage
        .from("linkskuy")
        .upload(filename, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from("linkskuy")
        .getPublicUrl(filename);

      console.log("Image URL:", publicUrl.publicUrl);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload File</h1>
        <form onSubmit={handleUpload} className="space-y-4">
          <label htmlFor="foto">Upload Foto</label>
          <input
            type="file"
            id="foto"
            onChange={handleFileChange}
            className="block w-full text-sm"
            accept="image/*"
          />
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {uploading ? "Uploading..." : "Klik Saya"}
          </button>
        </form>
      </div>
    </div>
  );
}
