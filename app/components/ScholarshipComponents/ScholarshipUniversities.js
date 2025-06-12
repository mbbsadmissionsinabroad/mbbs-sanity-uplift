import Image from "next/image";
import React from "react";

const ScholarshipUniversities = () => {
  const countryDetails = [
    {
      country: "RUSSIA",
      alt: "Russia",
      flagImg: "/assests/country/Russia01.png",
      universities: [
        {
          universityLogo: "/assests/country/altal.png",
          universityName: "Altai State Medical University",
        },
        {
          universityLogo: "/assests/country/mary.png",
          universityName: "Mari State University University",
        },
        {
          universityLogo: "/assests/country/oreal.png",
          universityName: "Orel State Medical University",
        },
        {
          universityLogo: "/assests/country/oren.png",
          universityName: "Orenburg State Medical University",
        },
        {
          universityLogo: "/assests/country/perm.png",
          universityName: "Perm State Medical University",
        },
        {
          universityLogo: "/assests/country/south.png",
          universityName: "South Ural State Medical University",
        },
      ],
    },
    {
      country: "BOSNIA",
      flagImg: "/assests/country/Bosnia01.png",
      alt: "Bosnia",
      universities: [
        {
          universityLogo: "/assests/country/sarajevo.png",
          universityName: "University of East Sarajevo Bosnia",
        },
      ],
    },
    {
      country: "GEORGIA",
      flagImg: "/assests/country/Georgia01.png",
      alt: "GEORGIA",
      universities: [
        {
          universityLogo: "/assests/country/georgian.png",
          universityName: "Georgian National University SEU",
        },
      ],
    },
    // {
    //   country: "KAZAKHSTAN",
    //   flagImg: "/assests/country/Kazakhstan01.png",
    //   alt: "Kazakhstan01",
    //   universities: [
    //     {
    //       universityLogo: "",
    //       universityName: "",
    //     },
    //   ],
    // },
    {
      country: "PHILIPPINE",
      flagImg: "/assests/country/philippine.png",
      universities: [
        {
          universityLogo: "/assests/country/davao.png",
          universityName: "Davao Medical School Foundation",
        },
        {
          universityLogo: "/assests/country/uv.png",
          universityName: "UV Gullas College Of Medicine",
        },
      ],
    },
    // {
    //   country: "POLAND",
    //   flagImg: "/assests/country/poland01.png",
    //   universities: [
    //     {
    //       universityLogo: "",
    //       universityName: "",
    //     },
    //   ],
    // },
  ];
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-4xl text-3xl font-bold title-font text-gray-900">
            List Of Foreign Medical{" "}
            <span className="text-red-600">Universities</span>
          </h1>
          <p className="lg:w-2/3 mx-auto font-semibold leading-relaxed text-base text-gray-500">
            YOU HAVE A CHANCE TO STUDY IN THESE UNIVERSITIES WITH SCHOLARSHIP.
          </p>
        </div>
        <div className=" sm:px-20 px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {countryDetails.map((item, i) => (
              <div className="p-4 md:w-1/3">
                <div className="h-full w-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden p-4 bg-gray-100">
                  <Image
                    className="lg:h-48 md:h-36 w-full object-fill p-4"
                    src={item.flagImg}
                    height={120}
                    width={220}
                    alt={item.alt}
                  />
                  <div className="p-6">
                    <h1 className="title-font text-xl font-semibold text-gray-900 mb-3">
                      {item.country}
                    </h1>
                    {item.universities.map((institute, k) => (
                      <>
                        <div className="flex-grow  flex sm:items-center items-start flex-row mt-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                            <Image
                              alt="blog"
                              src={institute.universityLogo}
                              height={100}
                              width={100}
                              className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                            />
                          </div>
                          <div className="flex-grow pl-6 mt-2 sm:mt-0">
                            <h2 className="font-medium title-font text-gray-500 mb-1 text-sm">
                              {institute.universityName}
                            </h2>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScholarshipUniversities;
