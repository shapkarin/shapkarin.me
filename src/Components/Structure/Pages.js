
import Packages from 'Pages/Packages';
import Repositories from 'Pages/Repositories';
import Stars from 'Pages/Stars';
import Sketches from 'Pages/Sketches';

import { GoRepo, GoStar } from 'react-icons/go';
import { RiNpmjsLine, RiPaintBrushFill } from 'react-icons/ri';

const PAGES = [
  {
    name: 'Repositories',
    path: '/github/repositories',
    redirect: { from: '/repositories', to: '/github/repositories' },
    icon: () => <GoRepo />,
    Page: () => <Repositories />
  },
  {
    name: 'Likes',
    path: '/github/likes',
    redirects: [
      { from: '/likes', to: '/github/stars' },
      { from: '/liked', to: '/github/stars' },
      { from: '/stars', to: '/github/stars' },
    ],
    icon: () => <GoStar size="1.2em" />,
    Page: () => <Stars />
  },
  {
    name: 'Packages',
    path: '/packages',
    redirect: { from: '/projects', to: '/packages' },
    icon: () => <RiNpmjsLine size="1.24em" />,
    Page: (props) => <Packages { ...props } />
  },
  {
    name: 'Creative',
    path: '/sketches',
    redirect: { from: '/generative', to: '/sketches' },
    icon: () => <RiPaintBrushFill />,
    Page: () => <Sketches />
  },
  // {
  //   name: 'Articles',
  //   path: '/articles',
  //   icon: () => <RiArticleLine />,
  //   Page: () => <Articles />
  // }
];

export default PAGES;
