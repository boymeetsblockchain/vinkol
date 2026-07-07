"use client";

const teamsArray = [
  {
    name: "Emmanuel Ediale",
    position: "Founder & CEO",
    img: "/assets/coo.jpg",
    bio: "Emmanuel is a finance professional with over 9 years of experience spanning across the Banking, Insurance, Media, and Construction industries. He holds an MSc in International Business from the University of Sunderland, UK, and is a Certified International Trade Professional (CITP).\n\nWith a unique blend of practical experience and academic foundation, Emmanuel provides strategic financial insights and plays a key role in driving daily operational excellence.",
  },
  {
    name: "Francis Ediale",
    position: "Executive Director",
    img: "/assets/ed.jpg",
    bio: "Francis is a highly skilled Operations Manager with over 10 years of experience in maintaining organizational quality and safety standards. He holds a bachelor’s degree in Petroleum Engineering from the University of Benin, Nigeria and a Postgraduate Diploma in International Business Management from Seneca College, Canada.\n\nWith a strong background in leadership, process management, human resource management, and project management, Francis is adept at driving efficiency and achieving organizational objectives. He brings exceptional communication, interpersonal, and conflict resolution skills, consistently exceeding performance expectations and fostering a collaborative work environment.",
  },
  {
    name: "Vincent Ediale",
    position: "Chairman",
    img: "/assets/daddy.jpg",
    bio: "Vincent is a seasoned professional with over two decades of experience in the Oil & Gas, Construction, and International Trade business. A graduate of the prestigious University of Ibadan, he began his career upon graduation in the 1980’s with Julius Berger and later on contributed to the growth of Zenon Oil and Gas in Victoria Island, Lagos, Nigeria.\n\nThroughout the course of his career, Vincent has demonstrated a proven ability to build and scale successful businesses, leveraging his expertise to deliver sustainable growth and operational excellence.",
  },
];

export const Teams = () => {
  return (
    <section className="w-full py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-4">
          The people behind Vinkol
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-14">
          Meet our team.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamsArray.map((member) => (
            <div
              key={member.name}
              className="bg-[#F7F8FA] rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative h-[350px] w-full overflow-hidden bg-gray-100">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0e74d8&color=fff&size=256`;
                  }}
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-blue-primary)] mb-4">
                  {member.position}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

