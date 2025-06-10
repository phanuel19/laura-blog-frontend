import {useEffect, useState, useCallback} from "react";
import {
    Close,
    Share,
    Sort,
    ThumbDown,
    ThumbUp,
} from "@mui/icons-material";

export default function VideoView({
                                      video,
                                      onClose,
                                      selectVideo,
                                      sampleVideos = [], handleVideoselect
                                  }) {
    const [relatedVideos, setRelatedVideos] = useState([]);
    const getRandomVideos = useCallback(() => {
        if (sampleVideos.length === 0) return [];

        // Create a copy to avoid mutating the original array
        const shuffled = [...sampleVideos].sort(() => 0.5 - Math.random());
        // Get 12 unique videos or less if there aren't enough
        return shuffled.slice(0, Math.min(12, sampleVideos.length));
    }, [sampleVideos]);
    const getCountDays = (video) => {
        let videoDate = new Date(Date.parse(video.created_at))
        let now = new Date(Date.now());
        let operation = now.getTime() - videoDate.getTime();
        let status = {
            'days': Math.ceil(operation / (1000 * 60 * 60 * 24)),
            'hours': Math.ceil(operation / (1000 * 60 * 60)),
            'minutes': Math.ceil(operation / (1000 * 60)),
        }
        console.log(status);
        if (status.days > 30) {
            return `${status.days / 30} mois`;
        } else if (status.days > 0) {
            return `${status.days} jours`;
        } else if (status.hours > 0) {
            return `${status.hours} heures`;
        }

    }
    useEffect(() => {
        setRelatedVideos(getRandomVideos());
    }, [video]);

    if (!video) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white text-gray-900">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main content */}
                <div className="lg:flex-1">
                    {/* Video player */}
                    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                        <video
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                            src={video.url}
                            poster={video.thumbnail}
                            title={video.title}
                        />
                    </div>

                    {/* Video info */}
                    <div className="mt-4">
                        <h1 className="text-xl font-bold">{video.title}</h1>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-2">
                            <div className="text-sm text-gray-600">
                                <span>publié il y a {getCountDays(video)}  </span>
                            </div>


                                <button
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-100"
                                    aria-label="Share video"
                                >
                                    <Share className="w-5 h-5"/>
                                    <span>Share</span>
                                </button>

                        </div>
                    </div>

                    {/* Author and description */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start gap-3">

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">
                                        {video.author || "Unknown Author"}
                                    </h3>
                                </div>
                                <p className="mt-2 text-sm text-gray-800 line-clamp-3">
                                    {video.description}
                                </p>
                                {/*video.description?.length > 200 && (
                                    <button className="mt-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                                        Show more
                                    </button>
                                )*/}
                            </div>
                        </div>
                    </div>

                    {/* Comments section */}
                    {/*
            <div className="mt-6">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold">1,248 comments</h3>
                <button
                    className="flex items-center gap-1 text-sm font-medium text-gray-600"
                    aria-label="Sort comments"
                >
                  <Sort className="w-4 h-4" />
                  <span>Sort by</span>
                </button>
              </div>

              Add comment
              <div className="flex gap-3 mb-6">
                <img
                    src="/avatars/default-avatar.png"
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex-1 border-b border-gray-300 pb-1">
                  <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full outline-none text-sm bg-transparent"
                      aria-label="Comment input"
                  />
                </div>
              </div>*/}

                    {/* Comments list */}
                    {/*[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3 mb-4">
                    <img
                        src={`/avatars/user${i + 1}.jpg`}
                        alt={`User ${i + 1}`}
                        className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">User {i + 1}</span>
                        <span className="text-xs text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-sm mt-1">
                        This is an example comment on this very interesting video.
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                            className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                            aria-label="Like comment"
                        >
                          <ThumbUp className="w-4 h-4" />
                          <span className="text-xs">24</span>
                        </button>
                        <button
                            className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                            aria-label="Dislike comment"
                        >
                          <ThumbDown className="w-4 h-4" />
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
              ))*/}
                    {/* </div> */}
          </div>

                    {/* Sidebar - Related videos */}
                    <div className="lg:w-80 space-y-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label="Close video view"
                            >
                                <Close className="w-5 h-5"/>
                            </button>
                            <h3 className="font-medium">Découvrez</h3>
                        </div>

                        {relatedVideos.map((relatedVideo) => (
                            <div
                                key={relatedVideo.id}
                                className="flex gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                                onClick={() => {
                                    handleVideoselect(relatedVideo.id);
                                    window.scrollTo({top: 0, behavior: "smooth"});
                                }}
                                aria-label={`Watch ${relatedVideo.title}`}
                            >
                                <div className="w-40 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={relatedVideo.thumbnail}
                                        alt={relatedVideo.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium line-clamp-2">
                                        {relatedVideo.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {relatedVideo.author || "Unknown Author"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        il y a{getCountDays(relatedVideo)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            );
            }