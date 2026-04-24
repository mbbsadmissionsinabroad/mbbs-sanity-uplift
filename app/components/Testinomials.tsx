"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { studentTestimonials } from "@/app/data/siteContent";

export default function Testinomials() {
  return (
    <section className="bg-white text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Student Stories
            </p>
            <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              What our students say
            </h3>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            A cleaner page structure makes it easier to compare countries, read
            the guidance, and move to the enquiry form when you are ready.
          </p>
        </div>
      </div>

      <Carousel
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        plugins={[
          Autoplay({
            delay: 2800,
          }),
        ]}
      >
        <CarouselContent className="-ml-4">
          {studentTestimonials.map((review, index) => (
            <CarouselItem
              className="pl-4 md:basis-1/2 xl:basis-1/3"
              key={index}
            >
              <div className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {review.name}
                  </h3>
                  <p className="text-sm text-blue-700">{review.university}</p>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {review.quote}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 top-1/2 hidden -translate-y-1/2 lg:flex" />
        <CarouselNext className="right-2 top-1/2 hidden -translate-y-1/2 lg:flex" />
      </Carousel>
    </section>
  );
}
