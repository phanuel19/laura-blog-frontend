import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, tu peux intégrer ton système d'envoi (API, email, etc.)
    console.log("Données envoyées :", formData);
    setSubmitted(true);
    setFormData({ nom: "", email: "", message: "" });
  };

  return (
    <main className="pt-24 pb-16 px-4 sm:px-8 md:px-20 lg:px-40 text-gray-800">
      <section className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Contactez-nous
          </h1>
          <p className="text-gray-600">
            Une question, une suggestion, ou simplement envie de discut ? Écris-nous !
          </p>
        </div>

        {submitted && (
          <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-md text-sm">
            Merci pour votre message ! Nous vous répondrons dès que possible.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white shadow-md rounded-xl p-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="nom">
              Nom
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
          >
            Envoyer
          </button>
        </form>
      </section>
    </main>
  );
}
