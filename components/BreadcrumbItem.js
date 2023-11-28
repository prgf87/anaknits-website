import Link from 'next/link';

const BreadcrumbItem = ({ children, href, isCurrent, ...props }) => {
  return (
    <li className="inline-flex items-center" {...props}>
      <Link
        href={href}
        passHref
        className="inline-flex items-center italic text-sm font-medium text-gray-900 hover:text-gray-400 dark:text-gray-400 dark:hover:text-white pl-2 "
        aria-current={isCurrent ? 'page ' : 'false'}
      >
        {children}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
