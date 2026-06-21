// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const compression = require('compression');
// const cookieParser = require('cookie-parser');
// const mongoSanitize = require('express-mongo-sanitize');
// const hpp = require('hpp');
// const env = require('./config/env');
// const routes = require('./routes');
// const { notFound, errorHandler } = require('./middleware/error');
// const { globalLimiter } = require('./middleware/rateLimit');

// const app = express();

// // capture raw body for webhook signature verification
// app.use('/api/payments/webhook',
//   express.raw({ type: 'application/json' }),
//   (req, _res, next) => { req.rawBody = req.body?.toString?.('utf8'); try { req.body = JSON.parse(req.rawBody || '{}'); } catch (_) {} next(); }
// );

// app.use(helmet());
// // app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
// const corsOpen = {
//   origin: '*',                                   // allow ALL origins
//   methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
//   exposedHeaders: ['Content-Length','X-Request-Id'],
//   maxAge: 86400,
//   credentials: false,                             // must be false with "*"
// };
// app.use(compression());
// app.use(express.json({ limit: '5mb' }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(mongoSanitize());
// app.use(hpp());
// if (env.NODE_ENV !== 'test') app.use(morgan('dev'));
// app.use(globalLimiter);

// app.use('/api', routes);

// app.use(notFound);
// app.use(errorHandler);

// module.exports = app;




const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const env = require('./config/env');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/error');
const { globalLimiter } = require('./middleware/rateLimit');

const app = express();

// capture raw body for webhook signature verification
app.use('/api/payments/webhook',
  express.raw({ type: 'application/json' }),
  (req, _res, next) => { req.rawBody = req.body?.toString?.('utf8'); try { req.body = JSON.parse(req.rawBody || '{}'); } catch (_) {} next(); }
);

app.use(helmet());

const corsOpen = {
  origin: '*',                                   // allow ALL origins
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
  exposedHeaders: ['Content-Length','X-Request-Id'],
  maxAge: 86400,
  credentials: false,                             // must be false with "*"
};

// ✅ Enable CORS for all origins
app.use(cors(corsOpen));

app.use(compression());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(hpp());
if (env.NODE_ENV !== 'test') app.use(morgan('dev'));
app.use(globalLimiter);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;