import Packages from '@/Pages/Packages';
import Repositories from '@/Pages/Repositories';
import Stars from '@/Pages/Likes';
import Creative from '@/Pages/Creative';
import Articles from '@/Pages/Articles/Articles';
import Article from '@/Pages/Articles/Article';

import { GoRepo, GoStar } from 'react-icons/go';
import { RiNpmjsLine, RiPaintBrushFill, RiArticleLine } from 'react-icons/ri';

const PAGES = [
  {
    name: 'Articles',
    path: '/',
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
