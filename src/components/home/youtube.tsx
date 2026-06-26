"use client";
import React from "react";
import { motion } from "framer-motion";
import { AnimateIn, staggerContainer, fadeUp } from "../shared/animate-in";

const videos = [
  {
    id: "zhWlkUiUVTI",
    isShort: false,
    title: "Vinkol all the way",
    url: "https://youtu.be/zhWlkUiUVTI?si=k33I1Hu_kbHogv3z",
  },
  {
    id: "34eLXb01aPs",
    isShort: true,
    title: "Short Video",
    url: "https://youtube.com/shorts/34eLXb01aPs?si=GgsqpaKt7qkRQ00G",
  },
  {
    id: "ypDiiiEWGTM",
    isShort: true,
    title: "A Year of Growth",
    url: "https://youtube.com/shorts/ypDiiiEWGTM?si=WRQQ4dI9EYC4mLMX",
  },
];

export const Youtube = () => {
  return (
    <section className="w-full bg-neutral-50 py-16">
      <div className="max-w-screen-2xl mx-auto px-10">
        <AnimateIn className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-5xl font-bold text-black">
            See Vinkol in Action
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-500 font-medium">
            Real deliveries, real riders, real results.
          </p>
        </AnimateIn>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform hover:scale-[1.02]"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  {video.title}
                </h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className={`w-full ${video.isShort ? "h-[400px]" : "h-[405px]"}`}
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={`YouTube ${video.isShort ? "Short" : "Video"}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-blue-600 hover:text-blue-800 text-sm"
                >
                  Watch on YouTube
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Youtube;
