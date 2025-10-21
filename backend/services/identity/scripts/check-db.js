const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/bbsneo_identity';

async function run() {
  try {
    console.log('Connecting to', uri);
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    if (collections.find(c => c.name === 'users')) {
      const users = await db.collection('users').find({}).limit(10).toArray();
      console.log('Users sample:', users);
    } else {
      console.log('No users collection found');
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('DB check error:', err.message || err);
    process.exit(1);
  }
}

run();
