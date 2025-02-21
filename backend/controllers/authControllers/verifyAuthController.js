
const verifyAuth = (req, res) => {
    res.status(200).json({success: true, message: 'Token verified'});
}

export default verifyAuth;