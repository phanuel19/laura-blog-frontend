import React from "react";

function VideosCard({ key }) {
  return (
    <div key={key} className=" text-left">
      <div className="h-55 bg-gray-100 shadow-sm mb-4 rounded-xl border p-4 " />
      {/* <p className="text-sm font-medium text-gray-700">Loki Bright</p> */}
      <h3 className="font-semibold mt-2">
        A short title that engages our visitors
      </h3>
      <p className="text-sm text-gray-500 mt-2 align-justify ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
        dicta ipsam dolorum et. Quaerat deserunt, maiores itaque laboriosam iste
        atque accusamus quo cupiditate sit omnis obcaecati explicabo rerum.
        Quaerat, quasi.
      </p>
      <div className="flex gap-2 text-xs text-gray-400 mt-2">
        <span className="rounded-xl border p-2">adventure</span>
        <span className="rounded-xl border p-2">hotels</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">Oct 19, 2023 </p>
    </div>
  );
}

export default VideosCard;
