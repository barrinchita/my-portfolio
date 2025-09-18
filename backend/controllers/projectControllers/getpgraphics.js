import { Graphics } from "../../schemas/projectSchema.js";

const getgraphics = async (req, res) => {
    try {

        console.log("getting graphics");

       let graphics = await Graphics.find();

        console.log("gotten: ", graphics);
        return res.status(201).json({ error: false, msg: "graphics group gotten", graphics: graphics });
    

    } catch (error) {
        console.log("Error getting graphics group:", error);
        return res.status(500).json({ error: true, msg: "Internal server error" });
    }
}

export default getgraphics;