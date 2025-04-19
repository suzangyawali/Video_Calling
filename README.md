# Zoom Clone API

## Overview
The **Zoom Clone API** is a backend service designed to handle user registration, authentication, meeting history management, and real-time communication via WebSockets. It uses **JWT (JSON Web Token)** for secure authentication and supports features like adding meeting codes to user activity history and retrieving paginated meeting data.

---

## Base URL
```
http://localhost:3000
```

---

## Authentication
The API uses **JWT (JSON Web Token)** for authentication. After logging in, include the token in the `Authorization` header as follows:

```http
Authorization: Bearer <token>
```

### Example:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Endpoints

### 1. Register a User
- **Endpoint**: `POST /api/user/register`
- **Purpose**: Create a new user account.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "jo@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "User registered successfully"
    }
    ```
  - **Error**:
    ```json
    {
      "error": "Passwords do not match"
    }
    ```

---

### 2. Log In
- **Endpoint**: `POST /api/user/login`
- **Purpose**: Authenticate a user and obtain a JWT token.
- **Request Body**:
  ```json
  {
    "email": "jo@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Login successful",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
  - **Error**:
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

---

### 3. Add Meeting to History
- **Endpoint**: `POST /api/meeting/add_to_activity`
- **Purpose**: Add a meeting code to the user's activity history.
- **Headers**:
  ```http
  Authorization: Bearer <token>
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "meeting_code": "MEET2025"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Meeting added to activity successfully"
    }
    ```
  - **Error**:
    ```json
    {
      "error": "Invalid token"
    }
    ```

---

### 4. Get All Meeting History
- **Endpoint**: `GET /api/meeting/get_all_activity`
- **Purpose**: Retrieve the authenticated user's meeting history with pagination.
- **Headers**:
  ```http
  Authorization: Bearer <token>
  ```
- **Example Request**:
  ```
  GET http://localhost:3000/api/meeting/get_all_activity
  Authorization: Bearer <token>
  ```
- **Response**:
  - **Success**:
    ```json
    [
      {
        "_id": "6802b58747acb639627a314b",
        "user_id": "68029b8120a5df281d01d6b0",
        "meetingCode": "MEET2025",
        "scheduledAt": "2025-04-18T19:26:40.462Z"
      }
    ]
    ```
  - **Error**:
    ```json
    {
      "error": "Unauthorized"
    }
    ```

---

## Real-Time Communication with WebSockets
The Zoom Clone API supports **WebSocket connections** for real-time updates. This feature can be used for:
- Sending live notifications (e.g., when a new meeting starts).
- Enabling real-time chat during meetings.
- Broadcasting updates to all connected clients.

### WebSocket URL
Connect to the WebSocket server using the following URL:
```
ws://localhost:3000/ws
```

### Example Use Case
1. A user joins a meeting and connects to the WebSocket server.
2. The server sends real-time updates, such as participant join/leave events or chat messages.
3. The client listens for these updates and updates the UI dynamically.

---

## Error Handling
The API returns appropriate HTTP status codes and error messages for different scenarios:

| Status Code | Meaning               | Example Response                          |
|-------------|-----------------------|-------------------------------------------|
| 400         | Bad Request           | `{ "error": "Missing or invalid input" }` |
| 401         | Unauthorized          | `{ "error": "Invalid token" }`            |
| 404         | Not Found             | `{ "error": "Resource not found" }`       |
| 500         | Internal Server Error | `{ "error": "Unexpected server error" }`  |

---

## Security Considerations
- **Always use HTTPS** in production to encrypt data in transit.
- Store tokens securely on the client side (e.g., HTTP-only cookies or secure storage).
- Avoid exposing sensitive information in error messages.
- Use strong password hashing algorithms (e.g., bcrypt) for storing user passwords.


---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact
For questions or feedback, feel free to reach out:
- Email: sujangyawali177@example.com
- GitHub: [Your GitHub Profile](https://github.com/suzangyawali)

---

## Acknowledgments
- Inspired by Zoom's functionality.
- Built using Node.js, Express, MongoDB, and WebSockets.

---

## Notes for Developers
- Ensure you have `.env` files configured for environment variables (e.g., `JWT_SECRET`, database connection strings).
- Use tools like Postman or Swagger for testing the API.
- Deploy the API to platforms like Heroku, AWS, or Vercel for production use.

---
---

## 📘 Postman Documentation

You can also explore and test the full API with Postman:

👉 [Click here to open Postman Docs](https://documenter.getpostman.com/view/37930568/2sB2cd5JbS)

