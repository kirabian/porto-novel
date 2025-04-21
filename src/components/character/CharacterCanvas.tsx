import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';

// Placeholder model since we don't have a real character model
const AnimeCharacter = () => {
  // Using a placeholder model - in real implementation, use a proper anime character model
  return (
    <mesh>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color="#9333ea" />
    </mesh>
  );
};

// Fallback component
const LoadingFallback = () => {
  const { theme } = useTheme();
  return (
    <div className={`w-full h-full flex items-center justify-center ${
      theme === 'day' ? 'text-cyber-purple' : 'text-cyber-pink'
    }`}>
      <div className="font-cyber animate-pulse">Loading character...</div>
    </div>
  );
};

interface CharacterCanvasProps {
  position?: [number, number, number];
  size?: { width: string; height: string };
  enableControls?: boolean;
}

const CharacterCanvas: React.FC<CharacterCanvasProps> = ({ 
  position = [0, 0, 0], 
  size = { width: '300px', height: '400px' }, 
  enableControls = true
}) => {
  const { theme } = useTheme();

  return (
    <div style={{ width: size.width, height: size.height }} className="relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 200 }}
            enabled={enableControls}
          >
            <AnimeCharacter />
          </PresentationControls>
          <Environment preset={theme === 'day' ? 'sunset' : 'night'} />
          <ambientLight intensity={theme === 'day' ? 0.7 : 0.3} />
          <directionalLight 
            position={[10, 10, 10]} 
            intensity={theme === 'day' ? 1.5 : 0.5} 
            color={theme === 'day' ? '#ffffff' : '#9333ea'} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CharacterCanvas;