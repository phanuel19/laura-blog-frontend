import React, { useState } from "react";
import VideosCard from "../../components/Cards/Videos/VideosCard";
import VideoView from "../../components/Cards/Videos/VideoView";
import { sampleVideos } from "../../data/sampleVideos";

export default function Videos() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const categories = [
    "Tous",
    ...new Set(sampleVideos.flatMap((v) => v.categories)),
  ];

  const filteredVideos = sampleVideos.filter((video) => {
    const matchCategory =
      selectedCategory === "Tous" ||
      video.categories.includes(selectedCategory);
    const matchSearch = video.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredVideos.length / articlesPerPage);
  const startIdx = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredVideos.slice(
    startIdx,
    startIdx + articlesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-24 py-10 pt-24 text-gray-800 space-y-10">
      {selectedVideo ? (
        <VideoView
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      ) : (
        <>
          {/* Catégories + Recherche */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Filtres catégories */}
            <div
              className="flex gap-2 overflow-x-auto scrollbar-hide max-w-full sm:flex-wrap sm:justify-start scroll-smooth snap-x
"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm transition-all duration-200 snap-start
 ${
   selectedCategory === cat
     ? "bg-blue-600 text-white shadow-md"
     : "bg-white text-gray-700 hover:bg-blue-100"
 }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Recherche */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full sm:w-auto border rounded-md overflow-hidden shadow-sm min-w-[200px] max-w-full"
            >
              <input
                type="search"
                placeholder="Rechercher une vidéo"
                className="w-full px-3 py-2 text-sm focus:outline-none"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </form>
          </div>

          {/* Grille des vidéos */}
          <section className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold">Vidéos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentArticles.map((video) => (
                <VideosCard
                  key={video.id}
                  video={video}
                  onClick={() => {
                    setSelectedVideo(video);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-full border transition ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
