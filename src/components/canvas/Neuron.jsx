import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, Float } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Neuron = ({ isMobile }) => {
  const logo = useGLTF('./models/neurons.glb');
  const [rotation, setRotation] = useState(0);


  return (
    <Float speed={3} rotationIntensity={0.15} floatIntensity={2.5}>
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
            position={isMobile ? [11.7, 0.4, 5.7] : [11.7, 0.22, 5.7]}
        />
        </mesh>
    </Float>
  );
};


const NeuronCanvas = () => {
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
        frameloop='always'
      shadows
      camera={{ position: [10, 10, 5], fov: 90 }}
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
        <Neuron isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default NeuronCanvas; 
