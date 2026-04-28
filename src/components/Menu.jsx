export default function Menu({ items, onAdd }) {
  const groups = ['Starters', 'Mains', 'Desserts']

  return (
    <section id="menu" className="section-pad">
      <div className="container">
        <h2 className="section-title">Our Menu</h2>

        {groups.map((group) => (
          <div key={group} className="mb-5">
            <h3 className="h4 mb-3 text-warning">{group}</h3>
            <div className="row g-4">
              {items
                .filter((i) => i.category === group)
                .map((item) => (
                  <div className="col-md-6 col-xl-4" key={item.id}>
                    <div
                      className="card menu-card h-100 border-0 shadow-sm"
                      role="button"
                      tabIndex={0}
                      onClick={() => onAdd(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') onAdd(item)
                      }}
                    >
                      <img
                        src={item.image}
                        className="card-img-top menu-img"
                        alt={item.name}
                      />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start gap-3">
                          <div>
                            <h4 className="card-title h5 text-white mb-1">{item.name}</h4>
                            <p className="card-text text-light-emphasis mb-2">
                              {item.desc}
                            </p>
                          </div>
                          <span className="badge text-bg-warning fs-6">${item.price}</span>
                        </div>
                        <button className="btn btn-outline-warning btn-sm mt-2" type="button">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}