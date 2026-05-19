const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const exists = await User.findOne({ email: 'admin@cleanpro.lk' });
  if (exists) { console.log('Admin already exists!'); process.exit(); }
  await User.create({
    name: 'Admin',
    email: 'admin@cleanpro.lk',
    password: 'admin123',
    role: 'admin'
  });
  console.log('✅ Admin created! Email: admin@cleanpro.lk | Password: admin123');
  process.exit();
};

createAdmin();