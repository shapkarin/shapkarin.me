import Packages from '@/Pages/Packages';
import Repositories from '@/Pages/Repositories';
import Stars from '@/Pages/Likes';
import Creative from '@/Pages/Creative';
import Articles from '@/Pages/Articles/Articles';
import Article from '@/Pages/Articles/Article';

import { GoRepo, GoStar } from 'react-icons/go';
import { RiNpmjsLine, RiPaintBrushFill, RiArticleLine } from 'react-icons/ri';

/*
  Temporary while Google crawler is indexing updates
  TODO: remove after some time. Date: 10.10.2024
*/
const canonicalUrlsFix = [
  { from: '/articles/contributions-to-major-web-dev-repos//', to: '/articles/contributions-to-major-web-dev-repos/' },
  { from: '/articles/production-AI-in-2016-year//', to: '/articles/production-AI-in-2016-year/' },
  { from: '/articles/byzantine-fault-tolerance//', to: '/articles/byzantine-fault-tolerance/' },
  { from: '/articles/ethereum-abi//', to: '/articles/ethereum-abi/' },
  { from: '/articles/floating-point-precision//', to: '/articles/floating-point-precision/' },
  { from: '/articles/back-health-and-therapeutic-exercises//', to: '/articles/back-health-and-therapeutic-exercises/' },
  { from: '/articles/drop-react-manual-memoization//', to: '/articles/drop-react-manual-memoization/' },
  { from: '/articles/function-declaration-vs-expression//', to: '/articles/function-declaration-vs-expression/' },
  { from: '/articles/higher-order-functions-and-currying//', to: '/articles/higher-order-functions-and-currying/' },
  { from: '/articles/javascript-lexical-scope//', to: '/articles/javascript-lexical-scope/' },
  { from: '/articles/ai-automation-for-business//', to: '/articles/ai-automation-for-business/' },
  { from: '/articles/memoization//', to: '/articles/memoization/' },
  { from: '/articles/node.js-multi-core-cluster//', to: '/articles/node.js-multi-core-cluster/' },
  { from: '/articles/state-optimization-guide//', to: '/articles/state-optimization-guide/' },
  { from: '/articles/structuredClone//', to: '/articles/structuredClone/' },
  { from: '/articles/curiosity-js//', to: '/articles/curiosity-js/' },
  { from: '/articles/react-vs-jquery//', to: '/articles/react-vs-jquery/' },
  { from: '/articles/design//', to: '/articles/design/' },
  { from: '/articles/extend-routines//', to: '/articles/extend-routines/' },
  { from: '/articles/global-diff//', to: '/articles/global-diff/' },
  { from: '/articles/saga-fetch//', to: '/articles/saga-fetch/' },
  { from: '/articles/wagmi-ethers//', to: '/articles/wagmi-ethers/' },
  { from: '/articles/async-event-loop-web-workers//', to: '/articles/async-event-loop-web-workers/' },
  { from: '/articles/ethereum-whitepaper-explanation//', to: '/articles/ethereum-whitepaper-explanation/' },
  { from: '/articles/WAGMI-basics//', to: '/articles/WAGMI-basics/' },
];

const PAGES = [
  {
    name: 'Articles',
    path: '/',
    Icon: () => <RiArticleLine />,
    Page: () => <Articles />,
    redirect: { from: '/articles', to: '/' },
  },
  {
    name: 'Articles',
    path: '/articles/:slug/',
    Icon: () => <RiArticleLine />,
    Page: () => <Article />,
    noInMenu: true,
    redirects: [
      { from: '/articles/hoc-and-currying/', to: '/articles/higher-order-functions-and-currying/' },
      { from: '/articles/cluster/', to: '/articles/node.js-multi-core-cluster/' },
      ...(process.env.NODE_ENV === 'production' ? canonicalUrlsFix : []),
    ],
  },
  {
    name: 'Repositories',
    path: '/github/repositories/',
    redirect: { from: '/repositories', to: '/github/repositories/' },
    Icon: () => <GoRepo />,
    Page: () => <Repositories />,
  },
  {
    name: 'Likes',
    path: '/github/likes/',
    redirects: [
      { from: '/likes', to: '/github/stars/' },
      { from: '/liked', to: '/github/stars/' },
      { from: '/stars', to: '/github/stars/' },
    ],
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
    redirects: [
      { from: '/generative', to: '/sketches/' },
      { from: '/sketches', to: '/creative/' }
    ],
    Icon: () => <RiPaintBrushFill />,
    Page: () => <Creative />,
  },
  // {
  //   name: 'Contacts',
  //   path: 'contacts',
  //   Icon: () => <IoIosContact style={{ height: '14px' }}/>,
  //   Page: () => <></>,
  // }
];

export default PAGES;
