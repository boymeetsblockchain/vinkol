import { Button } from "../button"; // Assuming this is your custom Button component

export const ContactForm = () => {
  return (
    <section className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
      {/* Adjusted padding and shadow */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Leave us A Message
      </h1>
      {/* Styled heading */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
        {/* Responsive grid for inputs */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Name</h2>
          {/* Styled label */}
          <input
            type="text"
            className="w-full bg-gray-100 p-3 rounded-md placeholder:text-gray-500 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" // Enhanced input styling
            placeholder="Your Name"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Email</h2>{" "}
          {/* Styled label */}
          <input
            type="email"
            className="w-full bg-gray-100 p-3 rounded-md placeholder:text-gray-500 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" // Enhanced input styling
            placeholder="Your Email"
          />
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Address</h2>

        <input
          type="text"
          className="w-full bg-gray-100 p-3 rounded-md placeholder:text-gray-500 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" // Enhanced input styling
          placeholder="Your Address"
        />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Message</h2>
        {/* Styled label */}
        <textarea
          rows={5}
          className="w-full bg-gray-100 p-3 rounded-md placeholder:text-gray-500 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y" // Enhanced textarea styling and resize-y
          placeholder="Type your message here..."
        />
      </div>
      <div className="flex justify-end">
        <Button className="px-8 py-3 text-lg font-medium">Send Message</Button>
      </div>
    </section>
  );
};
