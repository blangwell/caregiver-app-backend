const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

db.once('open', () => console.log(`📚 Connected to MongoDB at ${MONGODB_URI} 📚`));
db.on('error', err => console.log(`⚠️ Database Error: ${err} ⚠️`));