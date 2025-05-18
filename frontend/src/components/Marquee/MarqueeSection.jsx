import React from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

const shortenTitle = (title, maxLength = 50) => {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
};

const MarqueeSection = () => {
  const { news } = useSelector((state) => state.news);

  return (
    <div className=" py-2 px-4 shadow-md">
      <Marquee
        pauseOnClick
        speed={40}
        gradient={true}
        gradientColor={[255, 255, 255]}
        gradientWidth={100}
      >
        <div className="flex gap-10 items-center">
          {news.map((item, id) => (
            <h2
              key={id}
              className="text-sm md:text-base font-medium text-gray-100 dark:text-gray-200 whitespace-nowrap hover:text-gray-300 transition-colors duration-300"
            >
              📰 {shortenTitle(item.title)}
            </h2>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeSection;
