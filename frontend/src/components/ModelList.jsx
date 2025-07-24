// src/components/ModelList.jsx
import React, { useEffect, useState } from 'react';

const ModelList = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("https://threed-model-viewerv2.onrender.com/api/models");
        const data = await res.json();
        setModels(data.reverse()); // newest first
      } catch (err) {
        console.error('Error fetching models:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) return <p>Loading models...</p>;

  return (
    <div>
      <h2>Uploaded 3D Models</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {models.map((model) => (
          <div
            key={model._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '1rem',
              width: '320px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#5a5454ff',
            }}
          >
            <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>{model.name}</h4>
            <model-viewer
              src={model.cloudinaryUrl}
              alt={model.name}
              auto-rotate
              camera-controls
              style={{ width: '100%', height: '300px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelList;
