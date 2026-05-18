import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Cart from './components/Cart'
import Footer from './components/Footer'

export default function App() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [orderStatus, setOrderStatus] = useState('')

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true)
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'
        const response = await fetch(`${API_BASE}/api/menu`)
        if (!response.ok) throw new Error('Failed to fetch menu')
        const data = await response.json()
        setMenuItems(data)
      } catch (error) {
        console.error('Error fetching menu:', error)
        setMenuItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  // Old hardcoded menu items - kept for fallback
  const fallbackMenuItems = [
    {
      id: 1,
      name: 'Truffle Fries',
      price: 9,
      category: 'Starters',
      image: 'https://images.unsplash.com/photo-1505993597083-3bd19fb75e57?auto=format&fit=crop&w=900&q=80',
      desc: 'Crispy fries, truffle oil, parmesan, herb aioli.',
    },
    {
      id: 2,
      name: 'Street Tacos',
      price: 11,
      category: 'Starters',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
      desc: 'Three mini tacos with salsa verde and lime.',
    },
    {
      id: 3,
      name: 'Urban Burger',
      price: 16,
      category: 'Mains',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
      desc: 'Grass-fed beef, cheddar, caramelized onions, brioche bun.',
    },
    {
      id: 4,
      name: 'Roasted Veg Bowl',
      price: 14,
      category: 'Mains',
      image: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=80',
      desc: 'Quinoa, roasted veggies, lemon tahini dressing.',
    },
    {
      id: 5,
      name: 'Chocolate Lava Cake',
      price: 8,
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80',
      desc: 'Warm chocolate cake with vanilla gelato.',
    },
    {
      id: 6,
      name: 'Seasonal Cheesecake',
      price: 7,
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
      desc: 'Ask about today’s flavor.',
    },
  ]

  const galleryImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  ]

  const addToCart = (item) => {
    setCart(prev => {
      const itemId = item.id || item._id
      const existing = prev.find(i => i.id === itemId)
      if (existing) {
        return prev.map(i =>
          i.id === itemId ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...item, id: itemId, qty: 1 }]
    })
  }

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev
        .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    )
  }

  const removeItem = (id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const submitOrder = async (orderData) => {
    try {
      setOrderStatus('submitting')
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'
      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) throw new Error('Failed to submit order')
      
      const data = await response.json()
      setOrderStatus('success')
      clearCart()
      setTimeout(() => setOrderStatus(''), 3000)
      return data
    } catch (error) {
      console.error('Error submitting order:', error)
      setOrderStatus('error')
      setTimeout(() => setOrderStatus(''), 3000)
      throw error
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery images={galleryImages} />
        <Menu items={menuItems} onAdd={addToCart} />
        <Cart
          cart={cart}
          total={total}
          onInc={(id) => updateQty(id, 1)}
          onDec={(id) => updateQty(id, -1)}
          onRemove={removeItem}
          onClear={clearCart}
          onSubmitOrder={submitOrder}
          orderStatus={orderStatus}
        />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}