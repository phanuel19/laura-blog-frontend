import React from "react";
import { useNavigate } from "react-router";
import VideosCard from "../../components/Cards/Videos/VideosCard";

function Home() {
  let navigate = useNavigate();
  return (
    <main className="px-6 md:px-40 py-10 space-y-24 text-gray-800 pt-20">
      {/* Première section : Intro */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Prenons soin de notre esprit, chaque jour
          </h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            repudiandae quas aliquid amet officia suscipit autem distinctio, sed
            saepe, alias blanditiis quis vero vel itaque nisi voluptatem
            veritatis modi fugiat! Possimus, nesciunt.
          </p>
          <div className="flex gap-4">
            <button>Découvrir</button>
            <button className="px-4 py-2 rounded-full border border-gray-500 text-gray-800 cursor-pointer">
              M’informer
            </button>
          </div>
        </div>
        <div className="md:w-1/2 bg-gray-100 rounded-xl h-64 flex items-center justify-center">
          <span className="text-6xl text-gray-400">🖼️</span>
        </div>
      </section>

      {/* Réseaux sociaux */}
      <section className="space-y-3">
        <h4 className="text-gray-700 font-semibold">Rejoins nous sur :</h4>
        <div className="flex gap-6 items-center text-gray-600">
          <span>Google</span>
          <span>YouTube</span>
          <span>Facebook</span>
        </div>
      </section>

      {/* Nouvelles thématiques */}
      <section className="space-y-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Nouvelles Thématiques
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <VideosCard key={i} />
          ))}
        </div>
        <button
          className="mt-6 px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
          onClick={() => navigate("/videos")}
        >
          Découvrir Plus
        </button>
      </section>

      {/* Logos partenaires */}
      <section className="py-12 bg-gray-50 rounded-xl flex flex-wrap justify-center items-center gap-10">
        {["BBC", "Deloitte", "Unilever", "BBC", "Deloitte", "Unilever"].map(
          (partner, idx) => (
            <span key={idx} className="text-xl font-semibold text-gray-500">
              {partner}
            </span>
          )
        )}
      </section>

      {/* Témoignages */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          What our clients have to say
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipiscing elit mattis sit
          phasellus mollis sit aliquam sit nullam.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white border p-6 rounded-lg text-left shadow-sm"
            >
              <div className="text-4xl mb-2">👤</div>
              <h4 className="font-semibold text-sm">
                “Revitalized my work approach”
              </h4>
              <p className="text-sm text-gray-500 mt-2">
                Lorem ipsum dolor sit amet consectetur eget maecenas sapien.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Brian Clark <br />
                VP of Marketing at Snapchat
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Appel au don */}
      <section className="text-center py-10 border-t border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          <span className="text-blue-900 font-bold">Soutenez</span> nous !
          <br />
          Faites un <span className="font-bold">don</span>
        </h2>
        <button className="mt-6 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800">
          Faire un Don
        </button>
      </section>
    </main>
  );
}

export default Home;
