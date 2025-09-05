import { Service } from "../../schemas/projectSchema.js";

const service = async (req, res) => {
    try {
        const { serviceName, serviceDescription, serviceImage } = req.body;

        // Validate required fields
        if (!serviceName || !serviceDescription) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'Service name and description are required' });
        }

        // Create a new service
        const newService = new Service({
            serviceName,
            serviceDescription,
            serviceImage,
        });

        await newService.save();
        console.log('Service created:', serviceName);
        return res.status(201).json({ 
            message: 'Service created successfully',
            service: newService 
        });

    } catch (error) {
        console.error('Error in service creation:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}

export default service;