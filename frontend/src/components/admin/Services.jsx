import React, { useState } from 'react';
import styles from '../css/Services.module.css';
import Aside from './Aside';
import getEnv from '../JS/env';

const Services = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !desc || !image) {
      alert('Please fill out all fields.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch(`${getEnv().REACT_APP_API_URL}/project/uploadImage`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const imageUrl = data.imageUrl;

      if(!response.ok) {
        throw new Error(data.error || 'Image upload failed');
      }

      const serviceData = {
        serviceName: title,
        serviceDescription: desc,
        serviceImage: imageUrl,
      };

      const serviceResponse = await fetch(`${getEnv().REACT_APP_API_URL}/project/createService`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!serviceResponse.ok) {
        const errorData = await serviceResponse.json();
        throw new Error(errorData.error || 'Service creation failed');
      }
      alert('Service added successfully!');

      setTitle('');
      setDesc('');
      setImage(null);
      setPreview('');
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Aside />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Service Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Service Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className={styles.textarea}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="preview" className={styles.preview} />}
        <button type="submit" className={styles.button} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Add Service'}
        </button>
      </form>
    </>
  );
};

export default Services;
