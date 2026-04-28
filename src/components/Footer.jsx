export default function Footer() {
  return (
    <footer className="footer py-4 bg-black text-center text-light mt-5">
      <div className="container">
        <div className="mb-2">
          <a href="#" className="text-decoration-none text-warning me-3">
            Facebook
          </a>
          <a href="#" className="text-decoration-none text-warning me-3">
            Instagram
          </a>
          <a href="#" className="text-decoration-none text-warning">
            Twitter
          </a>
        </div>
        <p className="mb-1 text-body-secondary">Mon–Thu: 11:00 AM – 9:00 PM</p>
        <p className="mb-1 text-body-secondary">Fri–Sat: 11:00 AM – 11:00 PM</p>
        <p className="mb-0 text-body-secondary">Sun: 12:00 PM – 8:00 PM</p>
      </div>
    </footer>
  )
}