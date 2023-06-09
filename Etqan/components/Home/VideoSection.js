import ReactPlayer from "react-player/lazy";

function VideoSection() {
  return (
    <div className=" relative w-full md:w-1/2 lg:w-1/3 xl:w-1/2 mx-auto my-12">
      {" "}
      <iframe
        width="600"
        height="315"
        src="https://www.youtube.com/embed/rTv1bz2TPx8"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="w-{32px} h-96 max-w-full m-auto center allowfullscreen"
        allowFullScreen="True"
      ></iframe>
    </div>
  );
}

export default VideoSection;
