const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>© {new Date().getFullYear()} EMS Dashboard</p>
        <div className="footer-links">
          <a href="mailto:rishabhrajput337@yahoo.com">Mail Me</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
