import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';

// Same as the stock component, plus an `internal` item flag. Some footer
// links use an absolute URL (so Docusaurus's broken-link checker doesn't
// try to resolve a same-tab page from the separate main-site app as one of
// this site's own routes) but still open in the same tab on the same
// domain, so they shouldn't get the "external link" icon/aria-label that
// isInternalUrl() would otherwise add to any absolute URL.
export default function FooterLinkItem({item}) {
  const {to, href, label, prependBaseUrlToHref, internal, className, ...props} = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  return (
    <Link
      className={clsx('footer__link-item', className)}
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {label}
      {href && !internal && !isInternalUrl(href) && <IconExternalLink />}
    </Link>
  );
}
