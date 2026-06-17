"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import * as Flags from "country-flag-icons/react/3x2";

import logo from "../../public/new-lyf-logo.webp";
import {
  mainNavLinks,
  mbbsAbroadCountries,
  nursingJobCountries,
  pgAbroadCountries,
  type SiteLink,
} from "@/app/data/siteContent";

const socialLinks = [
  {
    title: "Instagram",
    href: "https://www.instagram.com/mbbsadmissionsinabroad/",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="130%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285aeB" />
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="5.4" fill="url(#instagram-gradient)" />
        <g transform="translate(4.8, 4.8) scale(0.6)">
          <path
            d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
            fill="white"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "X",
    href: "https://x.com/_mbbsabroad",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4.5" fill="black" />
        <g transform="translate(4.8, 4.8) scale(0.6)">
          <path
            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
            fill="white"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/mbbsadmissionsinabroad",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path
          d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/new-lyf/",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#0A66C2" />
        <path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@mbbsadmissionsinabroad",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
          fill="#FF0000"
        />
        <path d="M9.545 15.568V8.432L15.818 12z" fill="white" />
      </svg>
    ),
  },
];

function FlagIcon({ code }: { code: keyof typeof Flags }) {
  const Flag = Flags[code];
  if (!Flag) {
    return null;
  }

  return <Flag className="h-4 w-6 shrink-0 rounded-[2px] object-cover" title={code} />;
}

function NavLink({ link, onClick }: { link: SiteLink; onClick?: () => void }) {
  return (
    <Link
      href={link.href}
      prefetch={false}
      onClick={onClick}
      className="whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-800 xl:text-xs"
    >
      {link.title}
    </Link>
  );
}

function isPrimaryDesktopLink(link: SiteLink) {
  return (
    link.title !== "Home" &&
    link.title !== "Nursing Jobs Abroad" &&
    link.title !== "PG Abroad" &&
    link.title !== "Gallery" &&
    link.title !== "Contact"
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCountriesOpen, setMobileCountriesOpen] = useState(true);
  const [mobileNursingOpen, setMobileNursingOpen] = useState(false);
  const [mobilePgOpen, setMobilePgOpen] = useState(false);
  const [desktopCountriesOpen, setDesktopCountriesOpen] = useState(false);
  const [desktopNursingOpen, setDesktopNursingOpen] = useState(false);
  const [desktopPgOpen, setDesktopPgOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement | null>(null);
  const desktopNursingRef = useRef<HTMLDivElement | null>(null);
  const desktopPgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopCountriesOpen(false);
      }
      if (
        desktopNursingRef.current &&
        !desktopNursingRef.current.contains(event.target as Node)
      ) {
        setDesktopNursingOpen(false);
      }
      if (
        desktopPgRef.current &&
        !desktopPgRef.current.contains(event.target as Node)
      ) {
        setDesktopPgOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDesktopCountriesOpen(false);
        setDesktopNursingOpen(false);
        setDesktopPgOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <Transition.Root show={mobileOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-150 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto flex w-full max-w-sm flex-col overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)] shadow-2xl">
                <div className="bg-blue-800 px-4 py-3 text-center text-sm font-semibold text-white">
                  info@new-lyf.com
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-4">
                  <Link
                    href="/"
                    prefetch={false}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
                  >
                    <Image src={logo} alt="New Lyf logo" height={58} width={120} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-50"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-3 px-4 py-6">
                  <div className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                    <NavLink
                      link={{ title: "Home", href: "/" }}
                      onClick={() => setMobileOpen(false)}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileCountriesOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-[28px] border border-slate-200 bg-white px-4 py-4 text-left text-xs font-semibold text-slate-800 shadow-[0_14px_35px_rgba(15,23,42,0.06)]"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-blue-700">
                        Explore
                      </p>
                      <p className="mt-1">MBBS Abroad</p>
                    </div>
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform ${
                        mobileCountriesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileCountriesOpen && (
                    <div className="grid grid-cols-1 gap-2 rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                      {mbbsAbroadCountries.map((country) => (
                        <Link
                          key={country.href}
                          href={country.href}
                          prefetch={false}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-2xl border border-transparent bg-slate-50 px-3 py-3 text-xs font-medium text-slate-700 transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-800"
                        >
                          <FlagIcon code={country.flagCode as keyof typeof Flags} />
                          {country.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setMobileNursingOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-[28px] border border-slate-200 bg-white px-4 py-4 text-left text-xs font-semibold text-slate-800 shadow-[0_14px_35px_rgba(15,23,42,0.06)]"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-blue-700">
                        Explore
                      </p>
                      <p className="mt-1">Nursing Jobs Abroad</p>
                    </div>
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform ${
                        mobileNursingOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileNursingOpen && (
                    <div className="grid grid-cols-1 gap-2 rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                      {nursingJobCountries.map((country) => (
                        <Link
                          key={country.href}
                          href={country.href}
                          prefetch={false}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-2xl border border-transparent bg-slate-50 px-3 py-3 text-xs font-medium text-slate-700 transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-800"
                        >
                          <FlagIcon code={country.flagCode as keyof typeof Flags} />
                          {country.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setMobilePgOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-[28px] border border-slate-200 bg-white px-4 py-4 text-left text-xs font-semibold text-slate-800 shadow-[0_14px_35px_rgba(15,23,42,0.06)]"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-blue-700">
                        Explore
                      </p>
                      <p className="mt-1">PG Abroad</p>
                    </div>
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform ${
                        mobilePgOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobilePgOpen && (
                    <div className="grid grid-cols-1 gap-2 rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                      {pgAbroadCountries.map((country) => (
                        <Link
                          key={country.href}
                          href={country.href}
                          prefetch={false}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-2xl border border-transparent bg-slate-50 px-3 py-3 text-xs font-medium text-slate-700 transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-800"
                        >
                          <FlagIcon code={country.flagCode as keyof typeof Flags} />
                          {country.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                    <div className="flex flex-col gap-1">
                      {mainNavLinks
                        .filter(isPrimaryDesktopLink)
                        .map((link) => (
                          <NavLink
                            key={link.href}
                            link={link}
                            onClick={() => setMobileOpen(false)}
                          />
                        ))}
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                      {mainNavLinks
                        .filter((link) => link.title === "Gallery" || link.title === "Contact")
                        .map((link) => (
                          <NavLink
                            key={link.href}
                            link={link}
                            onClick={() => setMobileOpen(false)}
                          />
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-slate-200/80 px-4 py-5">
                  <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                      Connect With Us
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Follow the latest admission updates and student highlights.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {socialLinks.map((social) => {
                      return (
                        <a
                          key={social.title}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer external"
                          className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                          <span className="inline-flex h-8 w-8 items-center justify-center">
                            {social.renderIcon()}
                          </span>
                          {social.title}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="pointer-events-auto shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <div className="bg-blue-800 px-4 py-2 text-white">
          <div className="mx-auto hidden max-w-7xl items-center justify-between gap-4 lg:flex">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold">info@new-lyf.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/gallery"
                prefetch={false}
                className="text-xs font-semibold text-white transition hover:text-blue-100"
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                prefetch={false}
                className="text-xs font-semibold text-white transition hover:text-blue-100"
              >
                Contact
              </Link>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  return (
                    <a
                      key={social.title}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer external"
                      aria-label={social.title}
                      className="inline-flex h-7 w-7 items-center justify-center transition hover:scale-115 active:scale-95"
                    >
                      {social.renderIcon()}
                      <span className="sr-only">{social.title}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="text-center text-xs font-semibold lg:hidden">info@new-lyf.com</div>
        </div>

        <nav className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-[76px] max-w-7xl items-center gap-3 px-3 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-7 w-7" />
            </button>

            <Link
              href="/"
              prefetch={false}
              className="shrink-0 px-2.5 py-1.5 transition"
            >
              <span className="sr-only">New Lyf</span>
              <Image src={logo} alt="New Lyf logo" height={46} width={108} priority />
            </Link>

            <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:gap-1 lg:flex">
              <NavLink link={{ title: "Home", href: "/" }} />

              <div className="relative" ref={desktopNursingRef}>
                <button
                  type="button"
                  onClick={() => {
                    setDesktopNursingOpen((open) => !open);
                    setDesktopCountriesOpen(false);
                    setDesktopPgOpen(false);
                  }}
                  className={`flex items-center gap-1 whitespace-nowrap border-b-2 px-2 py-1.5 text-[11px] font-medium transition xl:text-xs ${
                    desktopNursingOpen
                      ? "border-blue-700 text-blue-800"
                      : "border-transparent text-slate-700 hover:border-blue-200 hover:text-blue-800"
                  }`}
                >
                  Nursing Jobs Abroad
                </button>

                {desktopNursingOpen && (
                  <div className="fixed inset-x-0 top-[108px] z-50 border-b border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-10">
                      {nursingJobCountries.map((country) => (
                        <Link
                          key={country.href}
                          href={country.href}
                          prefetch={false}
                          onClick={() => setDesktopNursingOpen(false)}
                          className="flex min-w-0 items-center gap-4 text-[15px] font-medium text-slate-800 transition hover:text-blue-800"
                        >
                          <FlagIcon code={country.flagCode as keyof typeof Flags} />
                          <span>{country.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={desktopPgRef}>
                <button
                  type="button"
                  onClick={() => {
                    setDesktopPgOpen((open) => !open);
                    setDesktopCountriesOpen(false);
                    setDesktopNursingOpen(false);
                  }}
                  className={`flex items-center gap-1 whitespace-nowrap border-b-2 px-2 py-1.5 text-[11px] font-medium transition xl:text-xs ${
                    desktopPgOpen
                      ? "border-blue-700 text-blue-800"
                      : "border-transparent text-slate-700 hover:border-blue-200 hover:text-blue-800"
                  }`}
                >
                  PG Abroad
                </button>

                {desktopPgOpen && (
                  <div className="fixed inset-x-0 top-[108px] z-50 border-b border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                    <div className="mx-auto flex max-w-7xl items-start justify-between gap-8 px-8 py-10">
                      {pgAbroadCountries.map((country) => (
                        <Link
                          key={country.href}
                          href={country.href}
                          prefetch={false}
                          onClick={() => setDesktopPgOpen(false)}
                          className="flex min-w-0 max-w-[30%] items-start gap-4 text-[15px] font-medium text-slate-800 transition hover:text-blue-800"
                        >
                          <FlagIcon code={country.flagCode as keyof typeof Flags} />
                          <span>{country.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={desktopDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setDesktopCountriesOpen((open) => !open);
                    setDesktopNursingOpen(false);
                    setDesktopPgOpen(false);
                  }}
                  className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-medium transition xl:text-xs ${
                    desktopCountriesOpen
                      ? "bg-blue-50 text-blue-800"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-800"
                  }`}
                >
                  MBBS Abroad
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${
                      desktopCountriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {desktopCountriesOpen && (
                  <div className="fixed left-1/2 top-[142px] z-50 flex max-h-[calc(100vh-158px)] w-[min(96vw,1540px)] -translate-x-1/2 flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4 shadow-[0_24px_90px_rgba(15,23,42,0.18)] sm:px-5 sm:py-5 lg:px-6 lg:py-6">
                    <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
                          MBBS Abroad
                        </p>
                        <h2 className="text-lg font-semibold text-slate-900">
                          Choose your study destination
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDesktopCountriesOpen(false)}
                        className="rounded-full px-3 py-1 text-sm font-medium text-slate-500 hover:bg-slate-100"
                      >
                        Close
                      </button>
                    </div>
                    <div className="mb-5 shrink-0 rounded-[24px] border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-600">
                      Browse our core MBBS abroad pages, student resources, and contact options without searching through the whole site.
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 2xl:grid-cols-5">
                        {mbbsAbroadCountries.map((country) => (
                          <Link
                            key={country.href}
                            href={country.href}
                            prefetch={false}
                            onClick={() => setDesktopCountriesOpen(false)}
                            className="flex min-h-[56px] items-center gap-3 rounded-2xl border border-transparent px-3 py-3 transition hover:border-blue-100 hover:bg-white hover:text-blue-800"
                          >
                            <FlagIcon code={country.flagCode as keyof typeof Flags} />
                            <span className="text-xs font-medium leading-5 text-slate-800">
                              {country.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {mainNavLinks
                .filter(isPrimaryDesktopLink)
                .map((link) => (
                  <NavLink key={link.href} link={link} />
                ))}
            </div>

          </div>
        </nav>
      </header>
    </div>
  );
}
