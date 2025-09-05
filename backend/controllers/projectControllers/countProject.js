import { Project, ProjectTypes } from "../../schemas/projectSchema.js";

const CountProjects = async (req, res) => {
        console.log("in count project route")
    try {
        const countProject = await Project.countDocuments();
        const countSkills = await ProjectTypes.countDocuments();

        const projects = await Project.find({}, "projectTitle -_id").limit(10);
        const skills = await ProjectTypes.find({}, "skillname.skill -_id").limit(10);

        console.log(JSON.stringify(projects))
        console.log(JSON.stringify(skills))

        res.status(200).json({message: "project counted", success: true, project: countProject, skills: countSkills, projectTitle: projects, skillsTitle: skills});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default CountProjects