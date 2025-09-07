
<div align="center">
  <img src="./screenshot/Logo.png" alt="HelioMeet Logo" width="120" />
</div>

# HelioMeet (Video Conferencing Platform / Study Rooms)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Contributors](https://img.shields.io/badge/contributors-1-blue.svg)](https://github.com/yourusername/heliomeet/graphs/contributors)


## Perfect for Study Groups

HelioMeet uses WebRTC mesh architecture optimized for small groups of up to 6 participants. Experience low latency and high-quality connections perfect for collaborative learning.

- ✅ 4K HD video quality with adaptive bitrate
- ✅ Screen sharing for presentations and code reviews
- ✅ Real-time chat with file sharing
- ✅ No time limits or participant restrictions
- ✅ Works directly in your browser
- ✅ End-to-end encryption for privacy

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Backend & API Documentation](#backend--api-documentation)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution Guide](#contribution-guide)


---

## Features
- 🔐 User authentication with JWT
- 📹 High-quality video conferencing (up to 6 participants)
- 💬 Real-time chat during meetings
- 📜 Meeting history tracking with pagination
- 🖥️ Screen sharing support
- 📱 Responsive UI (desktop & mobile ready)

---

## Tech Stack
**Frontend**
- React (Vite)
- Tailwind CSS
- WebRTC for video calls

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Socket.io (WebSockets) for real-time events

---

## Screenshots

| Homepage | Lobby | Meeting History |
|---|---|---|
| ![Homepage](./screenshot/Homepage.png) | ![Lobby](./screenshot/Lobby.png) | ![Meeting History](./screenshot/MeetingHistory.png) |

| Page After Login | 3 Participants | Chat |
|---|---|---|
| ![Page After Login](./screenshot/PageAfterLogin.png) | ![3 Participants](./screenshot/3people.png) | ![Chat](./screenshot/Chat.png) |

| Features | Screen Share |
|---|---|
| ![Features](./screenshot/Feature.png) | ![Screen Share](./screenshot/ScreenShare.png) |

---

## Backend & API Documentation

### Overview
The backend service handles user registration, authentication, meeting history management, and real-time communication via Socket.io. It uses **JWT** for secure authentication.

### Base URL

http://localhost:3000

### Authentication

Include your JWT in the `Authorization` header for all protected endpoints:

```http
Authorization: Bearer <token>
```

**Example:**

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

  ## Backend & API Documentation

  ### Overview
  The backend service handles user registration, authentication, meeting history management, and real-time communication via Socket.io. It uses **JWT** for secure authentication.

  ### Base URL

  ```
  http://localhost:3000
  ```

  ### Authentication

  Include JWT in the `Authorization` header:

  ```http
  Authorization: Bearer <token>
  ```

  ### Endpoints

  #### 1. Register a User

  **POST** `/api/user/register`

  Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```

  #### 2. Log In

  **POST** `/api/user/login`

  Request Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

  #### 3. Add Meeting to History

  **POST** `/api/meeting/add_to_activity`

  Request Body:
  ```json
  {
    "meeting_code": "MEET2025"
  }
  ```

  #### 4. Get All Meeting History

  **GET** `/api/meeting/get_all_activity`

  ---

  ### Real-Time Communication (Socket.io)

  **Events supported:**

  - `join-call` — join a meeting room
  - `signal` — WebRTC signaling
  - `chat-message` — send/receive messages
  - `user-joined`, `user-left` — participant updates

  ---

  ### Error Handling

  | Status | Meaning         | Example                                 |
  |--------|-----------------|-----------------------------------------|
  | 400    | Bad Request     | `{ "error": "Missing input" }`         |
  | 401    | Unauthorized    | `{ "error": "Invalid token" }`         |
  | 404    | Not Found       | `{ "error": "Resource not found" }`    |
  | 500    | Server Error    | `{ "error": "Unexpected server error" }` |

  ---

  ### Security

  - Always use HTTPS in production
  - Store tokens securely (HTTP-only cookies / secure storage)
  - Passwords are hashed with bcrypt

  ---

  ### 📘 Postman Documentation

  👉 [View API in Postman](https://documenter.getpostman.com/view/37930568/2sB2cd5JbS)

  ---

  ## Project Structure

  ```
  heliomeet/
  ├── backend/
  │   ├── controllers/       # Request handlers
  │   ├── models/            # Mongoose models
  │   ├── routes/            # Express routes
  │   ├── services/          # Business logic (auth, meeting)
  │   ├── server.js          # Backend entry point
  │   └── package.json       # Backend dependencies
  │
  ├── frontend/
  │   ├── src/
  │   │   ├── assets/        # Images & static assets
  │   │   ├── components/    # Reusable React components
  │   │   ├── contexts/      # React context (Auth, etc.)
  │   │   ├── pages/         # Pages (landing, auth, videoMeet)
  │   │   ├── utils/         # Helper functions (API, withAuth)
  │   │   ├── App.jsx        # App root
  │   │   ├── App.css        # Global styles
  │   │   └── main.jsx       # Entry point
  │   ├── public/            # Static files
  │   ├── package.json       # Frontend dependencies
  │   └── vite.config.js     # Vite config
  │
  └── README.md
  ```

  ---

  ## Installation

  ### Prerequisites
  - Node.js (v16+)
  - npm or yarn
  - MongoDB (local or Atlas)

  ### 1. Clone Repository
  ```bash
  git clone https://github.com/yourusername/heliomeet.git
  cd heliomeet
  ```

  ### 2. Backend Setup
  ```bash
  cd backend
  cp .env.example .env
  npm install
  ```
  Update `.env` file:

  | Variable    | Description              |
  |-------------|--------------------------|
  | MONGO_URI   | MongoDB connection string|
  | JWT_SECRET  | Secret key for JWT       |
  | PORT        | Backend port (default: 3000) |

  Start backend:
  ```bash
  npm start
  ```

  ### 3. Frontend Setup
  ```bash
  cd ../frontend
  npm install
  npm run dev
  ```
  Visit: http://localhost:5173

  ---

  ## Usage

  - Register or log in
  - Start or join a meeting
  - Toggle video/audio
  - Chat in-call
  - Share screen
  - View meeting history

  ---

  ## Build Frontend
  ```bash
  cd frontend
  npm run build
  ```

  ---

  ## Deploy Backend
  Deploy `backend/` to Heroku, Render, AWS, or other Node.js hosting providers.

  ---

  ## Contribution Guide

  1. Fork the repository
  2. Create a new branch:
     ```bash
     git checkout -b feature/your-feature
     ```
  3. Commit changes:
     ```bash
     git commit -m "feat: add your feature"
     ```
  4. Push branch:
     ```bash
     git push origin feature/your-feature
     ```
  5. Open a Pull Request

  ---

  ## License
  This project is licensed under the MIT License. See the LICENSE file.

  ---

  ## Contact
  - Email: sujangyawali177@example.com
  - GitHub: [suzangyawali](https://github.com/suzangyawali)

  ---

  ## Acknowledgments
  - Inspired by Zoom
  - Built with Node.js, Express, MongoDB, React, and Socket.io







