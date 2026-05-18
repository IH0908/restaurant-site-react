import express from 'express'
import Order from '../models/Order.js'

const router = express.Router()

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create order
router.post('/', async (req, res) => {
  const order = new Order({
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    customerPhone: req.body.customerPhone,
    items: req.body.items,
    total: req.body.total,
    notes: req.body.notes || '',
  })

  try {
    const newOrder = await order.save()
    res.status(201).json(newOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update order status
router.patch('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })

    if (req.body.status) order.status = req.body.status
    if (req.body.notes !== undefined) order.notes = req.body.notes

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })

    await Order.findByIdAndDelete(req.params.id)
    res.json({ message: 'Order deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
