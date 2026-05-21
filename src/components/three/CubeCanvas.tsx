import { Canvas } from "@react-three/fiber";

export default function CubeCanvas() {
  return (
    <Canvas
      className="pointer-events-none absolute inset-0"
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <ambientLight intensity={1.4} />
      <mesh rotation={[0.4, 0.7, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#c8f5ea" transparent opacity={0.35} />
      </mesh>
    </Canvas>
  );
}
