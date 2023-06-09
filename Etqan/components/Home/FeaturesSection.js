function features() {
  return (
    <>
      <div className="container my-24 px-6 mx-auto">
        <section className="mb-32 text-gray-800 text-center pb-32">
          <div className="flex justify-center">
            <div className="text-center max-w-[700px]">
              <h2 className="text-6xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r to-gray-700 from-blue-400">
                Website Features
              </h2>
              <p className="text-xl mb-12">
                What differentiates ETQAN technically?
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
            <div className="mb-12 lg:mb-0">
              <div className="p-4 bg-blue-600 rounded-full shadow-lg inline-block mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" />
                  <path d="M16 16l-4-4-4 4" />
                </svg>
              </div>
              <h5 className="text-lg font-bold mb-4">Cloud Based</h5>
              <p className="text-xl">
                ETQAN is a cloud-based platform which means it has more
                advantages than traditional websites as security, scalability,
                and data backups.
              </p>
            </div>

            <div className="mb-12 lg:mb-0">
              <div className="p-4 bg-blue-600 rounded-full shadow-lg inline-block mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
              </div>
              <h5 className="text-lg font-bold mb-4">
                Microservices Architecture
              </h5>
              <p className="text-xl">
                Our website is built using the Microservices architecture. This
                adds many technical advantages such as scalability, improved
                fault-isolation, data-security, and more Resilience.
              </p>
            </div>

            <div className="mb-12 md:mb-0">
              <div className="p-4 bg-blue-600 rounded-full shadow-lg inline-block mb-6">
                <svg
                  className="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"
                  ></path>
                </svg>
              </div>
              <h5 className="text-lg font-bold mb-4">Extremely fast</h5>
              <p className="text-xl">
                As NextJS is used to develop ETQAN and it is super-fast in
                rendering pages and provides smooth user experience.
              </p>
            </div>

            <div className="mb-12 md:mb-0">
              <div className="p-4 bg-blue-600 rounded-full shadow-lg inline-block mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <h5 className="text-lg font-bold mb-4">
                Fully responsive and user friendly
              </h5>
              <p className="text-xl">
                Users can get user-friendly experience from any device or
                platform: desktop, phones, tablet, etc.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default features;
