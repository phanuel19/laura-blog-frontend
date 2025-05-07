import React, { useEffect, useState } from "react";
import ArticleCard from "../../components/Cards/Article/ArticleCard";
import ArticleView from "../../components/Cards/Article/ArticleView";
import { sampleArticles } from "../../data/sampleArticles";

export default function Articles() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sampleArticles.length);
    setCurrentArticle(sampleArticles[randomIndex]);
  }, []);

  const filteredArticles = sampleArticles.filter((article) => {
    const matchCategory =
      selectedCategory === "Tous" ||
      article.categories.includes(selectedCategory);
    const matchSearch = article.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categories = [
    "Tous",
    ...new Set(sampleArticles.flatMap((a) => a.categories)),
  ];

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIdx = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(
    startIdx,
    startIdx + articlesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!currentArticle) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-24 py-10 space-y-24 text-gray-800 pt-20">
      {selectedArticle ? (
        <ArticleView
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      ) : (
        <>
          {/* Article en vedette */}
          <ArticleCard
            className="w-full h-full"
            article={currentArticle}
            onClick={() => setSelectedArticle(currentArticle)}
          />

          {/* Filtres + recherche */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Rechercher un article..."
              className="border px-4 py-2 rounded-md w-full md:w-1/3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Grille des articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>

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
