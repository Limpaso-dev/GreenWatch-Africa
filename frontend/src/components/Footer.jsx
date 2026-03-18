function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">

      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">

        {/* About */}
        <div>
          <h3 className="font-bold text-lg mb-2">
            GreenWatch Africa
          </h3>
          <p className="text-sm text-green-100">
            A digital platform for reporting environmental crimes and promoting forest conservation across Africa.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/home" className="hover:underline">Home</a></li>
            <li><a href="/report" className="hover:underline">Report Crime</a></li>
            <li><a href="/my-reports" className="hover:underline">My Reports</a></li>
            <li><a href="/education" className="hover:underline">Education</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <p className="text-sm">Email: support@greenwatch.africa</p>
          <p className="text-sm">Phone: +254 700 000 000</p>
          <p className="text-sm">Location: Nairobi, Kenya</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-sm bg-gray-900 py-3">
        © {new Date().getFullYear()} GreenWatch Africa. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;