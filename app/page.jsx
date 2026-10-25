import Link from 'next/link';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  return <>
    <section className="simple-hero" id="home">
      <div className="simple-hero-inner">
        <span className="section-kicker">YOUR FUTURE, OPENED</span>
        <h1>Study abroad.<br /><em>Start with one step.</em></h1>
        <p>Find a study path that fits you. We’ll help you figure out what comes next.</p>
        <Link className="button button-gold" href="/programs">Explore study options <span>↗</span></Link>
        <div className="hero-prompt"><span className="prompt-dot" /> Based in Addis Ababa, Ethiopia</div>
      </div>
      <img className="home-hero-photo" src="/assets/home-campus.png" alt="Students walking together on a university campus" />
    </section>

    <section className="quick-links section-wrap" aria-label="Explore EduBridge">
      <div className="quick-heading"><div><span className="section-kicker">YOUR JOURNEY, MADE SIMPLE</span><h2>What would you<br /><em>like to explore?</em></h2></div></div>
      <div className="quick-grid">
        <Link className="quick-card quick-blue" href="/programs"><span className="quick-icon">↗</span><small>01</small><h3>Study programs</h3><p>Find a degree or training path.</p><b>Explore programs <span>→</span></b></Link>
        <Link className="quick-card quick-gold" href="/services"><span className="quick-icon">✳</span><small>02</small><h3>How we help</h3><p>Get clear, personal guidance.</p><b>See our services <span>→</span></b></Link>
        <Link className="quick-card quick-lilac" href="/about"><span className="quick-icon">◎</span><small>03</small><h3>Meet EduBridge</h3><p>Get to know our approach.</p><b>About us <span>→</span></b></Link>
      </div>
    </section>

    <section className="home-contact home-contact-full" id="contact"><ContactForm /></section>
  </>;
}
