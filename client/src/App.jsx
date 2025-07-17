import React, { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import ModelViewer from "./components/ModelViewer";
import axios from "axios";

const App = () => {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/models");
      setModels(res.data);
      console.log("✅ Fetched models:", res.data);
    } catch (error) {
      console.error("❌ Error fetching models:", error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

 return (
  <div style={{ padding: "40px 20px", textAlign: "center" }}>
    <h1>📦 3D Model Uploader & Viewer</h1>

    <div style={{ margin: "20px auto", maxWidth: "400px" }}>
      <UploadForm onUploadSuccess={fetchModels} />
    </div>

    {/* Grid container */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "30px",
        marginTop: "40px",
      }}
    >
      {models.length > 0 ? (
        models.map((model) => (
          <div
            key={model._id}
            style={{
              width: "500px",
              height: "320px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            <h5 style={{ margin: "0", fontSize: "16px" }}>{model.filename}</h5>
            <ModelViewer modelUrl={`http://localhost:5000/${model.filepath}`} />
          </div>
        ))
      ) : (
        <p>No models uploaded yet.</p>
      )}
    </div>
  </div>
);



};

export default App;
