// frontend/src/environment.js

let IS_PROD = true;
const server = IS_PROD
  ? "https://heliomeetbackend.onrender.com"
  : "http://localhost:3000";

export default server;



