import React, { useEffect, useState } from 'react';
import UploadForm from './components/UploadForm';
import ModelList from './components/ModelList';

const App = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchModels = async () => {
    try {
      const res = await fetch("https://threed-model-viewerv2.onrender.com/api/models");
      const data = await res.json();
      setModels(data.reverse()); // latest uploads first
    } catch (err) {
      console.error('Error fetching models:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>3D Model Viewer</h1>
      <UploadForm onUploadSuccess={fetchModels} />
      <ModelList models={models} loading={loading} />
    </div>
  );
};

export default App;
