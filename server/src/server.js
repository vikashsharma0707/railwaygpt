// const http = require('http');
// const app = require('./app');
// const env = require('./config/env');
// const logger = require('./config/logger');
// const { connectDB } = require('./config/db');
// const sockets = require('./sockets');
// const { startJobs } = require('./jobs/cron');

// async function main() {
//   await connectDB();
//   const server = http.createServer(app);
//   sockets.init(server, { clientUrl: env.CLIENT_URL });
//   startJobs();

//   server.listen(env.PORT, () => logger.info(`API listening on :${env.PORT} (${env.NODE_ENV})`));

//   const shutdown = (sig) => {
//     logger.info(`${sig} received, shutting down`);
//     server.close(() => process.exit(0));
//     setTimeout(() => process.exit(1), 10000).unref();
//   };
//   process.on('SIGTERM', () => shutdown('SIGTERM'));
//   process.on('SIGINT', () => shutdown('SIGINT'));
//   process.on('unhandledRejection', (e) => logger.error('UnhandledRejection', e));
// }

// main().catch((e) => { logger.error(e); process.exit(1); });




const http = require('http');
const app = require('./app');
const env = require('./config/env');
const logger = require('./config/logger');
const { connectDB } = require('./config/db');
const sockets = require('./sockets');
const { startJobs } = require('./jobs/cron');

let server;

async function main() {
  try {
    // Connect to Database
    await connectDB();
    logger.info('✅ Database connected successfully');

    // Create HTTP Server
    server = http.createServer(app);

    // Initialize Socket.IO
    sockets.init(server, { 
      clientUrl: env.CLIENT_URL 
    });

    // Start Cron Jobs
    startJobs();
    logger.info('✅ Cron jobs started');

    // Start Server
    const PORT = env.PORT || 5000;
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} | Environment: ${env.NODE_ENV}`);
      logger.info(`📡 Client URL: ${env.CLIENT_URL}`);
    });

  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful Shutdown
const gracefulShutdown = (signal) => {
  logger.info(`${signal} received. Shutting down gracefully...`);

  if (server) {
    server.close(() => {
      logger.info('✅ HTTP server closed');
      process.exit(0);
    });
  }

  // Force exit after 10 seconds if not closed
  setTimeout(() => {
    logger.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 10000).unref();
};

// Handle different signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('❌ Unhandled Rejection:', err);
  gracefulShutdown('UNHANDLED_REJECTION');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('❌ Uncaught Exception:', err);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Start the application
main();