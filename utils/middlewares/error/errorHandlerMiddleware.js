export const errorHandler = (err, req, res, next) => {
    const errorMessage = err.message || "Internal Server Error";
    const errorStatus = err.status || 500;
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
};
