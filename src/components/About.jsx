export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container">
        <h2 className="section-title">Our Story</h2>
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <img
              className="img-fluid rounded-4 shadow"
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
              alt="Restaurant interior"
            />
          </div>
          <div className="col-lg-6">
            <p className="text-body-secondary fs-5">
              Urban Bistro started as a late-night idea between friends who wanted a place
              where good food and conversation meet. We focus on bold flavors, seasonal
              ingredients, and a warm neighborhood atmosphere.
            </p>
            <p className="text-body-secondary fs-5 mb-0">
              From quick lunches to relaxed dinners, our goal is to make every visit feel
              welcoming and memorable.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}