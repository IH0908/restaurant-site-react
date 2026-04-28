export default function Hero() {
  return (
    <section
      id="home"
      className="hero-section text-center text-white d-flex align-items-center"
    >
      <div className="container py-5">
        <div className="hero-card mx-auto p-4 p-md-5">
          <h1 className="display-4 fw-bold text-uppercase">Urban Bistro</h1>
          <p className="lead mb-4">Fresh flavors, cozy vibes, and city energy.</p>
          <a href="#menu" className="btn btn-warning btn-lg fw-semibold">
            View Menu
          </a>
        </div>
      </div>
    </section>
  )
}