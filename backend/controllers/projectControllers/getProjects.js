import { Project } from "../../schemas/projectSchema.js";
const getProjects = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const projectType = req.query.title;
    let query = {};
    if (projectType) {
      query = { 'projectType': projectType };
    }

    console.log(query)

    const project = await Project.find(query).limit(limit);
    res.status(200).json({ message: project });
  } catch (error) {
    res.status(400).json({ message: "Unable to get data" });
  }
};

export default getProjects;
