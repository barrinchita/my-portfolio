const uploadProjectImages = (req, res) => {
    console.log("request arrived");
    
    setTimeout(()=>{
        res.status(200).json({msg: "uploaded successfully", status: true});
    }, 2000)

}

export default uploadProjectImages;