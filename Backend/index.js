const express = require('express');
const mongoose = require('mongoose');   
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const userRouter = require('./routes/User');
const blogRoutes = require('./routes/Blogs');

const app = express();


app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});

app.use(cors(
  {
    origin: 'https://frontendblog-opal.vercel.app',
    credentials:true,
  }
));

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', userRouter);
app.use('/api/blogs', blogRoutes);



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Use the DB_NAME from .env

}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app; // Export the app for testing purposes