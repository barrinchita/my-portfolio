import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import styles from "../css/admin.module.css";
import cameraIcon from "../../assets/camera.png";

function Upload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      setImageLoading(true);

      // Add your upload API endpoint here
      const response = await fetch("http://localhost:8000/api/project/uploadImage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.status === true) {
        uploadError ? setUploadError(false) : ""
        alert("Upload successful");
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");

      setUploadError(true)

    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (file != null) {
      handleUpload();
    }
  }, [file]);

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
  };


  return (
    <>
      <Aside />

      <main className={styles.uploadMain}>
        {/* for image upload online */}
        <div className={styles.uploadImageMainDiv}>
          {!previewUrl && (
            <label className={styles.uploadImageDiv}>
              <h2>Upload image</h2>
              <img src={cameraIcon} alt="Upload" className={styles.imgIcon} />
              <input
                type="file"
                className={styles.fileUpload}
                onChange={handleFileChange}
              />
            </label>
          )}

          {
            imageLoading && (
              <>
                <div className={styles.loadingSpinner}>
                  <div className={styles.spinner}></div>
                  <p>Uploading image...</p>
                </div>
              </>
            )
          }

          {previewUrl && !imageLoading && (
            <div className={styles.previewImage}>
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "200px", margin: "10px 0" }}
              />
            </div>
          )}

          {
            previewUrl && !uploadError && (
              <div className={styles.uploadButtons}>
                <button onClick={handleRemove} disabled={!file && !previewUrl}>
                  Remove
                </button>
              </div>
            )
          }

          {
            uploadError && !imageLoading && (
              <>
                <div>
                  <button onClick={handleUpload} style={{color: "red", border: '1px solid red'}}>Retry</button>
                </div>
              </>
            )
          }
        </div>
      </main>
    </>
  );
}

export default Upload;
