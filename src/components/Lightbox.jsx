import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

/* Full-screen viewer. Given several items it becomes a gallery: manual only —
   never auto-advances — with a thumbnail strip and arrow-key navigation. */
export default function Lightbox({ items, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const many = items.length > 1;

  const go = useCallback(
    step => setIndex(i => (i + step + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (!many) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, go, many]);

  const current = items[index];

  return createPortal(
    <div
      className="cs-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={current.caption || current.alt || 'Image viewer'}
      onClick={onClose}
    >
      <button type="button" className="cs-lightbox-close" aria-label="Close" onClick={onClose}>
        ×
      </button>

      {many && (
        <button
          type="button"
          className="cs-lightbox-arrow is-prev"
          aria-label="Previous image"
          onClick={e => { e.stopPropagation(); go(-1); }}
        >
          ‹
        </button>
      )}

      <figure onClick={e => e.stopPropagation()}>
        <img src={current.src} alt={current.alt ?? current.caption ?? ''} />
        {(current.caption || many) && (
          <figcaption>
            {current.caption}
            {many && <span className="cs-lightbox-count">{index + 1} / {items.length}</span>}
          </figcaption>
        )}

        {many && (
          <div className="cs-lightbox-thumbs">
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                className={i === index ? 'is-active' : undefined}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              >
                <img src={item.src} alt="" aria-hidden="true" />
              </button>
            ))}
          </div>
        )}
      </figure>

      {many && (
        <button
          type="button"
          className="cs-lightbox-arrow is-next"
          aria-label="Next image"
          onClick={e => { e.stopPropagation(); go(1); }}
        >
          ›
        </button>
      )}
    </div>,
    document.body,
  );
}
