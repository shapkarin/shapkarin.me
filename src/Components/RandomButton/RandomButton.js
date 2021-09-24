import scene from '../Background';

import './style.less';

const RandomButton = ({ children, ...rest }) => {
  const randomize = function(){
    scene.randomizeAll();
    scene.draw();
  };

  return (
    <div onClick={randomize} {...rest}>
      {children}
    </div>
  )
};

export default RandomButton;
