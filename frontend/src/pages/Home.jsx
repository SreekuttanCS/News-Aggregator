import React, { lazy, Suspense } from "react";
import Navbar from "../components/Navbar/Navbar";
import Category from "../components/Category/Category";

const News = lazy(() => import("./News"));
const MarqueeSection = lazy(() =>
  import("../components/Marquee/MarqueeSection")
);
const Footer = lazy(() => import("../components/Footer/Footer"));

const Home = () => {
  return (
    <>
      <Navbar />
      <Category />

      <Suspense fallback={<div>Loading marquee...</div>}>
        <MarqueeSection />
      </Suspense>

      <Suspense fallback={<div>Loading news...</div>}>
        <News />
      </Suspense>

      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
