import Link from 'next/link';

export function Kicker({ children, light = false }) {
  return <div className={`section-kicker${light ? ' light-kicker' : ''}`}>{children}</div>;
}

export function ProgramCard({ tone, number, label, icon, title, description, service }) {
  return (
    <article className={`program-card ${tone}`}>
      <div className="card-top"><span className="program-num">{number} / {label}</span><span className="program-icon">{icon}</span></div>
      <h3>{title}</h3><p>{description}</p>
      <Link href={`/contact?service=${encodeURIComponent(service)}`}>Explore this path <span>↗</span></Link>
    </article>
  );
}

export function CallToAction({ kicker = 'YOUR FUTURE. YOUR EDUCATION. YOUR WORLD.', title, emphasis, button = 'Start a conversation' }) {
  return (
    <section className="cta-panel">
      <Kicker light>{kicker}</Kicker>
      <h2>{title}<br /><em>{emphasis}</em></h2>
      <Link className="button button-gold" href="/contact">{button} <span>↗</span></Link>
    </section>
  );
}
