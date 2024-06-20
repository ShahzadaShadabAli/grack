const errorHandler = (err, req, res, next) => {
    if (err.name == "UnauthorizedError")
        return res.status(401).json({message: "Permission not granted"})
    else if (err.name == "ValidationError")
        return res.status(400).json({message: "Credentials Not Matched"})
}