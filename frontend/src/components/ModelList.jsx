// src/components/ModelList.jsx
import React, { useEffect, useState } from 'react';

const ModelList = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch('https://threed-model-viewer-qftb.onrender.com/api/models');
        const data = await res.json();
        setModels(data); // assuming backend returns an array of model objects
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
          <div key={model._id}>
            <h4>{model.name}</h4>
            <model-viewer
              src={model.cloudinaryUrl}
              alt={model.name}
              auto-rotate
              camera-controls
              style={{ width: '300px', height: '300px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelList;
