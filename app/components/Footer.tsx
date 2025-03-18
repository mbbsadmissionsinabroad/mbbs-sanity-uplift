import Link from "next/link";
import React from "react";

const Footer = ({ navBarData }: any) => {
  const footerObject = navBarData.find((obj: any) => obj.title === "Footer");
  const sectionSize = Math.ceil(footerObject.navItems.length / 4);

  const section1 = footerObject.navItems.slice(0, sectionSize);
  const section2 = footerObject.navItems.slice(sectionSize, sectionSize * 2);
  const section3 = footerObject.navItems.slice(
    sectionSize * 2,
    sectionSize * 3
  );
  const section4 = footerObject.navItems.slice(sectionSize * 3);

  return (
    <div>
      <footer className="text-gray-600 body-font bg-gray-100">
        <div className="flex flex-col text-center w-full">
          <p className="sm:text-3xl text-2xl font-bold title-font mt-4 text-blue-800">
            Quick Links that might help
          </p>
        </div>
        <div className="px-5 p-12 mx-auto flex md:items-start md:flex-row flex-wrap flex-col gap-8">
          <div className="flex-grow flex flex-wrap -mb-10 md:text-left text-center order-first">
            {[section1, section2, section3, section4].map((section, i) => (
              <div key={i} className="lg:w-1/5 md:w-1/5 w-full px-4">
                {section.map((obj: any, index: any) => (
                  <nav className="list-none mb-4" key={index}>
                    <Link
                      href={obj.slug}
                      className="text-gray-600 hover:text-gray-800 font-semibold"
                      prefetch={false}
                    >
                      * {obj.title}
                    </Link>
                  </nav>
                ))}
              </div>
            ))}
            {/* New Column for Buttons */}
            <div className="lg:w-1/5 md:w-1/5 w-full px-4 md:block">
              <Link href="/blog">
                <button className="w-full mb-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 mt-10">
                  BLOG
                </button>
              </Link>
              <Link href="/ausbildung">
                <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 mt-10">
                  AUSBILDUNG
                </button>
              </Link>
              <Link href="/gallary">
                <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 mt-10">
                  GALLARY
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Special design for small screens */}
        {/* <div className="md:hidden flex flex-col items-center gap-4 p-6">
          <p className="text-lg font-bold text-blue-800">Explore More</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="w-full mb-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 mt-10">
              BLOG
            </button>
            <button className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 mt-10">
              AUSBILDUNG
            </button>
            <button className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 mt-10">
              GALLARY
            </button>
          </div>
        </div> */}
        <div className="bg-gray-200">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-900 text-sm text-center sm:text-left">
              © 2024 New-Lyf —
              <a
                href="https://twitter.com/_mbbsabroad"
                rel="noopener noreferrer"
                className="text-gray-900 ml-1"
                target="_blank"
              >
                @mbbsadmissionsinabroad
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
