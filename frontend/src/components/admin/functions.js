export const toggleProject = (e, toggleState, toggleDiv) => {
  let metaData = e.target.closest(`#${toggleDiv}`);
  if (toggleState) {
    metaData.style.height = "auto";
    metaData.style.overflow = "auto";
    return;
  }
  metaData.style.height = "3.5em";
  metaData.style.overflow = "hidden";
};

export const validateImage = async (image) => {
  try {
    const allowedFormat = ["jpg", "jpeg", "png", "webp"];
    const target = image.type.split("/").pop();

    if (!allowedFormat.includes(target)) {
      return {status: false, message: "Image format not supported"};
    }

    let size = image.size;
    if (((size / 1024) / 1024) > 5) {
      return {status: false, message: "image size is way too big."};
    }

    const newName = "IMG-" + image.name;

    const renamedFile = new File([image], newName, {
      type: image.type,
      lastModified: image.lastModified,
    });

    return {status: true, message: renamedFile};
  } catch (error) {
    console.log("An error happened while processing image");
    return {status: false, message: "Error processing image"};
  }
};

export const sendError = (setError, message) => {
  setError((prevError) => ({
    ...prevError,
    status: true, message: message
  }))
}

// get project and skills count

export const countProject = async () => {
  console.log('in counproject function ')
  try {
    const response = await fetch('/api/projectCount');
    // const skillsResponse = await fetch('/api/skills');
    
    const projects = await response.json();
    // if(response)
    // console.log(projects)

    return {
      projects: projects.length,
    };
  } catch (error) {
    console.error('Error fetching counts:', error);
    return { projects: 0, skills: 0 };
  }
};