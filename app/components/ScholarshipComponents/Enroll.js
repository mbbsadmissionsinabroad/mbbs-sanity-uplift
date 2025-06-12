import Image from "next/image";
import React from "react";

const Enroll = () => {
  const steps = [
    {
      image: "/assests/country/step1.png",
      title: "Step 1",
      desc: "Visit the scholarship form page by clicking ",
    },
    {
      image: "/assests/country/step2.png",
      title: "Step 2",
      desc: "Fill in the form with precise and accurate information.",
    },
    {
      image: "/assests/country/step3.png",
      title: "Step 3",
      desc: "Securely complete payment for the examination fee.",
    },
    {
      image: "/assests/country/step4.png",
      title: "Step 4",
      desc: "Participate in the examination and do your best.",
    },
  ];
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-4xl text-3xl font-bold title-font text-gray-900">
            Process To Enroll For{" "}
            <span className="text-red-600">Scholarship</span>
          </h1>
          <p className="lg:w-2/3 mx-auto font-semibold leading-relaxed text-base text-gray-500">
            TAKE YOUR FIRST STEP TOWARDS A BRIGHT FUTURE
          </p>
        </div>
      </section>
      <section className="text-gray-600 body-font text-center sm:px-32">
        <div className="px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {steps.map((step, i) => (
              <div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <div className="text-center">
                    <Image
                      className="h-40 w-full object-cover object-center mb-6 rounded-full"
                      src={step.image}
                      width={120}
                      height={120}
                      alt="content"
                    />
                  </div>

                  <h2 className="text-lg text-red-500 font-medium title-font mb-4">
                    {step.title}
                  </h2>
                  <p className="leading-relaxed text-base">
                    {step.title === "Step 1" ? (
                      <span>
                        {step.desc}{" "}
                        <a
                          className="text-blue-900 font-bold cursor-pointer"
                          target="_blank"
                          href="/scholarship/scholarshipForm"
                        >
                          here.
                        </a>
                      </span>
                    ) : (
                      step.desc
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Enroll;
