import { Project } from "../../schemas/projectSchema.js";

export const CreateProject = async (req, res, imagesId, projectData) => {
  try {

    console.log("in create project proper")
    // let imgId = { imagesId };
    const newProject = new Project({
      imgIds: imagesId,
      projectTitle: projectData.projectTitle,
      projectOverview: projectData.projectOverview,
      participants: projectData.participants,
      projectType: projectData.projectType,
      stacks: projectData.stacks,
      githubRepo: projectData.githubRepo,
      projectConclusion: projectData.projectConclusion,
      websiteLink: projectData.websiteLink,
      textImage: projectData.textImage,
      conclusion: projectData.conclusion,
    });

    await newProject.save();

    res.status(200).json({
      message: "Data saved",
      id: newProject?._id || "unknown",
    });
  } catch (error) {
    console.log("error happened")
    res.status(400).json({ message: "An error occured" });
  }
};
