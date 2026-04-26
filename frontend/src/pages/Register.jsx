import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!form.phone) {
      setErrorMessage("Phone number is required for M-Pesa payments");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(47,143,78,0.18),_transparent_40%),linear-gradient(180deg,_#f5fbf6,_#edf7ef)] px-4 py-10">
      <div className="w-full max-w-lg rounded-[32px] border border-white/70 bg-white/95 p-8 shadow-soft backdrop-blur">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-600">
            GreenWatch Africa
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-brand-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Join the reporting network and help communities respond faster to forest crime.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-brand-100 bg-brand-50/40 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-brand-100 bg-brand-50/40 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone number (07XXXXXXXX)"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-2xl border border-brand-100 bg-brand-50/40 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-brand-100 bg-brand-50/40 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
            required
          />

          <div className="rounded-2xl bg-earth-100 px-4 py-3 text-sm text-earth-700">
            Premium education content is unlocked later through secure M-Pesa payment inside the app.
          </div>

          {errorMessage && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
