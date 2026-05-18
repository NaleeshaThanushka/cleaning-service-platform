const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');

dotenv.config();

const services = [
  {
    name: "Deep Clean",
    description: "Complete deep cleaning of your entire home including hidden corners and hard to reach areas.",
    price: 5500,
    image: "https://images.unsplash.com/photo-1527515545081-5db817172677?w=500",
    category: "Residential"
  },
  {
    name: "Office Cleaning",
    description: "Professional office cleaning service to keep your workspace fresh and productive.",
    price: 8000,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500",
    category: "Commercial"
  },
  {
    name: "Sofa Express",
    description: "Expert sofa and upholstery cleaning using safe and effective cleaning agents.",
    price: 3500,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    category: "Furniture"
  },
  {
    name: "Kitchen Deep Clean",
    description: "Thorough kitchen cleaning including appliances, cabinets, and countertops.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
    category: "Residential"
  },
  {
    name: "Bathroom Sanitization",
    description: "Complete bathroom sanitization and deep cleaning for a hygienic environment.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500",
    category: "Residential"
  },
  {
    name: "Carpet Cleaning",
    description: "Professional carpet cleaning to remove stains, dust, and allergens effectively.",
    price: 4000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    category: "Furniture"
  },
  {
    name: "Window Cleaning",
    description: "Streak-free window cleaning for crystal clear views inside and outside.",
    price: 3000,
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500",
    category: "Residential"
  },
  {
    name: "Move In/Out Clean",
    description: "Complete property cleaning service for moving in or out of your home.",
    price: 9000,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500",
    category: "Residential"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    await Service.deleteMany();
    console.log('🗑️ Old services deleted');

    await Service.insertMany(services);
    console.log('✅ Services seeded successfully!');

    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedDB();