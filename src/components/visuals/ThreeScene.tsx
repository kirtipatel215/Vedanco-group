
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing R3F types in JSX.IntrinsicElements
// We augment the global JSX namespace and React module to support R3F elements.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      torusGeometry: any;
      meshStandardMaterial: any;
      icosahedronGeometry: any;
      meshPhysicalMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      torusGeometry: any;
      meshStandardMaterial: any;
      icosahedronGeometry: any;
      meshPhysicalMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
    }
  }
}

const AbstractShape = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={meshRef}>
         <mesh rotation={[Math.PI / 2, 0, 0]}>
             <torusGeometry args={[2.5, 0.05, 16, 100]} />
             <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} roughness={0} metalness={1} />
         </mesh>
         
         {[...Array(5)].map((_, i) => (
             <mesh key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]} position={[0, 0, 0]}>
                 <torusGeometry args={[1.5, 0.02, 16, 60]} />
                 <meshStandardMaterial 
                    color="#94a3b8"
                    roughness={0.1}
                    metalness={1}
                 />
             </mesh>
         ))}

         <mesh>
             <icosahedronGeometry args={[0.8, 1]} />
             <meshPhysicalMaterial 
                color="#0f172a"
                roughness={0.2}
                metalness={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
             />
         </mesh>
      </group>
    </Float>
  );
};

const ThreeScene: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[500px] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#60a5fa" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#c084fc" />
        <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} />
        
        <AbstractShape />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
