
import Packages from 'Pages/Packages';
import Repositories from 'Pages/Repositories';
import Stars from 'Pages/Stars';
import Sketches from 'Pages/Sketches';
import Contributions from 'Pages/Contributions';

import { GoRepo, GoStar } from 'react-icons/go';
import { RiNpmjsLine, RiPaintBrushFill } from 'react-icons/ri';
import { BiDonateHeart } from 'react-icons/bi';

const PAGES = [
  {
    name: 'Packages',
    path: '/packages',
    redirect: { from: '/projects', to: '/packages' },
    icon: () => <RiNpmjsLine size="1.24em" />,
    Page: (props) => <Packages { ...props } />
  },
  {
    name: 'Repositories',
    path: '/github/repositories',
    redirect: { from: '/repositories', to: '/github/repositories' },
    icon: () => <GoRepo />,
    Page: () => <Repositories />
  },
  {
    name: 'Contributions',
    path: '/github/contributions',
    redirect: { from: '/contributions', to: '/github/contributions' },
    icon: () => <BiDonateHeart size="1.12em" />,
    Page: () => <Contributions />
  },
  {
    name: 'Stars',
    path: '/github/stars',
    redirects: [
      { from: '/likes', to: '/github/stars' },
      { from: '/liked', to: '/github/stars' },
      { from: '/stars', to: '/github/stars' },
    ],
    icon: () => <GoStar size="1.2em" />,
    Page: () => <Stars />
  },
  {
    name: 'Sketches',
    path: '/sketches',
    redirect: { from: '/generative', to: '/sketches' },
    icon: () => <RiPaintBrushFill />,
    Page: () => <Sketches />
  },
];

export default PAGES;