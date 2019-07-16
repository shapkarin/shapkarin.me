import React from 'react';
import { GoRepo, GoStar, GoProject } from 'react-icons/go';

const links = [
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
  }
];

export default links;
