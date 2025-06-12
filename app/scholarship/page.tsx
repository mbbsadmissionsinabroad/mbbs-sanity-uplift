// import React from "react";
// import Vaidya from "./assets/vaidya-new.png";
// import Image from "next/image";
// import Logo from "./assets/Logo.png";
// import Intro from "../components/ScholarshipComponents/Intro";
// import ScholarshipUniversities from "../components/ScholarshipComponents/ScholarshipUniversities";
// import Enroll from "../components/ScholarshipComponents/Enroll";
// import Benifits from "../components/ScholarshipComponents/Benifits";
// import Accrodin from "../components/ScholarshipComponents/Accrodin";
// import Link from "next/link";

// const index = () => {
//   return (
//     // <>
//     //   <div classNameName="relative">
//     //     <Image
//     //       src={Vaidya}
//     //       height={isDesktopOrTablet ? 500 : 400} // Increased height for tablet/desktop
//     //       classNameName="md:w-1/4 w-5/6 h-5/6"
//     //       alt="Vaidya Image"
//     //     />
//     //     {/* <div classNameName="absolute inset-0 flex items-center justify-center">
//     //       <div className="text-center">
//     //         <div className="flex items-center justify-center md:mt-28">
//     //           <Image
//     //             src={Logo}
//     //             height={50} // Increased height for tablet/desktop
//     //             width={50} // Increased height for tablet/desktop
//     //             alt="Logo"
//     //             className="mr-2 md:w-12 opacity-90"
//     //           />
//     //           <p className=" text-xl md:text-4xl font-bold text-gray-200 ml-4 opacity-80">
//     //             THE VAIDYA VIGYAN SCHOLARSHIP
//     //           </p>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div> */}
//     //   </div>
//     //   <Intro />
//     //   <ScholarshipUniversities />
//     //   <Benifits />
//     //   <Enroll />
//     //   <Accrodin />
//     // </>
//     <>
//       <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
//         <div className="text-center">
//           <p className="text-base font-semibold text-indigo-600">404</p>
//           <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//             Page not found
//           </h1>
//           <p className="mt-6 text-base leading-7 text-gray-600">
//             Sorry, we couldn’t find the page you’re looking for.
//           </p>
//           <div className="mt-10 flex items-center justify-center gap-x-6">
//             <Link
//               href="/"
//               className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Go back home
//             </Link>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default index;


'use client';

import Image from "next/image";
import Link from "next/link";
import Vaidya from "./assets/vaidya-new.png";
import Logo from "./assets/Logo.png";
import Intro from "../components/ScholarshipComponents/Intro";
import ScholarshipUniversities from "../components/ScholarshipComponents/ScholarshipUniversities";
import Enroll from "../components/ScholarshipComponents/Enroll";
import Benifits from "../components/ScholarshipComponents/Benifits";
import Accrodin from "../components/ScholarshipComponents/Accrodin";

const ScholarshipPage = (): JSX.Element => {
  return (
    <>
      {/* Uncomment and use this section if you want to display the image section */}
      {/* 
      <div className="relative">
        <Image
          src={Vaidya}
          height={500}
          className="md:w-1/4 w-5/6 h-5/6"
          alt="Vaidya Image"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center md:mt-28">
              <Image
                src={Logo}
                height={50}
                width={50}
                alt="Logo"
                className="mr-2 md:w-12 opacity-90"
              />
              <p className="text-xl md:text-4xl font-bold text-gray-200 ml-4 opacity-80">
                THE VAIDYA VIGYAN SCHOLARSHIP
              </p>
            </div>
          </div>
        </div>
      </div> 
      */}

      {/* Actual content */}
      <Intro />
      <ScholarshipUniversities />
      <Benifits />
      <Enroll />
      <Accrodin />

      {/* 404 fallback content if you want it for conditional rendering */}
      {/* 
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
      */}
    </>
  );
};

export default ScholarshipPage;
