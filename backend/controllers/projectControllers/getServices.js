import { Service } from "../../schemas/projectSchema.js";

const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        if (!services || services.length === 0) {
            return res.status(404).json({ message: 'No services found' });
        }

        console.log('Services fetched successfully:', services);
        res.status(200).json({message: 'Services fetched successfully', services });
    }
    catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export default getServices;