import Image from "next/image";
import React from "react";
import { urlFor } from "@/lib/client";
import TextSerializer from "./TextSerializers";
import Modal from "./Modal";
import TOC from "./TOC";

const BlogDetailsPage = (props: any) => {
  return (
    <div>
      <section className="text-white body-font bg-blue-800 bg-gradient-to-r">
        <div className="container py-12 mx-auto">
          <h1 className="text-4xl font-large font-extrabold title-font text-center text-white">
            {props?.blogDetailsContent?.data?.metaKeywords}
          </h1>
        </div>
      </section>
      <div className="container py-8 mx-auto w-full items-center justify-center text-justify sm:p-40">
        <Image
          src={urlFor(props?.blogDetailsContent?.data.bannerImage)
            .format("webp")
            .url()}
          className=" h-auto max-w-full object-cover"
          width={1350}
          height={700}
          alt={props?.blogDetailsContent?.data?.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1350px"
          // priority
          loading="lazy" // Lazy load everything except first image
        />

        <div className="tocContainer">
          {props?.blogDetailsContent?.data && <TOC />}
        </div>
        <TextSerializer
          data={props?.blogDetailsContent?.data?.pageContent}
          className="serializerTitle mt-4"
        />
      </div>
      <Modal />
    </div>
  );
};

export default BlogDetailsPage;
