import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true"><img src="/assets/trainhub-mark.webp" alt="" /></span>
            <span className="brand-name">TrainHub <b>Africa</b><small>Learn. Grow. Succeed.</small></span>
          </Link>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <span>EXPLORE</span><Link href="/">Home</Link><Link href="/about">About Us</Link><Link href="/programs">Programs</Link><Link href="/services">Services</Link><Link href="/contact">Partners</Link>
        </nav>
        <div className="footer-location"><span>FIND US</span><a href="https://www.google.com/maps/search/?api=1&query=Addis%20Ababa%2C%20Ethiopia" target="_blank" rel="noreferrer">Addis Ababa, Ethiopia <b aria-hidden="true">↗</b></a><small>Open location in Google Maps</small></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} TrainHub Africa PLC</span><span>Learn. Grow. Succeed.</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
