import React from "react";
import Image from "next/image";
function FeaturesBlocks() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl text-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">
              More than 850 colleges and universities are accreditated all over
              the world
            </h2>
          </div>

          {/* Items */}
          <div className="max-w-sm md:max-w-4xl mx-auto grid gap-2 grid-cols-4 md:grid-cols-5">
            <Image
              width={90}
              height={90}
              src="/abet/AAMI.png"
              alt="AAMI University"
            ></Image>
            <Image
              width={90}
              height={90}
              src="/abet/ACERS.png"
              alt="ACERS University"
            ></Image>
            <Image
              width={90}
              height={90}
              src="/abet/ANS.png"
              alt="ANS University"
            ></Image>
            <Image
              width={90}
              height={90}
              src="/abet/ASCE.png"
              alt="ASCE University"
            ></Image>
            <Image
              width={90}
              height={90}
              src="/abet/ASME.png"
              alt="ASME University"
            ></Image>
          </div>
        </div>
      </div>
      <section className="relative">
        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div
          className="absolute inset-0  md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none"
          aria-hidden="true"
        ></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Items */}
            <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
              {/* 1st item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect
                      className="fill-current text-blue-600"
                      width="64"
                      height="64"
                      rx="32"
                    />
                    <g strokeWidth="2">
                      <path
                        className="stroke-current text-blue-300"
                        d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M20.571 37.714h5.715L36.57 26.286h8"
                      />
                      <path
                        className="stroke-current text-blue-300"
                        strokeLinecap="square"
                        d="M41.143 34.286l3.428 3.428-3.428 3.429"
                      />
                      <path
                        className="stroke-current text-white"
                        strokeLinecap="square"
                        d="M41.143 29.714l3.428-3.428-3.428-3.429"
                      />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  ABET-ACCREDITED PROGRAMS
                </h4>
                <a
                  className="text-blue-600 text-center"
                  href="https://amspub.abet.org/aps/"
                >
                  Read More ...
                </a>
              </div>

              {/* 2nd item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect
                      className="fill-current text-blue-600"
                      width="64"
                      height="64"
                      rx="32"
                    />
                    <g strokeWidth="2" transform="translate(19.429 20.571)">
                      <circle
                        className="stroke-current text-white"
                        strokeLinecap="square"
                        cx="12.571"
                        cy="12.571"
                        r="1.143"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"
                      />
                      <path
                        className="stroke-current text-blue-300"
                        d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"
                      />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  ABOUT ABET ACCREDITATION
                </h4>
                <a
                  href="https://www.abet.org/accreditation/"
                  className="text-blue-600 text-center"
                >
                  Read More ...
                </a>
              </div>

              {/* 3rd item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect
                      className="fill-current text-blue-600"
                      width="64"
                      height="64"
                      rx="32"
                    />
                    <g strokeLinecap="square" strokeWidth="2">
                      <path
                        className="stroke-current text-blue-300"
                        d="M38.826 22.504a9.128 9.128 0 00-13.291-.398M35.403 25.546a4.543 4.543 0 00-6.635-.207"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M19.429 25.143A6.857 6.857 0 0126.286 32v1.189L28 37.143l-1.714.571V40A2.286 2.286 0 0124 42.286h-2.286v2.285M44.571 25.143A6.857 6.857 0 0037.714 32v1.189L36 37.143l1.714.571V40A2.286 2.286 0 0040 42.286h2.286v2.285"
                      />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  Contacting
                </h4>
                <a
                  href="https://www.abet.org/contact-us/"
                  className="text-blue-600 text-center"
                >
                  Read More ...
                </a>
              </div>

              {/* 4th item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect
                      className="fill-current text-blue-600"
                      width="64"
                      height="64"
                      rx="32"
                    />
                    <g transform="translate(22.857 19.429)" strokeWidth="2">
                      <path
                        className="stroke-current text-white"
                        strokeLinecap="square"
                        d="M12.571 4.571V0H0v25.143h12.571V20.57"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M16 12.571h8"
                      />
                      <path
                        className="stroke-current text-white"
                        strokeLinecap="square"
                        d="M19.429 8L24 12.571l-4.571 4.572"
                      />
                      <circle
                        className="stroke-current text-blue-300"
                        strokeLinecap="square"
                        cx="12.571"
                        cy="12.571"
                        r="3.429"
                      />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  ISO 9001:2015 CERTIFICATION
                </h4>
                <a
                  href="https://www.abet.org/accreditation/what-is-accreditation/why-abet-accreditation-matters/iso-90012015/"
                  className="text-blue-600 text-center"
                >
                  Read More ...
                </a>
              </div>

              {/* 5th item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect
                      className="fill-current text-blue-600"
                      width="64"
                      height="64"
                      rx="32"
                    />
                    <g strokeLinecap="square" strokeWidth="2">
                      <path
                        className="stroke-current text-white"
                        d="M20.571 20.571h13.714v17.143H20.571z"
                      />
                      <path
                        className="stroke-current text-blue-300"
                        d="M38.858 26.993l6.397 1.73-4.473 16.549-13.24-3.58"
                      />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  Program Assessment Resources
                </h4>
                <a
                  href="https://assessment.abet.org/"
                  className="text-blue-600 text-center"
                >
                  Read More ...
                </a>
              </div>

              {/* 6th item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect
                      className="fill-current text-blue-600"
                      width="64"
                      height="64"
                      rx="32"
                    />
                    <g strokeWidth="2">
                      <path
                        className="stroke-current text-white"
                        d="M32 37.714A5.714 5.714 0 0037.714 32a5.714 5.714 0 005.715 5.714"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M32 37.714a5.714 5.714 0 015.714 5.715 5.714 5.714 0 015.715-5.715M20.571 26.286a5.714 5.714 0 005.715-5.715A5.714 5.714 0 0032 26.286"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M20.571 26.286A5.714 5.714 0 0126.286 32 5.714 5.714 0 0132 26.286"
                      />
                      <path
                        className="stroke-current text-blue-300"
                        d="M21.714 40h4.572M24 37.714v4.572M37.714 24h4.572M40 21.714v4.572"
                        strokeLinecap="square"
                      />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  Events
                </h4>
                <a
                  href="https://www.abet.org/accreditation/what-is-accreditation/why-abet-accreditation-matters/iso-90012015/"
                  className="text-blue-600 text-center"
                >
                  Read More ...
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturesBlocks;
