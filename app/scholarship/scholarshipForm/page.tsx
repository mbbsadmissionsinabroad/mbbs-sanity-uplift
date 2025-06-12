'use client';

import Image from "next/image";
import Vaidya from "../assets/Vaidya.png";
import Logo from "../assets/Logo.png";
import ScholarshipForm from "../../components/ScholarshipComponents/ScholarshipForm";

const ScholarshipFormPage = (): JSX.Element => {
  return (
    <div>
      <div className="relative">
        <Image
          src={Vaidya}
          height={500}
          alt="Vaidya Image"
          className="md:w-1/4 w-5/6 h-5/6"
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
                VAIDYA VIGYAN SCHOLARSHIP FORM
              </p>
            </div>
          </div>
        </div>
      </div>
      <ScholarshipForm />
    </div>
  );
};

export default ScholarshipFormPage;
