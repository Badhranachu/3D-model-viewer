import React, { useState } from 'react';

const UploadForm = () => {
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
      const res = await fetch('http://localhost:5000/api/models', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setMessage('✅ Upload successful');
      console.log('Cloudinary URL:', data.data.cloudinaryUrl);
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
