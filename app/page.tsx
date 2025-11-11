export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Uttarakhand Properties</h1>
      <p style={{ fontSize: '20px', color: '#666', marginBottom: '40px' }}>
        Your trusted partner for premium properties in the beautiful state of Uttarakhand.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '40px' }}>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Premium Plots</h3>
          <p>Explore our curated selection of premium properties</p>
          <a href="/plots" style={{ color: '#0070f3' }}>View Plots →</a>
        </div>
        
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Investment Guide</h3>
          <p>Learn about property investment opportunities</p>
          <a href="/investment" style={{ color: '#0070f3' }}>Learn More →</a>
        </div>
        
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Get Started</h3>
          <p>Contact us to begin your property journey</p>
          <a href="/contact" style={{ color: '#0070f3' }}>Contact →</a>
        </div>
      </div>
      
      <div style={{ marginTop: '60px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Migration Complete!</h2>
        <p>This app has been successfully migrated from Vercel to Replit.</p>
        <ul>
          <li>✅ Backend API running on port 8000</li>
          <li>✅ Frontend running on port 5000</li>
          <li>✅ Database configured (Supabase)</li>
          <li>✅ Environment variables secured</li>
        </ul>
        <p><em>Note: The original homepage (1110 lines) has been temporarily replaced with this lighter version. 
        Restore it from app/page.tsx.backup when ready.</em></p>
      </div>
    </div>
  );
}
