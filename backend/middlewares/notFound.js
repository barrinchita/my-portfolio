const notFound = (req, res, next) => {
    let err = new Error('The route you entered does not exist');
    err.status = 400;
    next(err);
}

export default notFound;