import { Mail, MessageSquareText, Phone } from "lucide-react";
import React from "react";
const helpData = [
  {
    id: 1,
    name: "Chat",
    desc: "DM with a plant care expert",
    icon: <MessageSquareText size={40} />,
  },
  {
    id: 2,
    name: "Call",
    desc: "Speak live to plant care expert",
    icon: <Phone size={40}/>,
  },
  {
    id: 3,
    name: "Email",
    desc: "Send a note to our Support",
    icon: <Mail size={40}/>,
  },
];

const Help = () => {
  return (
    <div className="bg-secondaryBG py-10 lg:py-20 ">
      <div className="custom-container flex flex-col lg:flex-row items-center gap-5">
        <div className="w-full lg:w-2/6 px-5 ">
          <h3 className=" text-lg font-[--font-playfair]">Speak to a Plant Specialist</h3>
          <h1 className="py-5">Need Help?</h1>
          <p className="">
            Your confidence is our priority. Unsure what plants will work with
            your light? New to gardening outdoors and need some advice? Reach
            out, we&apos;re here to help.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 w-full lg:w-4/6 px-5">
          {helpData.map((item) => (
            <div key={item.id} className=" p-5 w-full bg-white rounded flex flex-col items-center text-center shadow hover:shadow-lg">
              <div className=" text-primaryGreen">{item.icon}</div>
              <h3 className="text-lg font-semibold py-3">{item.name}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
