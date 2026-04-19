# QuickGpt 🤖

An AI-powered chat application where users can have conversations with AI, generate images, and manage credits. Built with the MERN stack (MongoDB, Express, React, Node.js) and powered by Google Gemini.

---

## Features

- 🔐 JWT-based authentication (register, login)
- 💬 Multiple chats per user, each with full message history
- 🤖 AI text generation powered by Google Gemini
- 🖼️ AI image generation powered by ImageKit
- 💳 Credit system — users start with 20 credits (text costs 1, image costs 2)
- 💰 Stripe payment integration for buying more credits
- 🌙 Light/dark theme
- 📱 Fully responsive React frontend

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs

**External Services**
- Google Gemini API — AI text generation
- ImageKit — AI image generation and storage
- Stripe — payment processing

---

## Project Structure

```
QuickGpt/
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── pages/
│       ├── components/
│       └── main.jsx
└── server/                 # Express backend
    ├── config/
    │   └── dbConnection.js
    ├── controllers/
    │   ├── authController.js
    │   ├── chatController.js
    │   └── messageController.js
    ├── middleware/
    │   ├── protect.js
    │   └── checkCredits.js
    ├── models/
    │   ├── User.js
    │   ├── Chat.js
    │   └── Message.js
    ├── routes/
    │   ├── authRoute.js
    │   ├── chatRoute.js
    │   ├── messageRoute.js
    │   └── paymentRoute.js
    ├── .env
    └── index.js
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Google Gemini API key
- Stripe account
- ImageKit account

### Installation

**1 — Clone the repository**
```bash
git clone https://github.com/yourusername/QuickGpt.git
cd QuickGpt
```

**2 — Install server dependencies**
```bash
cd server
npm install
```

**3 — Install client dependencies**
```bash
cd ../client
npm install
```

**4 — Set up environment variables**

Create a `.env` file inside the `server/` folder:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickgpt
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NODE_ENV=development
```

**5 — Run the backend**
```bash
cd server
npm run dev
```

**6 — Run the frontend**
```bash
cd client
npm run dev
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get token | No |

### Chats
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/chats` | Create a new chat | Yes |
| GET | `/api/chats` | Get all chats for user | Yes |
| DELETE | `/api/chats/:id` | Delete a chat | Yes |

### Messages
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/chats/:chatId/messages` | Send a message (AI responds) | Yes |
| GET | `/api/chats/:chatId/messages` | Get all messages in a chat | Yes |

### Payments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/payment/create-checkout` | Create Stripe checkout session | Yes |
| POST | `/api/payment/webhook` | Stripe webhook handler | No |

---

## Credit System

Every user starts with **20 free credits** on registration.

| Action | Credit Cost |
|--------|------------|
| Text generation | 1 credit |
| Image generation | 2 credits |

Credits are checked before every AI call. If a user has insufficient credits the request is blocked. Users can buy more credits via Stripe.

---

## Development Phases

- [x] Phase 1 — Foundation (MongoDB, Auth, JWT)
- [x] Phase 2 — Chat Core (Chat + Message models, CRUD)
- [x] Phase 3 — AI Integration (Gemini text, ImageKit images)
- [ ] Phase 4 — Credits + Stripe
- [ ] Phase 5 — React Frontend
- [ ] Phase 6 — Polish + Deploy

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `GEMINI_API_KEY` | Google Gemini API key |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NODE_ENV` | development or production |

---

## Security

- Passwords are hashed using bcryptjs before storage
- JWTs expire after 30 days
- Stripe payments verified server-side via webhook only
- API keys never exposed to the frontend
- Protected routes require valid JWT on every request

---

## License

MIT
