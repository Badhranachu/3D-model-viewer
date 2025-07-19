import React, { useEffect, useState } from "react";
import ModelViewer from "./components/ModelViewer";
import axios from "axios";
import React, { useEffect, useState } from "react";


const App = () => {
  const [models, setModels] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // 🔁 Fetch models from backend on load
  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = () => {
    axios
      .get("https://threed-model-viewer-qftb.onrender.com/api/models")
      .then((res) => setModels(res.data))
      .catch((err) => console.error("Error fetching models:", err));
  };

  // 📁 Handle file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus("");
  };

  // 🚀 Handle file upload to backend
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("model", file); // "model" should match multer field

    try {
const response = await fetch("https://threed-model-viewer-qftb.onrender.com/api/upload", {


        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success || response.status === 201 || response.status === 200) {
        setUploadStatus("✅ Upload successful!");
        setFile(null);
        fetchModels(); // refresh model list
      } else {
        setUploadStatus("❌ Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading model:", error);
      setUploadStatus("❌ Upload error");
    }
  };

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h1>3D Model Viewer Dashboard</h1>

      {/* Upload Form */}
      <div style={{ marginBottom: "2rem" }}>
        <input type="file" accept=".glb" onChange={handleFileChange} />
        <br /><br />
        <button onClick={handleUpload}>Upload</button>
        <p>{uploadStatus}</p>
      </div>

      {/* Display Models */}
      {models.length > 0 ? (
        models.map((model) => {
          const url = model.filepath;
          return url ? (
            <ModelViewer key={model._id} url={url} />
          ) : (
            <p key={model._id}>⚠️ Missing file URL</p>
          );
        })
      ) : (
        <p>No models available yet.</p>
      )}
    </div>
  );
};

export default App;
