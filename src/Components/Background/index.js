import Background from './Background';
import isMobile from 'is-mobile';

const scene = isMobile() ? null : new Background();

export default scene;