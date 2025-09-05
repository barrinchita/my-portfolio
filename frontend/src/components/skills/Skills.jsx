import React, { useState, useEffect } from "react";
import projectImg from "../../assets/web1.jpeg";
import { Link } from "react-router-dom";
import getEnv from "../JS/env";

import styles from "../css/main.module.css";

function Skills() {
    const [maps, setMaps] = useState({ status: true, data: [] });
  const [getTypes, setGetTypes] = useState({ status: true, data: [] });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (getTypes.status) {
      // get project types (skills) from db

      const getProjectTypes = async () => {
        const response = await fetch(
          `${getEnv().REACT_APP_API_URL}/project/getProjectTypes`
        );
        if (response.ok) {
          let types = await response.json();
          setGetTypes((prevData) => ({
            ...prevData,
            status: false,
            data: types.data,
          }));
        }
      };

      getProjectTypes();
    }
  }, [getTypes.status]);

  const mapSkill = () => {
    if (!getTypes.data || getTypes.data.length === 0) {
      return <option key={1}>No skills available</option>;
    }

    return getTypes.data.map((field, index) => {
      if (field.skillname && field.skillname.length > 0) {
        return (
          <option key={field.skillname[0]?.id || index} value={field.skillname[0].skill}>
            {field.skillname[0].skill}
          </option>
        );
      } else {
        return <option key={Date.now()}>No skill</option>;
      }
    });
  };

  //   function to get the data of a specific skill from database

  const getSkillData = (skill) => {
    const skillData = getTypes.data.filter((field) => {
      if (field.skillname && field.skillname.length > 0) {
        return field.skillname[0].skill === skill;
      }
    });
  
   return skillData;
  };

  //   mappping the skill data
  const mapSkillData = () => {
    if (!getSkillData && maps.status) {
      return <p>No data available</p>;
    }

    if(maps.data.length === 0){
      var resend = getTypes.data[0].skillname[0].skill;
    }

    let data = resend != undefined ? getSkillData(resend) : getSkillData(maps.data);

    console.log('data ',data)

    return(
    <>
      <p>
        Skill name: <span>{data[0]?.skillname[0]?.skill}</span>
      </p>
      <p>
        Proficiency: <input type="range" style={{width: "60%"}} value={data[0]?.proficiency[0]?.proficiency} name="" id="" />
      </p>
      <p>N° of projects: {data[0]?.expirience[0]?.expirience} </p>
      <p>
        <b>Frame works:</b>{data[0]?.framework[0]?.framework}
      </p>
      <p>Expirience (yrs): {data[0]?.expirience[0]?.expirience} </p>
    </>
    )
  };

  return (
    <section className={styles.skillsSection}>
      <div className={styles.searchDiv}>
        <div className={styles.setSearchBg}>
          <div className={styles.selectDiv}>
            <select
              name=""
              onChange={(e) => {
               setMaps({ status: true, data: e.target.value });
              }}
            >
              {!getTypes.status ? mapSkill() : <option>Loading...</option>}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.allSkillsDiv}>
        <div className={styles.skillsTableAllDiv}>
          <div className={styles.skillTableDiv}>
            <div className={styles.skillTable}>
                {!getTypes.status && maps.status ? mapSkillData() : <option>Loading...</option>}
            </div>
            <img src={projectImg} alt="" />
          </div>
          <div>
            <Link to="/project">
              <button
                onClick={() => {
                  console.log(getTypes.data);
                }}
              >
                Project{" "}
              </button>
            </Link>
          </div>
        </div>

        {/* <div className={styles.skillsList}>
          <p className={styles.skillsListHeading}>1 of 4 skills</p>
          <p>
            Web Design <h1 className={styles.activeSkill}></h1>
          </p>
          <p>Web Design</p>
          <p>Web Design</p>
          <p>Web Design</p>
        </div> */}
      </div>
    </section>
  );
}

export default Skills;
