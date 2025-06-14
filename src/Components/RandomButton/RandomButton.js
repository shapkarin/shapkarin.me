import scene from '../Background';

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
