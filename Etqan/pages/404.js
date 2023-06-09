import Image from "next/image";
import Navbar from "../components/Navbar";
const NotFoundPage = () => {
  return (
    <>
      <Navbar />{" "}
      <div className="min-h-screen">
        <Image
          className="mt-12"
          src="/backgrounds/404.svg"
          alt="background image"
          fill
        />
      </div>
    </>
  );
};

export default NotFoundPage;
