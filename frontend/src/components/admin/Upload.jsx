import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import LogStatus from "./LogStatus";
import styles from "../css/admin.module.css";
import { deleteImage, projectCategories } from "./functions";
import cameraIcon from "../../assets/cameraIcon.png";
import getEnv from "../JS/env";

function Upload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState([{ url: "" }]);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ message: "", bg: "" });
  const [updatedIndex, setUpdatedIndex] = useState(0);
  const [categories, setCategories] = useState(null);

  const [project, setProject] = useState({
    projectTitle: "",
    projectType: "",
    image: [
      {
        id: "",
        imagePath: "",
        imageDescription: "",
      },
    ],
    stack: [
      {
        name: "",
        descripition: "",
      },
    ],
    websiteLink: "",
    datePosted: new Date().toISOString().slice(0, 10),
    githubRepo: "",
  });

  const MAX_FILE_SIZE_MB = 5;

  const handleFileChange = (e, index) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const isValidType = validTypes.includes(selectedFile.type);
    const isValidSize = selectedFile.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

    if (!isValidType) {
      setStatusMessage({
        bg: "red",
        message: "Only image files allowed (jpg, png, webp).",
      });
      return;
    }

    if (!isValidSize) {
      setStatusMessage({ bg: "red", message: "File size must be under 5MB." });
      return;
    }

    setUpdatedIndex(index + 1);
    setFile(selectedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl((prev) => {
        const newPreview = [...prev];
        newPreview[index] = { url: fileReader.result };
        return newPreview;
      });
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const handleUpload = async (index) => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      setImageLoading(true);

      const response = await fetch(
        `${getEnv().REACT_APP_API_URL}/project/uploadImage`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok && data.status === true && data.imageUrl !== "") {
        setUploadError(false);
        setProject((prev) => {
          const newImages = [...prev.image];
          newImages[index] = {
            ...newImages[index],
            id: "",
            imagePath: data.imageUrl,
            imageDescription: newImages[index]?.imageDescription || "",
          };
          return { ...prev, image: newImages };
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
      setUploadError(true);
    } finally {
      setImageLoading(false);
    }
  };

  const handleDelete = async (filename, index) => {
    const formatted = filename.split("portfolioImages").pop().split("/").pop();
    const response = await deleteImage(formatted);

    if (response && response.status !== false) {
      handleRemove(index);
      setStatusMessage({ bg: "green", message: response.message });
    } else {
      setStatusMessage({ bg: "red", message: response.message });
    }
  };

  const handleRemove = (index) => {
    setFile(null);
    setPreviewUrl((prev) => {
      const newPrev = [...prev];
      newPrev.splice(index, 1);
      return newPrev;
    });
    setProject((prev) => {
      const newImages = [...prev.image];
      newImages.splice(index, 1);
      return { ...prev, image: newImages };
    });
  };

  const handleDescriptionChange = (e, index) => {
    const { value } = e.target;
    setProject((prev) => {
      const newImages = [...prev.image];
      newImages[index] = {
        ...newImages[index],
        imageDescription: value,
      };
      return { ...prev, image: newImages };
    });
  };

  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStackChange = (index, field, value) => {
    const newStack = [...project.stack];
    newStack[index] = {
      ...newStack[index],
      [field]: value,
    };
    setProject((prev) => ({ ...prev, stack: newStack }));
  };

  const addStackField = () => {
    setProject((prev) => ({
      ...prev,
      stack: [...prev.stack, { name: "", descripition: "" }],
    }));
  };

  useEffect(() => {
    if (file !== null) {
      handleUpload(updatedIndex - 1);
    }

    if (statusMessage.message) {
      const timer = setTimeout(() => {
        setStatusMessage({ message: "", bg: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [file, statusMessage]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${getEnv().REACT_APP_API_URL}/project/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        }
      );

      const data = await response.json();
      if (response.ok && data.status === true) {
        setStatusMessage({
          bg: "green",
          message: "✅ Project submitted successfully!",
        });
        // Optionally reset form
        setProject({
          projectTitle: "",
          projectType: "",
          image: [
            {
              id: "",
              imagePath: "",
              imageDescription: "",
            },
          ],
          stack: [
            {
              name: "",
              descripition: "",
            },
          ],
          websiteLink: "",
          datePosted: new Date().toISOString().slice(0, 10),
          githubRepo: "",
        });
        setPreviewUrl([{ url: "" }]);
      } else {
        throw new Error("Failed to submit project");
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ bg: "red", message: "❌ Failed to submit project" });
    }
  };

  useEffect(() => {
    const getProjectCategories = async () => {
      const data = await projectCategories();
      console.log(data)
      if (data != null && data != undefined) {
        setCategories(data.data);
      }
    };

    getProjectCategories();
  }, []);

  return (
    <>
      {statusMessage.message && (
        <LogStatus bg={statusMessage.bg} message={statusMessage.message} />
      )}
      <Aside />

      <main className={styles.uploadMain}>
        <section className={styles.formSection}>
          <h2>📝 Project Info</h2>
          <input
            type="text"
            name="projectTitle"
            placeholder="Project Title"
            value={project.projectTitle}
            onChange={handleProjectInputChange}
          />
          {/* <input
            type="text"
            name="projectType"
            placeholder="Project Type"
            value={project.projectType}
            onChange={handleProjectInputChange}
          /> */}

          <select name="projectType" id="" value={project.projectType} onChange={handleProjectInputChange}>
            <option>Choose project catgory --</option>
            {categories && categories.map((category, index) => (
              <option key={index}>
                {category.skillname[0].skill}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="websiteLink"
            placeholder="Website Link"
            value={project.websiteLink}
            onChange={handleProjectInputChange}
          />
          <input
            type="text"
            name="githubRepo"
            placeholder="GitHub Repo"
            value={project.githubRepo}
            onChange={handleProjectInputChange}
          />
          <input
            type="date"
            name="datePosted"
            value={project.datePosted}
            onChange={handleProjectInputChange}
          />
        </section>

        <section className={styles.stackSection}>
          <h2>🧱 Project Stack</h2>
          {project.stack.map((item, index) => (
            <div key={index} className={styles.stackItem}>
              <input
                type="text"
                placeholder="Stack Name"
                value={item.name}
                onChange={(e) =>
                  handleStackChange(index, "name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Description"
                value={item.descripition}
                onChange={(e) =>
                  handleStackChange(index, "descripition", e.target.value)
                }
              />
            </div>
          ))}
          <button className={styles.addButton} onClick={addStackField}>
            + Add Stack
          </button>
        </section>

        <section className={styles.uploadImageMainDiv}>
          <h2 style={{ color: "black" }}>Upload Main Image</h2>
          {!previewUrl[0]?.url && (
            <label className={styles.uploadImageDiv}>
              <img src={cameraIcon} alt="Upload" className={styles.imgIcon} />
              <input
                type="file"
                className={styles.fileUpload}
                onChange={(e) => handleFileChange(e, 0)}
              />
            </label>
          )}
          {imageLoading && (
            <div className={styles.loadingSpinner}>
              <div className={styles.spinner}></div>
              <p>Uploading image...</p>
            </div>
          )}
          {previewUrl[0]?.url && !imageLoading && (
            <div className={styles.previewImage}>
              <img
                src={previewUrl[0].url}
                alt="Main Preview"
                style={{ height: "10em" }}
              />
              <textarea
                placeholder="Main image description"
                value={project.image[0]?.imageDescription || ""}
                onChange={(e) => handleDescriptionChange(e, 0)}
              />
              <button
                className={styles.removeBtn}
                onClick={() => handleDelete(project.image[0]?.imagePath, 0)}
              >
                ❌ Remove
              </button>
            </div>
          )}
        </section>

        <section className={styles.carouselImagesDiv}>
          <h2 style={{ color: "black" }}>Carousel Images</h2>
          {previewUrl.map((img, index) =>
            index === 0 ? null : (
              <div key={index} className={styles.carouselItem}>
                <img src={img.url} alt={`carousel-${index}`} />
                <textarea
                  placeholder="Image Description"
                  value={project.image[index]?.imageDescription || ""}
                  onChange={(e) => handleDescriptionChange(e, index)}
                />
                <button
                  className={styles.removeBtn}
                  onClick={() =>
                    handleDelete(project.image[index]?.imagePath, index)
                  }
                >
                  ❌ Remove
                </button>
              </div>
            )
          )}
          <label className={styles.carouselLable}>
            <img src={cameraIcon} alt="Upload" className={styles.imgIcon} />
            <input
              type="file"
              className={styles.fileUpload}
              onChange={(e) => handleFileChange(e, updatedIndex)}
            />
          </label>


        </section>
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit Project
        </button>
      </main>
    </>
  );
}

export default Upload;
