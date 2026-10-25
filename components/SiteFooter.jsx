import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 48 54"><path d="M24 2 4 10v14c0 13 8 22 20 28 12-6 20-15 20-28V10L24 2Z"/><path className="mark-cut" d="M24 11 13 16v9c0 8 4 14 11 18 7-4 11-10 11-18v-9l-11-5Z"/><path className="mark-cap" d="m8 10 16-7 16 7-16 7L8 10Zm7 4v5c4 3 14 3 18 0v-5l-9 4-9-4Z"/></svg></span>
            <span className="brand-name">EduBridge <b>Africa</b><small>Your bridge to global education</small></span>
          </Link>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <span>EXPLORE</span><Link href="/">Home</Link><Link href="/about">About Us</Link><Link href="/programs">Programs</Link><Link href="/services">Services</Link><Link href="/contact">Partners</Link>
        </nav>
        <div className="footer-location"><span>FIND US</span><a href="https://www.google.com/maps/search/?api=1&query=Addis%20Ababa%2C%20Ethiopia" target="_blank" rel="noreferrer">Addis Ababa, Ethiopia <b aria-hidden="true">↗</b></a><small>Open location in Google Maps</small></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} EduBridge Africa</span><span>Connecting Africa to global education</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
