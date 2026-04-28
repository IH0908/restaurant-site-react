export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-6">
            <div className="ratio ratio-4x3 rounded-4 overflow-hidden shadow-sm">
              <iframe
                title="Urban Bistro Map"
                src="https://www.google.com/maps?q=New%20York%20City&z=14&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="col-lg-6">
            <form className="contact-form h-100 p-4 rounded-4 shadow-sm">
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="name">
                  Name
                </label>
                <input id="name" className="form-control" type="text" />
              </div>

              <div className="mb-3">
                <label className="form-label text-white" htmlFor="email">
                  Email
                </label>
                <input id="email" className="form-control" type="email" />
              </div>

              <div className="mb-3">
                <label className="form-label text-white" htmlFor="message">
                  Message
                </label>
                <textarea id="message" className="form-control" rows="5"></textarea>
              </div>

              <button className="btn btn-warning fw-semibold" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}