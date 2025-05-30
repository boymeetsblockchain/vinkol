const teamsArray = [
  {
    name: "Emmanuel Ediale",
    position: "CEO & COO",
    img: "/assets/coo.png",
  },
  {
    name: "Francis Ediale",
    position: "Executive Director",
    img: "/assets/ed.png",
  },
  {
    name: "Vincent Ediale",
    position: "Chairman",
    img: "/assets/daddy.png",
  },
];

export const Teams = () => {
  return (
    <section className="max-w-screen-lg mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-center my-8 text-3xl font-extrabold text-gray-900">
        Our Team
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamsArray.map((teamMember) => (
          <div
            key={teamMember.name}
            className="bg-white shadow-lg rounded-xl h-[306px   ] overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative h-[75%] w-full">
              <img
                className="absolute inset-0 w-full h-full object-cont"
                src={teamMember.img}
                alt={teamMember.name}
              />
            </div>
            <div className="p-5 text-center">
              <h2 className="text-xl font-bold text-blue-600 mb-2">
                {teamMember.name}
              </h2>
              <p className="text-sm text-gray-600">{teamMember.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
