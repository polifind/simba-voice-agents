import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { SimbaCallout } from './SimbaCallout';

// MDX → React component mapping. Tailwind Typography handles most prose styling
// via the wrapping `prose` class on the article body, so we mostly need to
// override link and heading behavior + register our custom components.
export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...rest }) => {
    if (href && href.startsWith('/')) {
      return (
        <Link href={href} className="text-simba-blue hover:underline font-medium" {...(rest as object)}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-simba-blue hover:underline font-medium"
        {...rest}
      >
        {children}
      </a>
    );
  },
  SimbaCallout,
};
