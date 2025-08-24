import React from "react";

interface PageHeaderProps {
  title: string;
  para: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, para }) => {
  return (
    <div className="py-10 text-center ">
      <h1 className="text-3xl lg:text-5xl font-semibold mb-3 text-textClr">
        {title}
      </h1>
      <p className="text-sm lg:text-base">{para}</p>
    </div>
  );
};

export default PageHeader;
