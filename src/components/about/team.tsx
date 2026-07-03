"use client";

const teamsArray = [
  {
    name: "Emmanuel Ediale",
    position: "Founder & CEO",
    img: "/assets/coo.jpg",
    bio: "Finance professional with 9+ years across Banking, Insurance, Media, and Construction. Holds an MSc in International Business (University of Sunderland, UK) and is a Certified International Trade Professional (CITP). He drives Vinkol's strategic direction and daily operational excellence.",
  },
  {
    name: "Francis Ediale",
    position: "Executive Director",
    img: "/assets/ed.jpg",
    bio: "Operations manager with 10+ years experience maintaining quality and safety standards. Holds a degree in Petroleum Engineering (University of Benin) and a Postgraduate Diploma in International Business Management (Seneca College, Canada). Francis leads efficiency and people operations.",
  },
  {
    name: "Vincent Ediale",
    position: "Chairman",
    img: "/assets/daddy.jpg",
    bio: "Seasoned professional with 20+ years across Oil & Gas, Construction, and International Trade. A University of Ibadan graduate who began his career with Julius Berger and later contributed to Zenon Oil and Gas, Lagos. Vincent provides strategic oversight and governance.",
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
              <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
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
                <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
