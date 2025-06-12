/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function Example() {
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    studentMobileNumber: "",
    dob: "",
    fatherMobileNumber: "",
    motherMobileNumber: "",
    percentage: "",
    doctorName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    transactionId: "",
    upi: "",
  });

  const notifySuccess = () =>
    toast.success("Thanks for contacting us, will respond to this ASAP!");

  const notifyFailure = () =>
    toast.error(
      "Sorry, there might be issue with server, Please try in sometime."
    );
  const handleBack = (e) => {
    e.preventDefault();
    setIndex(0);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (index === 0) {
      setIndex(1);
    } else {
      setIsLoading(true);
      const data = [
        {
          Attribute: "Student First Name",
          Value: formData.firstName,
        },
        {
          Attribute: "Student Last Name",
          Value: formData.lastName,
        },
        {
          Attribute: "Father's Name",
          Value: formData.fatherName,
        },
        {
          Attribute: "Mother's Name",
          Value: formData.motherName,
        },
        {
          Attribute: "Student Mobile Number",
          Value: formData.studentMobileNumber,
        },
        {
          Attribute: "DOB",
          Value: formData.dob,
        },
        {
          Attribute: "Father's Mobile Number",
          Value: formData.fatherMobileNumber,
        },
        {
          Attribute: "Mother's Mobile Number",
          Value: formData.motherMobileNumber,
        },
        {
          Attribute: "10th Marks",
          Value: formData.percentage,
        },
        {
          Attribute: "Preferred Doctor",
          Value: formData.doctorName,
        },
        {
          Attribute: "Email",
          Value: formData.email,
        },
        {
          Attribute: "Address",
          Value: formData.address,
        },
        {
          Attribute: "City",
          Value: formData.city,
        },
        {
          Attribute: "State",
          Value: formData.state,
        },
        {
          Attribute: "Postal Code",
          Value: formData.postalCode,
        },
        {
          Attribute: "UPI",
          Value: formData.upi,
        },
        {
          Attribute: "Transaction ID",
          Value: formData.transactionId,
        },
      ];

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch("https://admission-backend.vercel.app/send-email", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            firstName: "",
            lastName: "",
            fatherName: "",
            motherName: "",
            studentMobileNumber: "",
            dob: "",
            fatherMobileNumber: "",
            motherMobileNumber: "",
            percentage: "",
            doctorName: "",
            email: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            upi: "",
            transactionId: "",
          });
          setIndex(0);
          notifySuccess();
          setIsLoading(false);
        })
        .catch((err) => {
          setIndex(0);
          notifyFailure();
          setIsLoading(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="space-y-12 sm:px-32 py-10 px-8">
        <section className="text-gray-600 body-font sm:mt-30">
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-4xl text-3xl font-bold title-font text-gray-900">
              PLEASE FILL THIS <span className="text-red-600">FORM</span>
            </h1>
            {/* <p className="lg:w-2/3 mx-auto font-semibold leading-relaxed text-base text-gray-500">
              TAKE YOUR FIRST STEP TOWARDS A BRIGHT FUTURE
            </p> */}
          </div>
        </section>
        {index === 0 ? (
          <>
            <div className="border-b border-gray-900/10 pb-12"></div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              {/* <p className="mt-1 text-sm leading-6 text-gray-600">
    Use a permanent address where you can receive mail.
  </p> */}

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required={true}
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      required={true}
                      value={formData.lastName}
                      onChange={handleChange}
                      id="lastName"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="fatherName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Father's Name *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required={true}
                      name="fatherName"
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="motherName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mother's name *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required={true}
                      name="motherName"
                      id="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="studentMobileNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Student Mobile Number *
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      required={true}
                      name="studentMobileNumber"
                      id="studentMobileNumber"
                      value={formData.studentMobileNumber}
                      onChange={handleChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date of Birth *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required={true}
                      name="dob"
                      id="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      placeholder="DD/MM/YYYY"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="fatherMobileNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Father's Mobile Number *
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      required={true}
                      name="fatherMobileNumber"
                      id="fatherMobileNumber"
                      value={formData.fatherMobileNumber}
                      onChange={handleChange}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="motherMobileNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mother's Mobile Number *
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      required={true}
                      name="motherMobileNumber"
                      id="motherMobileNumber"
                      value={formData.motherMobileNumber}
                      onChange={handleChange}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="percentage"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    10th class/ Grade / Percentage *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required={true}
                      name="percentage"
                      id="percentage"
                      value={formData.percentage}
                      onChange={handleChange}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="doctorName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Education Counsellor Name *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="doctorName"
                      required={true}
                      id="doctorName"
                      value={formData.doctorName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address *
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      required={true}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Complete address *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="address"
                      required={true}
                      value={formData.address}
                      onChange={handleChange}
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required={true}
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province *
                  </label>
                  <div className="mt-2">
                    <input
                      required={true}
                      type="text"
                      name="state"
                      id="state"
                      value={formData.state}
                      onChange={handleChange}
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postalCode"
                      required={true}
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <section className="text-gray-600 body-font relative">
              <div className="px-5 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1/2 rounded-lg overflow-hidden sm:mr-10 sm:p-10 flex items-end justify-start relative">
                  <Image src={"/assests/upi.png"} height={800} width={600} />
                </div>
                <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                  <h2 className="text-blue-900 text-lg mb-1 font-bold title-font sm:mt-20">
                    PLEASE ENTER PAYMENT DETAILS
                  </h2>
                  <p className="leading-relaxed mb-5 text-gray-600">
                    Please do payment of Rs. 250 using this QR code and enter
                    Transaction Id and UPI ID from which payment is made. If
                    anything goes wrong please write us at{" "}
                    <span className="text-black font-semibold">
                      mbbsadmissionsinabroad@gmail.com
                    </span>
                  </p>
                  <div className="relative mb-4">
                    <label
                      for="transactionId"
                      className="leading-7 text-sm text-black font-semibold"
                    >
                      Transaction Id *
                    </label>
                    <input
                      type="text"
                      id="transactionId"
                      required={true}
                      value={formData.transactionId}
                      onChange={handleChange}
                      name="transactionId"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label
                      for="upi"
                      className="leading-7 text-sm text-black font-semibold"
                    >
                      UPI ID (From which payment is made) *
                    </label>
                    <input
                      type="text"
                      id="upi"
                      required={true}
                      value={formData.upi}
                      onChange={handleChange}
                      name="upi"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Entering wrong details in this section will lead to
                    rejection of this form, so please enter these two field
                    carefully
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-x-6 sm:p-20 p-10">
        {index === 0 ? (
          <p className="font-semibold">* Pay Rs. 250</p>
        ) : (
          <button
            onClick={handleBack}
            disabled={index === 0 || isLoading ? true : false}
            className="rounded-md bg-gray-600 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:px-20 px-2"
          >
            BACK
          </button>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-indigo-600 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:px-20 px-2"
        >
          {isLoading ? (
            <div className="mx-10">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : index === 0 ? (
            "NEXT PAGE"
          ) : (
            "SUBMIT"
          )}
        </button>
      </div>
    </form>
  );
}
