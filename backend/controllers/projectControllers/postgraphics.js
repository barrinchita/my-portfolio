import { Graphics } from "../../schemas/projectSchema.js";

const postgraphics = async (req, res) => {
    console.log("getting graphics")
    try {
        const group = req.body;

        if (!group || Object.keys(group).length === 0) {
            return res.status(400).json({ error: true, msg: "Must have all required fields" });
        }

        console.log("group: ", group);
        
        const graphicGroup = new Graphics({group: group});

        await graphicGroup.save();

        return res.status(201).json({
            error: false,
            msg: "Graphics group created",
            group: graphicGroup,
        });

    } catch (error) {
        console.log("Error creating graphics group:", error);
        return res.status(500).json({ error: true, msg: "Internal server error" });
    }
};

export default postgraphics;
