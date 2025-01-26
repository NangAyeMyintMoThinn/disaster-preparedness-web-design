import React, { useState, useEffect } from 'react';
import './Form.css';

function Form() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    selectedImage: null, // Selected image from API
  });

  const [images, setImages] = useState([]); // List of images from API
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch images from API
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://picsum.photos/v2/list?limit=10'); // Example API
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      setImages(data); // Store fetched images
    } catch (error) {
      setErrors({ ...errors, api: 'Failed to load images from API' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageSelect = (image) => {
    setFormData({ ...formData, selectedImage: image });
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
    if (!formData.selectedImage) {
      newErrors.image = 'Please select an image';
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
          <label>Select Image from API</label>
          {loading ? (
            <div className="loading">Loading images...</div>
          ) : errors.api ? (
            <div className="error-message">{errors.api}</div>
          ) : (
            <div className="image-grid">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`image-item ${
                    formData.selectedImage?.id === image.id ? 'selected' : ''
                  }`}
                  onClick={() => handleImageSelect(image)}
                >
                  <img
                    src={image.download_url}
                    alt={`From API - ${image.author}`}
                    className="thumbnail"
                  />
                </div>
              ))}
            </div>
          )}
          {errors.image && <span className="error-message">{errors.image}</span>}
        </div>

        <div className="form-group">
          <label>Selected Image</label>
          {formData.selectedImage ? (
            <img
              src={formData.selectedImage.download_url}
              alt="Selected"
              className="selected-image"
            />
          ) : (
            <div className="placeholder">No image selected</div>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Form;