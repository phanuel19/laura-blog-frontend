import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import VideosCard from "../../components/Cards/Videos/VideosCard";
import VideoView from "../../components/Cards/Videos/VideoView";
import { sampleVideos } from "../../data/sampleVideos";

export default function Videos() {
  const [search, setSearch] = useState(" ");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [options, setOptions] = useState([]);
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
  const handleChange = (event, newValue) => {
    setSelectedCategory(newValue);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  
  return (
    <div className="sm:px-6 lg:px-24 py-10 space-y-10 mx-6 text-gray-800 pt-20">
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
                  <TextField {...params} label="Rechercher une Vidéo" />
                )}
              />{" "}
            </Stack>
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
        </>
      )}
    </div>
  );
}
