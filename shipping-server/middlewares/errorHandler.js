const errorHandler = (err, req, res, next) => {
    if (res.headersSent) return next(err);
    const statusCode = err.statusCode
        || (err.name === "ValidationError" || err.name === "CastError" ? 400 : null)
        || (err.name === "VersionError" ? 409 : null)
        || (err.code === 11000 ? 409 : 500);
    if (statusCode >= 500) {
        console.error("API error", { method: req.method, path: req.path, message: err.message });
    }
    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? "An unexpected server error occurred." : (err.message || "Request failed."),
        errors: err.errors || [],
    });
};

export default errorHandler;
