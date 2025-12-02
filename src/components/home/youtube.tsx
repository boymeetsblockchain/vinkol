import React from "react";

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
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        YouTube Videos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                {video.title}
              </h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className={`w-full ${
                    video.isShort ? "h-[400px]" : "h-[405px]"
                  }`}
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={`YouTube ${video.isShort ? "Short" : "Video"}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Youtube;
