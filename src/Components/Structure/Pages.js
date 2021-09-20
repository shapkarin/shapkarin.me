
import React from 'react';

import Packages from 'Pages/Packages';
import Repositories from 'Pages/Repositories';
import Liked from 'Pages/Liked';
import Sketches from 'Pages/Sketches';
import Contributions from 'Pages/Contributions';

import { GoRepo, GoStar, GoProject } from 'react-icons/go';
import { RiNpmjsLine, RiPaintBrushFill } from 'react-icons/ri';
import { BiDonateHeart, BiPaintRoll } from 'react-icons/bi';
import { GiPencilBrush } from 'react-icons/gi';

export default [
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
    redirect: { from: '/repositories', to: '/github/repositories'},
    icon: () => <GoRepo />,
    Page: () => <Repositories />
  },
  {
    name: 'Contributions',
    path: '/github/contributions',
    redirect: { from: '/contributions', to: '/github/contributions'},
    icon: () => <BiDonateHeart size="1.12em" />,
    Page: () => <Contributions />
  },
  {
    name: 'Starred',
    path: '/github/liked',
    redirect: { from: '/liked', to: '/github/liked'},
    icon: () => <GoStar size="1.2em" />,
    Page: () => <Liked />
  },
  {
    name: 'Sketches',
    path: '/sketches',
    icon: () => <RiPaintBrushFill />,
    Page: () => <Sketches />
  },
];