import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a .glb file");

    const formData = new FormData();
    formData.append("file", file); // ✅ must match backend field name
    formData.append("uploaderName", "Badhran"); // optional
    formData.append("description", "Demo model"); // optional

    try {
      const res = await axios.post(
        "https://threed-model-viewer-qftb.onrender.com/api/upload",
        formData
      );
      setMessage("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        accept=".glb"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload Model</button>
      <p>{message}</p>
    </form>
  );
};

export default UploadForm;
