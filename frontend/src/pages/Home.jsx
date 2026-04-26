import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Report Crime",
      description: "Submit environmental crime reports quickly with photos and location details.",
      path: "/report",
      accent: "bg-brand-600 text-white",
    },
    {
      title: "My Reports",
      description: "Review everything you have submitted and follow response status.",
      path: "/my-reports",
      accent: "bg-white text-brand-700 border border-brand-100",
    },
    {
      title: "Dashboard",
      description: "See reporting totals, case progress, and response activity at a glance.",
      path: "/dashboard",
      accent: "bg-earth-100 text-earth-700",
    },
    {
      title: "Education",
      description: "Explore conservation lessons, premium content, and prevention guidance.",
      path: "/education",
      accent: "bg-green-100 text-brand-700",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,_#f6fbf7,_#edf6ef)]">
      <Navbar />

      <main className="flex-1 px-4 pb-10 pt-28 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[36px] bg-brand-700 px-6 py-8 text-white shadow-soft sm:px-8 sm:py-10">
              <p className="text-sm uppercase tracking-[0.35em] text-green-100/75">
                Welcome
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight">
                Turn community reporting into faster conservation response.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-green-100/85 sm:text-base">
                GreenWatch Africa helps citizens document illegal activity, send evidence to the right team, and keep attention on forests that need protection.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/report")}
                  className="rounded-full bg-white px-5 py-3 font-semibold text-brand-700 transition hover:bg-green-50"
                >
                  Report an incident
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="rounded-full border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Open dashboard
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[28px] bg-white p-6 shadow-soft">
                <p className="text-sm text-slate-500">Mission</p>
                <p className="mt-3 text-lg font-semibold text-brand-900">
                  Support communities reporting forest crime in real time.
                </p>
              </div>
              <div className="rounded-[28px] bg-earth-100 p-6 text-earth-700 shadow-soft">
                <p className="text-sm">Focus</p>
                <p className="mt-3 text-lg font-semibold">
                  Crime reporting, case tracking, and conservation education.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <button
                key={card.title}
                onClick={() => navigate(card.path)}
                className={`rounded-[28px] p-6 text-left shadow-soft transition hover:-translate-y-1 ${card.accent}`}
              >
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 opacity-90">
                  {card.description}
                </p>
              </button>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
