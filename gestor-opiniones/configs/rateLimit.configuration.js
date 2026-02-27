import rateLimit from 'express-rate-limit';

export const requestLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 25,
    handler: (req, res) => {
        console.log(`Peticiones excedidas desde IP: ${req.ip}, Endpoint: ${req.path}`);
        res.status(429).json({
            success: false,
            message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde',
            error: 'RATE_LIMIT_EXCEEDED',
            retryAfter: Math.round((req.rateLimit.resetTime - Date.now()) / 1000)
        });
    }
});

export const authLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    handler: (req, res) => {
        console.log(`Intentos de autenticación excedidos desde IP: ${req.ip}, Endpoint: ${req.path}`);
        res.status(429).json({
            success: false,
            message: 'Demasiados intentos, intenta nuevamente más tarde',
            error: 'AUTH_RATE_LIMIT_EXCEEDED',
            retryAfter: Math.round((req.rateLimit.resetTime - Date.now()) / 1000)
        });
    }
});
