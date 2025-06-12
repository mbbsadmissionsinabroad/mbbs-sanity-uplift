import Image from "next/image";
import React from "react";

const Benifits = () => {
  return (
    <div>
      <section className="text-gray-600 body-font bg-blue-800 sm:px-20 px-6 mb-20">
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-4xl text-3xl font-bold title-font text-white sm:mt-20 mt-8">
            Benefits of our <span className="text-red-600"> Scholarship</span>
          </h1>
          <p className="lg:w-2/3 mx-auto font-semibold leading-relaxed text-base text-white">
            WHAT DO YOU GET
          </p>
        </div>
        <div className="mx-auto flex w-full py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="flex items-center title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              <Image
                src={"/assests/country/s-logo.png"}
                height={100}
                width={100}
                alt="asd"
              />
              <p className="sm:ml-6 sm:text-5xl text-3xl font-semibold">
                Vaidya Vigyan Scholarships
              </p>
            </h1>
            <h2 className="mb-8 leading-relaxed text-white sm:text-4xl text-2xl md:ml-10 mt-6 font-semibold">
              Study MBBS Abroad By Earning Scholarship
            </h2>
            <div className="flex-grow  flex sm:items-center items-start flex-row mt-4 md:ml-20">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <Image
                  alt="blog"
                  src={"/assests/country/dollar.png"}
                  height={100}
                  width={100}
                  className="w-100 h-100 rounded-full flex-shrink-0 object-fill object-center"
                />
              </div>
              <div className="flex-grow pl-6 mt-2 sm:mt-0">
                <h2 className="font-medium title-font text-white mb-1 text-sm">
                  Scholarship Worth Upto 1Cr.
                </h2>
              </div>
            </div>
            <div className="flex-grow  flex sm:items-center items-start flex-row mt-4 sm:ml-20">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <Image
                  alt="blog"
                  src={"/assests/country/stat.png"}
                  height={100}
                  width={100}
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                />
              </div>
              <div className="flex-grow pl-6 mt-2 sm:mt-0">
                <h2 className="font-medium title-font text-white mb-1 text-sm">
                  Assured 13.5 LACS For Top 3 Ranks
                </h2>
              </div>
            </div>
            <div className="flex-grow  flex sm:items-center items-start flex-row mt-4 sm:ml-20">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <Image
                  alt="blog"
                  src={"/assests/country/cash.png"}
                  height={100}
                  width={100}
                  className="w-10 h-10 rounded-full flex-shrink-0 object-cover object-center"
                />
              </div>
              <div className="flex-grow pl-6 mt-2 sm:mt-0">
                <h2 className="font-medium title-font text-white mb-1 text-sm">
                  Can Earn CASH Rewards
                </h2>
              </div>
            </div>
            <div className="flex-grow  flex sm:items-center items-start flex-row mt-4 sm:ml-20">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <Image
                  alt="blog"
                  src={"/assests/country/tab.png"}
                  height={100}
                  width={100}
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                />
              </div>
              <div className="flex-grow pl-6 mt-2 sm:mt-0">
                <h2 className="font-medium title-font text-white mb-1 text-sm">
                  Win FREE Tabs
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 sm:ml-8">
            <Image
              className="object-cover object-center rounded"
              alt="hero"
              height={500}
              width={500}
              src={"/assests/country/Girl2.png"}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benifits;
