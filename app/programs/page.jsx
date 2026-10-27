import Link from 'next/link';
import { Kicker, ProgramCard } from '../../components/SiteBits';

export const metadata = { title: 'Study Programs' };

export default function ProgramsPage() {
  return <>
    <section className="program-list section-wrap"><div className="section-heading"><div><Kicker>EXPLORE YOUR OPTIONS</Kicker><h2>What would you<br />like to <em>study?</em></h2></div><p>Explore a path that fits.</p></div><div className="program-grid">
      <ProgramCard tone="card-blue" number="01" label="UNDERGRADUATE" icon="✳" title="Bachelor's degrees" description="Build a strong academic foundation and prepare for your chosen career." service="Bachelor's degree" />
      <ProgramCard tone="card-gold" number="02" label="POSTGRADUATE" icon="⌁" title="Master's degrees" description="Advance your knowledge, develop specialist expertise and grow your options." service="Master's degree" />
      <ProgramCard tone="card-lilac" number="03" label="RESEARCH" icon="◎" title="PhD programmes" description="Explore doctoral study and research opportunities in your field." service="PhD and research" />
      <ProgramCard tone="card-green" number="04" label="PROFESSIONAL" icon="↗" title="Short-term training" description="Build practical skills through executive learning and specialised training." service="Short-term training" />
    </div></section>
    <section className="inner-hero program-hero"><Kicker>STUDY PROGRAMS</Kicker><h1>Choose a direction.<br /><em>Make it your own.</em></h1><p>Explore study paths at every stage of your journey.</p><Link className="button button-gold" href="/enquire">Click us and we will do the rest <span>↗</span></Link><img src="/assets/program-student.webp" alt="A student holding a notebook and looking toward her future" width="390" height="500" /></section>
  </>;
}
