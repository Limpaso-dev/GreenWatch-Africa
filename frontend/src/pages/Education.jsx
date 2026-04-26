import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Education() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchUser = async () => {
    const res = await API.get("/auth/me");
    setUser(res.data);
    return res.data;
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        await fetchUser();
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to load education profile"
        );
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const pollPremiumStatus = () => {
    const intervalId = window.setInterval(async () => {
      try {
        const latestUser = await fetchUser();

        if (latestUser?.isPremium) {
          window.clearInterval(intervalId);
          setMessage("Premium unlocked successfully.");
        }
      } catch {
        window.clearInterval(intervalId);
      }
    }, 3000);

    window.setTimeout(() => window.clearInterval(intervalId), 30000);
  };

  const handlePayment = async () => {
    const phone = window.prompt("Enter M-Pesa number (07XXXXXXXX)");

    if (!phone) {
      return;
    }

    try {
      setPaymentLoading(true);
      setMessage("Sending STK push. Confirm the payment on your phone.");

      await API.post("/mpesa/stk", { phone });
      pollPremiumStatus();
    } catch (error) {
      const errorMsg =
        error.response?.data?.error?.errorMessage ||
        error.response?.data?.message ||
        "Payment failed";

      setMessage(errorMsg);
    } finally {
      setPaymentLoading(false);
    }
  };

  const freeTopics = [
    {
      title: "What is Deforestation?",
      text: "Deforestation is the clearing of forested land through activities such as illegal logging, burning, and land conversion.",
    },
    {
      title: "Why Reporting Matters",
      text: "Reports from local communities help investigators respond faster and build a pattern of evidence for repeat offenders.",
    },
  ];

  const premiumTopics = [
    {
      title: "Advanced Conservation Strategies",
      text: "Learn how agencies and NGOs combine field patrols, legal frameworks, and digital reporting to prevent illegal extraction.",
    },
    {
      title: "Technology in Forest Protection",
      text: "See how satellite monitoring, mobile evidence, and geospatial mapping support smarter conservation response.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,_#f5fbf6,_#edf7ef)]">
      <Navbar />

      <main className="flex-1 px-4 pb-10 pt-28 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <section className="rounded-[32px] bg-white p-6 shadow-soft sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-600">
              Education
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-brand-900">
              Learn, report, and protect the ecosystem
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Build practical knowledge around forest conservation, understand how environmental crime affects communities, and unlock deeper premium lessons when needed.
            </p>
          </section>

          {message && (
            <div className="mt-6 rounded-[28px] bg-earth-100 px-5 py-4 text-sm text-earth-700 shadow-soft">
              {message}
            </div>
          )}

          {loading ? (
            <div className="mt-8 rounded-[28px] border border-brand-100 bg-white p-6 text-slate-500 shadow-soft">
              Loading education content...
            </div>
          ) : (
            <>
              <section className="mt-8 grid gap-6 md:grid-cols-2">
                {freeTopics.map((topic) => (
                  <article
                    key={topic.title}
                    className="rounded-[28px] border border-brand-100 bg-white p-6 shadow-soft"
                  >
                    <p className="text-sm uppercase tracking-[0.25em] text-brand-500">
                      Free lesson
                    </p>
                    <h2 className="mt-3 text-xl font-semibold text-brand-900">
                      {topic.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {topic.text}
                    </p>
                  </article>
                ))}
              </section>

              {!user?.isPremium ? (
                <section className="mt-8 rounded-[32px] bg-brand-700 px-6 py-8 text-white shadow-soft sm:px-8">
                  <p className="text-sm uppercase tracking-[0.35em] text-green-100/80">
                    Premium content
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">
                    Unlock advanced training and real case studies
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-green-100/85">
                    Access detailed conservation strategy lessons, expert guidance, and deeper operational examples through secure M-Pesa payment.
                  </p>
                  <button
                    onClick={handlePayment}
                    disabled={paymentLoading}
                    className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {paymentLoading ? "Processing..." : "Unlock with M-Pesa (KES 100)"}
                  </button>
                </section>
              ) : (
                <section className="mt-8 grid gap-6 md:grid-cols-2">
                  {premiumTopics.map((topic) => (
                    <article
                      key={topic.title}
                      className="rounded-[28px] border border-brand-200 bg-gradient-to-br from-white to-brand-50 p-6 shadow-soft"
                    >
                      <p className="text-sm uppercase tracking-[0.25em] text-brand-500">
                        Premium lesson
                      </p>
                      <h2 className="mt-3 text-xl font-semibold text-brand-900">
                        {topic.title}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {topic.text}
                      </p>
                    </article>
                  ))}
                </section>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Education;
