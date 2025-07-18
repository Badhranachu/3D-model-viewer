import React, { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import ModelViewer from "./components/ModelViewer";
import axios from "axios";

const App = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    axios
      .get("https://threed-model-viewer-qftb.onrender.com/api/models")
      .then((res) => setModels(res.data));
  }, []);

  return (
    <div>
      <h1>3D Model Viewer Dashboard</h1>
      <UploadForm />
      {models.map((model) => (
  model.filepath ? (
    <ModelViewer key={model._id} url={model.filepath} />
  ) : (
    <p key={model._id}>⚠️ Missing file URL</p>
  )
))}
    </div>
  );
};

export default App;
