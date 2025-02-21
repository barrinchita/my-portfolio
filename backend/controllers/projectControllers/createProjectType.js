import express from "express";
import { ProjectTypes } from "../../schemas/projectSchema.js";

const createProjectType = async (req, res) => {
  console.log(req.body);

  try {
    // Extract data from the request body
    const { skillname, proficiency, framework, expirience } = req.body;

    // Validation: Check if required fields are provided
    if (!skillname || !Array.isArray(skillname) || skillname.length === 0) {
      return res.status(400).json({ message: "Skill name is required and must be an array." });
    }

    const skill = skillname[0]?.skill;
    if (!skill || typeof skill !== "string") {
      return res.status(400).json({ message: "A valid skill name is required." });
    }

    // Check if the project type already exists
    const checkType = await ProjectTypes.findOne({ "skillname.skill": skill });
    if (checkType) {
      console.log("Project already exists:", checkType);
      return res.status(201).json({ message: "Project type already exists." });
    }

    // Create a new project type instance
    const newProjectType = new ProjectTypes({
      skillname,
      proficiency,
      framework,
      expirience,
    });

    // Save to the database
    await newProjectType.save();

    console.log("Project type created:", newProjectType);

    // Respond with success
    return res.status(200).json({
      message: "Project type created successfully.",
      data: newProjectType,
    });
  } catch (error) {
    console.error("Error saving project type:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default createProjectType;
