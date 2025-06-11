import { useEffect, useState, useMemo } from "react";
import { Autocomplete, Box, Pagination, Stack, Tab, Tabs, TextField } from "@mui/material";
import ArticleCard from "../../components/Cards/Article/ArticleCard";
import ArticleView from "../../components/Cards/Article/ArticleView";
import { article } from "../../services/ArticleServices";
import { categoryArticle } from "../../services/CategoryArticleServices";


export default function Articles() {
  // State management
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const articlesPerPage = 9;

  // Data fetching
  const fetchData = async () => {
    try {
      setLoading(true);
      const [articlesRes, categoriesRes] = await Promise.all([
        article.GetArticles(),
        categoryArticle.getCategoryArticle()
      ]);

      setArticles(articlesRes?.datas || []);
      setCategories(["Tous", ...(categoriesRes?.datas?.map(c => c.name) || [])]);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0 });
  }, []);

  // Filter and pagination logic
  const filteredArticles = useMemo(() => {
    return articles?.filter(article => {
      const matchesCategory = selectedCategory === "Tous" ||
          (article.categories && article.categories.includes(selectedCategory));
      const matchesSearch = article.title?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, search]);

  const paginatedArticles = useMemo(() => {
    const startIdx = (currentPage - 1) * articlesPerPage;
    return filteredArticles.slice(startIdx, startIdx + articlesPerPage);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Handlers
  const handleCategoryChange = (_, newValue) => {
    setSelectedCategory(newValue);
    resetPagination();
  };

  const handleSearchChange = (_, newValue) => {
    setSearch(newValue);
    resetPagination();
  };

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0 });
  };

  const resetPagination = () => {
    setCurrentPage(1);
    window.scrollTo({ top: 0 });
  };

  // Render states
  if (loading) return <div className="text-center py-10">Loading articles...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
      <div className="sm:px-6 lg:px-24 py-5 space-y-10 mx-6 text-gray-800 pt-7">
        {selectedArticle ? (
            <ArticleView
                article={selectedArticle}
                onClose={() => setSelectedArticle(null)}
            />
        ) : (
            <>
              {/* Filters section */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
                  <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                    <Tabs
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                    >
                      {categories.map((cat, idx) => (
                          <Tab key={`cat-${idx}`} label={cat} value={cat} />
                      ))}
                    </Tabs>
                  </Box>
                </div>

                <Stack spacing={2} sx={{ width: 300 }}>
                  <Autocomplete
                      freeSolo
                      options={[...new Set(articles.map(a => a.title))].sort()}
                      inputValue={search}
                      onInputChange={handleSearchChange}
                      renderInput={(params) => (
                          <TextField {...params} label="Search Articles" />
                      )}
                  />
                </Stack>
              </div>

              {/* Articles grid */}
              {filteredArticles.length === 0 ? (
                  <div className="text-center py-10">
                    No articles found matching your criteria.
                  </div>
              ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedArticles.map(article => (
                          <ArticleCard
                              key={article.id}
                              article={article}
                              onClick={() => setSelectedArticle(article)}
                          />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8">
                          <Pagination
                              count={totalPages}
                              page={currentPage}
                              onChange={handlePageChange}
                              variant="outlined"
                              shape="rounded"
                          />
                        </div>
                    )}
                  </>
              )}
            </>
        )}
      </div>
  );
}
