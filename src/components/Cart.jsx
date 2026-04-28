export default function Cart({ cart, total, onInc, onDec, onRemove, onClear }) {
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
                <button className="btn btn-outline-warning" onClick={onClear} type="button">
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}