import React from 'react';
import { GoRepo, GoStar, GoProject } from 'react-icons/go';
import { FaPlayCircle } from 'react-icons/fa';

export default [
  {
    title: 'Sketches',
    url: '/sketches',
    icon: () => <FaPlayCircle />
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: () => <GoProject />
  },
  {
    title: 'Github',
    url: '/repositories',
    icon: () => <GoRepo />
  },
  {
    title: 'Liked',
    url: '/liked',
    icon: () => <GoStar />
  },
];
