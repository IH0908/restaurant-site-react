import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import menuRoutes from './routes/menu.js'
import orderRoutes from './routes/orders.js'
import { MongoMemoryServer } from 'mongodb-memory-server'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant_db'

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
// By default prefer a real MongoDB specified by MONGODB_URI.
// Only start an in-memory MongoDB if ALLOW_IN_MEMORY=true is set in the env.
async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected successfully')
    await seedMenuItems()
    return
  } catch (err) {
    console.error('MongoDB connection error:', err)
    if (process.env.ALLOW_IN_MEMORY === 'true') {
      console.log('ALLOW_IN_MEMORY=true — attempting to start in-memory MongoDB for development...')
      try {
        const mongod = await MongoMemoryServer.create()
        const uri = mongod.getUri()
        await mongoose.connect(uri)
        console.log('Connected to in-memory MongoDB')
        await seedMenuItems()
        return
      } catch (memErr) {
        console.error('In-memory MongoDB error:', memErr)
        process.exit(1)
      }
    }

    console.error('No in-memory fallback allowed. Exiting.')
    process.exit(1)
  }
}

connectDatabase()

// Routes
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Urban Bistro Restaurant API' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' })
})

// Seed initial menu items
async function seedMenuItems() {
  try {
    const MenuItem = (await import('./models/MenuItem.js')).default
    const count = await MenuItem.countDocuments()
    
    if (count === 0) {
      const menuItems = [
        {
          name: 'Truffle Fries',
          price: 9,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1505993597083-3bd19fb75e57?auto=format&fit=crop&w=900&q=80',
          desc: 'Crispy fries, truffle oil, parmesan, herb aioli.',
        },
        {
          name: 'Street Tacos',
          price: 11,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
          desc: 'Three mini tacos with salsa verde and lime.',
        },
        {
          name: 'Urban Burger',
          price: 16,
          category: 'Mains',
          image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
          desc: 'Grass-fed beef, cheddar, caramelized onions, brioche bun.',
        },
        {
          name: 'Roasted Veg Bowl',
          price: 14,
          category: 'Mains',
          image: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=80',
          desc: 'Quinoa, roasted veggies, lemon tahini dressing.',
        },
        {
          name: 'Chocolate Lava Cake',
          price: 8,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80',
          desc: 'Warm chocolate cake with vanilla gelato.',
        },
        {
          name: 'Seasonal Cheesecake',
          price: 7,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
          desc: 'Ask about today\'s flavor.',
        },
      ]

      await MenuItem.insertMany(menuItems)
      console.log('Menu items seeded successfully')
    }
  } catch (error) {
    console.error('Error seeding menu items:', error)
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
