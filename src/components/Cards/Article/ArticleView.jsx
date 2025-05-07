import { Share2 } from "lucide-react";
import React from "react";

export default function ArticleView({ article, onClose }) {
  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
      {/* Titre + Bouton partager */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
            {article.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {article.subtitle ||
              "Article pour vous parler de la dépression, un phénomène plus ou moins destructeur chez les jeunes en Côte d’Ivoire"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Share2 className="cursor-pointer text-black" />
          <button
            className="text-blue-600 hover:underline text-sm sm:text-base"
            onClick={onClose}
          >
            ← Retour
          </button>
        </div>
      </div>

      {/* Barre de souscription */}
      <div className="mt-6">
        <form className="flex flex-col sm:flex-row items-center gap-3 max-w-md">
          <input
            type="email"
            placeholder="Entrez votre email"
            className="border border-black px-4 py-2 w-full rounded text-sm"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full sm:w-auto"
          >
            S’abonner
          </button>
        </form>
      </div>

      {/* Image */}
      <div className="mt-6 w-full h-48 sm:h-72 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={article.image}
          alt="Article"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Auteur et source */}
      <div className="flex items-center mt-6 gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gray-300" />
          <div>
            <div className="font-semibold">
              {article.author || "First Last"}
            </div>
            <div className="text-xs text-gray-500">
              Source – {article.date || "DD/MM/YYYY"}
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {article.categories?.map((cat) => (
          <span
            key={cat}
            className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Contenu */}
      <div className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed text-gray-800">
        {article.content?.split("\n").map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Bouton partager */}
      <div className="mt-10 text-center">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:underline mx-auto">
          <Share2 size={16} />
          PARTAGER
        </button>
      </div>
    </div>
  );
}
