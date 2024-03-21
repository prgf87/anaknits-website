import { ChevronRightIcon } from "@heroicons/react/solid";
import React, { Children, Fragment } from "react";

const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);
  const childrenWithSeparator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <ChevronRightIcon className="flex h-5 w-5 pt-1 text-gray-600 " />
        </Fragment>
      );
    }
    return child;
  });

  return (
    <nav className="flex ml-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1">
        {childrenWithSeparator}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
