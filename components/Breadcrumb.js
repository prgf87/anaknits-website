import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React, { Children, Fragment } from 'react';

const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);
  const childrenWithSeparator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index} className>
          {child}
          <ChevronRightIcon className="flex h-5 w-5 pt-1 text-gray-600 " />
        </Fragment>
      );
    }
    return (
      <Link href={'/'} key={index}>
        <a>{child}</a>
      </Link>
    );
  });

  return (
    <nav className="flex mt-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {childrenWithSeparator}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
