"use client";

import React, { useMemo, useState } from "react";
import { Tabs, Tab } from "./TabComponent";

export interface LocationData {
  address: string;
  phone: string;
  mapUrl: string;
}

interface CountryData {
  alpha2Code: string;
  country: string;
  states: string[];
}

const courseCountryMapping: Record<string, string[]> = {
  "MBBS Abroad": [
    "Germany",
    "Malaysia",
    "Philippines",
    "Kazakhstan",
    "Georgia",
    "USA",
    "Others",
  ],
  "PG Medical": ["Germany"],
  "Nursing Jobs": ["Germany", "Netherlands", "Denmark", "Lithuania", "Canada"],
};

const defaultLocation: LocationData = {
  address: "Address unavailable",
  phone: "N/A",
  mapUrl: "",
};

export default function ContactPageClient({
  initialLocations,
}: {
  initialLocations: Record<string, LocationData>;
}) {
  const locationNames = useMemo(
    () => Object.keys(initialLocations),
    [initialLocations]
  );
  const firstLocationName = locationNames[0];

  const [currentLocationName, setCurrentLocationName] = useState(
    firstLocationName || ""
  );
  const [states, setStates] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [countryList, setCountryList] = useState<CountryData[] | null>(null);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    studyCountry: "",
    residentCountry: "",
    state: "",
  });

  const currentLocation =
    initialLocations[currentLocationName] ||
    initialLocations[firstLocationName] ||
    defaultLocation;

  const API_URL = process.env.NEXT_PUBLIC_LEAD_URL ?? "https://default-api.com";
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_LEAD_SECRET_KEY;

  const ensureCountryList = async () => {
    if (countryList || isLoadingCountries) {
      return countryList;
    }

    setIsLoadingCountries(true);

    try {
      const module = await import("../utilities/countriesAndStates.json");
      const loadedCountries = (module.default || []) as CountryData[];
      setCountryList(loadedCountries);
      return loadedCountries;
    } finally {
      setIsLoadingCountries(false);
    }
  };

  const handleCountryFocus = async () => {
    await ensureCountryList();
  };

  const handleCountryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const country = e.target.value;
    const countries = (await ensureCountryList()) || [];

    setFormData((current) => ({
      ...current,
      residentCountry: country,
      state: "",
    }));

    const countryData = countries.find((item) => item.country === country);
    setStates(countryData ? countryData.states : []);
  };

  const handleLocationChange = (location: string) => {
    setCurrentLocationName(location);
  };

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const course = event.target.value;
    setSelectedCourse(course);
    setFormData((current) => ({
      ...current,
      course,
      studyCountry: "",
    }));
    setAvailableCountries(courseCountryMapping[course] || []);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData = {
      fields: {
        Name: formData.name,
        Phone: formData.phone,
        Email: formData.email,
        Course: formData.course,
        StudyCountry: formData.studyCountry,
        ResidentCountry: formData.residentCountry,
        State: formData.state,
      },
      actions: [
        {
          type: "SYSTEM_NOTE",
          text: "Lead Source: Contact Page",
        },
      ],
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(requestData),
      });

      const response2 = await fetch(
        "https://admission-backend.vercel.app/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok && response2.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div>
      <section className="relative text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap px-5 py-24 md:flex-nowrap">
          <div className="flex w-full flex-col md:w-2/3">
            {locationNames.length > 0 ? (
              <Tabs>
                {locationNames.map((label) => (
                  <Tab
                    key={label}
                    label={label}
                    onClick={() => handleLocationChange(label)}
                  />
                ))}
              </Tabs>
            ) : null}

            <div className="relative flex h-96 items-end justify-start overflow-hidden rounded-lg bg-gray-300 p-10 sm:mr-10 md:h-[600px]">
              {currentLocation.mapUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  className="absolute inset-0 h-full w-full"
                  title="map"
                  src={currentLocation.mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
                />
              ) : (
                <div className="h-full w-full bg-gray-300" />
              )}

              <div className="relative flex flex-wrap rounded bg-white py-6 shadow-md">
                <div className="px-6 lg:w-1/2">
                  <p className="title-font text-xs font-semibold tracking-widest text-gray-900">
                    ADDRESS
                  </p>
                  <p className="mt-1">{currentLocation.address}</p>
                </div>
                <div className="mt-4 px-6 lg:mt-0 lg:w-1/2">
                  <p className="title-font text-xs font-semibold tracking-widest text-gray-900">
                    PHONE
                  </p>
                  <p className="leading-relaxed">{currentLocation.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col bg-white md:ml-auto md:mt-0 md:w-1/3 md:py-8">
            <h1 className="title-font mb-1 text-4xl font-semibold text-blue-800">
              Contact New-Lyf
            </h1>
            <h2 className="mb-3 text-2xl font-semibold text-slate-900">
              Reach our study abroad support team
            </h2>
            <p className="mb-5 leading-relaxed text-gray-600">
              Use this page when you want direct guidance on MBBS abroad,
              medical PG pathways, nursing jobs, or German-language and
              Ausbildung planning. Our team uses the details you share here to
              understand your preferred course, country interest, current
              location, and the kind of support you need next.
            </p>
            <p className="mb-5 leading-relaxed text-gray-600">
              Once you submit the form, our counsellors can respond with a more
              relevant conversation instead of a generic sales call. That means
              clearer country suggestions, more realistic budget direction,
              document guidance, and practical next steps based on your
              background rather than guesswork.
            </p>
            <p className="mb-5 leading-relaxed text-gray-600">
              Please provide your details below so we can route your enquiry to
              the right admission or support specialist:
            </p>
            <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                A better enquiry gives you a better reply
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                Try to share the path you are exploring, the country you are
                thinking about, and your present study or work stage. That
                helps our team move faster and respond with more relevant next
                steps instead of general advice.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-600">
                <li>Tell us whether you want MBBS abroad, PG abroad, or nursing jobs guidance.</li>
                <li>Tell us which country or countries you are comparing right now.</li>
                <li>Tell us where you are based so we can route support more clearly.</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  required
                />
              </div>

              <div className="relative mb-4">
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  required
                />
              </div>

              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  required
                />
              </div>

              <div className="mb-4 flex space-x-4">
                <div className="w-full">
                  <label htmlFor="course" className="leading-7 text-sm text-gray-600">
                    Course / Job Interested
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleCourseChange}
                    className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                  >
                    <option value="">--Select a Course --</option>
                    {Object.keys(courseCountryMapping).map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="studyCountry"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Study / Job Country
                  </label>
                  <select
                    id="studyCountry"
                    name="studyCountry"
                    value={formData.studyCountry}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                    disabled={!selectedCourse}
                  >
                    <option value="">--Select a Country to study --</option>
                    {availableCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4 flex space-x-4">
                <div className="w-full">
                  <label
                    htmlFor="residentCountry"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Resident Country
                  </label>
                  <select
                    id="residentCountry"
                    name="residentCountry"
                    value={formData.residentCountry}
                    onFocus={handleCountryFocus}
                    onChange={handleCountryChange}
                    className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                  >
                    <option value="">
                      {isLoadingCountries
                        ? "Loading countries..."
                        : "--Select a Country--"}
                    </option>
                    {(countryList || []).map((country) => (
                      <option key={country.alpha2Code} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                    State / Province
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                    disabled={!formData.residentCountry}
                  >
                    <option value="">--Select a State--</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 rounded border-0 bg-blue-800 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
              >
                Submit
              </button>
            </form>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                What happens after you contact us
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Most enquiries move through a simple support flow. First, we
                review your submitted details. Next, we connect you with a team
                member who handles the relevant pathway, whether that is MBBS
                abroad, nursing jobs, PG planning, or German training. After
                that, you can discuss eligibility, timing, budget, documents,
                and the most suitable country options with more confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
