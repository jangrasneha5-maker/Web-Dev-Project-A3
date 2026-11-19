const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/api/releases', require('./src/routes/releaseRoutes'));
// The tour module is maintained on a separate group contribution.
if (fs.existsSync(path.join(__dirname, 'src/routes/tourRoutes.js'))) {
  app.use('/api/tour', require('./src/routes/tourRoutes'));
}
app.use('/admin', require('./src/routes/adminRoutes'));
app.use('/api/messages', require('./src/routes/messageRoutes'));
app.use('/api/updates', require('./src/routes/updateRoutes'));
app.get('/api/test', (req, res) => res.json({ message: 'Sneha mini-project API is working!' }));
app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));
module.exports = app;
