import React from "react";

export default function ArticleCard({ article, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative h-64 rounded-xl overflow-hidden shadow-md cursor-pointer group"
      style={{
        backgroundImage: `url(${article.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0   bg-opacity-50 p-4 flex flex-col justify-end transition-opacity group-hover:bg-opacity-60">
        <h3 className="text-white text-xl font-semibold mb-2">
          {article.title}
        </h3>
        <p className="text-gray-200 text-sm">{article.description}</p>
      </div>
    </div>
  );
}
