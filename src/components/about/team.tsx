"use client";
const teamsArray = [
  {
    name: "Emmanuel Ediale",
    position: "CEO & COO",
    img: "/assets/coo.jpg",
    info: `Emmanuel is an accomplished finance professional with over nine years of experience across diverse industries, including Banking, Insurance, Media, and Construction. He holds a master’s degree in International Business from the University of Sunderland, UK, a postgraduate diploma with honors in Business Management from Algonquin College, Canada, and a bachelor’s degree in Insurance. Emmanuel is also a Certified International Trade Professional (CITP) in Canada. In addition to his academic qualifications, he is an Associate of the Chartered Insurance Institute of Nigeria and a Chartered Financial Forecasting, Budgeting, and Modelling Professional (CFBM). He is also a Certified Management Consultant, among several other industry-recognized certifications. Leveraging his broad industry expertise and solid academic foundation, Emmanuel provides strategic financial insights and plays a key role in driving daily operational excellence.`,
  },
  {
    name: "Francis Ediale",
    position: "Executive Director",
    img: "/assets/ed.jpg",
    info: `Francis is a highly skilled operations manager with over 10 years of experience in maintaining organizational quality and safety standards. He holds a Bachelor’s degree in petroleum engineering from the University of Benin, Nigeria, and a Postgraduate diploma in International Business Management from Seneca College, Canada. With a strong leadership, human resources, and project management background, Francis is adept at driving efficiency and achieving organizational objectives. He brings exceptional communication, interpersonal, and conflict resolution skills, consistently exceeding performance expectations and fostering a collaborative work environment..`,
  },
  {
    name: "Vincent Ediale",
    position: "Chairman",
    img: "/assets/daddy.jpg",
    info: `Vincent  is a seasoned professional with over two decades of experience in the Oil & Gas, Construction, and International Trade sectors A graduate of the prestigious University of Ibadan, he began his career in the 1980s with Julius Berger and later contributed to the growth of Zenon Oil and Gas in Victoria Island, Lagos, Nigeria. Throughout his career, Vincent has demonstrated a proven ability to build and scale successful businesses, leveraging his expertise to deliver sustainable growth and operational excellence.`,
  },
];

export const Teams = () => {
  return (
    <section className="max-w-screen-xs mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-center my-8 text-3xl font-extrabold text-gray-900">
        Our Team
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamsArray.map((teamMember) => (
          <div
            key={teamMember.name}
            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-full"
          >
            <div className="relative h-60 lg:h-120 w-full overflow-hidden rounded-t-xl">
              {" "}
              {/* Fixed height and overflow-hidden for image */}
              <img
                className="absolute inset-0 w-full h-full object-contain "
                src={teamMember.img}
                alt={teamMember.name}
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/400x240/CCCCCC/333333?text=${
                    teamMember.name.split(" ")[0]
                  }`;
                }} // Placeholder on error
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-blue-600 mb-1 text-center">
                {teamMember.name}
              </h2>
              <p className="text-sm text-gray-600 text-center mb-3">
                {teamMember.position}
              </p>
              <p className="text-sm text-gray-700 text-left whitespace-pre-line">
                {teamMember.info}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
