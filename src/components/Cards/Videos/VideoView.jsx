
export default function VideoView({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-24 py-10 pt-10 space-y-10 bg-white text-gray-800">
      {/* Bannière Vidéo */}
      <div className="relative w-full h-60 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-lg bg-gray-200">
        <video
          controls
          className="w-full h-full object-cover"
          src={video.url}
          poster={video.thumbnail}
        />
        <span className="absolute top-4 right-4 bg-white text-gray-700 px-3 py-1 rounded-full text-sm shadow">
          {video.categories[0]}
        </span>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl md:text-3xl font-bold">
            {video.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base mt-1">
            {video.description}
          </p>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-md shadow w-full sm:w-auto">
          Partager
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow w-full sm:w-auto">
          Télécharger PDF
        </button>
        <button
          className="text-blue-600 hover:underline sm:ml-auto w-full sm:w-auto text-left sm:text-center"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>

      {/* Description Auteur */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-start gap-4 py-4 border-b">
          <img
            src="/avatars/mark.png"
            alt="Auteur"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold">Mark Brooklyn</h4>
            <p className="text-sm text-gray-600">
              COO at Team. Author of the upcoming book on Team Management and
              Leadership.
            </p>
          </div>
        </div>
      ))}

      {/* Commentaire */}
      <div>
        <p className="font-semibold text-gray-700 mb-2">
          Rejoindre la discussion
        </p>
        <div className="flex items-center gap-3 border rounded-md px-4 py-2">
          <img
            src="/avatars/user1.jpg"
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="Commentaire..."
            className="w-full outline-none text-sm"
          />
        </div>
      </div>
    </div>
  );
}
