import React from 'react';
import { GoRepo, GoStar, GoProject } from 'react-icons/go';
import { FaPlayCircle } from 'react-icons/fa';

export default [
  {
    title: 'Packages',
    url: '/packages',
    icon: () => <GoProject />
  },
  {
    title: 'Github',
    url: '/repositories',
    icon: () => <GoRepo />
  },
  {
    title: 'Liked repos',
    url: '/liked',
    icon: () => <GoStar />
  },
  {
    title: 'Sketches',
    url: '/sketches',
    icon: () => <FaPlayCircle />
  },
];
