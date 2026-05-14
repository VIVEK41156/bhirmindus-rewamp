import { useEffect } from 'react';

export default function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '150px 5%', minHeight: '60vh', textAlign: 'center', backgroundColor: '#020308', color: '#fff' }}>
      <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Products</h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
        Browse our comprehensive catalog of high-quality industrial and agricultural exports.
      </p>
    </div>
  );
}
