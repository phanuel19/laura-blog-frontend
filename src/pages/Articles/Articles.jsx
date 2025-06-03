import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import ArticleCard from "../../components/Cards/Article/ArticleCard";
import ArticleView from "../../components/Cards/Article/ArticleView";
import {article} from "../../services/ArticleServices.js"


export default function Articles() {
  const [search, setSearch] = useState("");
  const [sampleArticles, setSampleArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;


  const fetchArticles = async () => {
    try{
      const result = await article.GetArticles()
      setSampleArticles(result.datas)
    }catch(e){
      console.log(e)
    }

  }

  useEffect(() => {
    fetchArticles()
    /*const randomIndex = Math.floor(Math.random() * sampleArticles.length);
    setCurrentArticle(sampleArticles[randomIndex]);*/

    window.scrollTo({ top: 0, behavior: "smooth" });
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
    ...sampleArticles.map((a) => a.title)
  ];

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIdx = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(
    startIdx,
    startIdx + articlesPerPage
  );
  const handleChange = (event, newValue) => {
    setSelectedCategory(newValue);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <div className="sm:px-6 lg:px-24 py-5 space-y-10 mx-6 text-gray-800 pt-7  ">
      {selectedArticle ? (
        <ArticleView
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      ) : (
        <>
          {/* Article en vedette */}
          {/* <ArticleCard
            className="w-full h-full"
            article={currentArticle}
            onClick={() => setSelectedArticle(currentArticle)}
          /> */}

          {/* Filtres + recherche */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
              <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                <Tabs
                  value={selectedCategory}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                >
                  {categories.map((cat, idx) => (
                    <Tab key={idx} label={cat} value={cat} />
                  ))}
                </Tabs>
              </Box>
            </div>
            <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                id="free-solo-demo"
                inputValue={search}
                onInputChange={(event, newInputValue) => {
                  setSearch(newInputValue);
                  setCurrentPage(1);
                }}
                freeSolo
                options={currentArticles
                  .map((option) => option.title)
                  .sort((a, b) => a.localeCompare(b))}
                renderInput={(params) => (
                  <TextField {...params} label="Rechercher un Article" />
                )}
              />{" "}
            </Stack>
          </div>

          {/* Grille des articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleArticles.map((article) => (
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
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
          )}
        </>
      )}
    </div>
  );
}
