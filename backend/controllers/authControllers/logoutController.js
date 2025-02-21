import { RefreshTokens } from "../../schemas/userSchema.js";

export const logout = (req, res) => {
    
    const token = req.body.token;

    if(!token) return res.status(401).json({success: false, message: "No refresh token "});

    RefreshTokens.deleteOne({token: token})
    .then(() => {
        console.log('Token deleted successfully');
    })
    .catch(err => console.log('Error occured', err)) ;

    res.status(201).json({success: true, message: 'Logged out'});
}