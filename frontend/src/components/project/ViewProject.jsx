import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

import styles from "../css/viewprojects.module.css";

function ViewProject() {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Use useLocation hook

  useEffect(() => {
    const id = new URLSearchParams(location.pathname.split(":").pop());
    let idArr = Array.from(id.keys());
    const str = idArr[0];
    const realId = str.endsWith("=") ? str.slice(0, -1) : str;

    const getProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/project/${realId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          console.log("response not ok")
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setProject(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false); // Handle errors
      }
    };

    if (id) {
      getProject();
    }
  }, [loading]);

  // Check for participants
  // const participants = 

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.viewProject}>
      <div className={styles.projectHeader}>
        <div className={styles.projectTitle}>
          <h1>{project.projectTitle[0].title || "Title of the project goes here"}</h1>
          <div className={styles.projectParticipants}>

            {
              project.participants?.map((participantImage, index) => (
                <div key={index}>
                  <img src={`../../../uploads/${participantImage.participantImage}`} alt="" />
                  {/* <h3>{participant.pa || 'Bar'}</h3>  */}
                </div>
              )) || []
            }

          </div>
        </div>

        <div className={styles.projectStatus}>
          <div className={styles.projectDescription}>
            <h3>Project Description</h3>
            <p>{project.projectOverview?.[0]?.overview || 'No overview available'}</p>
          </div>

          {
            project.participants?.map((participantImage, index) => (
              <div className={styles.projecttalk} key={index}>
                <h4>{participantImage.imageTitle}</h4>
                <img src={`../../../uploads/${participantImage.participantImage}`} alt="" />
                <p>{participantImage.imageDescription}</p>
              </div>
            ))
          }

          <div className={styles.projectConclusion}>
            <p>{project.conclusion?.[0]?.conclusion || 'No conclusion available'}</p>
          </div>
        </div>
      </div>

      <div className={styles.projectDetails}>
        <div>
          <h3>Project type</h3>
          <p>{project.projectType?.[0]?.type || 'No type available'}</p>
        </div>

        <div>
          <h3>Date posted</h3>
          <p>12th October, 2021</p>
        </div>

        <div>
          <h3>
            Hosted? <span>Yes</span>
          </h3>
          <p>{project.websitelink?.[0]?.link || 'No link'}</p>
        </div>

        <div>
          <h3>Project Status</h3>
          <p>{project.status || 'Status not available'}</p>
        </div>

        <div>
          <h3>Github repository</h3>
          <p>{project.githubRepo?.[0]?.repo || 'No repository'}</p>
        </div>

        <div className={styles.projectTechnologies}>
          <h3>Technologies used</h3>
          {project.stacks?.map((stack, index) => (
            <div key={index}>
              <p>{stack.stack}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewProject;
