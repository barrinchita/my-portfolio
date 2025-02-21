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
            src={`../../../uploads/${field?.participants?.[0]?.participantImage || 'default-image.jpg'}`}
            alt={field?.participants?.[0]?.participantName || 'Participant'}
          />
          <div className={styles.projectBody}>
            {/* Title with fallback */}
            <h1 className={styles.projectTitle}>
              {field?.projectTitle?.[0]?.title || 'No Title Available'}
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Eaque saepe{" "}
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
