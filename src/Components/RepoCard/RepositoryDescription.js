import PropTypes from 'prop-types';
import { Fragment } from 'react';

import Link from '@/Components/Link';

const URL_PATTERN = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;
const SAFE_PROTOCOLS = new Set(['http:', 'https:']);
const TRAILING_PUNCTUATION_PATTERN = /[),.;:!?]+$/;

const getCleanUrlParts = (value) => {
  const trailingPunctuation = value.match(TRAILING_PUNCTUATION_PATTERN)?.[0] || '';
  const cleanValue = trailingPunctuation
    ? value.slice(0, -trailingPunctuation.length)
    : value;

  return {
    cleanValue,
    trailingPunctuation,
  };
};

const getSafeHref = (value) => {
  const href = value.startsWith('www.') ? `https://${value}` : value;

  try {
    const url = new URL(href);

    if (!SAFE_PROTOCOLS.has(url.protocol)) {
      return null;
    }

    return url.href;
  } catch (_error) {
    return null;
  }
};

export const RepositoryDescription = ({ text = '' }) => {
  if (!text) {
    return null;
  }

  const nodes = [];
  let lastIndex = 0;

  text.replace(URL_PATTERN, (match, offset) => {
    if (offset > lastIndex) {
      nodes.push(text.slice(lastIndex, offset));
    }

    const { cleanValue, trailingPunctuation } = getCleanUrlParts(match);
    const href = getSafeHref(cleanValue);

    if (href) {
      nodes.push(
        <Link to={href} target="_blank">
          {cleanValue}
        </Link>
      );
    } else {
      nodes.push(match);
    }

    if (trailingPunctuation) {
      nodes.push(trailingPunctuation);
    }

    lastIndex = offset + match.length;

    return match;
  });

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.map((node, index) => (
    <Fragment key={index}>
      {node}
    </Fragment>
  ));
};

RepositoryDescription.propTypes = {
  text: PropTypes.string,
};
