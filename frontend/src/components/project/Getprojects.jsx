import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../css/main.module.css";

function Getprojects({ data }) {
  // Check if data exists and is an array
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No projects available.</p>;
  }

  return (
    <>
      {data.map((field) => (
        <div key={field._id} className={styles.project}>
          {/* Image with fallback */}
          <img
            src={field?.image[0]?.imagePath || 'default-image.jpg'}
            alt={ 'image'}
          />
          <div className={styles.projectBody}>
            {/* Title with fallback */}
            <h1 className={styles.projectTitle}>
              {field?.projectTitle || 'No Title Available'}
            </h1>
            <p style={{ height: '40px', overflow: 'hidden' }}>
              {field?.image[0]?.imageDescription || 'No description available.'}
            </p>
            <div>
              {/* Link to the project page */}
              <Link to={`/project/:${field._id}`} className={styles.projectLink}>
                View Project
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Getprojects;
