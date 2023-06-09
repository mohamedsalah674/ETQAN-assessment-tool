import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Image } from "cloudinary-react";
import SideNavbar from "../../../../../../../components/SideNavbar";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import buildClient from "../../../../../../../hooks/build";

const ImageUploader = () => {
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

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const api_key = "119944569468449";
  const cloud_name = "dv8hepdyi";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client=buildClient('')

    if (!description) {
      toast.warning("Please enter a description");
      return;
    }
    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append("file", image);
    formData.append("api_key", api_key);
    formData.append("upload_preset", "my-uploads");
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    try {
      await client.post(
        `/api/assessment/courses/${courseId}/samples`,
        {
          url: response.data.url,
          publicId: response.data.public_id,
          description: description,
        }
      );
      toast.success("Answer Sample Uploaded Successfully");
    } catch {
      toast.error("Error Uploading Sample. Please check your Internet!");
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="p-4 bg-gray-800 min-h-screen bg-bottom bg-[length:800px_400px] bg-no-repeat bg-[url('/backgrounds/samples.svg')]">
      <SideNavbar links={links} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-[50%] mx-auto pt-8"
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="py-2 px-4 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter a description"
          className="py-2 px-4 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          Upload
        </button>
        <Link
          type="submit"
          href={`/instructor/${instructorId}/programs/${programId}/courses/${courseId}/gallery`}
          className="py-2 px-4 text-center bg-green-500 hover:underline hover:bg-green-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        >
          See Answer Samples
        </Link>
      </form>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { courseId } = context.query;
  const client=buildClient(context)

  // Fetch images from MongoDB
  const {data} = await client.get(
    `/api/assessment/courses/${courseId}/samples`
  );
  const images = await data;

  return { props: { images } };
}

const UploadPage = () => {
  return (
    <div>
      <ImageUploader />
    </div>
  );
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-800">
      <div className="pt-8">
        {" "}
        <h1 className="text-gray-50 text-center text-5xl font-bold">
          Upload Answer Samples
        </h1>
      </div>
      <UploadPage />
    </div>
  );
}
