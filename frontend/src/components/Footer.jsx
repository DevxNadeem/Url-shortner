function Footer() {
  return (
    <footer className='footer-cntr'>
      <div className='footer-top'>
        <div className='footer-brand'>
          <img src="/logo.png" alt="logo" />
          <p>Fast, clean URL shortening for everyone.</p>
        </div>
        <div className='footer-links'>
          <h4>Product</h4>
          <a href="#">Dashboard</a>
          <a href="#">About</a>
          <a href="#">Register</a>
        </div>
        <div className='footer-links'>
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>© 2026 url short. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer