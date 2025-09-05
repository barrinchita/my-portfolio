import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/viewprojects.module.css";

import getEnv from "../JS/env";

function ViewProject() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const id = new URLSearchParams(location.pathname.split(":").pop());
    let idArr = Array.from(id.keys());
    const str = idArr[0];
    const realId = str.endsWith("=") ? str.slice(0, -1) : str;

    const getProject = async () => {
      try {
        const response = await fetch(`${getEnv().REACT_APP_API_URL}/project/${realId}`);
        const data = await response.json();
        if (response.ok) {
          setProject(data.data);
        } else {
          throw new Error("Project not found");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, []);

  const openModal = (img) => {
    setModalImage(img);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalImage(null);
  };

  if (loading) return <h1 className={styles.loading}>Loading project...</h1>;
  if (!project) return <h2 className={styles.error}>Project not found</h2>;

  return (
    <div className={styles.viewProject}>
      <header className={styles.projectHeader}>
        <h1>{project.projectTitle || "Untitled Project"}</h1>
        <p className={styles.projectType}>{project.projectType}</p>
        <p className={styles.date}>
          Posted on:{" "}
          {new Date(project.datePosted).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <section className={styles.mainImageSection}>
        {project.image?.[0]?.imagePath && (
          <img
            src={project.image[0].imagePath}
            alt="Main Project"
            className={styles.mainImage}
          />
        )}
        {project.image?.[0]?.imageDescription && (
          <p className={styles.imageDescription}>
            {project.image[0].imageDescription}
          </p>
        )}
      </section>

      <section className={styles.carouselSection}>
        <h2>Project Gallery</h2>
        <div className={styles.carousel}>
          {project.image?.slice(1).map((img, index) => (
            <div key={index} className={styles.carouselItem}>
              <img
                src={img.imagePath}
                alt={`carousel-${index}`}
                className={styles.carouselImage}
                onClick={() => openModal(img)}
              />
              {img.imageDescription && <p>{img.imageDescription}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.technologySection}>
        <h2>Technologies Used</h2>
        <ul className={styles.techList}>
          {project.stack?.map((tech, index) => (
            <li key={index} className={styles.techItem}>
              <h4>{tech.name}</h4>
              <p>{tech.descripition}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.linksSection}>
        <h2>Links</h2>
        <p>
          <strong>Website:</strong>{" "}
          {project.websiteLink ? (
            <a href={project.websiteLink} target="_blank" rel="noopener noreferrer">
              {project.websiteLink}
            </a>
          ) : (
            "Not available"
          )}
        </p>

        <p>
          <strong>GitHub:</strong>{" "}
          {project.githubRepo ? (
            <a href={project.githubRepo} target="_blank" rel="noopener noreferrer">
              {project.githubRepo}
            </a>
          ) : (
            "Not available"
          )}
        </p>
      </section>

      {modalVisible && modalImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ✕
            </button>
            <img src={modalImage.imagePath} alt="Zoom" className={styles.modalImage} />
            <div className={styles.modalDescription}>
              {modalImage.imageDescription || "No description available"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProject;
