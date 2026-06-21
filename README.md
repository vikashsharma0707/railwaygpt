# RailwayGPT AI — Agentic Railway Operating System

Production-grade MERN stack platform for railway booking with multi-agent AI, RAG, real-time updates, and Razorpay payments.

## Stack

- **Frontend:** React (JSX), React Router DOM, Context API, Axios, Tailwind CSS, React Hook Form, Recharts, Socket.IO Client, Framer Motion, React Hot Toast
- **Backend:** Node.js, Express, MongoDB + Mongoose, JWT, Multer, Socket.IO, Helmet, CORS, Rate Limit, Morgan, Compression, Bcrypt, Nodemailer, PDFKit, QRCode, csv-parser, node-cron, Winston
- **AI:** OpenRouter (streaming, tool/function calling, multi-agent routing)
- **RAG:** MongoDB-backed vector store with hybrid + semantic search
- **Payments:** Razorpay (orders, signature verify, webhooks, refunds)
- **DevOps:** Docker, docker-compose, Kubernetes, Jenkins, GitHub Actions, Nginx

## Repository layout

```
railwaygpt/
├── client/                 # React app
│   ├── public/
│   ├── src/
│   │   ├── api/            # Axios instance + endpoint wrappers
│   │   ├── assets/
│   │   ├── components/     # ui, layout, chat, booking, admin
│   │   ├── context/        # Auth, Theme, Socket, Chat
│   │   ├── hooks/
│   │   ├── pages/          # auth, user, admin
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── Dockerfile
│   └── nginx.conf
├── server/                 # Express API
│   ├── src/
│   │   ├── config/         # db, env, logger, openrouter, razorpay
│   │   ├── constants/
│   │   ├── models/         # mongoose schemas
│   │   ├── dtos/
│   │   ├── validators/
│   │   ├── repositories/
│   │   ├── services/       # auth, train, booking, payment, ticket, ai, rag, notification
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/     # auth, rbac, error, rateLimit, validation
│   │   ├── sockets/        # socket.io handlers
│   │   ├── agents/         # 50+ AI agents
│   │   ├── rag/            # chunking, embeddings, vector store, retriever
│   │   ├── utils/          # jwt, pdf, qrcode, mailer, asyncHandler, ApiError
│   │   ├── jobs/           # cron jobs
│   │   ├── tests/          # jest + supertest
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   ├── jest.config.js
│   ├── .env.example
│   └── Dockerfile
├── k8s/                    # Kubernetes manifests
├── nginx/                  # reverse proxy config
├── scripts/                # backup/restore/seed
├── .github/workflows/      # CI/CD
├── Jenkinsfile
├── docker-compose.yml
├── .dockerignore
├── .gitignore
└── README.md
```

## Environment variables

Copy `server/.env.example` to `server/.env`:

```
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/railwaygpt
JWT_ACCESS_SECRET=change-me
JWT_REFRESH_SECRET=change-me-too
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=google/gemini-2.0-flash-exp:free
OPENROUTER_EMBED_MODEL=openai/text-embedding-3-small
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="RailwayGPT <noreply@railwaygpt.ai>"
```

Client `.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_test_...
```

## Local install

```bash
# Backend
cd server && npm install && npm run seed && npm run dev
# Frontend
cd client && npm install && npm run dev
```

## Docker

```bash
docker compose up --build
```

## Kubernetes

```bash
kubectl apply -f k8s/
```

## Jenkins / GitHub Actions

See `Jenkinsfile` and `.github/workflows/ci.yml`.

## Testing

```bash
cd server && npm test
cd client && npm test
```

## License

MIT
