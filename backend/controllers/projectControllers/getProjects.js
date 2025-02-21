import { Project } from "../../schemas/projectSchema.js";
const getProjects = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const projectType = req.query.title;
    let query = {};
    if (projectType) {
      query = { 'projectType.type': projectType };
    }

    console.log(query)

    const project = await Project.find(query).limit(limit);
    res.status(200).json({ message: project });
  } catch (error) {
    res.status(400).json({ message: "Unable to get data" });
  }
};

export default getProjects;
// const getProjects = async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit);
//     const type = req.query.title;
//     const project = await Project.find().limit(limit);
//     console.log(project);
//     // if (project) {
//     //   res.status(200).json({ message: project });
//     //   return;
//     // }
//   } catch (error) {
//     res.status(400).json({ message: "Unable to get data" });
//   }
// };

// export default getProjects;
