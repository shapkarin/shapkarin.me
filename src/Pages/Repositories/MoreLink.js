import { FiExternalLink } from 'react-icons/fi';

const MoreOnGitHubLink = ({ url = 'https://github.com/shapkarin?tab=repositories' }) => {
  return (
    <div className="Page__GithubItem">
      <div className="Page__GithubItemInner">
        <a href={url} target="_blank" rel="noreferrer" className="GithubItem__Link">More <FiExternalLink /></a>
      </div>
    </div>
  );
};

export default MoreOnGitHubLink;