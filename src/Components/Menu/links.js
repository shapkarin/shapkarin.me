import React from 'react';
import { GoRepo, GoStar, GoProject } from 'react-icons/go';

const links = [
  {
    title: 'Repositories',
    url: '/repositories',
    icon: () => <GoRepo />
  },
  {
    title: 'Liked',
    url: '/liked',
    icon: () => <GoStar />
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: () => <GoProject />
  },
];

export default links;
