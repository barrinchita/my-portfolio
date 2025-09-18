import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  id: { type: String },
  imagePath: { type: String, required: true },
  imageDescription: { type: String },
});

const stackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  descripition: { type: String },
});

const projectSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true },
  projectType: { type: String, required: true },
  image: { type: [imageSchema], required: true },
  stack: { type: [stackSchema], required: true },
  websiteLink: { type: String },
  githubRepo: { type: String },
  datePosted: { type: Date, default: Date.now },
});

export const Project = mongoose.model("Project", projectSchema);


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

const service = new mongoose.Schema({
  serviceName: { type: String, required: true },
  serviceDescription: { type: String, required: true },
  serviceImage: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
});

// graphics schema

const graphics = new mongoose.Schema({
  group: [
    {
      id: {type: Number, required: true},
      img: {type: String, required: true},
      description: {type: String}
    }
  ]
})

export const Graphics = mongoose.model("Graphics", graphics);

export const Service = mongoose.model("Service", service);

export const ImagesModel = mongoose.model("projectImages", projectImages);

export const ProjectTypes = mongoose.model("projectType", projectType);
