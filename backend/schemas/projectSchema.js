import mongoose from "mongoose";

// Define the schema for the project
const projectSchema = new mongoose.Schema({
  imgIds: {
     type: mongoose.Schema.Types.ObjectId, ref: "projectImages",
  },

  projectTitle: [
    {
      title: { type: String },
    },
  ],
  projectOverview: [
    {
      overview: { type: String },
    },
  ],
  participants: [
    {
      participantName: { type: String },
    },
  ],
  projectType: [
    {
      type: { type: String },
    },
  ],
  stacks: [
    {
      stack: { type: String },
    },
  ],
  githubRepo: [
    {
      repo: { type: String },
    },
  ],
  websitelink: [
    {
      link: { type: String },
    },
  ],
  textImage: [
    {
      imageTitle: { type: String },
      imageDescription: { type: String },
    },
  ],
  conclusion: [
    {
      conclusion: { type: String },
    },
  ],
});

const projectType = new mongoose.Schema({
  skillname: [
    {
      id: { type: Number },
      skill: { type: String },
    },
  ],
  proficiency: [
    {
      id: { type: Number },
      proficiency: { type: String },
    },
  ],
  framework: [
    {
      id: { type: Number },
      framework: { type: String },
    },
  ],
  expirience: [
    {
      id: { type: Number },
      expirience: { type: String },
    },
  ],
});

const projectImages = mongoose.Schema({
  textImage: [
    {
      imageTitle: { type: String },
      imageName: { type: String },
      imageDescription: { type: String },
    },
  ],
  participantImage: [
    {
      participantImage: { type: String },
      participantName: { type: String },
    },
  ],
});

export const ImagesModel = mongoose.model("projectImages", projectImages);

export const ProjectTypes = mongoose.model("projectType", projectType);

export const Project = mongoose.model("Project", projectSchema);
