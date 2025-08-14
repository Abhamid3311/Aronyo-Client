import Link from "next/link";
import React from "react";

interface HeadlinesProps {
  title: string;
  link: string;
  buttonText: string;
}

const Headlines: React.FC<HeadlinesProps> = ({ title, link, buttonText }) => {
  return (
    <div className="flex items-center justify-between gap-1">
      <h1 className="px-5 text-textClr">{title}</h1>
      <Link
        href={link}
        className="bg-ghost text-textClr px-2 py-3 rounded-md text-lg font-bold font-[--font-playfair]"
      >
        <p className="tracking-normal hover:tracking-wider ease-linear duration-500 text-lg">
          {buttonText}
          <span className="ml-1 inline-block text-xl">→</span>
        </p>
      </Link>
    </div>
  );
};

export default Headlines;
