require('dotenv').config();
const app = require('./app');
const connectDB = require('./src/config/database');
const PORT = process.env.PORT || 3000;

async function startServer() {
  // MongoDB is optional for Sneha's isolated mini-project: the announcements
  // CRUD uses a local JSON file and remains available without Atlas credentials.
  if (process.env.MONGO_URI) {
    try { await connectDB(); }
    catch (error) { console.error('MongoDB connection failed:', error.message); }
  } else {
    console.log('MONGO_URI not set. Starting in local-JSON mode.');
  }
  app.listen(PORT, () => console.log(`Sneha mini-project running at http://localhost:${PORT}`));
}
startServer();
