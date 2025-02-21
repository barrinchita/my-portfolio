import { ProjectTypes } from "../../schemas/projectSchema.js";

const getProjectTpe = async (req, res) => {
  const types = await ProjectTypes.find({}, );

  if (types) {
    console.log((types))
    res.status(200).json({ message: "Project types gotten", data: types });

    return;
  }

  res.status(400).json({ message: "No project types", data: "" });
};

export default getProjectTpe;
