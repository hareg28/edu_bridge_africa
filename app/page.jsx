import Link from 'next/link';

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
      <div className="hero-orbit" aria-hidden="true"><span>✳</span><i /><b /></div>
    </section>

    <section className="quick-links section-wrap" aria-label="Explore EduBridge">
      <div className="quick-heading"><div><span className="section-kicker">YOUR JOURNEY, MADE SIMPLE</span><h2>What would you<br /><em>like to explore?</em></h2></div></div>
      <div className="quick-grid">
        <Link className="quick-card quick-blue" href="/programs"><span className="quick-icon">↗</span><small>01</small><h3>Study programs</h3><p>Find a degree or training path.</p><b>Explore programs <span>→</span></b></Link>
        <Link className="quick-card quick-gold" href="/services"><span className="quick-icon">✳</span><small>02</small><h3>How we help</h3><p>Get clear, personal guidance.</p><b>See our services <span>→</span></b></Link>
        <Link className="quick-card quick-lilac" href="/about"><span className="quick-icon">◎</span><small>03</small><h3>Meet EduBridge</h3><p>Get to know our approach.</p><b>About us <span>→</span></b></Link>
      </div>
    </section>

    <section className="simple-steps"><div className="steps-inner"><div><span className="section-kicker light-kicker">THREE SIMPLE STEPS</span><h2>From curious<br />to <em>confident.</em></h2><Link className="text-link steps-link" href="/contact">Start a conversation <span>↗</span></Link></div><div className="step-list"><Link href="/contact"><span>01</span><b>Tell us what you want to study</b><i>↗</i></Link><Link href="/programs"><span>02</span><b>Explore the options that fit</b><i>↗</i></Link><Link href="/services"><span>03</span><b>Plan your next step</b><i>↗</i></Link></div></div></section>

    <section className="simple-contact"><span className="section-kicker">READY WHEN YOU ARE</span><h2>Let’s talk about<br /><em>what’s possible.</em></h2><Link className="button button-gold" href="/contact">Contact EduBridge <span>↗</span></Link></section>
  </>;
}
