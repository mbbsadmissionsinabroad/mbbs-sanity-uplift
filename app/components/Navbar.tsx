"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import * as Flags from "country-flag-icons/react/3x2";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
    icon: FaInstagram,
  },
  {
    title: "X",
    href: "https://x.com/_mbbsabroad",
    icon: FaXTwitter,
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/mbbsadmissionsinabroad",
    icon: FaFacebookF,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/new-lyf/",
    icon: FaLinkedinIn,
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@mbbsadmissionsinabroad",
    icon: FaYoutube,
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCountriesOpen, setMobileCountriesOpen] = useState(true);
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

                  <div className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
                    <div className="flex flex-col gap-1">
                      {mainNavLinks
                        .filter((link) => link.title !== "Home")
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
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.title}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                            <Icon className="h-4 w-4" />
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
        <div className="bg-blue-800 px-4 py-2 text-center text-xs font-semibold text-white">
          info@new-lyf.com
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
                  Nursing Jobs in Abroad
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
                  PG in Abroad
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
                .filter(
                  (link) =>
                    link.title !== "Home" &&
                    link.title !== "Nursing Jobs in Abroad" &&
                    link.title !== "PG in Abroad"
                )
                .map((link) => (
                  <NavLink key={link.href} link={link} />
                ))}
            </div>

            <div className="ml-auto hidden items-center gap-3 lg:flex">
              <div className="hidden items-center gap-2 px-3 py-1.5 xl:flex">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="whitespace-nowrap text-[11px] font-medium text-slate-700 xl:text-xs">
                  Connect with us
                </span>
              </div>
              <span className="whitespace-nowrap text-[11px] font-medium text-slate-700 xl:hidden">
                Connect with us
              </span>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.title}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.title}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-800"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
