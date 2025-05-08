import React, { useState } from "react";

export default function Donation() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    montant: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu peux connecter à ton API de paiement ou service de traitement des dons
    console.log("Données de don :", formData);
    setSubmitted(true);
    setFormData({ nom: "", email: "", montant: "", message: "" });
  };

  return (
    <main className="pt-24 pb-16 px-4 sm:px-8 md:px-20 lg:px-40 text-gray-800">
      <section className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Faire un Don
          </h1>
          <p className="text-gray-600">
            Votre contribution nous aide à continuer notre mission. Merci pour votre générosité !
          </p>
        </div>

        {submitted && (
          <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-md text-sm">
            Merci pour votre don ! 🙏
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white shadow-md rounded-xl p-6"
        >
          <div>
            <label htmlFor="nom" className="block text-sm font-medium mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              id="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="montant" className="block text-sm font-medium mb-1">
              Montant (€ / CFA / $)
            </label>
            <input
              type="number"
              name="montant"
              id="montant"
              value={formData.montant}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message (optionnel)
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
          >
            Faire un Don
          </button>
        </form>
      </section>
    </main>
  );
}
