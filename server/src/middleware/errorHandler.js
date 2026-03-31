// hetkel mitte veel kasutada :)

function errorHandler(error, req, res, lint_test) {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    });
}

export default errorHandler;