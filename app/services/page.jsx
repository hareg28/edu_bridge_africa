import Link from 'next/link';
import { Kicker } from '../../components/SiteBits';

export const metadata = { title: 'Our Services' };

const services = [
  ['Study destinations', 'Explore countries and study options.', 'Study destination guidance'],
  ['Programs and universities', 'Find options that suit your goals.', 'Programme and institution search'],
  ['Admission requirements', 'Know what you need to apply.', 'Admission requirements guidance'],
  ['Application planning', 'Get ready for your next step.', 'Application support'],
  ['Partnerships', 'Connect with us about opportunities.', 'Institutional partnerships'],
];

export default function ServicesPage() {
  return <>
    <section className="inner-hero service-hero"><Kicker>HOW WE CAN HELP</Kicker><h1>Guidance for every<br /><em>step of your journey.</em></h1><p>Get clear, practical support as you explore international education and plan what comes next.</p><Link className="button button-gold" href="/contact">Tell us what you need <span>↗</span></Link><img src="/assets/kent-state.png" alt="Students exploring education opportunities at Kent State University" /></section>
    <section className="services-list section-wrap"><div className="section-heading"><div><Kicker>OUR SERVICES</Kicker><h2>Support shaped<br />around <em>your goals.</em></h2></div><p>Choose what you need.</p></div><div className="service-cards">{services.map(([title, description, service], i) => <article key={title}><span className="service-number">{String(i + 1).padStart(2, '0')}</span><div><h3><Link className="service-title-link" href={`/contact?service=${encodeURIComponent(service)}`}>{title}</Link></h3><p>{description}</p></div><Link href={`/contact?service=${encodeURIComponent(service)}`} aria-label={`Enquire about ${title}`}>↗</Link></article>)}</div></section>
    <section className="service-note"><Kicker>PERSONAL SUPPORT</Kicker><h2>Start with<br /><em>your goals.</em></h2><Link className="underlined-link" href="/contact">Tell us what you need <span>↗</span></Link></section>
  </>;
}
