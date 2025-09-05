import { ProjectTypes } from "../../schemas/projectSchema.js";

const getProjectTpe = async (req, res) => {
  try {
    const types = await ProjectTypes.find({});

    if (types) {
      console.log(types);
      res
        .status(200)
        .json({ status: true, message: "Project types gotten", data: types });

      return;
    }

    res.status(300).json({ status: true, message: "No project types", data: "" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: false, message: "An internal server error"});
  }

};

export default getProjectTpe;
