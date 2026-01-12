const errorHandler = (err, req, res, next) => {
    console.error(err);
    
    let message = err.message;
    let statusCode = err.statusCode || 500;

    // Mongoose errors
    if (err.name === 'CastError') {
        message = 'Resource not found';
        statusCode = 404;
    } else if (err.code === 11000) {
        message = 'Duplicate field value';
        statusCode = 400;
    } else if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(val => val.message).join(', ');
        statusCode = 400;
    }
    
    // Blockchain errors
    if (err.message?.includes('ECONNREFUSED') && err.message?.includes('8545')) {
        message = 'Blockchain node not running. Start with: npx hardhat node';
        statusCode = 503;
    }
    
    // MongoDB errors
    if (err.message?.includes('MongoNetworkError') || err.message?.includes('ENOTFOUND')) {
        message = 'Database connection error. Check MongoDB configuration.';
        statusCode = 503;
    }

    res.status(statusCode).json({ success: false, error: message });
};

module.exports = errorHandler;
