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
      <img className="home-hero-photo" src="/assets/home-campus.webp" alt="Students walking together on a university campus" width="1536" height="1024" fetchPriority="high" />
    </section>

    <section className="home-contact home-contact-full" id="contact"><ContactForm /></section>
  </>;
}
