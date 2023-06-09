import Notification from "../components/Home/abetcomponents/Notification";
import Features from "../components/Home/abetcomponents/Features";
import FeaturesBlocks from "../components/Home/abetcomponents/FeatureBlocks";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Notification />
      <Features />
      <div className=" relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        {" "}
        <iframe
          width="420"
          height="315"
          src="https://www.youtube.com/embed/rTv1bz2TPx8"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-{140px} h-96 max-w-full m-auto center allowfullscreen"
          allowFullScreen="True"
        ></iframe>
      </div>
      <FeaturesBlocks />
    </>
  );
}
