//OLD CODE//

// const express = require('express');
// const encryptLib = require('../modules/encryption');
// const pool = require('../modules/pool');
// const userStrategy = require('../strategies/user.strategy');


// const router = express.Router();

// // If the request came from an authenticated user, this route
// // sends back an object containing that user's information.
// // Otherwise, it sends back an empty object to indicate there
// // is not an active session.
// router.get('/', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send(req.user);
//   } else {
//     res.send({});
//   }
// });

// // Handles the logic for creating a new user. The one extra wrinkle here is
// // that we hash the password before inserting it into the database.
// router.post('/register', (req, res, next) => {
//   const nameInput = req.body.name;
//   const username = req.body.username;
//   const hashedPassword = encryptLib.encryptPassword(req.body.password);

//   const sqlText = `
//     INSERT INTO "user"
//       ("username", "password", "name")
//       VALUES
//       ($1, $2, $3);
//   `;
//   const sqlValues = [username, hashedPassword, nameInput];

//   pool.query(sqlText, sqlValues)
//     .then(() => {
//       res.sendStatus(201)
//     })
//     .catch((dbErr) => {
//       console.log('POST /api/user/register error: ', dbErr);
//       res.sendStatus(500);
//     });
// });

// // Handles the logic for logging in a user. When this route receives
// // a request, it runs a middleware function that leverages the Passport
// // library to instantiate a session if the request body's username and
// // password are correct.
//   // You can find this middleware function in /server/strategies/user.strategy.js.
// router.post('/login', userStrategy.authenticate('local'), (req, res) => {
//   res.sendStatus(200);
// });

// // Clear all server session information about this user:
// router.post('/logout', (req, res, next) => {
//   // Use passport's built-in method to log out the user.
//   req.logout((err) => {
//     if (err) { 
//       return next(err); 
//     }
//     res.sendStatus(200);
//   });
// });


// module.exports = router;




//***********NEW CODE */


// const express = require('express');
// const pool = require('../modules/pool');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// // const verifyToken = require('../middleware/auth');

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

// // Register
// router.post('/register', async (req, res) => {
//   const { username, password, name } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     await pool.query(
//       `INSERT INTO "user" ("username", "password", "name") VALUES ($1, $2, $3)`,
//       [username, hashedPassword, name]
//     );
//     res.sendStatus(201);
//   } catch (err) {
//     console.error('Register error:', err);
//     res.sendStatus(500);
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const result = await pool.query(`SELECT * FROM "user" WHERE "username" = $1`, [username]);
//     const user = result.rows[0];
//     if (!user) return res.status(401).send('User not found');

//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) return res.status(401).send('Invalid credentials');

//     const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.sendStatus(500);
//   }
// });

// // Example protected route
// router.get('/profile', verifyToken, (req, res) => {
//   res.json({ message: `Hello, ${req.user.username}` });
// });

// module.exports = router;
