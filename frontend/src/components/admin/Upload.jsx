import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import styles from "../css/admin.module.css";
import { sendError, toggleProject, validateImage } from "./functions.js";
import LogStatus from "./LogStatus.jsx";

import Aside from "./Aside.jsx";
// import { NativeBuffer } from "mongoose";

function Upload() {
  const [toogleMeta, setToogleMeta] = useState(false);
  const [toggleCodebase, setToggleCodebase] = useState(false);
  const [fileItems, setFileItems] = useState([]);
  const [error, setError] = useState({ status: false, message: "" });
  const [formData, setFormData] = useState({
    projectTitle: [{ id: Date.now(), title: "" }],
    projectType: [{ id: Date.now(), type: "" }],
    projectOverview: [{ id: Date.now(), overview: "" }],
    participants: [{ id: Date.now(), participantName: "" }],
    stacks: [{ id: Date.now(), stack: "" }],
    githubRepo: [{ id: Date.now(), repo: "" }],
    websiteLink: [{ id: Date.now(), link: "" }],
    textImage: [
      {
        id: Date.now(),
        imageTitle: "",
        imageDescription: "",
      },
    ],
    conclusion: [{ id: Date.now(), conclusion: "" }],
  });
  const [getTypes, setGetTypes] = useState({ status: true, data: [] });
  // setGetTypes(true);

  useEffect(() => {
    if (getTypes.status) {
      // get project types (skills) from db

      const getProjectTypes = async () => {
        const response = await fetch(
          "http://localhost:8000/api/project/getProjectTypes"
        );
        if (response.ok) {
          let types = await response.json();
          console.log(types.data);
          setGetTypes((prevData) => ({
            ...prevData,
            status: false,
            data: types.data,
          }));
        }
      };

      getProjectTypes()
        .then(() => {
          console.log("project types gotten");
          //  console.log(getTypes.data)
        })
        .catch((error) => {
          console.log("An error occured", error);
        });
    }

    let timeoutId = setTimeout(() => {
      setError((prevError) => ({
        ...prevError,
        status: false,
        message: "",
      }));
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error.status, getTypes]);

  const update = async (e, type, id, typeField) => {
    let value;
    if (e.target.name === "file") {
      const file = e.target.files[0];

      let newFile = await validateImage(file);
      if (newFile.status != true) {
        setError((prevError) => ({
          ...prevError,
          status: true,
          message: newFile.message,
        }));
        console.log(newFile.message);
        return;
      }

      if (newFile) {
        const newImage = {
          field: type,
          image: newFile.message,
        };

        setFileItems((prevImages) => [...prevImages, newImage]);
      }

      return;
    } else {
      value = e.target.value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [type]: prevData[type].map((field) =>
        field.id === id ? { ...field, [typeField]: value } : field
      ),
    }));
  };

  const add = (type, fields) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], fields],
    }));
  };

  const  sendFormData = async () => {
    let response;
    try {
      var formFiles = new FormData();
      fileItems.forEach((item) => {
        formFiles.append("field", item.field); // Append field to form data
        formFiles.append("image", item.image); // Append image file to form data
      });

      console.log("trying to send form files")

      response = await fetch("http://localhost:8000/api/project/create", {
        method: "POST",
        body: formFiles,
      });

      let data = await response.json();

      if (!response.ok) {
        sendError(setError, "Having problems saving your images.");
        return;
      } else {
        console.log(data.id);
      }

      if (data.id) {
        response = await fetch("http://localhost:8000/api/project/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            id: data.id,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          sendError(setError, "Having problems saving your data.");
          let data = await response.json();
          console.log(data)
          return;
        } else {
          console.log("message", data.message);
        }
      }
    } catch (error) {
      sendError(setError, "Having problems saving your data.");
      console.log("An error occured", error);
    }
  };

  return (
    <>
      <Aside />
      <Link to="admin/projectType">project type</Link>
      {error.status && <LogStatus bg="red" message={error.message} />}
      <div className={styles.uploadAllDiv}>
        <div className={styles.uploadMetaData} id="uploadMetaData">
          <div className={styles.uploadHead}>
            <h3>Project's Metadata</h3>
            <button
              onClick={(e) => {
                setToogleMeta(!toogleMeta);
                toggleProject(e, toogleMeta, "uploadMetaData");
              }}
              className={styles.toogleBtn}
            >
              <FaChevronDown />
            </button>
          </div>

          <div className={styles.projectTitle}>
            <h3>Project title</h3>
            <>
              {formData.projectTitle.map((field) => (
                <input
                  key={field.id}
                  type="text"
                  placeholder="Project's name/title"
                  onChange={(e) => {
                    update(e, "projectTitle", field.id, "title");
                  }}
                />
              ))}
            </>

            {formData.projectType.map((field) => (
              <select
                key={field.id}
                name=""
                onChange={(e) => {
                  update(e, "projectType", field.id, "type");
                }}
              >
                {getTypes.data.map((field) => (
                  <option key={field._id} value={field.skillname[0].skill}>
                    {field.skillname[0].skill}
                  </option>
                ))}
              </select>
            ))}

            <div>
              <h3>Project overview</h3>
              {formData.projectOverview.map((field) => (
                <textarea
                  cols="60"
                  rows="7"
                  key={field.id}
                  name=""
                  placeholder="Project overview"
                  onChange={(e) => {
                    update(e, "projectOverview", field.id, "overview");
                  }}
                ></textarea>
              ))}
            </div>
          </div>

          <div className={styles.participants}>
            <div>
              <h3>Participants</h3>
              <div>
                {formData.participants.map((field) => (
                  <div key={field.id} className={styles.participantInfo}>
                    <p>
                      {" "}
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => {
                          update(
                            e,
                            "participants",
                            field.id,
                            "participantImage"
                          );
                        }}
                      />{" "}
                    </p>
                    <input
                      type="text"
                      value={field.participantName}
                      className={styles.participantInp}
                      placeholder="partitipant name"
                      onChange={(e) => {
                        update(e, "participants", field.id, "participantName");
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  const fields = {
                    id: Date.now(),
                    participantImage: "",
                    particpantName: "",
                  };
                  console.log("lsdhjf");
                  add("participants", fields);
                }}
              >
                Add <FaPlus />{" "}
              </button>
            </div>
          </div>

          <div className={styles.projectStacks}>
            <div className={styles.stacksHead}>
              <h3>project stacks</h3>
              <button
                onClick={() => {
                  let fields = { id: Date.now(), stack: "" };
                  add("stacks", fields);
                }}
              >
                Add <FaPlus />{" "}
              </button>
            </div>
            <div>
              {formData.stacks.map((field) => (
                <div key={field.id}>
                  <input
                    type="text"
                    placeholder="Stack"
                    onChange={(e) => {
                      update(e, "stacks", field.id, "stack");
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.additionalInfo}>
            <h3>Additional info</h3>
            <div className={styles.additionalBtns}>
              <div>
                <label htmlFor="">Github repo</label>
                <>
                  {formData.githubRepo.map((field) => (
                    <input
                      key={field.id}
                      type="text"
                      placeholder="Github repository link"
                      onChange={(e) => {
                        update(e, "githubRepo", field.id, "repo");
                      }}
                    />
                  ))}
                </>
              </div>
              <div>
                <label htmlFor="">Website link</label>
                <>
                  {formData.websiteLink.map((field) => (
                    <input
                      key={field.id}
                      type="text"
                      placeholder="website link"
                      onChange={(e) => {
                        update(e, "websiteLink", field.id, "link");
                      }}
                    />
                  ))}
                </>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.codebase} id="codebase">
          <div className={styles.codebaseHead}>
            <div className={styles.codebaseTitle}>
              <h3>Codebase and project overview</h3>
              <button
                className={styles.toogleBtn}
                onClick={(e) => {
                  setToggleCodebase(!toggleCodebase);
                  toggleProject(e, toggleCodebase, "codebase");
                }}
              >
                <FaChevronDown />
              </button>
            </div>
            <div className={styles.codebaseBtns}>
              <button>
                Add text field <FaPlus />{" "}
              </button>
              <button
                onClick={() => {
                  let fields = {
                    id: Date.now(),
                    imageTitle: "",
                    imageData: "",
                    imageDescription: "",
                  };
                  add("textImage", fields);
                }}
              >
                Text and image <FaPlus />{" "}
              </button>
            </div>
          </div>
          <div className={styles.codebaseTI}>
            {formData.textImage.map((field) => (
              <div key={field.id} className={styles.belowCodebase}>
                <div>
                  <p>
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => {
                        update(e, "textImage", field.id, "imageData");
                      }}
                    />
                  </p>
                  <input
                    type="text"
                    value={field.imageTitle}
                    placeholder="image title"
                    onChange={(e) => {
                      update(e, "textImage", field.id, "imageTitle");
                    }}
                  />
                </div>
                <textarea
                  name=""
                  value={field.imageDescription}
                  placeholder="small description here"
                  onChange={(e) => {
                    update(e, "textImage", field.id, "imageDescription");
                  }}
                ></textarea>
              </div>
            ))}
          </div>
        </div>
          
        <div>
          <h3>Project overview</h3>
          {formData.conclusion.map((field) => (
            <textarea
              cols="65"
              rows="7"
              key={field.id}
              name=""
              placeholder="Project conclusion"
              onChange={(e) => {
                update(e, "conclusion", field.id, "conclusion");
              }}
            ></textarea>
          ))}
        </div>

        <div className={styles.endBtns}>
          <button
            onClick={() => {
              console.log(fileItems);
              if (formData.projectTitle[0].title != "") {
                sendFormData();
              } else {
                sendError(setError, "Make sure the project title is inserted");
              }
            }}
          >
            Submit
          </button>
          <button className={styles.red}>Discard</button>
        </div>
      </div>
    </>
  );
}

export default Upload;
