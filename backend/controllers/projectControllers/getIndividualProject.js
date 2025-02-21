import { Project } from "../../schemas/projectSchema.js";

const individualProject = async (req, res) => {
  console.log("in individual project");
  try {
    // const project = await Project.findOne({ _id: req.params.id }).populate(
    //   "imgId"
    // );
    // console.log(project);

    console.log("id ", req.params.id)

    const project = await Project.findById(req.params.id).populate("imgIds");
    console.log(project);
    res
      .status(200)
      .json({ message: "project gotten", success: true, data: project });
  } catch (error) {
    console.log("error happened", error);
    res.status(400).json({ message: "Unable to get data", success: false });
  }
};

export default individualProject;
