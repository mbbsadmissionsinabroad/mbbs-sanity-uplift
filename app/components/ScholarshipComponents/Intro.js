import Image from "next/image";
import React from "react";
import About from "../../../public/assests/country/front.png";

const Intro = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="mx-auto flex px-5 sm:py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <p className="sm:mb-8 leading-relaxed content-stretch p-4 sm:mx-8 text-justify text-base/loose">
            Introducing the Vaidya Vigyan Scholarships: A One Crore Opportunity
            for Aspiring Medical Students. These scholarships aim to ease
            financial burdens, enabling talented students to pursue medical
            careers without constraints.  Open to those with exceptional
            academic records and a passion for medical science. Benefits include
            coverage for tuition, labs, books, and accommodation. Applicants
            must meet eligibility criteria and submit required documents before
            the deadline. The scholarships recognize the potential of future
            medical leaders and aim to foster innovation in healthcare. This
            opportunity not only supports individual aspirations but also
            contributes to the growth of medical sciences in India. If you're
            dedicated to making a difference in medicine, consider applying.
            Your future in healthcare awaits!
          </p>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/4 w-5/6">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            height={380}
            width={600}
            src={About}
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;
