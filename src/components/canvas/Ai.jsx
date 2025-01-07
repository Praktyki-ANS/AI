import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Ai = ({ isMobile }) => {
  const logo = useGLTF('./models/ansLogo.glb');
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.01);
    }, 16); // Adjust the interval as needed (16ms for roughly 60fps)

    return () => clearInterval(interval);
  }, []);

  return (
    <mesh rotation={[0, rotation, 0]}>
      <hemisphereLight intensity={0.15} groundColor={'black'} />

      {/* Front left spotlight */}
      <spotLight
        position={[10, 15, 5]}
        angle={Math.PI / 6}  // 30 degrees in radians
        penumbra={1}
        intensity={500}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Front right spotlight */}
      <spotLight
        position={[-10, 15, 5]}
        angle={Math.PI / 6}  // 30 degrees in radians
        penumbra={1}
        intensity={500}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Back left spotlight */}
      <spotLight
        position={[10, 15, -5]}
        angle={Math.PI / 6}
        penumbra={1}
        intensity={500}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Back right spotlight */}
      <spotLight
        position={[-10, 15, -5]}
        angle={Math.PI / 6}
        penumbra={1}
        intensity={500}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Ambient light to soften shadows */}
      <ambientLight intensity={0.3} />

      {/* Model */}
      <primitive
        object={logo.scene}
        scale={isMobile ? 0.2 : 0.3}
        position={isMobile ? [0, -2, -1] : [0, -3, -1]}
      />
    </mesh>
  );
};


const AiCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [10, 10, 5], fov: 90 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Ai isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default AiCanvas;
