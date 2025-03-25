"use client";
import { useEffect, useState } from "react";
import { urlFor } from "@/lib/client";
import Image from "next/image";

// Define the types for gallery images
interface GalleryImage {
  galleryImg: any;
}

// Define the structure of the gallery data
interface GalleryData {
  title: string;
  galleryImage: GalleryImage[];
}

const apiHost = process.env.NEXT_PUBLIC_API_HOST;

function Gallery() {
  const [data, setData] = useState<GalleryData | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const query = encodeURIComponent(`*[ _type == "galleryPage"]`);
        const res = await fetch(`${apiHost}${query}`);
        const jsonData = await res.json();
        setData(jsonData.result[0] || null);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          {data?.title || "Gallery"}
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Explore our latest moments captured beautifully.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.galleryImage?.map((item, i) => (
          <div key={i} className="overflow-hidden rounded-xl shadow-lg">
            <Image
              src={urlFor(item.galleryImg).url()}
              alt="galleryItem"
              height={400}
              width={500}
              loading="lazy"
              className="w-full h-[250px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
