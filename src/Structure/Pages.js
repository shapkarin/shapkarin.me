import { lazy } from 'react';
import { GoRepo, GoStar, GoHome } from 'react-icons/go';
import { RiNpmjsLine, RiPaintBrushFill, RiArticleLine } from 'react-icons/ri';

// ⚡ Bolt: Lazily load pages to enable route-level code splitting.
// This reduces the initial bundle size and speeds up initial page load.
const Packages = lazy(() => import('@/Pages/Packages'));
const Repositories = lazy(() => import('@/Pages/Repositories'));
const Stars = lazy(() => import('@/Pages/Likes'));
const Creative = lazy(() => import('@/Pages/Creative'));
const Articles = lazy(() => import('@/Pages/Articles/Articles'));
const Article = lazy(() => import('@/Pages/Articles/Article'));
const Main = lazy(() => import('@/Pages/Main'));

const PAGES = [
  {
    name: 'Home',
    path: '/',
    Page: () => <Main />,
    Icon: () => <GoHome size="1.2em" />,
  },
  {
    name: 'Articles',
    path: '/articles/',
    Icon: () => <RiArticleLine />,
    Page: () => <Articles />,
  },
  {
    name: 'Articles',
    path: '/articles/:slug/',
    Icon: () => <RiArticleLine />,
    Page: () => <Article />,
    noInMenu: true,
  },
  {
    name: 'Repositories',
    path: '/github/repositories/',
    // I use use public/404.html and public/index.html pages instead
    // redirect: { from: '/repositories', to: '/github/repositories/' },
    Icon: () => <GoRepo />,
    Page: () => <Repositories />,
  },
  {
    name: 'Likes',
    path: '/github/likes/',
    // todo: bcs of gh-pages redirects works only for exiting pages, use public/404.html instead
    // redirects: [
    //   { from: '/likes', to: '/github/stars/' },
    //   { from: '/liked', to: '/github/stars/' },
    //   { from: '/stars', to: '/github/stars/' },
    // ],
    Icon: () => <GoStar size="1.2em" />,
    Page: () => <Stars />,
  },
  {
    name: 'Packages',
    path: '/packages/',
    redirect: { from: '/projects', to: '/packages/' },
    Icon: () => <RiNpmjsLine size="1.24em" />,
    Page: (props) => <Packages { ...props } />,
  },
  {
    name: 'Creative',
    path: '/creative/',
    /*
    // SEO redirect for URL renamces are in the public/404.html
    redirects: [
      { from: '/generative', to: '/sketches/' },
      { from: '/sketches', to: '/creative/' }
    ],
    */
    Icon: () => <RiPaintBrushFill />,
    Page: () => <Creative />,
  },
];

export default PAGES;
