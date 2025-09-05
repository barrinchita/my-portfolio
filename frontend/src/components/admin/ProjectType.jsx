import React, { useEffect, useState } from "react";
import LogStatus from "./LogStatus";
import styles from '../css/admin.module.css'

import Aside from "./Aside";

import getEnv from "../JS/env";

function ProjectType() {
    const [projectType, setProjectType] = useState("");
    const [data, setData] = useState(null);
    const [checkFields, setCheckFields] = useState(true);
    const [error, setError] = useState({ status: false, message: "", bg: "green" });
    const [formData, setFormData] = useState({
        skillname: [{id: 1, skill: ""}],
        proficiency: [{id: 1, proficiency: ""}],
        framework: [{id: 1, framework: ""}],
        expirience: [{id: 1, expirience: 0}]
    })

    const add = (type, fields) => {
      setFormData((prevData) => ({
        ...prevData,
        [type]: [...prevData[type], fields],
      }));
    };

    const isFormValid = () => {
      // Check if every field in every array has been filled
      return (
        formData.skillname.every((item) => item.skill.trim() !== "") &&
        formData.proficiency.every((item) => item.proficiency.trim() !== "") &&
        formData.framework.every((item) => item.framework.trim() !== "") &&
        formData.expirience.every((item) => item.expirience > 0)
      );
    };

    const create = async () => {

      console.log(formData)
        const send = {
            projectType: projectType
        }

        if(isFormValid()){
            const response = await fetch(`${getEnv().REACT_APP_API_URL}/project/addProjectType`, 
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(formData)
                
            })

            if(response.ok){

                let data = await response.json();

                if(response.status == 201){
                    setError((prevError) => ({
                    ...prevError,
                    status: true,
                    message: data.message,
                    bg: 'orange'
                  }));
                  
                  return;
                }

                if(response.status == 200){
                    setError((prevError) => ({
                        ...prevError,
                        status: true,
                        message: data.message,
                        bg: 'green'
                      }));

                    setFormData({
                        skillname: [{id: 1, skill: ""}],
                        proficiency: [{id: 1, proficiency: ""}],
                        framework: [{id: 1, framework: ""}],
                        expirience: [{id: 1, expirience: 0}]
                    });

                }
            }
        }else{
          setError((prevError) => ({
            ...prevError,
            status: true,
            message: "All fields are required",
            bg: 'red'
          }));
        }
        
    };

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setError((prevError) => ({
            ...prevError,
            status: false,
            message: "",
            bg: 'green'
            }));
        }, 4000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [error.status]);

  const setType = (value, type, ofType, id) => {

    setFormData((prevData) => ({
      ...prevData,
      [type]: prevData[type].map((field) =>
        field.id === id ? { ...field, [ofType]: value } : field
      ),
    }));
  };

  return (
    <>
        { error.status && <LogStatus bg={error.bg} message={error.message} />}
      <Aside />
      <div className={`${styles.skillsCon} ${styles.uploadMain}`}>
        <div>
          <label htmlFor="">Skill name</label>
          {
            formData.skillname.map((field) =>(
              <input 
                key={field.id}
                type="text"
                value={formData.skillname.skill}
                onChange={(e) => {
                  setType(e.target.value, "skillname", "skill", field.id);
                }}
                placeholder="Project type"
              />
            ))
          }
        </div>

        <div>
          <label htmlFor="">Proficiency (on 100)</label>
          {
            formData.proficiency.map((field) =>(
              <input 
                key={field.id}
                type="text"
                value={formData.proficiency.proficiency}
                onChange={(e) => {
                  setType(e.target.value, "proficiency", "proficiency", field.id);
                }}
                placeholder="Proficiency"
              />
            ))
          }
        </div>

        <div>
          <div className={styles.frameworkDiv}>
            <label htmlFor="">Frameworks</label>
            <button
              onClick={() => {
                let fields = {
                  id: formData.framework.length + 1,
                  framework: "",
                }
                add("framework", fields);
              }}
            >add</button>
          </div>
          {
            formData.framework.map((field) =>(
              <input 
                key={field.id}
                type="text"
                value={formData.framework.framework}
                onChange={(e) => {
                  setType(e.target.value, "framework", "framework", field.id);
                }}
                placeholder="Framework"
              />
            ))
          }
        </div>

        <div>
          <label htmlFor="">Expirience (yrs)</label>
          {
            formData.expirience.map((field) =>(
              <input 
                key={field.id}
                type="text"
                value={formData.expirience.expirience}
                onChange={(e) => {
                  setType(e.target.value, "expirience", "expirience", field.id);
                }}
                placeholder="expirience"
              />
            ))
          }
        </div>
        
        <button onClick={()=> {
          create()
        }}>create</button>
      </div>
    </>
  );
}

export default ProjectType;
