import Link from 'next/link';
import { Kicker, ProgramCard } from '../../components/SiteBits';

export const metadata = { title: 'Study Programs' };

export default function ProgramsPage() {
  return <>
    <section className="inner-hero program-hero"><Kicker>STUDY PROGRAMS</Kicker><h1>Choose a direction.<br /><em>Make it your own.</em></h1><p>Explore study paths at different stages of your academic and professional journey.</p><Link className="button button-gold" href="/contact">Find your programme <span>↗</span></Link><img src="/assets/destinations.png" alt="A student considering international university destinations" /></section>
    <section className="program-list section-wrap"><div className="section-heading"><div><Kicker>EXPLORE YOUR OPTIONS</Kicker><h2>What would you<br />like to <em>study?</em></h2></div><p>Tell us what interests you and we'll help you understand possible next steps.</p></div><div className="program-grid">
      <ProgramCard tone="card-blue" number="01" label="UNDERGRADUATE" icon="✳" title="Bachelor's degrees" description="Build a strong academic foundation and prepare for your chosen career." service="Bachelor's degree" />
      <ProgramCard tone="card-gold" number="02" label="POSTGRADUATE" icon="⌁" title="Master's degrees" description="Advance your knowledge, develop specialist expertise and grow your options." service="Master's degree" />
      <ProgramCard tone="card-lilac" number="03" label="RESEARCH" icon="◎" title="PhD programmes" description="Explore doctoral study and research opportunities in your field." service="PhD and research" />
      <ProgramCard tone="card-green" number="04" label="PROFESSIONAL" icon="↗" title="Short-term training" description="Build practical skills through executive learning and specialised training." service="Short-term training" />
    </div></section>
    <section className="destination-mini"><Kicker light>STUDY ABROAD</Kicker><h2>Look beyond borders.</h2><p>Explore opportunities in the United States, Canada, Europe and other destinations. Available programmes vary by institution and year.</p><Link className="button button-light" href="/contact?service=Study%20destination%20guidance">Ask about destinations <span>↗</span></Link></section>
  </>;
}
