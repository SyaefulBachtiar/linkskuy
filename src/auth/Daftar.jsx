import { useState } from "react";
import Input from "../components/form-components/Input";
import Button from "../components/form-components/Button";
import { Lock, Mail, User, UserPlus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";


export default function Daftar(){

    const [form, setForm] = useState({namaLengkap: "", email: "", password: "", password2: ""})
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);

      const newErrors = {};

      Object.keys(form).forEach((key) => {
        if (key !== "customImage" && !form[key]) {
          newErrors[key] = `${key} wajib diisi!`;
        }
      });
      if(form.password !== form.password2){
        newErrors.password2 = "Password tidak cocok!";
      }
      if(Object.keys(newErrors).length > 0){
        setErrors(newErrors);
        return;
      }

      try{
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

        await updateProfile(userCredential.user, {
          displayName: form.namaLengkap,
        })

        alert("Pendaftaran berhasil!");
      }catch(error){
        console.error("Error Daftar: ", error );
        if(error.code === "auth/email-already-in-use"){
          setErrors({email: "Email sudah di gunakan: "});
        }else{
          alert("Gagagl daftar " + error.message);
        }
      }finally{
        setLoading(false);
      }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));

        if (errors[name]) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
    }

    const validateField = (name, value) => {
        let error = "";

        if(name === "namaLengkap"){
            if(!value) error = "Nama Lengkap wajib diisi!";
        }

        if (name === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value) error = "Email wajib diisi!";
          else if (!emailRegex.test(value)) error = "Format email tidak valid!";
        }

        if (name === "password") {
          if (!value) error = "Password wajib diisi!";
          else if (value.length < 6) error = "Password minimal 6 karakter!";
        }
        if (name === "password2") {
          if (!value) error = "Password wajib diisi!";
          else if (value.length < 6) error = "Password minimal 6 karakter!";
          else if(value !== form.password) error = "Password tidak sama!"
        }

        setErrors({ ...errors, [name]: error });
        return !error;
    }

    const handleBlur = (e) => {
      const { name } = e.target;
      setTouched({ ...touched, [name]: true });
      validateField(name, form[name]);
    };
    return (
      <>
        <div className=" w-full bg-gradient-to-r from-[rgb(152,156,230)] via-[#A1A4CE] to-[#4A94AE] flow-root">
          <div className="h-full flex flex-col justify-center items-center mx-10 my-10 gap-[50px]">
            <div className="font-montserrat flex items-center gap-2">
              <UserPlus className="w-12 h-12" />
              <h1 className="text-4xl">Daftar</h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-7 w-full sm:w-[400px] bg-white/20 rounded-xl border border-white shadow-xl"
            >
              <Input
                label="Nama Lengkap"
                id="namaLengkap"
                name="namaLengkap"
                type="text"
                placeholder="Nama lengkap anda..."
                value={form.namaLengkap}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={errors.namaLengkap}
                icon={<User />}
              />
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="Masukan email anda..."
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={errors.email}
                icon={<Mail />}
              />
              <Input
                autoComplete="new-password"
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Masukan password anda..."
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={errors.password}
                icon={<Lock />}
              />
              <Input
                autoComplete="new-password"
                label="Ulang Password"
                id="password2"
                name="password2"
                type="password"
                placeholder="Ulang Password anda..."
                value={form.password2}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={errors.password2}
                icon={<Lock />}
              />

              <Button
                loading={loading}
                variant="primary"
                type="submit"
                disabled={
                  !form.namaLengkap ||
                  !form.email ||
                  !form.password ||
                  !form.password2 
                }
              >
                Kirim
              </Button>
              <div className="pt-4">
                <NavLink to="/login">
                  <p className="text-sm hover:underline">Kembali login</p>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}