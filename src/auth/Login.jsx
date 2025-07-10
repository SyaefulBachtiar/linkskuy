import { useEffect, useState } from "react";
import Input from "../components/form-components/Input";
import Button from "../components/form-components/Button";
import { Lock, Mail, User2Icon } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export default function Login(){
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({email: "", password: ""})
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};

    if (!form.email) newErrors.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Format email tidak valid";

    if (!form.password) newErrors.password = "Password wajib diisi";
    else if (form.password.length < 6)
      newErrors.password = "Password minimal 6 karakter";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/dashboard', {replace: true})
    } catch (error) {
      console.error("Login Error:", error);
      if (error.code === "auth/user-not-found") {
        setErrors({ email: "Email tidak ditemukan" });
      } else if (error.code === "auth/wrong-password") {
        setErrors({ password: "Password salah" });
      } else {
        alert("Login gagal: " + error.message);
      }
    } finally {
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

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, form[name]);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = "Email wajib diisi";
      else if (!emailRegex.test(value)) error = "Format email tidak valid";
    }

    if (name === "password") {
      if (!value) error = "Password wajib diisi";
      else if (value.length < 6) error = "Password minimal 6 karakter";
    }

    setErrors({ ...errors, [name]: error });
    return !error;
  }


    return (
      <>
        <div className="h-screen w-full bg-gradient-to-r from-[rgb(152,156,230)] via-[#A1A4CE] to-[#4A94AE]">
          <div className="h-full flex flex-col justify-center items-center mx-10 gap-[100px]">
            <div className="font-montserrat flex gap-2">
              <User2Icon className="w-12 h-12" />
              <h1 className="text-4xl">Login</h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-10 w-full sm:w-[400px] bg-white/30 rounded-xl shadow-xl border border-white"
            >
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="contoh@email.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={errors.email}
                icon={<Mail />}
              />
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Masukan Password anda"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={errors.password}
                icon={<Lock />}
              />
              <div className="my-4">
                <NavLink>
                  <p className="font-montserrat text-sm hover:underline">
                    Lupa Password
                  </p>
                </NavLink>
              </div>
              <Button loading={loading} type="submit" variant="primary">
                Kirim
              </Button>
              <div className="my-4 text-sm">
                <p>
                  Belum punya akun?
                  <Link to="/daftar" className="text-blue-600 hover:underline">
                    Daftar
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}