import React, { useEffect, useRef } from 'react';
import Scene from './Scene';
import { isMobile } from '@/constants';

export let sceneInstance = null;

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !sceneInstance) {
      sceneInstance = isMobile ? null : new Scene(canvasRef.current);
    }
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      id="background"
      suppressHydrationWarning={true}
    />
  );
};

export default Background;
