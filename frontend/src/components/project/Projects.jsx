import React, { useState, useEffect } from "react";
import styles from "../css/main.module.css";

import { FaHockeyPuck } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import projectImg from "../../assets/web1.jpeg";
import projects from "../JS/projects.js";

import Getprojects from "./Getprojects.jsx";

// const getData = async()=>{
//   try{
//       const response = await fetch("http://localhost:8000/api/project/");

//     if(response.ok){
//       let data = await response.json();
//       console.log(data.message);
//       return data.message;
//     }
//   }catch(error){
//     console.log("Error fetching data", error);
//   }
// }

function Projects(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
      let limit = Math.floor((window.innerWidth/16)/22);
      const projectTitle = props.title; // Replace with the title you want to match
      const response = await fetch(`http://localhost:8000/api/project?limit=${limit}&title=${encodeURIComponent(projectTitle)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      setData(result.message);
      } catch (err) {
      setError(err.message);
      } finally {
      setLoading(false);
      }
    }

    fetchData();
  }, []);
  
    // Conditional rendering based on data state
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className={styles.projectDiv}>
        <div className={styles.projectBar}>
          <h2>{props.title}</h2>
          <button>
            View All <FaHockeyPuck />{" "}
          </button>
        </div>

        <div className={styles.allProjects}>
          {/* <div className={styles.project}>
            <img src={projectImg} alt="" />
            <div className={styles.projectBody}>
              <h1 className={styles.projectTitle}>
                Title of project goes here. jk
              </h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                saepe{" "}
              </p>
              <div>
                <button>Project</button>
              </div>
            </div>
          </div> */}

          {data && data.length > 0 ? 
            <Getprojects data={data} />
            : (<p>No data</p>)
          } 

          {/* {project} */}
        </div>

        <div className={styles.toggleProject}>
          <button>
            {" "}
            <FaChevronLeft />{" "}
          </button>
          <div>
            <p></p>
            <p className={styles.bigToggle}></p>
            <p></p>
          </div>
          <button>
            {" "}
            <FaChevronRight />{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Projects;
