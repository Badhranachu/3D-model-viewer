const BASE_URL = 'https://threed-model-viewerv2.onrender.com'; // ✅ Correct backend URL

// ✅ Get all models
export const getModels = async () => {
  const res = await fetch(`${BASE_URL}/api/models`);
  return res.json();
};

// ✅ Upload a model
export const uploadModel = async (formData) => {
  const res = await fetch(`${BASE_URL}/api/models/upload`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
};
