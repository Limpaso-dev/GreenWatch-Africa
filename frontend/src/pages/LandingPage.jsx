import { useState } from "react";
import { Link } from "react-router-dom";
import forestHero from "../assets/images/heroimage.jpg";
import logo from "../assets/GreenWatch Logo.png";
import Footer from "../components/Footer";

function LandingPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-brand-900">
      <div className="relative min-h-[78vh] overflow-hidden">
        <img
          src={forestHero}
          alt="Forest landscape"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(8,28,18,0.88),_rgba(24,80,49,0.55))]" />

        <nav className="relative z-20 border-b border-white/10 bg-black/15 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3 text-white">
              <img
                src={logo}
                alt="GreenWatch Africa logo"
                className="h-10 w-10 rounded-2xl bg-white/10 p-1.5"
              />
              <div>
                <p className="font-semibold tracking-wide">GreenWatch Africa</p>
                <p className="text-xs text-green-100/80">
                  Forest crime reporting and management
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-white transition hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-brand-500 px-5 py-2 font-semibold text-white transition hover:bg-brand-600"
              >
                Get Started
              </Link>
            </div>

            <button
              className="rounded-xl border border-white/20 p-2 text-2xl text-white md:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle landing navigation"
            >
              {open ? "×" : "☰"}
            </button>
          </div>

          {open && (
            <div className="mx-4 mb-4 flex flex-col gap-2 rounded-3xl bg-black/45 p-4 text-white md:hidden">
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </div>
          )}
        </nav>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 pb-16 pt-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl text-white">
            <p className="text-sm uppercase tracking-[0.4em] text-green-100/70">
              Community-led protection
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Protect forests. Report illegal activity. Strengthen response.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-green-100/85">
              GreenWatch Africa gives communities a clear digital path for
              reporting environmental crime, submitting evidence, and managing
              cases that threaten forests and ecosystems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-600"
              >
                Join the network
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:mt-0 lg:w-[26rem]">
            <div className="rounded-[28px] bg-white/10 p-5 text-white shadow-soft backdrop-blur">
              <p className="text-sm text-green-100/75">Report</p>
              <p className="mt-2 text-lg font-semibold">
                Submit incidents with location, description, and photo evidence.
              </p>
            </div>
            <div className="rounded-[28px] bg-white/10 p-5 text-white shadow-soft backdrop-blur">
              <p className="text-sm text-green-100/75">Manage</p>
              <p className="mt-2 text-lg font-semibold">
                Track report status and coordinate response from one dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
