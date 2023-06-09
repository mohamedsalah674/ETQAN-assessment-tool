import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
import SideNavbar from "../../../../../../../components/SideNavbar";
import { useRouter } from "next/router";
import buildClient from "../../../../../../../hooks/build";

export default function Gallery(props) {
  const router = useRouter();
  const { courseId, instructorId, programId } = router.query; // Access the URL parameter "id"
  const links = [
    {
      text: "back to your course",
      href: `/instructor/${instructorId}/programs/${programId}/courses/${courseId}/`,
      icon: "/icons/back.svg",
      alt: "programs",
    },
    // Add more links as needed
  ];

  const [images, setImages] = useState(props.data);
  console.log(props.data);
  const handleClick = async (id) => {
    const client=buildClient('')
    try {
      await client.delete(
        `/api/assessment/courses/${courseId}/samples/${id}`
      );
      toast.success("Image deleted successfully");
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      toast.error("Error deleting image. Please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>View samples</title>
      </Head>
      <SideNavbar links={links} />
      <div className="bg-gray-800 min-h-screen bg-right bg-[length:800px_400px] bg-no-repeat bg-[url('/backgrounds/wave.svg')]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mt-5">
            <h1 className="text-gray-50 text-center text-5xl font-bold">
              Answer Samples
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-4 ml-12">
            {images.map((image) => (
              <div
                key={image._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.publicId}
                  className="w-full h-96 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl text-center font-semibold mb-2">
                    {image.description}
                  </h2>
                </div>
                <div className="flex justify-center mb-8 space-x-2">
                  <Link
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    href={image.url}
                  >
                    view Image
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                    onClick={() => handleClick(image._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const client=buildClient(context)
  const { courseId } = context.query;
  
  const image = await client.get(
    `/api/assessment/courses/${courseId}/samples`
  );
  const images = image.data.data;
  return {
    props: { data: images },
  };
}