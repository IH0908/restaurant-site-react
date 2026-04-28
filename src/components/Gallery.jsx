import { useState } from 'react'

export default function Gallery({ images }) {
  const [index, setIndex] = useState(0)

  const prev = () => {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }

  const next = () => {
    setIndex((i) => (i + 1) % images.length)
  }

  return (
    <section className="section-pad bg-dark-subtle" id="gallery">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <div className="gallery-wrap position-relative mx-auto">
          <img
            className="gallery-img img-fluid rounded-4 shadow"
            src={images[index]}
            alt={`Gallery ${index + 1}`}
          />
          <button
            className="gallery-btn prev btn btn-light rounded-circle"
            onClick={prev}
            aria-label="Previous image"
            type="button"
          >
            ‹
          </button>
          <button
            className="gallery-btn next btn btn-light rounded-circle"
            onClick={next}
            aria-label="Next image"
            type="button"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}