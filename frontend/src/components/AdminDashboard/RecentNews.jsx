import React from "react";

const RecentNews = ({ news, bgColor }) => {
  return (
    <div
      className="rounded-lg shadow-md p-6"
      style={{ backgroundColor: bgColor }}
    >
      <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-gray-300">
        Recent 5 News
      </h2>
      {news && news.length > 0 ? (
        <ul className="space-y-3">
          {news.map((item) => (
            <li key={item.id ?? item.title} className="text-gray-300">
              {item.title.length > 60
                ? item.title.slice(0, 57) + "..."
                : item.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No recent news found.</p>
      )}
    </div>
  );
};

export default RecentNews;
