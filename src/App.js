import React, { useRef, useState } from "react";
import "@tensorflow/tfjs";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh";
import Webcam from "react-webcam";
import { runDetector } from "./utils/detector";

const inputResolution = {
  width: 500,
  height: 500,
};
const videoConstraints = {
  width: inputResolution.width,
  height: inputResolution.height,
  facingMode: "user",
};
function App() {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const handleVideoLoad = (videoNode) => {
    const video = videoNode.target;
    if (video.readyState !== 4) return;
    if (loaded) return;
    runDetector(video, canvasRef.current);
    setLoaded(true);
  };
  return (
    <div className="container">
      {!loaded && <h3>Loading...</h3>}
      <Webcam
        onLoadedData={handleVideoLoad}
        width={inputResolution.width}
        height={inputResolution.height}
        videoConstraints={videoConstraints}
        style={{ position: "absolute", visibility: 'hidden' }}
      />
      <canvas
        ref={canvasRef}
        width={inputResolution.width}
        height={inputResolution.height}
        style={{ position: "absolute" }}
      />
    </div>
  );
}

export default App;
