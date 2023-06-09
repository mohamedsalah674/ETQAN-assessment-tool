import Image from "next/image";
import Link from "next/link";
function DescriptionSection() {
  return (
    <section id="desc" className="bg-white dark:bg-gray-900 ">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="text-justify italic  te sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            What is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400">
              ETQAN
            </span>
            ?
          </h2>
          <p className="mb-4">
            ETQAN is an online Platform for accreditation and quality assurance
            based on ABET criteria in the higher education institutions for both
            computing and engineering fields.
          </p>
          <p>
            We aim to provide a solution that can be housed and utilized by
            Egyptian universities to facilitate the application for the ABET
            accreditation for engineering and computing programs.
          </p>
        </div>
        <div>
          <Image
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="/home/ABET.jpg"
            alt="office conten"
            width="500"
            height="300"
          />
        </div>
        <div className="italic text-justify sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            What is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-red-500">
              ABET
            </span>
            ?
          </h2>
          <p className="mb-4">
            The ABET (incorporated as the Accreditation Board for Engineering
            and Technology) is a non-governmental organization that accredits
            post-secondary education programs in applied and natural sciences,
            computing, engineering and engineering technology.
          </p>
          <p>
            An ABET program can provide under-educated individuals with skills
            that will assist them in improving their lifestyle and functioning
            better in a personal capacity. An ABET learner can begin their
            education at the most basic levels of education and rise to a level
            where they can gain a matric certification as well as other skills
            to enable them to apply for better positions within a working
            environment. To find out more about how an ABET program can assist
            an illiterate individual in reaching their full potential
          </p>
        </div>
        <Link href="/ABET">
          <button
            type="button"
            className="w-1/2 ml-48 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Read more about ABET
          </button>
        </Link>
      </div>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          "We aim to improve the quality of course management and assessment in
          all
          <br />
          <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
            Egyptian higher-education institutions"
          </span>
        </h1>
        <p className="text-lg font-normal mb-10   text-gray-500 lg:text-xl dark:text-gray-400">
          By helping them to achieve the ABET accreditation certificate in both
          computational and engineering fields.
        </p>
      </div>
    </section>
  );
}

export default DescriptionSection;
