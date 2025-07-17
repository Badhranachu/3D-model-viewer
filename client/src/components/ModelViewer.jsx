import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <p>⚠️ Failed to load model.</p>;
    return this.props.children;
  }
}

const ModelViewer = ({ modelUrl }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        height: "500px",
        margin: "20px auto",
        border: "1px solid #ccc",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <ErrorBoundary>
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <Suspense fallback={null}>
            <Model url={modelUrl} />
          </Suspense>
          <Environment preset="sunset" />
          <OrbitControls />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default ModelViewer;
