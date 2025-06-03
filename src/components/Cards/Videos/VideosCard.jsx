import { CalendarDays, User } from "lucide-react";

export default function VideosCard({ video, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg overflow-hidden shadow-sm bg-white transition hover:shadow-md  w-96"
    >
      <div className="w-full h-63 bg-gray-200 flex items-center justify-center">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4 space-y-1 text-left">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User className="w-4 h-4" />
          <span>{video.author || "Auteur inconnu"}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {video.description || "Pas de description disponible."}
        </p>

        <div className="flex gap-2 flex-wrap text-xs mt-4">
          {video?.categories?.map((cat) => (
            <span
              key={cat}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="flex justify-between text-xs text-gray-500 pt-2">
          <div className="flex items-center gap-1">
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span>{video.date || "date Inconnue"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
