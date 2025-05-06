import React from "react";
import VideosCard from "../../components/Cards/Videos/VideosCard";

function Videos() {
  return (
    <main className=" md:px-40 py-10 space-y-24 text-gray-800 pt-20">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-xs text-gray-400 mt-2">
          <span className="rounded-lg border px-2 py-1">adventure</span>
          <span className="rounded-lg border px-2 py-1">hotels</span>
        </div>
        <form className="flex items-center border rounded-md overflow-hidden shadow-sm">
          <input
            type="search"
            placeholder="Rechercher une vidéo"
            className="flex-1 px-3 py-2 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#4B5563] text-white text-sm px-4 py-2"
          >
            Rechercher
          </button>
        </form>
      </div>
      <section className="space-y-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(12)].map((_, i) => (
            <VideosCard key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Videos;
