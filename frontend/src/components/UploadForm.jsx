import React, { useState } from 'react';

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('https://threed-model-viewerv2.onrender.com/api/models/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setMessage('✅ Upload successful');
      setFile(null);

      console.log('Cloudinary URL:', data.data.cloudinaryUrl);

      if (onUploadSuccess) {
        onUploadSuccess(); // ✅ refresh model list in parent
      }

    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input
        type="file"
        accept=".glb"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Model'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UploadForm;
