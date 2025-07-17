import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a .glb file");

    const formData = new FormData();
    formData.append("model", file);

    try {
      setStatus("Uploading...");
const res = await axios.get('https://3d-model-api.onrender.com/api/models');
      
      setStatus("✅ Upload successful!");
      setFile(null);
      onUploadSuccess();
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed.");
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-light p-4 mb-4 rounded border shadow-sm"
    >
      <div className="mb-3">
        <input
          type="file"
          accept=".glb"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Upload 3D Model
      </button>
      {status && (
        <div className="text-center mt-2 text-secondary small">{status}</div>
      )}
    </form>
  );
};

export default UploadForm;
