import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import { GoBrowser, GoClock, GoRepoForked, GoStar } from 'react-icons/go';
import { LuMessageCircle } from 'react-icons/lu';

const DATE_FORMAT_OPTIONS = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

const formatDate = (date) => (
  (new Date(date)).toLocaleDateString('de-DE', DATE_FORMAT_OPTIONS)
);

const LANGUAGES_TOOLTIP_LOADING = 'Loading languages JSON...';
const languagesCache = new Map();

const formatLanguages = (languages) => JSON.stringify(languages, null, 2);

const getLanguages = (languagesUrl) => {
  const cachedLanguages = languagesCache.get(languagesUrl);

  if (cachedLanguages) {
    return cachedLanguages;
  }

  const request = fetch(languagesUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    })
    .then(formatLanguages)
    .catch((error) => {
      languagesCache.delete(languagesUrl);
      throw error;
    });

  languagesCache.set(languagesUrl, request);

  return request;
};

const getLanguagesErrorTooltip = (error) => {
  const message = error instanceof Error ? error.message : 'Unknown error';

  return `Could not load languages JSON:\n${message}`;
};

export const RepositoryCard = ({
  title,
  htmlUrl,
  description = null,
  isFork = false,
  date = '',
  dateTooltip = '',
  starsCount = 0,
  openIssuesCount = 0,
  homepage = '',
  language = '',
  languagesUrl = '',
}) => {
  const [languagesTooltip, setLanguagesTooltip] = useState(LANGUAGES_TOOLTIP_LOADING);
  const languagesTooltipTargetRef = useRef(null);
  const isLanguagesTooltipActiveRef = useRef(false);
  const isLanguagesTooltipReadyRef = useRef(false);
  const isFirstLanguagesTooltipRenderRef = useRef(true);

  const loadLanguages = useCallback(() => {
    if (!languagesUrl) {
      return;
    }

    if (!isLanguagesTooltipReadyRef.current) {
      setLanguagesTooltip(LANGUAGES_TOOLTIP_LOADING);
    }

    getLanguages(languagesUrl)
      .then((languages) => {
        isLanguagesTooltipReadyRef.current = true;
        setLanguagesTooltip(languages);
      })
      .catch((error) => {
        isLanguagesTooltipReadyRef.current = false;
        setLanguagesTooltip(getLanguagesErrorTooltip(error));
      });
  }, [languagesUrl]);

  const showCurrentLanguagesTooltip = useCallback(() => {
    const currentTarget = languagesTooltipTargetRef.current;

    if (isLanguagesTooltipActiveRef.current && currentTarget) {
      ReactTooltip.show(currentTarget);
    }
  }, []);

  const activateLanguagesTooltip = useCallback(() => {
    isLanguagesTooltipActiveRef.current = true;
    loadLanguages();
  }, [loadLanguages]);

  const deactivateLanguagesTooltip = useCallback(() => {
    isLanguagesTooltipActiveRef.current = false;
  }, []);

  useEffect(() => {
    if (isFirstLanguagesTooltipRenderRef.current) {
      isFirstLanguagesTooltipRenderRef.current = false;
      return;
    }

    ReactTooltip.rebuild();
    showCurrentLanguagesTooltip();
  }, [languagesTooltip, showCurrentLanguagesTooltip]);

  const languagesTooltipProps = languagesUrl ? {
    ref: languagesTooltipTargetRef,
    'data-tip': languagesTooltip,
    onBlur: deactivateLanguagesTooltip,
    onFocus: activateLanguagesTooltip,
    onMouseEnter: activateLanguagesTooltip,
    onMouseLeave: deactivateLanguagesTooltip,
    onTouchEnd: deactivateLanguagesTooltip,
    onTouchStart: activateLanguagesTooltip,
  } : {};
  const shouldRenderLanguages = language || languagesUrl;

  return (
    <div className="Page__GithubItem">
      <div className="Page__GithubItemInner">
        <a className="GithubItem__Link centered-label" href={htmlUrl} target="_blank" rel="noreferrer">
          {title}
          {isFork && <GoRepoForked data-tip="fork" />}
        </a>
        <div className="GithubItem__Description">
          {description}
        </div>
        {date && (
          <div className="centered-label">
            <GoClock data-tip={dateTooltip} size="19px" />
            {' '}
            {formatDate(date)}
          </div>
        )}
        {starsCount > 0 && (
          <div className="centered-label">
            <GoStar size="20px" />
            {' '}
            Stars:
            {' '}
            {starsCount}
          </div>
        )}
        {openIssuesCount > 0 && (
          <div className="centered-label">
            <LuMessageCircle size="20px" style={{ strokeWidth: 1.5 }} />
            {' '}
            Open issues:
            {' '}
            <a className="IssuesCount" href={`${htmlUrl}/issues`} target="_blank" rel="noreferrer">{openIssuesCount}</a>
          </div>
        )}
        {homepage && (
          <div className="centered-label">
            <GoBrowser style={{ paddingLeft: 2 }} />
            {' '}
            <a href={homepage} target="_blank" rel="noreferrer">{homepage}</a>
          </div>
        )}
        {shouldRenderLanguages && (
          <>
            Lang:
            {' '}
            {languagesUrl ? (
              <a href={languagesUrl} target="_blank" rel="noreferrer" {...languagesTooltipProps}>
                {language || "bcs it's fork and gh api, hover to fetch"}
              </a>
            ) : `${language}, hover to fetch more`}
          </>
        )}
      </div>
    </div>
  );
};

RepositoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  htmlUrl: PropTypes.string.isRequired,
  description: PropTypes.node,
  isFork: PropTypes.bool,
  date: PropTypes.string,
  dateTooltip: PropTypes.string,
  starsCount: PropTypes.number,
  openIssuesCount: PropTypes.number,
  homepage: PropTypes.string,
  language: PropTypes.string,
  languagesUrl: PropTypes.string,
};
