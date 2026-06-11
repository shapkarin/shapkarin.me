import PropTypes from 'prop-types';

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
}) => (
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
      {language && (
        <>
          Lang:
          {' '}
          <a href={languagesUrl} target="_blank" rel="noreferrer">
            {language}
          </a>
        </>
      )}
    </div>
  </div>
);

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
