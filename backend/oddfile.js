 // try{
    //     const projectData = req.body;

    //     console.log(projectData)

    //     if(projectData.participants){
    //         projectData.participants.map(el => {
    //             let imageBuffer = Buffer.from(el.participantImage, "base64");
    //             el.participantImage = imageBuffer;
    //         })
    //     }

    //     if(projectData.textImage){
    //         projectData.textImage.map(el => {
    //             let imageBuffer = Buffer.from(el.imageData, "base64");
    //             el.imageData = imageBuffer;
    //         })
    //     }

    //     data = projectData
    //     console.log(data)

    //     const newProject = new Project(data);
    //     await newProject.save()
    //     .then(() => {
    //         console.log('project Saved successfully');
    //         console.log(newProject)
    //     })
    //     .catch((err) => console.log('Error occured. Having trouble saving project', err));

    //     res.status(201).json({success: true, message: 'Project saved successfully'});
    // }catch(error){
    //     console.log('an error happenend.', error)
    //     res.status(400).json({success: false, message: 'an error occured'});
    //     return
    // }