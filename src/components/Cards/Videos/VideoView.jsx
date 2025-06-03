import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import SortIcon from "@mui/icons-material/Sort";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { useEffect, useState } from "react";


export default function VideoView({ video, onClose, selectVideo, sampleVideos }) {
  const [currentRandom, setCurrentRandom] = useState([]);

  const randomElements = () => {
    let table = [];
    for (let index = 0; index < 12; index++) {
      let videoToAdd =
        sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
      if (!table.includes(videoToAdd)) {
        table.push(videoToAdd);
      } else {
        index -= 1;
      }
    }
    setCurrentRandom(table);
  };

  useEffect(() => {
    randomElements();
  }, [video]);

  if (!video) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white text-gray-900">
      {/* Layout principal (vidéo + sidebar) */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contenu principal (vidéo + infos) */}
        <div className="lg:flex-1">
          {/* Player vidéo */}
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
            <video
              controls
              autoPlay
              className="w-full h-full object-contain"
              src={video.url}
              poster={video.thumbnail}
            />
            <span className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {video.categories[0]}
            </span>
          </div>

          {/* Titre et infos */}
          <div className="mt-4">
            <h1 className="text-xl font-bold">{video.title}</h1>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Il y a 2 jours</span>
              </div>

              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-gray-100">
                  <ThumbUpIcon className="w-5 h-5" />
                  <span>12K</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-gray-100">
                  <ThumbDownIcon className="w-5 h-5" />
                </button>
                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-gray-100">
                  <ShareIcon className="w-5 h-5" />
                  <span>Partager</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-gray-100">
                  <DownloadIcon className="w-5 h-5" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>
          </div>

          {/* Description et auteur */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <img
                src="/avatars/mark.png"
                alt="Auteur"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Mark Brooklyn</h3>
                </div>
                <p className="text-xs text-gray-500">1.2M abonnés</p>
                <p className="mt-2 text-sm text-gray-800">
                  {video.description}
                </p>
                <button className="mt-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                  Afficher plus
                </button>
              </div>
            </div>
          </div>

          {/* Commentaires */}
          <div className="mt-6">
            <div className="flex items-center space-x-4 mb-4">
              <h3 className="text-lg font-semibold">1,248 commentaires</h3>
              <button className="flex items-center space-x-1 text-sm font-medium text-gray-600">
                <SortIcon className="w-4 h-4" />
                <span>Trier par</span>
              </button>
            </div>

            {/* Ajouter un commentaire */}
            <div className="flex space-x-3 mb-6">
              <img
                src="/avatars/user1.jpg"
                alt="user"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex-1 border-b border-gray-300 pb-1">
                <input
                  type="text"
                  placeholder="Ajouter un commentaire..."
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

            {/* Liste des commentaires */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex space-x-3 mb-4">
                <img
                  src={`/avatars/user${i + 1}.jpg`}
                  alt="user"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium">User {i + 1}</span>
                    <span className="text-xs text-gray-500">2 jours</span>
                  </div>
                  <p className="text-sm mt-1">
                    Ceci est un exemple de commentaire sur cette vidéo très
                    intéressante.
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                      <ThumbUpIcon className="w-4 h-4" />
                      <span className="text-xs">24</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                      <ThumbDownIcon className="w-4 h-4" />
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">
                      Répondre
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar (vidéos suggérées) */}
        <div className="lg:w-80 space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
            <h3 className="font-medium">À suivre</h3>
          </div>

          {currentRandom.map((_, i) => (
            <div
              key={i}
              className="flex space-x-2 cursor-pointer"
              onClick={() => {
                selectVideo(_);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="w-40 h-24 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={_.thumbnail}
                  alt="Miniature"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium line-clamp-2">{_.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{_.author}</p>
                <p className="text-xs text-gray-500">
                  12K vues • Il y a 2 jours
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Icônes factices pour l'exemple (vous devriez utiliser des vraies icônes)

function DownloadIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}
