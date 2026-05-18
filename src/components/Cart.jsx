import { useState } from 'react'

export default function Cart({ cart, total, onInc, onDec, onRemove, onClear, onSubmitOrder, orderStatus }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    
    const orderData = {
      ...formData,
      items: cart.map(item => ({
        id: item._id || item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
      total: total.toFixed(2),
    }

    try {
      await onSubmitOrder(orderData)
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        notes: '',
      })
      setShowForm(false)
    } catch (error) {
      console.error('Error submitting order:', error)
    }
  }
  return (
    <section className="section-pad bg-dark-subtle">
      <div className="container">
        <h2 className="section-title">Your Cart</h2>
        <div className="cart-panel mx-auto p-3 p-md-4">
          {cart.length === 0 ? (
            <p className="text-center text-body-secondary mb-0">
              Your cart is empty. Click a menu item to add it.
            </p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-dark table-borderless align-middle mb-3">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-sm btn-outline-light"
                              onClick={() => onDec(item.id)}
                              type="button"
                            >
                              -
                            </button>
                            <span>{item.qty}</span>
                            <button
                              className="btn btn-sm btn-outline-light"
                              onClick={() => onInc(item.id)}
                              type="button"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${(item.price * item.qty).toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => onRemove(item.id)}
                            type="button"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <h3 className="h5 mb-0 text-white">
                  Total: <span className="text-warning">${total.toFixed(2)}</span>
                </h3>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-warning" onClick={onClear} type="button">
                    Clear Cart
                  </button>
                  <button 
                    className="btn btn-warning" 
                    onClick={() => setShowForm(!showForm)}
                    type="button"
                    disabled={cart.length === 0}
                  >
                    {showForm ? 'Cancel' : 'Checkout'}
                  </button>
                </div>
              </div>

              {showForm && (
                <div className="mt-4 p-3 border border-warning rounded">
                  <h4 className="text-white mb-3">Order Details</h4>
                  <form onSubmit={handleSubmitOrder}>
                    <div className="mb-3">
                      <label htmlFor="customerName" className="form-label text-white">
                        Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="customerEmail" className="form-label text-white">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="customerEmail"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="customerPhone" className="form-label text-white">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="customerPhone"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="notes" className="form-label text-white">
                        Special Notes
                      </label>
                      <textarea
                        className="form-control"
                        id="notes"
                        name="notes"
                        rows="3"
                        value={formData.notes}
                        onChange={handleInputChange}
                      />
                    </div>

                    {orderStatus === 'success' && (
                      <div className="alert alert-success" role="alert">
                        Order submitted successfully! We'll prepare your food.
                      </div>
                    )}

                    {orderStatus === 'error' && (
                      <div className="alert alert-danger" role="alert">
                        Failed to submit order. Please try again.
                      </div>
                    )}

                    <button 
                      type="submit" 
                      className="btn btn-warning w-100"
                      disabled={orderStatus === 'submitting'}
                    >
                      {orderStatus === 'submitting' ? 'Submitting...' : 'Place Order'}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}