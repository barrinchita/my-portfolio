
const logger = (req, res, next) => {

    console.log(req.method)
    console.log(req.url)
    next();
}

export default logger;