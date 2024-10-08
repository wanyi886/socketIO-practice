Notes:
1. express app + react.js
2. APIs:
    - POST /auth
    - DELETE /auth
    - GET /users
    - PUT /users/:id/password
3. use express-session management to store session in server
4. use local storage to store user id, so app can grab user id and send update password request
5. use db.json and fs writefile to mock database
6. use socket.io and socket.io-client to do session update
7. use uuid to generate session id
8. use .env and dotenv package to store environment variables
9. use bcryptjs to hash user passwords
