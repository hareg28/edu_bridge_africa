import { Kicker } from '../../components/SiteBits';
import ContactForm from '../../components/ContactForm';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return <>
    <section className="contact-page-intro"><Kicker>LET'S START A CONVERSATION</Kicker><h1>Tell us what<br /><em>you're working toward.</em></h1><p>Share a little about your plans. Choose the services you need and the university you're interested in, and we'll help you explore the next step.</p><div className="contact-location"><span>BASED IN</span><strong>Addis Ababa, Ethiopia</strong></div></section>
    <section className="form-section"><ContactForm /><aside className="form-aside"><div className="aside-icon">✳</div><h2>Your goals<br />come first.</h2><p>There's no one-size-fits-all path. Share what matters to you, and we'll start from there.</p><div className="aside-line" /><span className="aside-label">EDUBRIDGE AFRICA</span><strong>Addis Ababa, Ethiopia</strong><a href="/about" className="underlined-link">Learn about us <span>↗</span></a></aside></section>
  </>;
}
