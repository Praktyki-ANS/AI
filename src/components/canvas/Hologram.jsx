import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, Float } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Hologram = ({ isMobile }) => {
  const logo = useGLTF('./models/hologram_emitter.glb');


  return (
        <mesh>
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
            scale={isMobile ? 2.7 : 4.3}
            rotation={isMobile ? [0.25, 0.089, -0.01]: [0.25, 0.089, -0.02]}
            position={isMobile ? [-15.1, 1.25, 1.3] : [-24.9, 1.35, 1.4]}
        />
        </mesh>
  );
};


const HologramCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1000px)');
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
        frameloop='always'
      shadows
      camera={{ position: [10, 10, 15],  rotation: [0, 100, 100] ,  fov: 15 } }
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Hologram  isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default HologramCanvas; 
