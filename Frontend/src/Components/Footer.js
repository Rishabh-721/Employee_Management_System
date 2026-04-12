const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>© {new Date().getFullYear()} EMS Dashboard</p>
        <div className="footer-links">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
