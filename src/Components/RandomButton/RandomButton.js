import scene from '../Background';

const RandomButton = ({ children, ...rest }) => {
  const randomize = function(){
    scene.randomizeAll();
    scene.draw();
  };

  return (
    <button onClick={randomize} {...rest}>
      {children}
    </button>
  )
};

export default RandomButton;
