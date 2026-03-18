import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Education() {
  return (
    <div className="min-h-screen bg-green-50">

      <Navbar />

      <div className="max-w-5xl mx-auto p-8">

        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Environmental Education
        </h2>

       <p className="text-gray-600 mb-8 text-2xl font-bold">
  Learn about forest conservation, environmental protection, and how you can contribute.
</p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              What is Deforestation?
            </h3>
            <p className="text-gray-700">
              Deforestation is the clearing of forests due to human activities such as illegal logging and charcoal burning.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Effects of Forest Destruction
            </h3>
            <p className="text-gray-700">
              It leads to climate change, loss of biodiversity, and disruption of ecosystems.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              How You Can Help
            </h3>
            <ul className="list-disc ml-5 text-gray-700">
              <li>Report illegal activities</li>
              <li>Plant trees</li>
              <li>Avoid illegal forest products</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Why Forests Matter
            </h3>
            <p className="text-gray-700">
              Forests regulate climate, protect water sources, and support wildlife.
            </p>
          </div>

        </div>

      </div>
      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}

export default Education;