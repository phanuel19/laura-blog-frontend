import React from "react";

function CommentsCard() {
  return (
    <div className="bg-white border p-6 rounded-lg text-left shadow-sm">
      <div className="text-4xl mb-2">👤</div>
      <h4 className="font-semibold text-sm">“Revitalized my work approach”</h4>
      <p className="text-sm text-gray-500 mt-2">
        Lorem ipsum dolor sit amet consectetur eget maecenas sapien.
      </p>
      <p className="text-xs text-gray-400 mt-2">
        Brian Clark <br />
        VP of Marketing at Snapchat
      </p>
    </div>
  );
}

export default CommentsCard;
