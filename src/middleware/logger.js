/**
 * Logging Middleware
 * This implements the middleware requirement (5pts)
 */

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('user-agent') || 'Unknown';

  // Log request details
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip} - User-Agent: ${userAgent}`);

  // Log response status when finished
  const originalSend = res.send;
  res.send = function(data) {
    const statusCode = res.statusCode;
    console.log(`[${timestamp}] ${method} ${url} - Response: ${statusCode}`);
    return originalSend.call(this, data);
  };

  next();
};

// Detailed logger for development
const detailedLogger = (req, res, next) => {
  console.log('\n=== REQUEST DETAILS ===');
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Headers:`, req.headers);
  console.log(`Query Params:`, req.query);
  console.log(`Body:`, req.body);
  console.log('========================\n');
  next();
};

module.exports = { logger, detailedLogger };