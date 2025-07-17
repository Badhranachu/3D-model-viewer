// UploadForm.jsx

import React, { useState } from 'react';

function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    const formData = new FormData();
formData.append('model', file);  // ✅ Must match 'model' in backend

    try {
      setUploading(true);
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        onUploadSuccess(data.url);
      } else {
        setError('Upload failed.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto">
      <input type="file" accept=".glb" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Model'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default UploadForm;
