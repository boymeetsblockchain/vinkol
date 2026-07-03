import React from "react";
import { Youtube as YoutubeIcon, ExternalLink } from "lucide-react";

export const Youtube = () => {
  // Video data with extracted IDs
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

  return (
    <section className="bg-[#F9FAFB] w-full py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">
              Our Journey
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Watch our latest<br className="hidden md:block" /> updates.
            </h2>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-[0_20px_60px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Video Player Container */}
              <div className="relative w-full h-[350px] md:h-[450px] bg-black overflow-hidden shrink-0">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                  title={`YouTube ${video.isShort ? "Short" : "Video"}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Info Section */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug group-hover:text-[var(--color-blue-primary)] transition-colors">
                    {video.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <YoutubeIcon size={20} />
                  </div>
                </div>
                
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-[var(--color-blue-primary)] font-semibold text-sm hover:text-blue-700 transition-colors"
                >
                  Watch on YouTube
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Youtube;
