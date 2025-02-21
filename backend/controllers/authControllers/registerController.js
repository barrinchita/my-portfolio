import bcrypt from 'bcrypt';
import { User } from '../../schemas/userSchema.js';

export const register = async (req, res) => {  
    try{
        let name = req.body.name;
        let password = req.body.password;
        let email = req.body.email;
        let hash = await bcrypt.hash(password, 13);
        console.log('hash ', hash);
        
        const newUser =  new User({
            name,
            email,
            password: hash
        });
        console.log(hash)
        newUser.save()
        .then(() => {
            console.log('User Saved successfully');
            console.log(newUser)
        })
        .catch((err) => console.log('Error occured', err));

        res.status(201).json({success: true, message: 'login saved'});
    }catch(error){
        console.log('an error happenend.')
        res.status(400).json({success: false, message: 'an error occured'});
    }
}