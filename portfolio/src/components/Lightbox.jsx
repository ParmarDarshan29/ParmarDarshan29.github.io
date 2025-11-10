import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Lightbox({ src, alt = '', onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    // prevent background scroll while open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!src) return null;

  return ReactDOM.createPortal(
    <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label={alt || 'Image preview'} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lightbox-content">
        <button className="lightbox-close" aria-label="Close preview" onClick={onClose}>&times;</button>
        <img src={src} alt={alt} className="lightbox-img" />
      </div>
    </div>,
    document.body
  );
}
