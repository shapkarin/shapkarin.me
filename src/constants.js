import { isMobile as isMobileLib } from 'is-mobile';

export const SCROLL_OFFSET = 77;
export const isMobile = isMobileLib();
export const GITHUB_REPO_URL = 'https://github.com/shapkarin/shapkarin.me';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
