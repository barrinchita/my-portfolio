import { Project } from "../../schemas/projectSchema.js";

export const CreateProject = async (req, res) => {
 try {
  console.log("incoming project")
    const project = new Project(req.body);
    await project.save();
    res.json({ status: true, message: "Project saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: err.message });
  }
};

export default CreateProject;