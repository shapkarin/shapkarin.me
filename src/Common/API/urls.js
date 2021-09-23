const GITHUB_API_URL = 'https://api.github.com';

const github = {
  user() {
    return `${GITHUB_API_URL}/users/shapkarin`;
  },
  activity() {
    return `${this.user()}/events/public?per_page=100`;
  },
  repositories(n = 1) {
    // TODO: pagination
    const PER_PAGE = 64;
    return `${this.user()}/repos?sort=updated&per_page=${PER_PAGE}&page=${n}`;
  },
  likes() {
    return `${this.user()}/starred`;
  }
}

export default github;
