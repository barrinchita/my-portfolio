import React, { useEffect, useState } from "react";

const Dashboard = ({ projects, skills }) => {
  // Styles (in-file styling as requested)
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
  };

  const listItemStyle = {
    backgroundColor: "#eef2f7",
    padding: "10px",
    marginBottom: "5px",
    borderRadius: "5px",
  };

  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({projects: 0, skills: 0});
  const [projectTitle, setProjectTitle] = useState([]);
  const [skillTitle, setSkillTitle] = useState([]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/project/projectCount`,
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
        if(data.project){
          setCounts(prevCounts => ({
            ...prevCounts,
            projects: data.project
          }));

          console.log(data.project)
        }

        if(data.skills){
          setCounts(prevCounts => ({
            ...prevCounts,
            skills: data.skills
          }));
        }

        if(data.projectTitle){
          setProjectTitle(data.projectTitle);
        }

        if(data.skillsTitle){
          setSkillTitle(prevCounts => ({
            ...prevCounts,
            skillTitle: data.skillsTitle
          }));
        }
        setLoading(false);

      } catch (error) {
        console.log(error);
        // setLoading(false); // Handle errors
      }
    };

    getProject()
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log(skillTitle.skillTitle)

  return (
    <>
      <div style={containerStyle}>
        {/* Projects Count */}
        <div style={cardStyle}>
          <h2 style={headerStyle}>Total Projects</h2>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>{counts.projects}</p>
        </div>

        {/* Skills Count */}
        <div style={cardStyle}>
          <h2 style={headerStyle}>Total Skills</h2>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {counts.skills}
          </p>
        </div>

        {/* console.log(data.projectTitle[0].projectTitle[0].title) */}
        {/* Recent Projects */}
        <div style={cardStyle}>
          <h2 style={headerStyle}>Recent Projects</h2>
          {projectTitle.length === 0 ? (
            <p>No projects available.</p>
          ) : (
            <ul style={listStyle}>
              {projectTitle.map((project, index) => (
                <li key={index} style={listItemStyle}>
                  {project.projectTitle[0]?.title || 'no title'}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Top Skills */}
        <div style={cardStyle}>
          <h2 style={headerStyle}>Top Skills</h2>
          {skillTitle.length === 0 ? (
            <p>No skills available.</p>
          ) : (
            <ul style={listStyle}>
              { 
                skillTitle.skillTitle.map((skill, index) => (
                  <li key={index} style={listItemStyle}>
                    {skill.skillname[0].skill || 'no skill'}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
