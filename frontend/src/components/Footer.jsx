import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-100 bg-brand-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">GreenWatch Africa</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-green-100/80">
            A community-driven platform for reporting environmental crimes,
            coordinating response, and strengthening conservation awareness.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-green-100/80">
            <Link to="/home" className="hover:text-white">
              Home
            </Link>
            <Link to="/report" className="hover:text-white">
              Report Crime
            </Link>
            <Link to="/my-reports" className="hover:text-white">
              My Reports
            </Link>
            <Link to="/education" className="hover:text-white">
              Education
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="mt-3 space-y-2 text-sm text-green-100/80">
            <p>support@greenwatch.africa</p>
            <p>+254 700 000 000</p>
            <p>Nairobi, Kenya</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-sm text-green-100/70">
        © {new Date().getFullYear()} GreenWatch Africa. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
