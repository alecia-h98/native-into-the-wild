// // // backend/index.js
// // const express = require('express');
// // const cors = require('cors');
// // require('dotenv').config();

// // const app = express();
// // const PORT = process.env.PORT || 3001;

// // app.use(cors());
// // app.use(express.json()); // to parse JSON requests

// // app.get('/', (req, res) => {
// //   res.send('API is running!');
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });

// require('dotenv').config();
// const express = require('express');

// // Instantiate an express server:
// const app = express();

// // Use process.env.PORT if it exists, otherwise use 5001:
// const PORT = process.env.PORT || 5001;

// // Require auth-related middleware:
// const sessionMiddleware = require('./modules/session-middleware');
// const passport = require('./strategies/user.strategy');

// // Require router files:
// // const userRouter = require('./routes/user.router');
// const foundRouter = require('./routes/found.router');
// const itemsRouter = require('./routes/items.router');
// const catagoriesRouter = require('./routes/categories.router');
// const favoriteRouter = require('./routes/favorites.router');
// const adminRouter = require('./routes/admin.router');

// // Apply middleware:
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({extended: true}));
// app.use(express.static('build'));
// app.use(sessionMiddleware);
// app.use(passport.initialize());
// app.use(passport.session());
// //increases the file size that you can send through express

// // Apply router files:
// // app.use('/api/user', userRouter);
// app.use('/api/found', foundRouter);
// app.use('/api/items', itemsRouter);
// app.use('/api/categories', catagoriesRouter);
// app.use('/api/favorites', favoriteRouter);
// app.use('/api/admin', adminRouter);


// // Start the server:
// app.listen(PORT, () => {
//   console.log(`Listening on port: ${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Require routers
// const userRouter = require('./routes/user.router');
const foundRouter = require('./routes/found.router');
const itemsRouter = require('./routes/items.router');
const categoriesRouter = require('./routes/categories.router');
const favoritesRouter = require('./routes/favorites.router');
const adminRouter = require('./routes/admin.router');

// Middleware
app.use(cors()); // ✅ enables cross-origin requests
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Use routers
// app.use('/api/user', userRouter); // ✅ now using JWT auth
app.use('/api/found', foundRouter);
app.use('/api/items', itemsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/admin', adminRouter);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
