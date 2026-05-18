import express from 'express'
import MenuItem from '../models/MenuItem.js'

const router = express.Router()

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ category: 1, name: 1 })
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create menu item
router.post('/', async (req, res) => {
  const menuItem = new MenuItem({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    desc: req.body.desc,
  })

  try {
    const newItem = await menuItem.save()
    res.status(201).json(newItem)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update menu item
router.patch('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })

    if (req.body.name) item.name = req.body.name
    if (req.body.price) item.price = req.body.price
    if (req.body.category) item.category = req.body.category
    if (req.body.image) item.image = req.body.image
    if (req.body.desc) item.desc = req.body.desc

    const updatedItem = await item.save()
    res.json(updatedItem)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })

    await MenuItem.findByIdAndDelete(req.params.id)
    res.json({ message: 'Menu item deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
