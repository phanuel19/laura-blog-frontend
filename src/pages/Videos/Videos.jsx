import { useState, useEffect, useCallback } from "react";
import {
    Autocomplete,
    Box,
    Pagination,
    Stack,
    Tab,
    Tabs,
    TextField,
} from "@mui/material";
import VideosCard from "../../components/Cards/Videos/VideosCard";
import VideoView from "../../components/Cards/Videos/VideoView";
import { video } from "../../services/VideoServices.js";
import { categoryVideo } from "../../services/CategoryVideoServices.js";

export default function Videos() {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 9;

    const fetchVideos = useCallback(async () => {
        try {
            const result = await video.GetVideos();
            setVideos(result.datas || []);
        } catch (error) {
            console.error("Error fetching videos:", error);
            setVideos([]);
        }
    }, []);

    const fetchVideoDetails = useCallback(async (id) => {
        try {
            const result = await video.GetVideoById(id);
            setSelectedVideo(result.data);
        } catch (error) {
            console.error("Error fetching video details:", error);
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const result = await categoryVideo.getCategoryVideo();
            setCategories(result.datas || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        }
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        fetchVideos();
        fetchCategories();
    }, []);

    const filteredVideos = videos.filter((video) => {
        const matchCategory =
            selectedCategory === "Tous" ||
            video.categories.includes(selectedCategory);
        const matchSearch = video.title.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
    const startIdx = (currentPage - 1) * videosPerPage;
    const currentVideos = filteredVideos.slice(startIdx, startIdx + videosPerPage);

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSearchChange = (event, newInputValue) => {
        setSearch(newInputValue);
        setCurrentPage(1);
    };

    const handleVideoSelect = (id) => {
        fetchVideoDetails(id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const allCategories = ["Tous", ...categories.map((cat) => cat.name)];

    return (
        <div className="sm:px-6 lg:px-24 py-10 space-y-10 mx-6 text-gray-800 pt-20">
            {selectedVideo ? (
                <VideoView
                    video={selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                    sampleVideos={videos}
                    handleVideoselect ={handleVideoSelect}
                />
            ) : (
                <>
                    {/* Categories + Search */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Category filters */}
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-full sm:flex-wrap sm:justify-start scroll-smooth snap-x">
                            <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                                <Tabs
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    aria-label="video categories"
                                >
                                    {allCategories.map((category, idx) => (
                                        <Tab key={idx} label={category} value={category} />
                                    ))}
                                </Tabs>
                            </Box>
                        </div>

                        <Stack spacing={2} sx={{ width: 300 }}>
                            <Autocomplete
                                id="video-search"
                                inputValue={search}
                                onInputChange={handleSearchChange}
                                freeSolo
                                options={Array.from(
                                    new Set(videos.map((video) => video.title))
                                ).sort((a, b) => a.localeCompare(b))}
                                renderInput={(params) => (
                                    <TextField {...params} label="Search for a video" />
                                )}
                            />
                        </Stack>
                    </div>

                    {/* Videos grid */}
                    <section className="space-y-6 text-center">
                        <h2 className="text-2xl font-semibold">Videos</h2>

                        {currentVideos.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {currentVideos.map((video) => (
                                    <VideosCard
                                        key={video.id}
                                        video={video}
                                        onClick={() =>setSelectedVideo(video)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No videos found</p>
                        )}
                    </section>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2 flex-wrap">
                            <Stack spacing={2}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
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