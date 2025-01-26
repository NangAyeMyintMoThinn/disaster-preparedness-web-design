import React, { useState, useEffect } from 'react';
import './Form.css';

function Form() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    imageUrl: '', // URL from the API
    imageFile: null, // File object for upload
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch image from API (example API)
  const fetchImage = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://picsum.photos/200/300'); // Example API
      if (!response.ok) throw new Error('Failed to fetch image');
      const imageUrl = response.url;
      setFormData((prev) => ({ ...prev, imageUrl }));
    } catch (error) {
      setErrors({ ...errors, image: 'Failed to load image from API' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage(); // Fetch image on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.imageFile) {
      newErrors.imageFile = 'Please upload an image';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // You can add your form submission logic here
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label>Image from API</label>
          {loading ? (
            <div className="loading">Loading image...</div>
          ) : (
            <img
              src={formData.imageUrl}
              alt="Fetched from API"
              className="api-image"
            />
          )}
          {errors.image && <span className="error-message">{errors.image}</span>}
        </div>

        <div className="form-group">
          <label>Upload Your Image</label>
          <input
            type="file"
            name="imageFile"
            onChange={handleChange}
            className={errors.imageFile ? 'error' : ''}
            accept="image/*"
          />
          {errors.imageFile && <span className="error-message">{errors.imageFile}</span>}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Form;